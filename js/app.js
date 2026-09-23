/* ============================================================
 * app.js v4.1 — 七关卡主线 + 知识点索引双通道 + 五 Tab 导航
 * 路由：#/ 与 #/map 学习地图 ｜ #/index 知识点索引（无门禁）
 *      #/mistakes 错题本与复习 ｜ #/boss Boss 战（Hub 与单场）
 *      #/tasks 实战任务卡（Hub 与单张）｜ #/review/:layer 模块回顾测验
 *      #/knowledge/:id 知识点页（始终无门禁）｜ #/progress 战绩
 * 门禁边界：Boss 战解锁只约束技能树主线推进；索引页/知识点页/
 *          任务卡一律放行（URL 直达与索引跳转不受限）。
 * 数据单一来源：data/index.js（由 tools/build-index.js 从最终大纲生成），
 *          技能树 / 索引页 / 错题本共用。
 * ============================================================ */
(function () {
  "use strict";

  var S = window.SYLLABUS;
  var J = window.Judge;
  var IDX = window.KNOWLEDGE_INDEX || [];

  function $(sel, el) { return (el || document).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function sanitizeDemo(html) {
    return String(html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  }
  function starHtml(n) {
    var out = "";
    for (var i = 1; i <= 5; i++) out += i <= n ? "★" : '<span class="dim">★</span>';
    return out;
  }
  function today() { return new Date().toISOString().slice(0, 10); }
  function addDays(dateStr, days) {
    var d = new Date(dateStr + "T00:00:00");
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  /* ---------- 大纲索引：主线顺序 = 关卡 → 锚点 → 主点/子点 ---------- */
  var STAGE_INDEX = {};
  S.levels.forEach(function (lv, i) { STAGE_INDEX[lv.id] = i; });
  var ORDER = [];
  S.levels.forEach(function (lv) {
    S.modules.forEach(function (m) {
      m.points.forEach(function (p) { if (p.stage === lv.id) ORDER.push({ m: m, p: p }); });
    });
  });
  var byId = {};
  ORDER.forEach(function (e) { byId[e.p.id] = e; });
  function stageById(sid) {
    return S.levels.filter(function (l) { return l.id === String(sid).toUpperCase(); })[0];
  }
  var idxById = {};
  IDX.forEach(function (e) { idxById[e.id] = e; });

  var LAYERS = [
    { id: "L0", name: "0 基础层" },
    { id: "L1", name: "1 LLM 应用层" },
    { id: "L2", name: "2 Agent 核心层" },
    { id: "L3", name: "3 AI 工程化层" },
    { id: "L4", name: "4 实战层" },
    { id: "H", name: "H 2026 前沿层" }
  ];
  function layerName(lid) {
    for (var i = 0; i < LAYERS.length; i++) if (LAYERS[i].id === lid) return LAYERS[i].name;
    return lid;
  }

  /* ---------- 本地进度（localStorage） ---------- */
  var KEY = "llm-quest:v4";
  function defaultState() {
    return {
      xp: 0,
      visited: {}, choice: {}, scenario: {}, feynman: {}, teachback: {},
      boss: {}, wrongbook: {}, tasks: {}, last: null
    };
  }
  var state = (function () {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY));
      if (raw && typeof raw === "object") {
        var d = defaultState();
        Object.keys(d).forEach(function (k) { if (raw[k] != null) d[k] = raw[k]; });
        return d;
      }
    } catch (e) { /* 损坏则重置 */ }
    return defaultState();
  })();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 配额忽略 */ } }

  /* ---------- 学习状态（索引页判定口径） ----------
   * 未开始=未访问；学习中=已读未完成例题；已通过=例题全部答对；
   * 待复习=存在关联错题；今日到期=遗忘曲线 nextDue≤今天 */
  function wrongEntriesFor(id) {
    return Object.keys(state.wrongbook)
      .map(function (k) { return state.wrongbook[k]; })
      .filter(function (it) { return it && it.ref === id; });
  }
  function isDue(id) {
    var t = today();
    return wrongEntriesFor(id).some(function (it) { return it.nextDue <= t; });
  }
  function exercisesAllCorrect(id) {
    var entry = idxById[id];
    var total = entry ? entry.exCount || 0 : 0;
    if (!state.visited[id]) return false;
    if (total === 0) return true;
    for (var i = 0; i < total; i++) {
      var key = id + "#ex" + i;
      var c = state.choice[key], sc = state.scenario[key];
      var okC = !!(c && c.correct === true);
      var okS = !!(sc && sc.total > 0 && sc.score / sc.total >= 0.8);
      if (!okC && !okS) return false;
    }
    return true;
  }
  function pointStatus(id) {
    if (wrongEntriesFor(id).length) return "待复习";
    if (!state.visited[id]) return "未开始";
    return exercisesAllCorrect(id) ? "已通过" : "学习中";
  }
  var STATUS_BADGE = {
    "未开始": ["status-new", "未开始"],
    "学习中": ["status-learning", "学习中"],
    "已通过": ["status-passed", "已通过"],
    "待复习": ["status-review", "待复习"],
    "due": ["status-due", "今日到期"]
  };
  function statusBadgeHtml(st) {
    var m = STATUS_BADGE[st] || ["status-new", st];
    return '<span class="badge status-badge ' + m[0] + '">' + m[1] + "</span>";
  }

  /* ---------- 关卡解锁（仅约束技能树主线与 Boss 推进） ---------- */
  function stageUnlocked(sid) {
    var idx = STAGE_INDEX[sid];
    if (!idx) return true;
    var prev = S.levels[idx - 1];
    var rec = state.boss[prev.id];
    return !!(rec && rec.passed);
  }
  function currentTitleIdx() {
    var t = S.titleThresholds, idx = 0;
    for (var i = 0; i < t.length; i++) if (state.xp >= t[i]) idx = i;
    return idx;
  }
  function currentStageProgress() {
    var maxIdx = 0;
    S.levels.forEach(function (lv, i) { if (stageUnlocked(lv.id)) maxIdx = i; });
    return maxIdx;
  }
  function addXp(n) {
    var before = currentTitleIdx();
    state.xp += n;
    var after = currentTitleIdx();
    save();
    if (after > before) { pendingCelebration = S.levels[after]; }
    return after > before;
  }
  var pendingCelebration = null;

  /* ---------- 内容加载 ---------- */
  var contentCache = {};
  function getContent(id) {
    if (contentCache[id]) return Promise.resolve(contentCache[id]);
    return fetch("./data/content/" + id + ".json")
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (j) { contentCache[id] = j; return j; })
      .catch(function () { return null; });
  }
  var bossCache = {};
  function getBoss(sid) {
    var key = String(sid).toLowerCase();
    if (bossCache[key]) return Promise.resolve(bossCache[key]);
    return fetch("./data/boss/" + key + ".json")
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (j) { bossCache[key] = j; return j; })
      .catch(function () { return null; });
  }
  var taskCache = {};
  function getTask(sid) {
    var key = String(sid).toLowerCase();
    if (taskCache[key]) return Promise.resolve(taskCache[key]);
    return fetch("./data/tasks/" + key + ".json")
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (j) { taskCache[key] = j; return j; })
      .catch(function () { return null; });
  }

  /* ---------- 路由 ---------- */
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    if (parts.length === 0) return { page: "map" };
    if (parts[0] === "map") return { page: "map" };
    if (parts[0] === "index") return { page: "index" };
    if (parts[0] === "mistakes" || parts[0] === "wrongbook") return { page: "wrongbook" };
    if (parts[0] === "boss" && parts[1]) return { page: "boss", stage: parts[1].toUpperCase() };
    if (parts[0] === "boss") return { page: "bossHub" };
    if (parts[0] === "tasks") return { page: "tasksHub" };
    if (parts[0] === "task" && parts[1]) return { page: "task", stage: parts[1].toUpperCase() };
    if (parts[0] === "review" && parts[1]) return { page: "review", layer: parts[1].toUpperCase() };
    if (parts[0] === "docs" && parts[1]) return { page: "docs", id: parts[1] };
    if (parts[0] === "docs") return { page: "docs", id: null };
    if (parts[0] === "knowledge" && parts[1]) return { page: "knowledge", id: parts[1] };
    if (parts[0] === "progress") return { page: "progress" };
    return { page: "map" };
  }

  function headerHud() {
    var el = $("#header-hud");
    if (!el) return;
    var lvIdx = currentStageProgress();
    var lv = S.levels[lvIdx];
    var tIdx = currentTitleIdx();
    var prevT = S.titleThresholds[tIdx] || 0;
    var nextT = tIdx + 1 < S.titleThresholds.length ? S.titleThresholds[tIdx + 1] : state.xp;
    var pct = nextT > prevT ? Math.min(100, Math.round((state.xp - prevT) / (nextT - prevT) * 100)) : 100;
    var tt = document.getElementById("theme-toggle");
    if (tt) tt.textContent = (document.documentElement.getAttribute("data-theme") === "dark") ? "☀️" : "🌙";
    el.innerHTML =
      '<span class="hud-level" style="--lc:' + lv.color + '">' + lv.icon + " " + lv.name + "</span>" +
      '<span class="hud-title">' + esc(lv.title) + "</span>" +
      '<div class="hud-xp"><div class="bar"><div class="fill" style="width:' + pct + '%"></div></div>' +
      "<span>" + state.xp + " XP</span></div>";
    /* 当前 Tab 高亮 */
    var r = parseHash();
    var tabMap = { map: "tab-map", index: "tab-index", wrongbook: "tab-mistakes", bossHub: "tab-boss", boss: "tab-boss", tasksHub: "tab-tasks", task: "tab-tasks", docs: "tab-docs" };
    $$(".top-tabs a").forEach(function (a) { a.classList.remove("active"); });
    var tid = tabMap[r.page];
    if (tid) { var t2 = $("#" + tid); if (t2) t2.classList.add("active"); }
    else if (r.page === "knowledge") { var t3 = $("#tab-map"); if (t3) t3.classList.add("active"); }
  }

  function celebrateIfPending() {
    if (!pendingCelebration) return;
    var lv = pendingCelebration;
    pendingCelebration = null;
    var overlay = document.createElement("div");
    overlay.className = "celebrate-overlay";
    var confetti = "";
    for (var i = 0; i < 40; i++) {
      confetti += '<span class="cf" style="left:' + (Math.random() * 100) + "%;animation-delay:" + (Math.random() * 0.8) + "s;background:" +
        ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"][i % 5] + '"></span>';
    }
    overlay.innerHTML =
      confetti +
      '<div class="celebrate-card d-anim">🎉<h2>晋升成功！</h2><p>你已晋升为 <b style="color:' + lv.color + '">' + esc(lv.title) + "</b></p>" +
      '<p class="dim">新关卡「' + esc(lv.name) + '」已解锁，继续向准专家之路前进！</p><button class="btn primary" onclick="this.closest(\'.celebrate-overlay\').remove()">继续冒险 →</button></div>';
    document.body.appendChild(overlay);
    setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 6000);
  }

  function render() {
    var r = parseHash();
    var app = $("#app");
    headerHud();
    if (r.page !== "docs") {
      document.body.classList.remove("docs-reading");
      app.classList.remove("wrap-docs");
    }
    if (r.page === "map") app.innerHTML = renderMap();
    else if (r.page === "index") renderIndex(app);
    else if (r.page === "progress") app.innerHTML = renderProgress();
    else if (r.page === "wrongbook") renderWrongbook(app);
    else if (r.page === "bossHub") renderBossHub(app);
    else if (r.page === "tasksHub") renderTasksHub(app);
    else if (r.page === "boss") renderBoss(app, r.stage);
    else if (r.page === "task") renderTask(app, r.stage);
    else if (r.page === "review") renderReview(app, r.layer);
    else if (r.page === "docs") renderDocs(app, r.id);
    else if (r.page === "knowledge") renderKnowledge(app, r.id);
    celebrateIfPending();
    window.scrollTo(0, 0);
  }

  /* ---------- 学习地图（默认首页：hero + 七关卡技能树） ---------- */
  function dueCount() {
    var t = today(), n = 0;
    Object.keys(state.wrongbook).forEach(function (k) {
      var it = state.wrongbook[k];
      if (it.nextDue && it.nextDue <= t) n++;
    });
    return n;
  }
  function stageStats(sid) {
    var pts = ORDER.filter(function (e) { return e.p.stage === sid; });
    var done = pts.filter(function (e) { return state.visited[e.p.id]; }).length;
    return { pts: pts, done: done };
  }

  function heroHtml() {
    var lvIdx = currentStageProgress();
    var lv = S.levels[lvIdx];
    var resume = state.last && byId[state.last] ? "#/knowledge/" + state.last
      : (ORDER[0] ? "#/knowledge/" + ORDER[0].p.id : "#/index");
    var nextBoss = null;
    for (var i = 0; i < S.levels.length; i++) {
      var unlocked = stageUnlocked(S.levels[i].id);
      var b = state.boss[S.levels[i].id];
      if (unlocked && !(b && b.passed)) { nextBoss = S.levels[i]; break; }
    }
    var due = dueCount();
    return '<div class="hero fade-in">' +
      "<h1>🧭 AI Agent 与 AI 工程化 · 七关晋升之路</h1>" +
      "<p>零基础到独立交付 Agent：主线沿<b>技能树七关</b>按节奏学（Boss 战 ≥80% 解锁下一关）；<b><a href='#/index' style='color:inherit'>知识点索引</a></b>全量平铺无门禁，随时按需查、按薄弱点复习。</p>" +
      '<div class="hud-row">' +
        '<span class="badge" style="background:' + lv.color + ';color:#fff">当前头衔：' + esc(lv.title) + "</span>" +
        "<span>" + state.xp + " XP</span>" +
        (nextBoss ? '<a class="btn small primary" href="#/boss/' + nextBoss.id + '">⚔️ 下一场 Boss：' + nextBoss.name + "</a>" : '<span class="badge">👑 全部关卡通关！</span>') +
        (due ? '<a class="btn small" style="border-color:#f59e0b;color:#b45309" href="#/mistakes">📖 错题复习 ' + due + " 条到期</a>" : "") +
      "</div>" +
      '<div class="cta-row"><a class="btn primary" href="' + resume + '">▶ ' + (state.last ? "继续上次学习" : "开始关0 之旅") + "</a>" +
      '<a class="btn" href="#/index">🔎 知识点索引</a><a class="btn" href="#/mistakes">📖 错题本</a><a class="btn" href="#/progress">📈 战绩</a></div>' +
      "</div>";
  }

  /* ---------- 主题切换（dark/light，localStorage 持久化，默认 dark） ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("llm-quest:theme", t); } catch (e) { /* 忽略 */ }
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
  }

  /* ---------- 文档阅读：锚点粒度文档（51 篇深度讲解，data/docs/*.md 单一来源） ---------- */
  /* 文档列表：0 层→4 层→H 的平铺顺序（与 data/index.js 排序一致） */
  var DOCS_LIST = (function () {
    var list = [];
    S.modules.forEach(function (m) {
      var primary = m.points[0];
      if (m.id === "H") {
        m.points.forEach(function (p) {
          list.push({ docId: p.num.toLowerCase(), href: "#/docs/" + p.num.toLowerCase(), label: p.num + " " + p.title, stage: p.stage, anchor: "H" });
        });
      } else {
        list.push({ docId: primary.id, href: "#/docs/" + primary.id, label: m.id + " " + m.name, stage: primary.stage, anchor: m.id });
      }
    });
    return list;
  })();
  function docsEntryFor(pointId) {
    var e = byId[pointId];
    if (!e) {
      /* H 层文档 id（h1..h8）不是 point id——按 num 反查 */
      if (/^h\d+$/.test(pointId) && IDX.length) {
        for (var k = 0; k < IDX.length; k++) {
          if (IDX[k].num.toLowerCase() === pointId) {
            var he = byId[IDX[k].id];
            if (he) e = he;
            break;
          }
        }
      }
      if (!e) return null;
    }
    var docId = e.m.id === "H" ? e.p.num.toLowerCase() : e.m.points[0].id;
    for (var i = 0; i < DOCS_LIST.length; i++) if (DOCS_LIST[i].docId === docId) return { entry: DOCS_LIST[i], idx: i };
    return null;
  }

  /* ---------- 文档站侧栏：纯目录树（关卡 → 锚点文档），无进度/门禁元素 ---------- */
  function docsSidebarHtml(currentDocHref) {
    var curStage = null;
    for (var i = 0; i < DOCS_LIST.length; i++) {
      if (DOCS_LIST[i].href === currentDocHref) { curStage = DOCS_LIST[i].stage; break; }
    }
    var html = '<aside class="docs-side"><div class="docs-side-head"><b>📚 内容目录</b><a href="#/index">索引页 ›</a></div>';
    S.levels.forEach(function (lv) {
      var docs = DOCS_LIST.filter(function (d) { return d.stage === lv.id; });
      if (!docs.length) return;
      var isCurStage = lv.id === curStage;
      html += '<details class="docs-chapter"' + (isCurStage ? " open" : "") + '>';
      html += '<summary' + (isCurStage ? ' class="current-stage"' : '') + '><span>' + lv.id + " " + lv.name + '</span><span class="dc-arrow">▶</span></summary>';
      docs.forEach(function (d) {
        var isCur = d.href === currentDocHref;
        html += '<a class="docs-link' + (isCur ? " current" : "") + '" href="' + d.href + '" title="' + esc(d.label) + '">' +
          '<span>' + esc(d.label) + '</span></a>';
        if (isCur) html += '<div class="docs-toc" id="docs-toc"></div>';
      });
      html += '</details>';
    });
    html += '</aside>';
    return html;
  }

  function masteryBadge(mv) {
    return '<span class="badge mastery-badge">' + esc(mv) + "</span>";
  }

  function renderMap() {
    var html = heroHtml();
    html += '<h1 class="page-title">🗺️ 技能树 · 七关学习地图</h1>' +
      '<p class="lead">关卡为地图区域、锚点为分组、知识点为节点；完成点亮，击败关卡 Boss 解锁下一关。带 <span class="opt-badge">*</span> 为选修锚点（不强制通关），<span class="f-badge">🆕</span> 为 2026 前沿。想跳过节奏直接查？去 <a href="#/index">知识点索引</a>。</p>';
    S.levels.forEach(function (lv) {
      var unlocked = stageUnlocked(lv.id);
      var st = stageStats(lv.id);
      var boss = state.boss[lv.id];
      html += '<div class="level-section" style="--lc:' + lv.color + '">' +
        '<div class="ls-head">' +
          '<span class="ls-level" style="background:' + lv.color + '">' + lv.icon + " " + lv.id + " · " + lv.name + "</span>" +
          '<span class="ls-title">头衔目标：' + esc(lv.title) + "</span>" +
          '<span class="badge">' + st.done + "/" + st.pts.length + " 节点点亮</span>" +
          (boss && boss.passed ? '<span class="badge" style="background:#10b981;color:#fff">🏆 Boss 已通关 ' + boss.best + "</span>" : "") +
          (!unlocked ? '<span class="lock-note">🔒 需通过 ' + esc(lv.unlockBy) + " Boss 战解锁</span>" : "") +
        "</div>";
      if (unlocked) {
        html += '<div class="ls-body">';
        S.modules.forEach(function (m) {
          var mp = m.points.filter(function (p) { return p.stage === lv.id; });
          if (!mp.length) return;
          var mdone = mp.filter(function (p) { return state.visited[p.id]; }).length;
          var lc = S.layerColors[m.layer] || "#64748b";
          html += '<details class="tree-module" style="--mod:' + lc + '"' + (mp.some(function (p) { return !state.visited[p.id]; }) ? " open" : "") + ">" +
            "<summary><span>" + m.icon + '</span><span class="tm-name">锚点 ' + m.id + " · " + esc(m.name) + (m.optional ? ' <span class="opt-badge">*选修</span>' : "") + "</span>" +
            masteryBadge(m.mastery) +
            '<span class="mm-count">' + mdone + "/" + mp.length + "</span><span class=\"arrow\">▶</span></summary>" +
            '<div class="anchor-goal">🎯 锚点关键问题：' + esc(m.keyQuestion) + '</div>' +
            '<div class="tree-flow">' +
            mp.map(function (p, i) {
              var isDone = !!state.visited[p.id];
              return (i > 0 ? '<svg class="flow-arrow" width="14" height="26" viewBox="0 0 14 26"><line class="d-flow-line" x1="7" y1="0" x2="7" y2="18" stroke="currentColor" stroke-width="2"/><polygon points="2,16 12,16 7,25" fill="currentColor"/></svg>' : "") +
                '<a class="tree-node' + (isDone ? " done" : "") + '" href="#/knowledge/' + p.id + '">' +
                  '<span class="tn-badge" style="background:' + lc + '">' + p.num + "</span>" +
                  '<span class="tn-body"><span class="tn-title">' + esc(p.title) + (p.frontier ? ' <span class="f-badge">🆕</span>' : "") + (p.optional ? ' <span class="opt-badge">*选修</span>' : "") + "</span>" +
                  '<span class="tn-meta"><span class="stars">' + starHtml(p.stars) + "</span><span> +" + S.xp.visit + " XP</span></span></span>" +
                  '<span class="tn-check">' + (isDone ? "✓" : "") + "</span></a>";
            }).join("") +
            "</div></details>";
        });
        html += '<div class="stage-extras">' +
          '<a class="boss-gate" href="#/boss/' + lv.id + '" style="--lc:' + lv.color + '">' +
          "⚔️ 关卡 Boss：模拟面试 · 本关高频真题 · 通过率 ≥80% 解锁" +
          (S.levels[STAGE_INDEX[lv.id] + 1] ? "「" + S.levels[STAGE_INDEX[lv.id] + 1].name + "」" : "（终极通关）") + " →</a>" +
          '<a class="task-gate" href="#/task/' + lv.id + '">🧰 实战任务卡：' + esc(lv.project) + (state.tasks[lv.id] && state.tasks[lv.id].done ? "（已自评 ✓）" : "") + " →</a>" +
          "</div>";
        html += "</div>";
      } else {
        html += '<div class="ls-locked">🔒 通过 <b>' + esc(lv.unlockBy) + " Boss 战</b> 后解锁本关卡全部节点（也可从 <a href='#/index'>知识点索引</a> 免门禁直达任意考点）</div>";
      }
      html += "</div>";
    });
    /* 模块回顾测验入口（每模块末尾，纯自测无门禁） */
    html += '<div class="review-strip fade-in"><h3>📝 模块回顾测验（自动组卷 · 纯自测 · 无门禁）</h3><div class="review-strip-btns">' +
      LAYERS.map(function (l) {
        var n = IDX.filter(function (e) { return e.layer === l.id; }).length;
        return '<a class="btn small" href="#/review/' + l.id + '">' + esc(l.name) + " · " + n + " 点</a>";
      }).join("") + "</div></div>";
    html += '<div class="about-box fade-in">' +
      "<h3>玩法说明</h3><ul>" +
        "<li>读知识点 +10 XP，答对选择题 +15，场景题要点命中 ≥80% +25，Boss 战答对每题 +10、首次通关 +100，任务卡自评完成 +60。</li>" +
        "<li>XP 对应头衔晋升（AI 新手 → 应用工程师 → 单 Agent 工程师 → RAG 工程师 → AI 工程化工程师 → 多 Agent 工程师 → 准专家）；<b>门禁只管技能树主线</b>——索引页与知识点页随时直达。</li>" +
        "<li>每个考点页顶部标注 <b>rodmap 锚点编号、建议掌握程度与关键问题</b>；带 * 的锚点为进阶选修，不强制通关。</li>" +
        "<li>答错的题自动进错题本，按 1/3/7 天间隔重复提醒，并与索引页「待复习」状态联动；「精通」级考点含「出一道题考别人」费曼终极练习。</li>" +
      "</ul>" +
      "<h3>内容来源</h3><ul><li>考点与真题来自牛客网面经、小林coding、卡码笔记、《AI Agent 面试 Top50》及 OpenAI/Anthropic/DeepSeek 官方文档与 arXiv 论文（2025-2026），每页标注星级与来源；🆕 为 2025-09 后前沿点。仅供学习参考。</li></ul>" +
    "</div>";
    return html;
  }

  /* ---------- 知识点索引（全量平铺 · 无门禁 · 第二通道） ---------- */
  var IDX_STATE_KEY = "llm-quest:idx-filters";
  function idxFilters() {
    try {
      var raw = JSON.parse(sessionStorage.getItem(IDX_STATE_KEY));
      if (raw && typeof raw === "object") {
        return { q: raw.q || "", stage: raw.stage || "", layer: raw.layer || "", mastery: raw.mastery || "", star: raw.star || "", status: raw.status || "", sort: raw.sort === "stars" ? "stars" : "anchor" };
      }
    } catch (e) { /* 忽略 */ }
    return { q: "", stage: "", layer: "", mastery: "", star: "", status: "", sort: "anchor" };
  }
  function idxSaveFilters(f) {
    try { sessionStorage.setItem(IDX_STATE_KEY, JSON.stringify(f)); } catch (e) { /* 忽略 */ }
  }

  function matchStar(entry, star) {
    if (star === "new") return entry.frontier;
    if (star === "s4") return entry.stars >= 4;
    if (star === "s5") return entry.stars >= 5;
    return true;
  }
  function matchStatus(entry, status) {
    if (!status) return true;
    if (status === "due") return isDue(entry.id);
    return pointStatus(entry.id) === status;
  }

  function renderIndex(app) {
    var f = idxFilters();
    var dueIds = IDX.filter(function (e) { return isDue(e.id); }).length;
    app.innerHTML =
      '<h1 class="page-title">🔎 知识点索引 · 全量平铺（无门禁）</h1>' +
      '<p class="lead">与技能树主线并行的第二通道：全部 ' + IDX.length + " 个知识点在此平铺，含未解锁关卡内容（带关卡归属标记），点击直达。技能树管「按节奏学」，本页管「按需查、按薄弱点复习」。</p>" +
      '<div class="idx-toolbar">' +
        '<div class="idx-row">' +
          '<input type="search" id="idx-q" class="idx-search" placeholder="搜索：锚点编号 / 标题 / 关键词（输入即出结果）" value="' + esc(f.q) + '" />' +
          '<button class="btn small" data-act="idx-due">⏰ 今日待复习' + (dueIds ? "（" + dueIds + "）" : "") + "</button>" +
          '<button class="btn small" data-act="idx-random">🎲 随机考我</button>' +
          '<button class="btn small" data-act="idx-hot">🔥 高频考点（⭐4+）</button>' +
          '<button class="btn small" data-act="idx-reset">↺ 重置</button>' +
        "</div>" +
        '<div class="idx-row idx-filters">' +
          '<label>关卡 <select id="idx-stage"><option value="">全部</option>' +
            S.levels.map(function (l) { return '<option value="' + l.id + '"' + (f.stage === l.id ? " selected" : "") + ">" + l.id + " " + l.name + "</option>"; }).join("") +
          "</select></label>" +
          '<label>模块 <select id="idx-layer"><option value="">全部</option>' +
            LAYERS.map(function (l) { return '<option value="' + l.id + '"' + (f.layer === l.id ? " selected" : "") + ">" + l.name + "</option>"; }).join("") +
          "</select></label>" +
          '<label>掌握程度 <select id="idx-mastery"><option value="">全部</option>' +
            ["了解", "理解", "会用", "熟练", "精通"].map(function (mv) { return '<option value="' + mv + '"' + (f.mastery === mv ? " selected" : "") + ">" + mv + "</option>"; }).join("") +
          "</select></label>" +
          '<label>星级/🆕 <select id="idx-star"><option value="">全部</option>' +
            '<option value="s4"' + (f.star === "s4" ? " selected" : "") + ">⭐⭐⭐⭐ 以上</option>" +
            '<option value="s5"' + (f.star === "s5" ? " selected" : "") + ">⭐⭐⭐⭐⭐</option>" +
            '<option value="new"' + (f.star === "new" ? " selected" : "") + ">🆕 2026 前沿</option>" +
          "</select></label>" +
          '<label>学习状态 <select id="idx-status"><option value="">全部</option>' +
            ["未开始", "学习中", "已通过", "待复习"].map(function (stv) { return '<option value="' + stv + '"' + (f.status === stv ? " selected" : "") + ">" + stv + "</option>"; }).join("") +
            '<option value="due"' + (f.status === "due" ? " selected" : "") + ">今日到期</option>" +
          "</select></label>" +
          '<label>排序 <select id="idx-sort">' +
            '<option value="anchor"' + (f.sort === "anchor" ? " selected" : "") + ">按锚点编号</option>" +
            '<option value="stars"' + (f.sort === "stars" ? " selected" : "") + ">按星级降序（高频优先）</option>" +
          "</select></label>" +
        "</div>" +
        '<div class="idx-count" id="idx-count"></div>' +
        '<div class="idx-random-msg" id="idx-random-msg"></div>' +
      "</div>" +
      '<div id="idx-list"></div>';

    function applyAndRender() {
      var f2 = idxFilters();
      var norm = function (s) { return String(s || "").toLowerCase().replace(/\s+/g, ""); };
      var q = norm(f2.q);
      var rows = IDX.filter(function (e) {
        if (f2.stage && e.stage !== f2.stage) return false;
        if (f2.layer && e.layer !== f2.layer) return false;
        if (f2.mastery && String(e.mastery).indexOf(f2.mastery) < 0) return false;
        if (!matchStar(e, f2.star)) return false;
        if (!matchStatus(e, f2.status)) return false;
        if (q) {
          var hay = norm(e.num + " " + e.anchor + " " + e.title + " " + e.anchorName + " " + e.oneLiner + " " + e.stage);
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      });
      if (f2.sort === "stars") {
        rows = rows.slice().sort(function (a, b) { return b.stars - a.stars || (a.id < b.id ? -1 : 1); });
      }
      var doneCount = rows.filter(function (e) { return state.visited[e.id]; }).length;
      $("#idx-count").innerHTML = "显示 <b>" + rows.length + "</b> / " + IDX.length + " 条（其中已读 " + doneCount + "）";
      var stageColor = {};
      S.levels.forEach(function (l) { stageColor[l.id] = l.color; });
      var list = $("#idx-list");
      if (!rows.length) {
        list.innerHTML = '<div class="content-pending">没有匹配的知识点——试试放宽筛选或 <button class="btn small" data-act="idx-reset">重置</button></div>';
        return;
      }
      list.innerHTML = '<div class="idx-table">' + rows.map(function (e) {
        var st = f2.status === "due" ? "due" : pointStatus(e.id);
        var lc = S.layerColors[e.layer] || "#64748b";
        return '<a class="idx-item" href="#/knowledge/' + e.id + '">' +
          '<span class="ix-num" style="background:' + lc + '">' + e.num + "</span>" +
          '<span class="ix-main"><span class="ix-title">' + esc(e.title) + (e.frontier ? ' <span class="f-badge">🆕</span>' : "") + (e.optional ? ' <span class="opt-badge">*选修</span>' : "") + "</span>" +
            '<span class="ix-anchor">锚点 ' + e.anchor + " · " + esc(e.anchorName) + "</span></span>" +
          '<span class="ix-mastery">' + masteryBadge(e.mastery) + "</span>" +
          '<span class="ix-stage" style="color:' + (stageColor[e.stage] || "#64748b") + '">' + e.stage + "</span>" +
          '<span class="ix-stars">' + starHtml(e.stars) + "</span>" +
          '<span class="ix-status">' + statusBadgeHtml(st) + "</span>" +
        "</a>";
      }).join("") + "</div>";
    }

    $("#idx-q").addEventListener("input", function () {
      var f2 = idxFilters(); f2.q = this.value; idxSaveFilters(f2); applyAndRender();
    });
    [["idx-stage", "stage"], ["idx-layer", "layer"], ["idx-mastery", "mastery"], ["idx-star", "star"], ["idx-status", "status"], ["idx-sort", "sort"]].forEach(function (pair) {
      $("#" + pair[0]).addEventListener("change", function () {
        var f2 = idxFilters(); f2[pair[1]] = this.value; idxSaveFilters(f2); applyAndRender();
      });
    });

    applyAndRender();
  }

  /* 索引页快捷动作在全局事件委托中处理：idx-due / idx-random / idx-hot / idx-reset */

  /* ---------- 知识点页（始终无门禁） ---------- */
  var currentPoint = null, currentContent = null;

  function renderKnowledge(app, id) {
    var entry = byId[id];
    if (!entry) {
      app.innerHTML = '<div class="content-pending">未找到该知识点。<br><br><a class="btn" href="#/index">返回知识点索引</a> <a class="btn" href="#/map">返回技能树</a></div>';
      return;
    }
    var m = entry.m, p = entry.p;
    var lv = stageById(p.stage);
    getContent(id).then(function (c) {
      if (!c) {
        app.innerHTML = '<div class="content-pending">📖 内容生成中，稍后再来～<br><br><a class="btn" href="#/index">返回知识点索引</a></div>';
        return;
      }
      var firstVisit = !state.visited[id];
      state.visited[id] = true;
      state.last = id;
      if (firstVisit) addXp(S.xp.visit);
      save(); headerHud();

      var idx = -1;
      ORDER.forEach(function (e, i) { if (e.p.id === id) idx = i; });
      var prev = idx > 0 ? ORDER[idx - 1] : null;
      var next = idx < ORDER.length - 1 ? ORDER[idx + 1] : null;

      var depsHtml = (p.deps || []).length
        ? p.deps.map(function (d) {
            return byId[d] ? '<a class="dep-link" href="#/knowledge/' + d + '">' + byId[d].p.num + " " + esc(byId[d].p.title) + "</a>" : "";
          }).join(" ｜ ") : "无（起点）";

      var links = (c.links || []);
      var back = [], fwd = [];
      links.forEach(function (l) {
        var t = byId[l.to];
        if (!t) return;
        var li = '<a class="link-card" href="#/knowledge/' + l.to + '">🔗 ' + esc(l.text) +
          ' <span class="lc-target">→ ' + t.p.num + " " + esc(t.p.title) + "</span></a>";
        if (ORDER.indexOf(t) < idx) back.push(li); else fwd.push(li);
      });
      while (back.length + fwd.length < 2) {
        if ((p.deps || []).length && back.length === 0) {
          var d0 = byId[p.deps[0]];
          if (d0) back.push('<a class="link-card" href="#/knowledge/' + d0.p.id + '">🔗 本考点建立在它的基础之上 <span class="lc-target">→ ' + d0.p.num + " " + esc(d0.p.title) + "</span></a>");
          else break;
        } else break;
      }

      var exercises = (c.exercises || []).map(function (ex, i) {
        return ex.type === "scenario" ? scenarioCard(ex, i) : choiceCard(ex, i);
      }).join("");

      var teachback = "";
      if (String(m.mastery).indexOf("精通") >= 0 || (p.frontier && String(m.layer) === "H")) {
        var tb = state.teachback[id];
        teachback =
          '<section class="k-section" style="--mod:' + (S.layerColors[m.layer] || "#64748b") + '">' +
            '<div class="sec-title"><span class="sec-ico">🎓</span>费曼终极检验：出一道题考别人</div>' +
            '<p>精通的证明是能出题。请基于本考点出一道面试题（题干 + 参考答案要点），出完自检三项。</p>' +
            '<textarea class="ex-input" data-role="tb-q" placeholder="题目：例如「为什么 X 场景下不用 Y？请说明权衡」……">' + (tb ? esc(tb.q) : "") + "</textarea>" +
            '<textarea class="ex-input" data-role="tb-a" placeholder="参考答案要点：判卷标准是什么？">' + (tb ? esc(tb.a) : "") + "</textarea>" +
            '<div class="tb-checks">' +
              ["考察本考点核心概念", "有明确可判定的参考答案", "能区分『背过』与『掌握』"].map(function (t, i) {
                var on = tb && tb.checks && tb.checks[i];
                return '<label class="tb-check"><input type="checkbox" data-tbc="' + i + '"' + (on ? " checked" : "") + "> " + t + "</label>";
              }).join("") +
            "</div>" +
            '<div class="ex-foot"><button class="btn small primary" data-act="teachback-save">提交我的考题（+' + S.xp.scenario + " XP）</button>" +
            '<span class="ex-result-chip" data-role="tb-result">' + (tb ? "✅ 已提交" : "") + "</span></div>" +
          "</section>";
      }

      var lc = S.layerColors[m.layer] || "#64748b";
      app.innerHTML =
        '<div class="breadcrumb"><a href="#/map">学习地图</a> / <a href="#/index">知识点索引</a> / ' + lv.id + " " + lv.name + " / 锚点 " + m.id + " / " + p.num + "</div>" +
        '<div class="level-strip" style="--lc:' + lv.color + '">' + lv.icon + " <b>" + lv.id + " " + lv.name + "</b> · 目标头衔 " + esc(lv.title) +
          " · <span class='dim'>完成本考点 +" + S.xp.visit + " XP</span>" +
          ' · <a style="color:inherit" href="#/task/' + lv.id + '">🧰 本关任务卡</a></div>' +
        '<header class="k-head" style="--mod:' + lc + '">' +
          "<h1>" + p.num + " · " + esc(p.title) + (p.frontier ? ' <span class="f-badge">🆕</span>' : "") + "</h1>" +
          '<div class="k-meta"><span class="stars">' + starHtml(p.stars) + "</span>" +
            '<span class="badge">锚点 ' + m.id + "（" + esc(m.name) + "）</span>" +
            '<span class="badge mastery-badge">建议掌握：' + esc(m.mastery) + "</span>" +
            (p.optional || m.optional ? '<span class="badge opt-badge">*进阶选修</span>' : "") +
            (p.frontier ? '<span class="badge f-badge">🆕 2026 前沿</span>' : "") +
            "<span>来源：" + esc(p.source) + "</span>" +
            "<span>前置依赖：" + depsHtml + "</span></div>" +
          '<div class="key-question">🎯 本页学习目标（锚点关键问题）：<b>' + esc(m.keyQuestion) + "</b></div>" +
          (function () {
            var de = docsEntryFor(id);
            return de ? '<div class="k-doc-link">📖 深度讲解：<a href="' + de.entry.href + '">阅读本锚点完整文档（10 节 · ' + esc(de.entry.label) + "）→</a></div>" : "";
          })() +
        "</header>" +
        '<section class="k-section" style="--mod:' + lc + '"><div class="sec-title"><span class="sec-ico">🍼</span>小白定义</div><p>' + esc(c.definition) + "</p></section>" +
        '<section class="k-section" style="--mod:' + lc + '"><div class="sec-title"><span class="sec-ico">🎯</span>生活类比</div>' +
          (c.analogies || []).map(function (a, i) {
            return '<div class="analog-card"><span class="an-icon">' + (a.icon || "💡") + "</span><div><div class=\"an-name\">类比 " + (i + 1) + "：" + esc(a.name) + "</div><p>" + esc(a.text) + "</p></div></div>";
          }).join("") +
        "</section>" +
        '<section class="k-section" style="--mod:' + lc + '"><div class="sec-title"><span class="sec-ico">🕹️</span>交互演示（动手把玩）</div>' +
          '<div class="demo-box"><div class="demo-title">' + esc(c.demo.title) + "</div>" +
          '<div class="demo-desc">' + esc(c.demo.description) + "</div>" + sanitizeDemo(c.demo.html) + "</div></section>" +
        ((c.keyPoints || []).length ? '<section class="k-section" style="--mod:' + lc + '"><div class="sec-title"><span class="sec-ico">📌</span>核心要点</div><ul class="kp-list">' +
          c.keyPoints.map(function (k2) {
            return '<li><span class="kp-ico">' + (k2.icon || "📌") + '</span><span><b>' + esc(k2.name) + "</b>：" + esc(k2.text) + "</span></li>";
          }).join("") + "</ul></section>" : "") +
        '<section class="k-section" style="--mod:' + lc + '"><div class="sec-title"><span class="sec-ico">✍️</span>例题实战（答对得 XP）</div>' + exercises + "</section>" +
        '<section class="k-section" style="--mod:' + lc + '"><div class="sec-title"><span class="sec-ico">🗣️</span>费曼复述</div>' +
          "<p><b>任务：</b>" + esc(c.feynman.prompt) + "</p>" +
          '<textarea class="ex-input" data-role="feynman" placeholder="用你自己的话写下来……">' + (state.feynman[id] ? esc(state.feynman[id].text || "") : "") + "</textarea>" +
          '<div class="feynman-hint">💡 提示：' + esc(c.feynman.hint) + "</div>" +
          '<div class="ex-foot"><button class="btn small" data-act="feynman-reveal">对照参考表达</button></div>' +
          '<div class="reveal-box hidden" data-role="feynman-model"><div class="rb-title">📖 参考表达</div>' + esc(c.feynman.modelAnswer) + "</div>" +
        "</section>" +
        '<section class="k-section" style="--mod:' + lc + '"><div class="sec-title"><span class="sec-ico">🔗</span>知识联系（前后呼应）</div><div class="link-cards">' +
          back.concat(fwd).join("") + "</div></section>" +
        '<section class="k-section" style="--mod:' + lc + '"><div class="sec-title"><span class="sec-ico">💼</span>面试视角</div>' +
          (c.interview || []).map(function (q) {
            return '<div class="interview-item"><div class="iq">❓ ' + esc(q.q) + '<span class="stars">' + starHtml(q.stars || p.stars) + "</span></div>" +
              '<div class="isrc">来源：' + esc(q.source || p.source) + "</div>" +
              (q.tip ? '<div class="itip">💡 答题要点：' + esc(q.tip) + "</div>" : "") + "</div>";
          }).join("") +
        "</section>" +
        '<section class="k-section" style="--mod:' + lc + '"><div class="sec-title"><span class="sec-ico">🧠</span>提问式小结</div>' +
          '<div class="summary-box">' + summaryHtml(c.summary) + "</div></section>" +
        teachback +
        '<nav class="knav">' +
          (prev ? '<a href="#/knowledge/' + prev.p.id + '"><div class="kn-lbl">← 上一考点</div><div class="kn-t">' + prev.p.num + " " + esc(prev.p.title) + "</div></a>"
                : '<a href="#/index"><div class="kn-lbl">←</div><div class="kn-t">返回知识点索引</div></a>') +
          (next ? '<a class="next" href="#/knowledge/' + next.p.id + '"><div class="kn-lbl">下一考点 →</div><div class="kn-t">' + next.p.num + " " + esc(next.p.title) + "</div></a>"
                : '<a class="next" href="#/boss/' + p.stage + '"><div class="kn-lbl">🎉 本关知识点已尽</div><div class="kn-t">⚔️ 挑战 ' + p.stage + " Boss 战 →</div></a>") +
        "</nav>";

      restoreExercises(p, c);
    });
  }

  function summaryHtml(s) {
    return String(s || "").split(/\n+/).filter(Boolean).map(function (line) {
      var m = line.match(/^(Q：|问：)([\s\S]*?)(?:（答：([\s\S]*)）)?$/);
      if (m) return '<div class="sq"><b>Q：</b>' + esc(m[2]) + (m[3] ? '<details><summary>展开参考回答</summary>' + esc(m[3]) + "</details>" : "") + "</div>";
      return '<div class="sq">' + esc(line) + "</div>";
    }).join("");
  }

  /* ---------- 例题卡片 ---------- */
  function choiceCard(ex, i) {
    var letters = ["A", "B", "C", "D", "E"];
    var opts = (ex.options || []).map(function (o, j) {
      return '<button class="ex-opt" data-act="pick" data-opt="' + j + '"><span class="opt-letter">' + (letters[j] || j) + "</span>" + esc(o) + "</button>";
    }).join("");
    return '<div class="ex-card" data-role="ex" data-ex="' + i + '" data-type="choice">' +
      '<span class="ex-tag">选择题 · 第 ' + (i + 1) + " 题 · 答对 +" + S.xp.choice + " XP</span>" +
      '<div class="ex-q">' + esc(ex.q) + "</div>" +
      '<div class="ex-opts">' + opts + "</div>" +
      '<div class="ex-foot"><button class="btn small primary" data-act="grade-choice">提交判题</button>' +
      '<span class="ex-result-chip" data-role="result"></span></div>' +
      '<div class="ex-explain hidden" data-role="explain"></div></div>';
  }
  function scenarioCard(ex, i) {
    return '<div class="ex-card" data-role="ex" data-ex="' + i + '" data-type="scenario">' +
      '<span class="ex-tag">场景分析题 · 第 ' + (i + 1) + " 题 · 命中 ≥80% +" + S.xp.scenario + " XP</span>" +
      '<div class="ex-q">' + esc(ex.q) + "</div>" +
      '<textarea class="ex-input" data-role="answer" placeholder="按条理写下你的分析……"></textarea>' +
      '<div class="ex-foot"><button class="btn small primary" data-act="grade-scenario">提交判题</button>' +
      '<span class="ex-result-chip" data-role="result"></span></div>' +
      '<ul class="check-list hidden" data-role="checks"></ul>' +
      '<div class="score-bar-row hidden" data-role="scorebar"><span data-role="scoretext"></span><div class="bar"><div class="fill" data-role="scorefill"></div></div></div>' +
      '<div class="reveal-box hidden" data-role="reference"><div class="rb-title">📖 参考答案</div>' + esc(ex.reference) + "</div></div>";
  }

  function addWrong(key, item) {
    var prev = state.wrongbook[key];
    var times = prev ? prev.times + 1 : 1;
    var gap = [1, 3, 7][Math.min(times - 1, 2)];
    state.wrongbook[key] = {
      ref: item.ref, type: item.type, q: item.q, times: times,
      date: today(), nextDue: addDays(today(), gap)
    };
  }
  function clearWrong(key) { delete state.wrongbook[key]; }

  function restoreExercises(p, c) {
    $$('.ex-card[data-role="ex"]').forEach(function (card) {
      var i = +card.getAttribute("data-ex");
      var ex = (c.exercises || [])[i];
      if (!ex) return;
      var key = p.id + "#ex" + i;
      if (ex.type === "scenario") {
        if (state.scenario[key]) paintScenario(card, ex, state.scenario[key].text || "", p);
      } else if (state.choice[key]) {
        paintChoice(card, ex, state.choice[key].picked, p);
      }
    });
  }

  function paintChoice(card, ex, picked, p) {
    var g = J.gradeChoice(ex, picked);
    $$(".ex-opt", card).forEach(function (btn, j) {
      btn.disabled = true;
      btn.classList.remove("chosen", "correct", "wrong");
      if (j === picked) btn.classList.add(g.correct ? "correct" : "wrong", "chosen");
      if (j === ex.answer) btn.classList.add("correct");
    });
    var chip = $('[data-role="result"]', card);
    chip.textContent = g.correct ? "✅ 回答正确" : "❌ 回答错误，正确答案已标绿";
    chip.className = "ex-result-chip " + (g.correct ? "ok" : "bad");
    var explain = $('[data-role="explain"]', card);
    explain.classList.remove("hidden");
    explain.className = "ex-explain" + (g.correct ? "" : " wrong-bg");
    explain.innerHTML = "<b>解析：</b>" + esc(ex.explain);
    var btn = $('[data-act="grade-choice"]', card);
    if (btn) btn.disabled = true;
    return g.correct;
  }
  function paintScenario(card, ex, text, p) {
    var g = J.gradeScenario(ex, text);
    var ta = $('[data-role="answer"]', card);
    if (ta) ta.value = text;
    var checks = (g.details || []).map(function (d) {
      return '<li class="' + (d.hit ? "hit" : "miss") + '"><span class="cl-ico">' + (d.hit ? "✓" : "✗") + "</span><span>" + esc(d.point) + "</span></li>";
    }).join("");
    var cl = $('[data-role="checks"]', card);
    cl.innerHTML = checks; cl.classList.remove("hidden");
    var ratio = g.total ? g.score / g.total : 0;
    var bar = $('[data-role="scorebar"]', card);
    bar.classList.remove("hidden");
    var fill = $('[data-role="scorefill"]', bar);
    fill.style.width = Math.round(ratio * 100) + "%";
    fill.className = "fill " + (ratio >= 0.8 ? "ok" : ratio >= 0.5 ? "mid" : "low");
    $('[data-role="scoretext"]', bar).textContent = "要点命中 " + g.score + "/" + g.total;
    var chip = $('[data-role="result"]', card);
    chip.textContent = ratio >= 0.8 ? "✅ 优秀！" : ratio >= 0.5 ? "🟡 部分命中" : "🔴 要点覆盖不足";
    chip.className = "ex-result-chip " + (ratio >= 0.8 ? "ok" : "bad");
    $('[data-role="reference"]', card).classList.remove("hidden");
    return { score: g.score, total: g.total, ratio: ratio };
  }

  /* ---------- Boss 战 Hub ---------- */
  function renderBossHub(app) {
    var rows = S.levels.map(function (lv) {
      var unlocked = stageUnlocked(lv.id);
      var rec = state.boss[lv.id];
      var st = stageStats(lv.id);
      var status = rec && rec.passed
        ? '<span class="badge" style="background:#10b981;color:#fff">🏆 已通过 ' + rec.best + "/" + rec.total + "</span>"
        : unlocked
          ? '<span class="badge" style="background:' + lv.color + ';color:#fff">可挑战</span>'
          : '<span class="badge">🔒 需通过 ' + esc(lv.unlockBy) + " Boss</span>";
      var action = !unlocked
        ? '<span class="dim small-note">门禁提示：先在主线通过上一关 Boss（考点复习不受限）</span>'
        : '<a class="btn small primary" href="#/boss/' + lv.id + '">' + (rec && rec.passed ? "再战一次" : "⚔️ 开始战斗") + "</a>";
      return '<div class="hub-card" style="--lc:' + lv.color + '">' +
        '<div class="hc-head"><span class="hc-icon">' + lv.icon + '</span><div><b>' + lv.id + " " + lv.name + '</b><div class="dim small-note">头衔目标：' + esc(lv.title) + " · 覆盖 " + st.pts.length + ' 个考点</div></div><span class="hc-right">' + status + "</span></div>" +
        '<div class="hc-meta">📋 10 道本关高频真题 · 每题 60 秒 · 通过线 8/10' + (rec && !rec.passed ? " · 历史最佳 " + rec.best + "/" + rec.total : "") + "</div>" +
        '<div class="hc-actions">' + action + '<a class="btn small" href="#/task/' + lv.id + '">🧰 任务卡</a></div>' +
        "</div>";
    }).join("");
    app.innerHTML =
      '<h1 class="page-title">⚔️ Boss 战 · 七关模拟面试</h1>' +
      '<p class="lead">每关一场计时模拟面试（10 题，≥80% 通过解锁下一关）。<b>Boss 门禁只约束技能树主线推进</b>——考点复习请走<a href="#/index">知识点索引</a>，无门禁。</p>' +
      '<div class="hub-grid">' + rows + "</div>";
  }

  /* ---------- 实战任务卡 Hub ---------- */
  function renderTasksHub(app) {
    var rows = S.levels.map(function (lv) {
      var rec = state.tasks[lv.id];
      var done = !!(rec && rec.done);
      return '<div class="hub-card" style="--lc:' + lv.color + '">' +
        '<div class="hc-head"><span class="hc-icon">🧰</span><div><b>' + lv.id + " " + lv.name + '</b><div class="dim small-note">🎯 里程碑：' + esc(lv.project) + '</div></div><span class="hc-right">' +
          (done ? '<span class="badge" style="background:#10b981;color:#fff">✅ 已自评（+' + S.xp.task + " XP）</span>" : '<span class="badge">待完成</span>') + "</span></div>" +
        '<div class="hc-meta">📋 步骤指引 + 自查清单 + 参考架构图 · 完成自评 +' + S.xp.task + " XP</div>" +
        '<div class="hc-actions"><a class="btn small primary" href="#/task/' + lv.id + '">打开任务卡</a></div>' +
        "</div>";
    }).join("");
    app.innerHTML =
      '<h1 class="page-title">🧰 实战任务卡 · 七关里程碑</h1>' +
      '<p class="lead">每关的里程碑项目（rodmap 5.x）：步骤指引 + 自查清单 + 参考架构图，完成自评得 XP。<b>任务卡无门禁</b>，任何关卡都可以先看先做。</p>' +
      '<div class="hub-grid">' + rows + "</div>";
  }

  /* ---------- 单关 Boss 战 ---------- */
  function renderBoss(app, sid) {
    var lv = stageById(sid);
    if (!lv) { app.innerHTML = '<div class="content-pending">未找到该关卡。<br><br><a class="btn" href="#/boss">返回 Boss 战</a></div>'; return; }
    if (!stageUnlocked(sid)) {
      var prevLv = S.levels[STAGE_INDEX[sid] - 1];
      app.innerHTML = '<div class="content-pending lock-page" style="--lc:' + lv.color + '"><h2>🔒 Boss 未解锁</h2>' +
        "<p>需要先通过 <b>" + (prevLv ? prevLv.id : "") + " Boss 战</b>（技能树主线的推进门禁）；考点复习请走<a href='#/index'>知识点索引</a>，无门禁。</p>" +
        '<a class="btn primary" href="#/boss/' + (prevLv ? prevLv.id : "S0") + '">⚔️ 去打上一关 Boss</a> <a class="btn" href="#/boss">返回 Boss 战列表</a></div>';
      return;
    }
    getBoss(sid).then(function (boss) {
      if (!boss || !(boss.questions || []).length) {
        app.innerHTML = '<div class="content-pending">⚔️ ' + sid + ' Boss 战题库生成中……<br><br><a class="btn" href="#/boss">返回 Boss 战</a></div>';
        return;
      }
      var qs = boss.questions;
      var need = Math.ceil(qs.length * S.quizPassRatio);
      var rec = state.boss[sid];
      app.innerHTML =
        '<div class="boss-head" style="--lc:' + lv.color + '">' +
          '<div class="boss-title">⚔️ Boss 战 · ' + lv.id + " " + lv.name + " 模拟面试</div>" +
          '<div class="boss-sub">' + qs.length + " 道高频真题 · 每题 60 秒 · 答对 " + need + "/" + qs.length +
          " 通过解锁" + (S.levels[STAGE_INDEX[sid] + 1] ? "「" + S.levels[STAGE_INDEX[sid] + 1].name + "」" : "终极成就") +
          (rec && rec.passed ? " · <b>历史最佳 " + rec.best + "/" + qs.length + "（已通过）</b>" : "") + "</div>" +
          '<div class="boss-timer"><span id="boss-clock">60</span>s</div>' +
        "</div>" +
        '<div id="boss-arena"></div>' +
        '<div id="boss-footer" class="ex-foot"><button class="btn primary" id="boss-start">开始战斗</button>' +
        '<a class="btn" href="#/boss">返回 Boss 战列表</a></div>' +
        '<div data-role="boss-result"></div>';

      var picks = {};
      var qIdx = 0;
      var timerId = null;
      var timeLeft = 60;
      var arena = $("#boss-arena");

      function showQ() {
        if (qIdx >= qs.length) { finish(); return; }
        timeLeft = 60;
        var q = qs[qIdx];
        var letters = ["A", "B", "C", "D", "E"];
        arena.innerHTML = '<div class="ex-card boss-q" data-q="' + qIdx + '">' +
          '<span class="ex-tag">第 ' + (qIdx + 1) + "/" + qs.length + " 题" + (q.ref && byId[q.ref] ? " · 关联 " + byId[q.ref].p.num : "") + '</span>' +
          '<div class="ex-q">' + esc(q.q) + "</div>" +
          '<div class="ex-opts">' + (q.options || []).map(function (o, j) {
            return '<button class="ex-opt" data-act="bpick" data-opt="' + j + '"><span class="opt-letter">' + (letters[j] || j) + "</span>" + esc(o) + "</button>";
          }).join("") + "</div></div>";
        $("#boss-clock").textContent = timeLeft;
        clearInterval(timerId);
        timerId = setInterval(function () {
          timeLeft--;
          var c = $("#boss-clock");
          if (c) c.textContent = timeLeft;
          if (timeLeft <= 10) c && c.classList.add("urgent");
          if (timeLeft <= 0) { clearInterval(timerId); lockAndNext(-1); }
        }, 1000);
      }
      function lockAndNext(picked) {
        clearInterval(timerId);
        var q = qs[qIdx];
        var card = $(".boss-q", arena);
        $$(".ex-opt", card).forEach(function (btn, j) {
          btn.disabled = true;
          if (j === picked) btn.classList.add(j === q.answer ? "correct" : "wrong", "chosen");
          if (j === q.answer) btn.classList.add("correct");
        });
        picks[qIdx] = picked;
        var ok = picked === q.answer;
        var fb = document.createElement("div");
        fb.className = "boss-feedback " + (ok ? "ok" : "bad");
        fb.innerHTML = (ok ? "✅ 答对 +" + S.xp.bossQuestion + " XP　" : "❌ 正确答案：" + (["A", "B", "C", "D", "E"][q.answer] || q.answer) + "　") +
          esc(q.explain || "") +
          '<button class="btn small primary" style="margin-left:10px" id="boss-next">' + (qIdx + 1 >= qs.length ? "查看战绩" : "下一题 →") + "</button>";
        card.appendChild(fb);
        $("#boss-next").addEventListener("click", function () { qIdx++; showQ(); });
      }
      function finish() {
        clearInterval(timerId);
        var score = 0;
        qs.forEach(function (q, i) { if (picks[i] === q.answer) score++; });
        var passed = score >= need;
        var firstPass = passed && !(state.boss[sid] && state.boss[sid].passed);
        var prevBest = state.boss[sid] ? state.boss[sid].best || 0 : 0;
        if (score > prevBest) {
          var earned = score * S.xp.bossQuestion;
          state.boss[sid] = { passed: passed || (state.boss[sid] && state.boss[sid].passed), best: score, total: qs.length, date: today() };
          if (firstPass) earned += S.xp.bossPass;
          addXp(earned);
        }
        save(); headerHud();
        var lvNext = S.levels[STAGE_INDEX[sid] + 1];
        $('[data-role="boss-result"]').innerHTML =
          '<div class="quiz-result-card"><div class="qr-score ' + (passed ? "pass" : "fail") + '">' + score + " / " + qs.length + "</div>" +
          '<div class="qr-msg">' + (passed
            ? "🏆 Boss 战通过！" + (firstPass ? " +" + (score * S.xp.bossQuestion + S.xp.bossPass) + " XP" : "") +
              (lvNext ? " 「" + esc(lvNext.name) + "」已解锁！别忘了完成本关 <a href='#/task/" + sid + "'>🧰 实战任务卡</a>。" : "你已完成全部关卡！")
            : "💪 差一点点：需答对 " + need + " 题（当前 " + score + "）。错题已收进错题本，复习后再来挑战！") + "</div>" +
          '<div class="ex-foot" style="justify-content:center">' +
          (passed ? '<a class="btn primary" href="#/map">返回技能树' + (lvNext ? "解锁下一关" : "") + " →</a>" : '<button class="btn primary" id="boss-retry">再战一次</button>') +
          '<a class="btn" href="#/mistakes">📖 查看错题本</a></div></div>';
        qs.forEach(function (q, i) {
          if (picks[i] !== q.answer) {
            addWrong(sid + "#boss" + i, { ref: q.ref || "", type: "boss", q: q.q });
          } else if (state.wrongbook[sid + "#boss" + i]) {
            clearWrong(sid + "#boss" + i);
          }
        });
        save();
        var retry = $("#boss-retry");
        if (retry) retry.addEventListener("click", function () { render(); });
      }
      $("#boss-start").addEventListener("click", function () {
        this.disabled = true;
        showQ();
      });
      arena.addEventListener("click", function (e) {
        var el = e.target.closest('[data-act="bpick"]');
        if (!el || el.disabled) return;
        lockAndNext(+el.getAttribute("data-opt"));
      });
    });
  }

  /* ---------- 实战任务卡（无门禁） ---------- */
  function renderTask(app, sid) {
    var lv = stageById(sid);
    if (!lv) { app.innerHTML = '<div class="content-pending">未找到该关卡。<br><br><a class="btn" href="#/tasks">返回任务卡列表</a></div>'; return; }
    getTask(sid).then(function (t) {
      if (!t) {
        app.innerHTML = '<div class="content-pending">🧰 任务卡生成中……<br><br><a class="btn" href="#/tasks">返回任务卡列表</a></div>';
        return;
      }
      var rec = state.tasks[sid] || {};
      var steps = (t.steps || []).map(function (s2, i) {
        return '<div class="task-step"><span class="ts-num">' + (i + 1) + "</span><div><b>" + esc(s2.title) + "</b><p>" + esc(s2.detail) + "</p></div></div>";
      }).join("");
      var checks = (t.checklist || []).map(function (c2, i) {
        var on = rec.checks && rec.checks[i];
        return '<label class="task-check"><input type="checkbox" data-task-check="' + i + '"' + (on ? " checked" : "") + (rec.done ? " disabled" : "") + "> " + esc(c2) + "</label>";
      }).join("");
      app.innerHTML =
        '<div class="boss-head" style="--lc:' + lv.color + '">' +
          '<div class="boss-title">🧰 实战任务卡 · ' + lv.id + " " + lv.name + "</div>" +
          '<div class="boss-sub">里程碑项目：<b>' + esc(t.project || lv.project) + "</b> · 步骤指引 + 自查清单 + 参考架构 · 完成自评 +" + S.xp.task + " XP" +
          (rec.done ? " · <b>✅ 已完成自评（" + rec.date + "）</b>" : "") + "</div>" +
        "</div>" +
        '<section class="k-section"><div class="sec-title"><span class="sec-ico">📦</span>项目简介</div><p>' + esc(t.intro) + "</p></section>" +
        '<section class="k-section"><div class="sec-title"><span class="sec-ico">🪜</span>步骤指引</div>' + steps + "</section>" +
        (t.arch ? '<section class="k-section"><div class="sec-title"><span class="sec-ico">🏗️</span>参考架构图</div><div class="task-arch">' + sanitizeDemo(t.arch) + "</div></section>" : "") +
        '<section class="k-section"><div class="sec-title"><span class="sec-ico">✅</span>自查清单（全勾后提交自评）</div><div class="task-checks">' + checks + "</div>" +
          '<div class="ex-foot"><button class="btn primary" data-act="task-submit" data-stage="' + sid + '"' + (rec.done ? " disabled" : "") + ">提交自评（+" + S.xp.task + " XP）</button>" +
          '<span class="ex-result-chip" data-role="task-result">' + (rec.done ? "✅ 已提交" : "") + "</span></div></section>" +
        (t.tips ? '<section class="k-section"><div class="sec-title"><span class="sec-ico">💡</span>避坑提示</div><ul class="kp-list">' +
          t.tips.map(function (x) { return "<li><span class='kp-ico'>💡</span><span>" + esc(x) + "</span></li>"; }).join("") + "</ul></section>" : "") +
        '<nav class="knav"><a href="#/tasks"><div class="kn-lbl">←</div><div class="kn-t">返回任务卡列表</div></a>' +
        '<a class="next" href="#/boss/' + sid + '"><div class="kn-lbl">挑战关底 →</div><div class="kn-t">⚔️ ' + sid + " Boss 战</div></a></nav>";
    });
  }

  /* ---------- 文档阅读页（纯知识速查：左侧目录树 + 右侧 Markdown 深度讲解，无趣味/引导元素，不写进度） ---------- */
  /* v4.5 关联知识点条：文档 ↔ 知识点体系互跳（知识点内容全保留，双向结合）；右端挂阅读模式开关 */
  function docsPointsBar(entry) {
    var m = null;
    S.modules.forEach(function (x) { if (x.id === entry.anchor) m = x; });
    var links = "";
    if (m) {
      var pts = m.id === "H" ? m.points.filter(function (p) { return p.num.toLowerCase() === entry.docId; }) : m.points;
      links = pts.map(function (p) { return '<a class="dk-link" href="#/knowledge/' + p.id + '">' + p.num + " " + esc(p.title) + "</a>"; }).join("");
    }
    return '<div class="docs-kbar"><span class="dk-label">关联知识点：</span>' + links +
      '<button type="button" class="dk-readmode" data-act="readmode-toggle" title="隐藏侧栏 · 居中限宽 · 沉浸阅读（ESC 退出）">⛶ 阅读模式</button></div>';
  }

  function docsNavHtml(entry) {
    var nav = '<nav class="knav">';
    if (entry.idx > 0) {
      var p = DOCS_LIST[entry.idx - 1];
      nav += '<a href="' + p.href + '"><div class="kn-lbl">← 上一篇</div><div class="kn-t">' + esc(p.label) + "</div></a>";
    } else {
      nav += '<a href="#/docs"><div class="kn-lbl">←</div><div class="kn-t">回到目录顶部</div></a>';
    }
    if (entry.idx < DOCS_LIST.length - 1) {
      var n = DOCS_LIST[entry.idx + 1];
      nav += '<a class="next" href="' + n.href + '"><div class="kn-lbl">下一篇 →</div><div class="kn-t">' + esc(n.label) + "</div></a>";
    } else {
      nav += '<a class="next" href="#/docs"><div class="kn-lbl">→</div><div class="kn-t">回到目录顶部</div></a>';
    }
    return nav + "</nav>";
  }

  function renderDocs(app, id) {
    var entry = id ? docsEntryFor(id) : null;
    if (!id) {
      location.hash = DOCS_LIST.length ? DOCS_LIST[0].href : "#/index";
      return;
    }
    if (!entry) {
      app.innerHTML = '<div class="content-pending">未找到该文档。<br><br><a class="btn" href="#/index">返回知识点索引</a></div>';
      return;
    }
    app.classList.add("wrap-docs");
    app.innerHTML = '<div class="docs-wrap">' + docsSidebarHtml(entry.entry.href) +
      '<article class="docs-main" id="docs-article"><div class="content-pending">正在加载……</div></article>' +
      '<aside class="docs-rail docs-toc" id="docs-rail" aria-label="本篇目录"></aside></div>';
    var article = $("#docs-article");
    fetch("./data/docs/" + entry.entry.docId + ".md")
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
      .then(function (mdText) {
        if (location.hash.indexOf("#/docs") !== 0) return;
        article.innerHTML = docsPointsBar(entry.entry) + '<div class="md-body">' + MD.render(mdText) + "</div>" + docsNavHtml(entry);
        window.scrollTo(0, 0);
        bindDocsRead(article);
      })
      .catch(function () {
        article.innerHTML =
          '<div class="content-pending">📝 本篇深度文档编写中……<br><br>' +
          '可先阅读主线版本：<a class="btn" href="#/knowledge/' + entry.entry.docId + '">打开「' + esc(entry.entry.label) + '」知识点页</a></div>';
      });
  }

  /* ---------- v4.5 阅读增强（渐进增强：本函数整体 try/catch，任一环节失败不影响正文渲染） ---------- */
  var docsScrollHandler = null;
  var docsKeyHandler = null;
  function bindDocsRead(article) {
    try {
      /* 1. 侧栏本篇目录（TOC）：由已渲染 h2 生成，点击平滑滚动 + 当前节高亮（2K+ 同步右侧目录轨） */
      var toc = $("#docs-toc");
      var hs = article.querySelectorAll("h2.md-h");
      if (toc && hs.length) {
        var items = "";
        for (var i = 0; i < hs.length; i++) {
          var t = hs[i].textContent.replace(/^\d+\.\s*/, "");
          items += '<a href="#' + hs[i].id + '" data-target="' + hs[i].id + '"><span class="toc-num">' + (i + 1) + "</span><span>" + esc(t) + "</span></a>";
        }
        toc.innerHTML = '<div class="toc-cap">本篇目录</div>' + items;
        var rail = $("#docs-rail");
        if (rail) rail.innerHTML = toc.innerHTML;
        var tocGo = function (e) {
          var a = e.target.closest ? e.target.closest("a[data-target]") : null;
          if (!a) return;
          e.preventDefault();
          var el = document.getElementById(a.getAttribute("data-target"));
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        toc.addEventListener("click", tocGo);
        if (rail) rail.addEventListener("click", tocGo);
      }
      /* 2. 阅读进度条 + 返回顶部 */
      var bar = document.createElement("div"); bar.id = "docs-progress";
      var topBtn = document.createElement("button"); topBtn.id = "docs-top-btn"; topBtn.type = "button"; topBtn.textContent = "↑ 顶部";
      article.appendChild(bar); article.appendChild(topBtn);
      topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

      function onScroll() {
        if (!bar.isConnected) { window.removeEventListener("scroll", docsScrollHandler); return; }
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? Math.min(100, Math.round(window.scrollY / max * 100)) : 0) + "%";
        if (window.scrollY > 600) topBtn.classList.add("show"); else topBtn.classList.remove("show");
        if (toc && hs.length && hs[0].isConnected) {
          var cur = 0, y = window.scrollY + 96;
          for (var k = 0; k < hs.length; k++) {
            if (hs[k].getBoundingClientRect().top + window.scrollY <= y) cur = k;
          }
          var curId = hs[cur].id;
          var links = document.querySelectorAll("#docs-toc a[data-target], #docs-rail a[data-target]");
          for (var k = 0; k < links.length; k++) links[k].classList.toggle("current", links[k].getAttribute("data-target") === curId);
        }
      }
      if (docsScrollHandler) window.removeEventListener("scroll", docsScrollHandler);
      docsScrollHandler = onScroll;
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      /* 3. 代码块一键复制（事件委托，clipboard API + execCommand 兜底） */
      article.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest(".md-copy") : null;
        if (!btn) return;
        var pre = btn.parentElement ? btn.parentElement.querySelector("pre") : null;
        if (!pre) return;
        function done(ok) { btn.textContent = ok ? "已复制 ✓" : "复制失败"; setTimeout(function () { btn.textContent = "复制"; }, 1600); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(pre.innerText).then(function () { done(true); }, function () { done(false); });
        } else {
          var ta = document.createElement("textarea");
          ta.value = pre.innerText; ta.style.position = "fixed"; ta.style.opacity = "0";
          document.body.appendChild(ta); ta.select();
          var ok = false; try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
          document.body.removeChild(ta); done(ok);
        }
      });
      /* 4. 沉浸阅读模式（v4.5.1）：隐藏侧栏 / 居中限宽 / 悬浮目录抽屉 / ESC 退出 / 会话记忆，桌面与移动端响应式 */
      var rmBtn = article.querySelector('[data-act="readmode-toggle"]');
      function setReading(on) {
        document.body.classList.toggle("docs-reading", !!on);
        try { sessionStorage.setItem("llm-quest:readmode", on ? "1" : "0"); } catch (e2) { }
        if (rmBtn) rmBtn.textContent = on ? "⛶ 退出阅读" : "⛶ 阅读模式";
      }
      if (rmBtn) rmBtn.addEventListener("click", function () {
        setReading(!document.body.classList.contains("docs-reading"));
      });

      var drawer = document.createElement("div");
      drawer.id = "docs-drawer";
      drawer.innerHTML = '<div class="dd-panel"><div class="dd-head"><b>本篇目录</b>' +
        '<button type="button" class="dd-close" aria-label="关闭目录">✕</button></div>' +
        '<div class="dd-body docs-toc"></div></div>';
      article.appendChild(drawer);
      drawer.querySelector(".dd-close").addEventListener("click", function () { drawer.classList.remove("open"); });
      drawer.addEventListener("click", function (e2) {
        if (e2.target === drawer) drawer.classList.remove("open");
        var a = e2.target.closest ? e2.target.closest("a[data-target]") : null;
        if (!a) return;
        e2.preventDefault();
        drawer.classList.remove("open");
        var el = document.getElementById(a.getAttribute("data-target"));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      var fab = document.createElement("button");
      fab.id = "docs-drawer-fab"; fab.type = "button"; fab.textContent = "☰ 目录";
      article.appendChild(fab);
      fab.addEventListener("click", function () {
        var body = drawer.querySelector(".dd-body");
        if (body && !body.children.length && toc && hs.length) body.innerHTML = toc.innerHTML;
        drawer.classList.add("open");
      });

      if (docsKeyHandler) document.removeEventListener("keydown", docsKeyHandler);
      docsKeyHandler = function (e2) {
        if (e2.key !== "Escape" || !fab.isConnected) return;
        if (drawer.classList.contains("open")) { drawer.classList.remove("open"); return; }
        if (document.body.classList.contains("docs-reading")) setReading(false);
      };
      document.addEventListener("keydown", docsKeyHandler);
      try { if (sessionStorage.getItem("llm-quest:readmode") === "1") setReading(true); } catch (e2) { }
    } catch (err) { /* 增强失败不影响正文阅读 */ }
  }

  /* ---------- 模块回顾测验（自动组卷 · 纯自测 · 无门禁） ---------- */
  function renderReview(app, layerId) {
    var layer = LAYERS.filter(function (l) { return l.id === layerId; })[0];
    if (!layer) { app.innerHTML = '<div class="content-pending">未找到该模块。<br><br><a class="btn" href="#/index">返回知识点索引</a></div>'; return; }
    var points = IDX.filter(function (e) { return e.layer === layerId; });
    app.innerHTML =
      '<div class="boss-head" style="--lc:#64748b">' +
        '<div class="boss-title">📝 模块回顾测验 · ' + esc(layer.name) + "</div>" +
        '<div class="boss-sub">从本模块 ' + points.length + " 个知识点的高频例题中自动组卷 · 纯自测（不计 XP、不进错题本、无门禁）</div>" +
      "</div>" +
      '<div id="review-arena"><div class="content-pending">正在从考点例题中抽题组卷……</div></div>' +
      '<div class="ex-foot"><a class="btn" href="#/index">返回知识点索引</a> <a class="btn" href="#/map">返回学习地图</a></div>';

    Promise.all(points.map(function (p) { return getContent(p.id).then(function (c) { return { e: p, c: c }; }); }))
      .then(function (pairs) {
        var arena = $("#review-arena");
        if (!arena) return;
        var pool = [];
        pairs.forEach(function (pr) {
          if (!pr.c || !pr.c.exercises) return;
          pr.c.exercises.forEach(function (ex, i) {
            if (ex.type === "choice") pool.push({ e: pr.e, ex: ex });
          });
        });
        for (var i = pool.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
        }
        var picked = [];
        var seen = {};
        for (var k2 = 0; k2 < pool.length && picked.length < 8; k2++) {
          if (!seen[pool[k2].e.id]) { seen[pool[k2].e.id] = true; picked.push(pool[k2]); }
        }
        for (var k3 = 0; k3 < pool.length && picked.length < 8; k3++) {
          if (picked.indexOf(pool[k3]) < 0) picked.push(pool[k3]);
        }
        if (!picked.length) {
          arena.innerHTML = '<div class="content-pending">本模块暂无可组卷的选择题。</div>';
          return;
        }
        var rIdx = 0, correct = 0;
        function show() {
          if (rIdx >= picked.length) {
            var passLine = Math.ceil(picked.length * 0.8);
            arena.innerHTML = '<div class="quiz-result-card"><div class="qr-score ' + (correct >= passLine ? "pass" : "fail") + '">' + correct + " / " + picked.length + "</div>" +
              '<div class="qr-msg">' + (correct >= passLine ? "🎉 模块掌握扎实！" : "💪 再复习几课再测：可去知识点索引按「学习中 / 待复习」筛选薄弱点。") + "</div>" +
              '<div class="ex-foot" style="justify-content:center"><button class="btn primary" id="review-again">🔄 换一套重测</button><a class="btn" href="#/index">返回知识点索引</a></div></div>';
            $("#review-again").addEventListener("click", function () { renderReview(app, layerId); });
            return;
          }
          var item = picked[rIdx];
          var letters = ["A", "B", "C", "D", "E"];
          arena.innerHTML = '<div class="ex-card review-q">' +
            '<span class="ex-tag">第 ' + (rIdx + 1) + "/" + picked.length + ' 题 · 关联 ' + item.e.num + " " + esc(item.e.title) + '</span>' +
            '<div class="ex-q">' + esc(item.ex.q) + "</div>" +
            '<div class="ex-opts">' + (item.ex.options || []).map(function (o, j2) {
              return '<button class="ex-opt" data-act="rpick" data-opt="' + j2 + '"><span class="opt-letter">' + (letters[j2] || j2) + "</span>" + esc(o) + "</button>";
            }).join("") + "</div></div>";
        }
        show();
        arena.addEventListener("click", function (e2) {
          var el = e2.target.closest('[data-act="rpick"]');
          if (!el || el.disabled) return;
          var item = picked[rIdx];
          var pickedIdx = +el.getAttribute("data-opt");
          var card = $(".review-q", arena);
          $$(".ex-opt", card).forEach(function (btn, j2) {
            btn.disabled = true;
            if (j2 === pickedIdx) btn.classList.add(j2 === item.ex.answer ? "correct" : "wrong", "chosen");
            if (j2 === item.ex.answer) btn.classList.add("correct");
          });
          if (pickedIdx === item.ex.answer) correct++;
          var fb = document.createElement("div");
          fb.className = "boss-feedback " + (pickedIdx === item.ex.answer ? "ok" : "bad");
          fb.innerHTML = (pickedIdx === item.ex.answer ? "✅ 答对　" : "❌ 正确答案：" + (["A", "B", "C", "D", "E"][item.ex.answer] || "") + "　") +
            esc(item.ex.explain || "") +
            '<button class="btn small primary" style="margin-left:10px" id="review-next">' + (rIdx + 1 >= picked.length ? "查看结果" : "下一题 →") + "</button>";
          card.appendChild(fb);
          $("#review-next").addEventListener("click", function () { rIdx++; show(); });
        });
      });
  }

  /* ---------- 错题本与复习 ---------- */
  function renderWrongbook(app) {
    var t = today();
    var keys = Object.keys(state.wrongbook).filter(function (k) { return state.wrongbook[k]; });
    var due = keys.filter(function (k) { return state.wrongbook[k].nextDue <= t; });
    var later = keys.filter(function (k) { return state.wrongbook[k].nextDue > t; });
    function item(k) {
      var it = state.wrongbook[k];
      var dueNow = it.nextDue <= t;
      return '<div class="wrong-item ' + (dueNow ? "due" : "") + '">' +
        '<div class="wi-head"><span class="badge">' + (byId[it.ref] ? byId[it.ref].p.num : (it.type === "boss" ? "Boss" : it.ref)) + "</span>" +
        "<span class='dim'>答错 " + it.times + " 次 · 下次复习 " + it.nextDue + (dueNow ? " · <b style='color:#b45309'>今天该复习了</b>" : "") + "</span></div>" +
        '<div class="wi-q">' + esc(it.q) + "</div>" +
        '<a class="btn small" href="' + (byId[it.ref] ? "#/knowledge/" + it.ref : "#/index") + '">回看考点</a></div>';
    }
    app.innerHTML =
      '<h1 class="page-title">📖 错题本与复习 · 遗忘曲线</h1>' +
      '<p class="lead">答错的题自动收录，按 <b>1 天 → 3 天 → 7 天</b> 间隔重复提醒；回看考点后重新答对即移出。错题与知识点索引的「待复习」状态实时联动。</p>' +
      '<div class="idx-row" style="margin-bottom:14px">' +
        '<button class="btn small" data-act="goto-idx-review">🔎 去知识点索引 · 筛选待复习</button>' +
        '<button class="btn small" data-act="goto-idx-due">⏰ 只看今日到期</button>' +
      "</div>" +
      '<div class="stats-row">' +
        '<div class="stat-card"><div class="num">' + due.length + '</div><div class="lbl">今天到期</div></div>' +
        '<div class="stat-card"><div class="num">' + later.length + '</div><div class="lbl">待复习（未到期）</div></div>' +
        '<div class="stat-card"><div class="num">' + keys.length + '</div><div class="lbl">错题总数</div></div>' +
      "</div>" +
      (keys.length === 0
        ? '<div class="content-pending">🎉 错题本是空的——保持下去！</div>'
        : (due.length ? "<h2 class='section-h'>⏰ 今日到期（" + due.length + "）</h2>" + due.map(item).join("") : "") +
          (later.length ? "<h2 class='section-h'>🗓️ 稍后复习（" + later.length + "）</h2>" + later.map(item).join("") : ""));
  }

  /* ---------- 战绩页 ---------- */
  function renderProgress() {
    var visited = ORDER.filter(function (e) { return state.visited[e.p.id]; }).length;
    var pct = ORDER.length ? Math.round(visited / ORDER.length * 100) : 0;
    var tIdx = currentTitleIdx();
    var lvCards = S.levels.map(function (lv) {
      var st = stageStats(lv.id);
      var b = state.boss[lv.id];
      var mpct = st.pts.length ? Math.round(st.done / st.pts.length * 100) : 0;
      return '<div class="prog-card" style="--mod:' + lv.color + '"><div class="pc-head"><span>' + lv.icon + "</span><span>" + lv.id + " " + lv.name +
        '（' + esc(lv.title) + '）</span><span class="pc-pct">' + mpct + "%</span></div>" +
        '<div class="bar"><div class="fill" style="width:' + mpct + '%"></div></div>' +
        '<div class="pc-meta"><span>节点 <b>' + st.done + "/" + st.pts.length + "</b></span>" +
        "<span>Boss <b>" + (b ? (b.passed ? "🏆 通过 " + b.best + "/" + b.total : "最佳 " + b.best + "/" + b.total) : "未挑战") + "</b></span>" +
        "<span>任务卡 <b>" + (state.tasks[lv.id] && state.tasks[lv.id].done ? "✅" : "—") + "</b></span></div></div>";
    }).join("");
    return '<h1 class="page-title">📈 我的战绩</h1>' +
      '<div class="stats-row">' +
        '<div class="stat-card"><div class="num">' + state.xp + '</div><div class="lbl">总 XP</div></div>' +
        '<div class="stat-card"><div class="num">' + esc(S.levels[tIdx].title) + '</div><div class="lbl">当前头衔</div></div>' +
        '<div class="stat-card"><div class="num">' + pct + '%</div><div class="lbl">节点点亮（' + visited + "/" + ORDER.length + '）</div></div>' +
        '<div class="stat-card"><div class="num">' + Object.keys(state.wrongbook).length + '</div><div class="lbl">错题本存量</div></div>' +
      "</div>" +
      '<div class="prog-grid">' + lvCards + "</div>" +
      '<button class="btn danger" data-act="reset-progress">🗑️ 重置全部进度</button>';
  }

  /* ---------- 全局事件委托 ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var act = el.getAttribute("data-act");

    if (el.id === "theme-toggle" || act === "theme-toggle") {
      var cur = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(cur);
      return;
    }

    if (act === "idx-due") {
      var f0 = idxFilters(); f0.status = "due"; f0.q = ""; idxSaveFilters(f0);
      render();
      return;
    }
    if (act === "idx-hot") {
      var f1 = idxFilters(); f1.star = "s4"; f1.q = ""; idxSaveFilters(f1);
      render();
      return;
    }
    if (act === "idx-reset") {
      idxSaveFilters({ q: "", stage: "", layer: "", mastery: "", star: "", status: "", sort: idxFilters().sort });
      render();
      return;
    }
    if (act === "idx-random") {
      var pool = IDX.filter(function (en) { return wrongEntriesFor(en.id).length > 0; });
      var duePool = pool.filter(function (en) { return isDue(en.id); });
      var cand = (duePool.length ? duePool : pool);
      var msg = $("#idx-random-msg");
      if (!cand.length) {
        if (msg) msg.innerHTML = '<span class="dim">🎲 题库空的：目前没有关联错题的知识点。去考点页答错几题，或用「今日待复习」看看到期项。</span>';
        return;
      }
      var pickR = cand[Math.floor(Math.random() * cand.length)];
      if (msg) msg.innerHTML = "🎲 抽中 <b>" + esc(pickR.num + " " + pickR.title) + "</b>，正在跳转……";
      setTimeout(function () { location.hash = "#/knowledge/" + pickR.id; }, 500);
      return;
    }
    if (act === "goto-idx-review") {
      idxSaveFilters({ q: "", stage: "", layer: "", mastery: "", star: "", status: "待复习", sort: "anchor" });
      location.hash = "#/index";
      return;
    }
    if (act === "goto-idx-due") {
      idxSaveFilters({ q: "", stage: "", layer: "", mastery: "", star: "", status: "due", sort: "anchor" });
      location.hash = "#/index";
      return;
    }

    if (act === "pick") {
      var card = el.closest(".ex-card");
      if (!card || card.getAttribute("data-type") !== "choice" || el.disabled) return;
      $$(".ex-opt", card).forEach(function (b) { b.classList.remove("chosen"); });
      el.classList.add("chosen");
      card.setAttribute("data-picked", el.getAttribute("data-opt"));
      return;
    }

    if (act === "grade-choice") {
      var card2 = el.closest(".ex-card");
      var picked = card2.getAttribute("data-picked");
      var chip = $('[data-role="result"]', card2);
      if (picked == null) { chip.textContent = "请先选择一个选项"; chip.className = "ex-result-chip bad"; return; }
      if (!currentPoint || !currentContent) return;
      var i = +card2.getAttribute("data-ex");
      var ex = (currentContent.exercises || [])[i];
      var key = currentPoint.p.id + "#ex" + i;
      var firstTry = !state.choice[key];
      var ok = paintChoice(card2, ex, +picked, currentPoint);
      state.choice[key] = { picked: +picked, correct: ok };
      if (ok && firstTry) addXp(S.xp.choice);
      if (!ok) addWrong(key, { ref: currentPoint.p.id, type: "choice", q: ex.q });
      else clearWrong(key);
      save(); headerHud();
      return;
    }

    if (act === "grade-scenario") {
      var card3 = el.closest(".ex-card");
      if (!currentPoint || !currentContent) return;
      var ta = $('[data-role="answer"]', card3);
      var text = ta ? ta.value.trim() : "";
      var chip3 = $('[data-role="result"]', card3);
      if (!text) { chip3.textContent = "请先写下你的分析再提交"; chip3.className = "ex-result-chip bad"; return; }
      var i3 = +card3.getAttribute("data-ex");
      var ex3 = (currentContent.exercises || [])[i3];
      var key3 = currentPoint.p.id + "#ex" + i3;
      var firstTry3 = !state.scenario[key3];
      var res3 = paintScenario(card3, ex3, text, currentPoint);
      state.scenario[key3] = { text: text.slice(0, 5000), score: res3.score, total: res3.total };
      if (res3.ratio >= 0.8) {
        if (firstTry3) addXp(S.xp.scenario);
        clearWrong(key3);
      } else {
        addWrong(key3, { ref: currentPoint.p.id, type: "scenario", q: ex3.q });
      }
      save(); headerHud();
      return;
    }

    if (act === "feynman-reveal") {
      var sec = el.closest(".k-section");
      var ta2 = $('[data-role="feynman"]', sec);
      var box = $('[data-role="feynman-model"]', sec);
      box.classList.toggle("hidden");
      if (currentPoint && ta2) {
        state.feynman[currentPoint.p.id] = { text: (ta2.value || "").slice(0, 5000), revealed: !box.classList.contains("hidden") };
        save();
      }
      return;
    }

    if (act === "teachback-save") {
      var sec2 = el.closest(".k-section");
      var q = $('[data-role="tb-q"]', sec2).value.trim();
      var a = $('[data-role="tb-a"]', sec2).value.trim();
      var checks = $$('[data-tbc]', sec2).map(function (cb) { return cb.checked; });
      var chip4 = $('[data-role="tb-result"]', sec2);
      if (!q || !a) { chip4.textContent = "题目和参考答案都要写哦"; chip4.className = "ex-result-chip bad"; return; }
      if (checks.filter(Boolean).length < 3) { chip4.textContent = "请完成三项自检"; chip4.className = "ex-result-chip bad"; return; }
      var isNew = !state.teachback[currentPoint.p.id];
      state.teachback[currentPoint.p.id] = { q: q, a: a, checks: checks, date: today() };
      if (isNew) addXp(S.xp.scenario);
      chip4.textContent = "✅ 已提交" + (isNew ? "（+" + S.xp.scenario + " XP）" : "");
      chip4.className = "ex-result-chip ok";
      save(); headerHud();
      return;
    }

    if (act === "task-submit") {
      var sid = el.getAttribute("data-stage");
      var boxes = $$('[data-task-check]');
      var allChecked = boxes.length && boxes.every(function (b2) { return b2.checked; });
      var chip5 = $('[data-role="task-result"]');
      if (!allChecked) { chip5.textContent = "请先完成全部自查项再提交"; chip5.className = "ex-result-chip bad"; return; }
      var prevTask = state.tasks[sid] || {};
      var firstAward = !prevTask.awarded;
      state.tasks[sid] = { done: true, awarded: true, checks: boxes.map(function (b3) { return b3.checked; }), date: today() };
      if (firstAward) addXp(S.xp.task);
      chip5.textContent = "✅ 已提交" + (firstAward ? "（+" + S.xp.task + " XP）" : "");
      chip5.className = "ex-result-chip ok";
      el.disabled = true;
      boxes.forEach(function (b4) { b4.disabled = true; });
      save(); headerHud();
      return;
    }

    if (act === "d-next" || act === "d-prev") {
      var wrap = document.querySelector(el.getAttribute("data-steps"));
      if (!wrap) return;
      var steps = $$(".d-step", wrap);
      var cur = steps.findIndex(function (s2) { return s2.classList.contains("active"); });
      var dir = act === "d-next" ? 1 : -1;
      var nxt = Math.min(steps.length - 1, Math.max(0, cur + dir));
      steps.forEach(function (s3, i2) { s3.classList.toggle("active", i2 === nxt); });
      var ind = document.querySelector('[data-steps-indicator="' + el.getAttribute("data-steps") + '"]');
      if (ind) ind.textContent = (nxt + 1) + " / " + steps.length;
      $$('[data-act="d-prev"][data-steps="' + el.getAttribute("data-steps") + '"]').forEach(function (b2) { b2.disabled = nxt === 0; });
      $$('[data-act="d-next"][data-steps="' + el.getAttribute("data-steps") + '"]').forEach(function (b3) { b3.disabled = nxt === steps.length - 1; });
      return;
    }
    if (act === "d-toggle") {
      var t = document.querySelector(el.getAttribute("data-target"));
      if (t) t.classList.toggle("d-hidden");
      return;
    }
    if (act === "d-replay") {
      var scope = document.querySelector(el.getAttribute("data-target")) || el.closest(".demo-box");
      if (!scope) return;
      $$(".d-anim, .d-anim-late, .d-pulse", scope).forEach(function (a2) {
        a2.style.animation = "none"; void a2.offsetWidth; a2.style.animation = "";
      });
      return;
    }
    if (act === "d-tab") {
      var group = el.getAttribute("data-group");
      $$('[data-act="d-tab"][data-group="' + group + '"]').forEach(function (b4) { b4.classList.toggle("active", b4 === el); });
      $$('[data-pane][data-group="' + group + '"]').forEach(function (p2) {
        p2.classList.toggle("d-hidden", p2.getAttribute("data-pane") !== el.getAttribute("data-tab"));
      });
      return;
    }
    if (act === "reset-progress") {
      if (window.confirm("确定要清空全部 XP、进度与错题本吗？此操作不可恢复。")) {
        state = defaultState(); save(); render();
      }
      return;
    }
  });

  /* 自查清单勾选状态暂存（未提交时也记住） */
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.matches && t.matches("[data-task-check]")) {
      var r = parseHash();
      if (r.page !== "task") return;
      var rec = state.tasks[r.stage] || {};
      if (rec.done) { t.checked = true; return; }
      var boxes = $$("[data-task-check]");
      rec.checks = boxes.map(function (b) { return b.checked; });
      state.tasks[r.stage] = rec;
      save();
    }
  });

  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.matches && t.matches('input[type="range"][data-output]')) {
      var out = document.querySelector(t.getAttribute("data-output"));
      if (out) out.textContent = t.value + (t.getAttribute("data-suffix") || "");
      var box = t.closest(".demo-box");
      if (box) box.style.setProperty("--v", t.value);
    }
  });

  /* ---------- 启动 ---------- */
  var _origK = renderKnowledge;
  renderKnowledge = function (app, id) {
    currentPoint = byId[id] || null;
    currentContent = null;
    _origK(app, id);
    getContent(id).then(function (c) {
      var r = parseHash();
      if (r.page === "knowledge" && r.id === id) currentContent = c;
    });
  };

  window.addEventListener("hashchange", render);
  render();
})();

/* SW 注册（推广自标杆 architect-exam-learning app.js:996-998，OPT-01） */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  try { var __swUrl = new URL('../sw.js', (document.currentScript && document.currentScript.src) || location.href).pathname;
    navigator.serviceWorker.register(__swUrl).catch(function () {}); } catch (e) {}
}
