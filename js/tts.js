/* ============================================================
 * tts.js — SLM 驱动的文档朗读引擎（v4.5.3，纯静态端侧方案）
 * 引擎层：speechSynthesis（设备端神经/小模型声学合成，离线可用，
 *         优先选择本地 zh-CN 神经音色：晓晓/云希/Siri/Google 普通话等）
 * 理解层：Markdown 结构感知的朗读单元管线——
 *         · 二级标题 → 「第 N 节，<标题>」带停顿引导
 *         · 段落/列表/引用 → 按句切分（。！？；.!? 分句，超长硬切）
 *         · 代码块/表格 → 默认跳过（噪音无朗读价值）
 * 用法：TTS.units(articleEl) -> [{sec, secId, kind, text}]
 *      TTS.play(units, {rate, voice, onUnit, onEnd}) / pause / resume / stop
 * 兼容：ES5；不支持 speechSynthesis 时 TTS.supported=false（UI 隐藏）
 * ============================================================ */
(function (g) {
  "use strict";

  var synth = g.speechSynthesis || null;
  var supported = !!synth && typeof g.SpeechSynthesisUtterance === "function";

  /* ---------- 音色选择：优先本地（非网络）zh 神经音色 ---------- */
  var PREFERRED = ["Xiaoxiao", "Yunxi", "Yunyang", "Xiaoyi", "Tingting", "Meijia", "Siri", "Google 普通话", "Google"];
  function voiceScore(v) {
    var s = 0, n = v.name || "";
    if (/^zh|[-_]CN/i.test(v.lang || "")) s += 10;
    else if (/^zh/i.test(v.lang || "")) s += 6;
    if (/local/i.test(v.localService ? "local" : "")) s += 4; /* 本地服务不耗网络 */
    for (var i = 0; i < PREFERRED.length; i++) if (n.indexOf(PREFERRED[i]) >= 0) { s += 8 - i; break; }
    return s;
  }
  function voices() {
    if (!supported) return [];
    return (synth.getVoices() || []).slice(0);
  }
  function bestVoice() {
    var vs = voices();
    if (!vs.length) return null;
    var best = null, bs = -1;
    for (var i = 0; i < vs.length; i++) {
      var s = voiceScore(vs[i]);
      if (s > bs) { bs = s; best = vs[i]; }
    }
    return bs >= 6 ? best : null; /* 无中文音色则回退系统默认 */
  }

  /* ---------- 文本理解层：渲染后的文章 DOM → 朗读单元序列 ---------- */
  function cleanText(s) {
    return String(s || "")
      .replace(/\u0000C\d+\u0000/g, " ")
      .replace(/\s+/g, " ")
      .replace(/^[，、：；.\s]+|[，、：；.\s]+$/g, "")
      .trim();
  }
  /* ES5 安全分句：终结符切分 + 超长硬切（≤110 字符，符合合成器舒适长度） */
  function splitSentences(text) {
    var out = [], buf = "", ch;
    for (var i = 0; i < text.length; i++) {
      ch = text[i];
      buf += ch;
      if ("。！？；!?;".indexOf(ch) >= 0 || (ch === "." && !/[0-9]/.test(text[i + 1] || ""))) {
        if (buf.trim()) out.push(buf.trim());
        buf = "";
      } else if (buf.length >= 110) {
        /* 超长无终结符：在最近的逗号处断开，否则硬切 */
        var cut = buf.lastIndexOf("，");
        if (cut < 30) cut = buf.length;
        out.push(buf.slice(0, cut + 1));
        buf = buf.slice(cut + 1);
      }
    }
    if (buf.trim()) out.push(buf.trim());
    return out;
  }
  function units(articleEl) {
    var list = [];
    var body = articleEl.querySelector(".md-body");
    if (!body) return list;
    var sec = 0, secId = null, secTitle = "";
    var walk = function (el) {
      for (var i = 0; i < el.children.length; i++) {
        var c = el.children[i];
        var tag = c.tagName;
        if (tag === "H2" && c.className.indexOf("md-h") >= 0) {
          sec++;
          secId = c.id || null;
          secTitle = cleanText(c.textContent).replace(/^\d+\.\s*/, "");
          var lead = "第" + ("一二三四五六七八九十".charAt(Math.min(sec - 1, 9)) || sec) + "节，" + secTitle + "。";
          list.push({ sec: sec, secId: secId, kind: "h2", title: secTitle, text: lead });
        } else if (tag === "H3" && c.className.indexOf("md-h") >= 0) {
          var t3 = cleanText(c.textContent);
          if (t3) list.push({ sec: sec, secId: secId, kind: "h3", text: "小节，" + t3 + "。" });
        } else if (tag === "P" || tag === "LI") {
          var t = cleanText(c.textContent);
          if (!t) continue;
          var sents = splitSentences(t);
          for (var k = 0; k < sents.length; k++) {
            list.push({ sec: sec, secId: secId, kind: tag === "LI" ? "li" : "p", text: sents[k] });
          }
        } else if (tag === "BLOCKQUOTE") {
          var qs = splitSentences(cleanText(c.textContent));
          for (var m = 0; m < qs.length; m++) {
            list.push({ sec: sec, secId: secId, kind: "quote", text: qs[m] });
          }
        }
        /* PRE（代码）与 TABLE：跳过——对朗读是噪音 */
      }
    };
    walk(body);
    return list;
  }

  /* ---------- 播放引擎：顺序合成 + 事件回调 ---------- */
  var queue = [], idx = 0, opts = null, curUtter = null, state = "idle";
  function speakOne() {
    if (idx >= queue.length) { stop(); if (opts && opts.onEnd) opts.onEnd(); return; }
    var u = queue[idx];
    if (opts && opts.onUnit) opts.onUnit(idx, u);
    var ut = new g.SpeechSynthesisUtterance(u.text);
    ut.lang = (opts && opts.voice && opts.voice.lang) || "zh-CN";
    if (opts && opts.voice) ut.voice = opts.voice;
    ut.rate = (opts && opts.rate) || 1;
    curUtter = ut;
    ut.onend = function () { if (state === "playing") { idx++; speakOne(); } };
    ut.onerror = function () { if (state === "playing") { idx++; speakOne(); } };
    try { synth.speak(ut); } catch (e) { idx++; speakOne(); }
  }
  function play(u, o) {
    if (!supported) return false;
    stop();
    queue = u || []; idx = 0; opts = o || {}; state = "playing";
    if (!queue.length) { state = "idle"; if (opts.onEnd) opts.onEnd(); return true; }
    speakOne();
    return true;
  }
  function pause() { if (state === "playing") { try { synth.pause(); } catch (e) { } state = "paused"; } }
  function resume() { if (state === "paused") { try { synth.resume(); } catch (e) { } state = "playing"; } }
  function stop() {
    state = "idle"; queue = []; idx = 0; curUtter = null;
    if (supported) { try { synth.cancel(); } catch (e) { } }
  }
  function speakingUnit() { return state === "playing" || state === "paused" ? idx : -1; }

  /* 音色列表可能异步加载：给一次性回调 */
  function onVoicesReady(cb) {
    if (!supported) { cb([]); return; }
    var vs = voices();
    if (vs.length) { cb(vs); return; }
    var h = function () { if (voices().length) { synth.removeEventListener("voiceschanged", h); cb(voices()); } };
    synth.addEventListener("voiceschanged", h);
    setTimeout(function () { cb(voices()); }, 800); /* 兜底：800ms 后无论有无都回调 */
  }

  g.TTS = {
    supported: supported,
    units: units,
    voices: voices,
    bestVoice: bestVoice,
    onVoicesReady: onVoicesReady,
    play: play,
    pause: pause,
    resume: resume,
    stop: stop,
    state: function () { return state; },
    speakingUnit: speakingUnit
  };
})(typeof window !== "undefined" ? window : globalThis);
