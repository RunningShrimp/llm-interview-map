/* ============================================================
 * app.js — 路由、渲染、进度持久化、判题交互、演示组件委托
 * 路由：#/ 首页 ｜ #/map 学习地图 ｜ #/knowledge/:id 知识点
 *      #/review/:mid 模块回顾测验 ｜ #/progress 我的进度
 * ============================================================ */
(function () {
  "use strict";

  var S = window.SYLLABUS;
  var J = window.Judge;

  /* ---------- 工具 ---------- */
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

  /* ---------- 大纲索引 ---------- */
  var ALL = [];
  S.modules.forEach(function (m) {
    m.points.forEach(function (p) { ALL.push({ m: m, p: p }); });
  });
  var byId = {};
  ALL.forEach(function (e) { byId[e.p.id] = e; });

  function moduleById(mid) {
    return S.modules.filter(function (m) { return m.id.toLowerCase() === String(mid).toLowerCase(); })[0];
  }

  /* ---------- 本地进度 ---------- */
  var KEY = "llm-interview-map:v1";
  function defaultState() {
    return { visited: {}, choice: {}, scenario: {}, feynman: {}, quiz: {}, last: null };
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
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 忽略配额错误 */ }
  }

  /* ---------- 内容加载（fetch + 缓存） ---------- */
  var contentCache = {};
  function getContent(id) {
    if (contentCache[id]) return Promise.resolve(contentCache[id]);
    return fetch("./data/content/" + id + ".json")
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (j) { contentCache[id] = j; return j; })
      .catch(function () { return null; });
  }
  var quizCache = {};
  function getQuiz(mid) {
    var key = mid.toLowerCase();
    if (quizCache[key]) return Promise.resolve(quizCache[key]);
    return fetch("./data/quizzes/module-" + key + ".json")
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (j) { quizCache[key] = j; return j; })
      .catch(function () { return null; });
  }

  /* ---------- 路由 ---------- */
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    if (parts.length === 0) return { page: "home" };
    if (parts[0] === "map") return { page: "map", anchor: parts[1] || null };
    if (parts[0] === "knowledge" && parts[1]) return { page: "knowledge", id: parts[1] };
    if (parts[0] === "review" && parts[1]) return { page: "review", mid: parts[1] };
    if (parts[0] === "progress") return { page: "progress" };
    return { page: "home" };
  }

  function updateHeader() {
    var visited = Object.keys(state.visited).filter(function (k) { return state.visited[k] && byId[k]; }).length;
    var pct = ALL.length ? Math.round(visited / ALL.length * 100) : 0;
    var el = $("#header-progress");
    if (el) {
      el.innerHTML =
        '<span>已学 <b>' + visited + "</b>/" + ALL.length + "</span>" +
        '<div class="bar"><div class="fill" style="width:' + pct + '%"></div></div><span>' + pct + "%</span>";
    }
  }

  function render() {
    var r = parseHash();
    var app = $("#app");
    updateHeader();
    if (r.page === "home") { app.innerHTML = renderHome(); }
    else if (r.page === "map") { renderMap(app, r.anchor); }
    else if (r.page === "progress") { app.innerHTML = renderProgress(); }
    else if (r.page === "review") { renderReview(app, r.mid); }
    else if (r.page === "knowledge") { renderKnowledge(app, r.id); }
    window.scrollTo(0, 0);
  }

  /* ---------- 首页 ---------- */
  function renderHome() {
    var visited = Object.keys(state.visited).filter(function (k) { return state.visited[k] && byId[k]; }).length;
    var exDone = Object.keys(state.choice).length + Object.keys(state.scenario).length;
    var quizDone = Object.keys(state.quiz).length;
    var pct = ALL.length ? Math.round(visited / ALL.length * 100) : 0;

    var cards = S.modules.map(function (m) {
      var v = m.points.filter(function (p) { return state.visited[p.id]; }).length;
      var mpct = Math.round(v / m.points.length * 100);
      return (
        '<a class="module-card fade-in" style="--mod:' + m.color + '" href="#/map/' + m.id + '">' +
          '<div class="mc-head"><span class="mc-icon">' + m.icon + '</span>' +
          '<span class="mc-name">模块' + m.id + " · " + esc(m.name) + '</span>' +
          '<span class="mc-count">' + v + "/" + m.points.length + ' 点</span></div>' +
          '<div class="mc-tag">' + esc(m.tagline) + "</div>" +
          '<div class="mc-bar-row"><div class="bar"><div class="fill" style="width:' + mpct + '%"></div></div><span>' + mpct + "%</span></div>" +
        "</a>"
      );
    }).join("");

    var resume = state.last && byId[state.last]
      ? "#/knowledge/" + state.last
      : "#/knowledge/" + ALL[0].p.id;

    return (
      '<div class="hero fade-in">' +
        "<h1>🧭 LLM 应用开发面试学习地图</h1>" +
        "<p>面向零基础同学的 <b>大模型应用开发面试知识体系</b>：7 大模块、" + ALL.length + " 个高频考点，" +
        "每个考点配小白定义、生活类比、动画演示、即时判题例题与面试真题视角。学习进度自动保存在本地浏览器。</p>" +
        '<div class="cta-row">' +
          '<a class="btn primary" href="' + resume + '">▶ ' + (state.last ? "继续上次学习" : "开始学习") + "</a>" +
          '<a class="btn" href="#/map">🗺️ 学习地图</a>' +
          '<a class="btn" href="#/progress">📈 我的进度</a>' +
        "</div>" +
      "</div>" +
      '<div class="stats-row">' +
        statCard(ALL.length, "知识点总数") +
        statCard(visited + "（" + pct + "%）", "已学完") +
        statCard(exDone, "例题已作答") +
        statCard(quizDone + "/7", "模块回顾测验") +
      "</div>" +
      '<h1 class="page-title">七大模块</h1>' +
      '<p class="lead">按 A → G 由浅入深排列，建议顺序推进；点击卡片查看该模块知识路径。</p>' +
      '<div class="module-grid">' + cards + "</div>" +
      '<div class="about-box fade-in">' +
        "<h3>使用说明</h3>" +
        "<ul>" +
          "<li>每个知识点页面包含：小白定义、生活类比、动画/交互演示、核心要点、例题（提交即时判题）、费曼复述、知识联系、面试视角。</li>" +
          "<li>每学完一个模块，建议完成模块末尾的「回顾测验」（间隔重复），页面底部的上一题/下一题按钮可顺序浏览。</li>" +
          '<li>学习进度（看过的知识点、例题作答、测验成绩）保存在浏览器 localStorage，仅本机可见。</li>' +
        "</ul>" +
        "<h3>内容来源声明</h3>" +
        "<ul>" +
          "<li>知识点选自牛客网面经、小林coding 大模型面试题、《AI Agent 面试 Top50 必刷题》等公开面试资料中的高频考点，每个页面均标注来源与星级。</li>" +
          "<li>内容为学习辅助材料，技术表述如有出入请以官方文档与论文为准。</li>" +
        "</ul>" +
      "</div>"
    );
  }
  function statCard(num, lbl) {
    return '<div class="stat-card fade-in"><div class="num">' + num + '</div><div class="lbl">' + lbl + "</div></div>";
  }

  /* ---------- 学习地图 ---------- */
  function renderMap(app, anchor) {
    var html =
      '<h1 class="page-title">🗺️ 学习地图</h1>' +
      "<p class=\"lead\">按模块分组、由浅入深；点击任意知识点进入学习。支持「路径视图」与「思维导图视图」。</p>" +
      '<div class="view-toggle">' +
        '<button class="btn small active" id="vt-path">🛤️ 路径视图</button>' +
        '<button class="btn small" id="vt-mind">🧠 思维导图</button>' +
      "</div>" +
      '<div id="mapview-path">' +
      S.modules.map(function (m) {
        var v = m.points.filter(function (p) { return state.visited[p.id]; }).length;
        var mpct = Math.round(v / m.points.length * 100);
        var openAttr = anchor && m.id.toLowerCase() === String(anchor).toLowerCase() ? " open" : "";
        var nodes = m.points.map(function (p, i) {
          var isVisited = !!state.visited[p.id];
          var deps = (p.deps || []).map(function (d) {
            return byId[d] ? byId[d].p.num : "?";
          }).join("、");
          return (
            (i > 0 ? '<svg class="flow-arrow" width="14" height="30" viewBox="0 0 14 30"><line class="d-flow-line" x1="7" y1="0" x2="7" y2="22" stroke="currentColor" stroke-width="2"/><polygon points="2,20 12,20 7,29" fill="currentColor"/></svg>' : "") +
            '<a class="map-node' + (isVisited ? " visited" : "") + '" style="--mod:' + m.color + '" href="#/knowledge/' + p.id + '">' +
              '<span class="node-num">' + p.num + "</span>" +
              '<span class="node-title">' + esc(p.title) + "</span>" +
              '<span class="node-meta"><span class="stars">' + starHtml(p.stars) + "</span>" +
              (deps ? '<span class="node-deps">前置：' + deps + "</span>" : '<span class="node-deps">无前置</span>') + "</span>" +
              '<span class="node-check">✓</span>' +
            "</a>"
          );
        }).join("");
        return (
          '<details class="map-module fade-in" style="--mod:' + m.color + '"' + openAttr + " id=\"module-" + m.id.toLowerCase() + '">' +
            "<summary><span>" + m.icon + '</span><span class="mm-title">模块' + m.id + " · " + esc(m.name) + "</span>" +
            '<span class="badge">' + m.points.length + " 点</span>" +
            '<div class="bar mm-bar"><div class="fill" style="width:' + mpct + '%"></div></div>' +
            '<span class="mm-count">' + v + "/" + m.points.length + " 已学</span>" +
            '<span class="arrow">▶</span></summary>' +
            '<div class="map-flow">' + nodes + "</div>" +
          "</details>"
        );
      }).join("") +
      "</div>" +
      '<div id="mapview-mind" class="hidden">' +
        '<div class="mindmap-wrap"><div class="mindmap-inner" id="mindmap-inner">' +
          '<svg class="mindmap-svg" id="mindmap-svg"></svg>' +
          '<div class="mm-root" id="mm-root">LLM 应用<br>面试地图<small>' + ALL.length + " 个考点</small></div>" +
          '<div class="mm-branches">' +
          S.modules.map(function (m) {
            var openAttr2 = anchor && m.id.toLowerCase() === String(anchor).toLowerCase() ? " open" : "";
            return (
              '<details class="mm-branch" style="--mod:' + m.color + '"' + openAttr2 + '>' +
                "<summary><span>" + m.icon + "</span><span>模块" + m.id + " · " + esc(m.name) + '</span><span class="badge">' + m.points.length + "</span>" + '<span class="mm-arr">▶</span></summary>' +
                '<div class="mm-points">' +
                m.points.map(function (p) {
                  return '<a class="mm-point' + (state.visited[p.id] ? " visited" : "") + '" href="#/knowledge/' + p.id + '">' + p.num + " " + esc(p.title) + "</a>";
                }).join("") +
                "</div>" +
              "</details>"
            );
          }).join("") +
          "</div>" +
        "</div></div>" +
      "</div>";

    app.innerHTML = html;

    $("#vt-path").addEventListener("click", function () {
      this.classList.add("active"); $("#vt-mind").classList.remove("active");
      $("#mapview-path").classList.remove("hidden"); $("#mapview-mind").classList.add("hidden");
    });
    $("#vt-mind").addEventListener("click", function () {
      this.classList.add("active"); $("#vt-path").classList.remove("active");
      $("#mapview-mind").classList.remove("hidden"); $("#mapview-path").classList.add("hidden");
      drawMindmap();
    });
    drawMindmap();
  }

  function drawMindmap() {
    var inner = $("#mindmap-inner");
    var svg = $("#mindmap-svg");
    var root = $("#mm-root");
    if (!inner || !svg || !root || $("#mapview-mind").classList.contains("hidden")) return;
    var ir = inner.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + ir.width + " " + ir.height);
    svg.style.width = ir.width + "px";
    svg.style.height = ir.height + "px";
    var rr = root.getBoundingClientRect();
    var x1 = rr.right - ir.left;
    var y1 = rr.top + rr.height / 2 - ir.top;
    var paths = $$(".mm-branch", inner).map(function (b) {
      var br = b.getBoundingClientRect();
      var x2 = br.left - ir.left;
      var y2 = br.top + 22 - ir.top;
      var mx = (x1 + x2) / 2;
      return '<path d="M ' + x1 + " " + y1 + " C " + mx + " " + y1 + ", " + mx + " " + y2 + ", " + x2 + " " + y2 + '"/>';
    }).join("");
    svg.innerHTML = paths;
  }
  document.addEventListener("toggle", function () { drawMindmap(); }, true);
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawMindmap, 150);
  });

  /* ---------- 知识点页 ---------- */
  function renderKnowledge(app, id) {
    var entry = byId[id];
    if (!entry) {
      app.innerHTML = '<div class="content-pending">未找到该知识点。<br><br><a class="btn" href="#/map">返回学习地图</a></div>';
      return;
    }
    var m = entry.m, p = entry.p;

    getContent(id).then(function (c) {
      if (!c) {
        app.innerHTML =
          '<div class="breadcrumb"><a href="#/">首页</a> / <a href="#/map/' + m.id + '">模块' + m.id + "</a></div>" +
          '<div class="content-pending">📖「' + esc(p.title) + "」内容生成中，请稍后再来～<br><br><a class=\"btn\" href=\"#/map\">返回学习地图</a></div>";
        return;
      }

      /* 标记已学 + 记录最后位置 */
      state.visited[id] = true;
      state.last = id;
      save();
      updateHeader();

      var idx = -1;
      ALL.forEach(function (e, i) { if (e.p.id === id) idx = i; });
      var prev = idx > 0 ? ALL[idx - 1] : null;
      var next = idx < ALL.length - 1 ? ALL[idx + 1] : null;

      var depsHtml = (p.deps || []).length
        ? (p.deps || []).map(function (d) {
            return byId[d] ? '<a class="dep-link" href="#/knowledge/' + d + '">' + byId[d].p.num + " " + esc(byId[d].p.title) + "</a>" : "";
          }).join(" ｜ ")
        : "无（这是起点）";

      var analogies = (c.analogies || []).map(function (a, i) {
        return (
          '<div class="analog-card"><span class="an-icon">' + (a.icon || "💡") + "</span>" +
          "<div><div class=\"an-name\">类比 " + (i + 1) + "：" + esc(a.name) + "</div><p>" + esc(a.text) + "</p></div></div>"
        );
      }).join("");

      var kps = (c.keyPoints || []).map(function (k) {
        return '<li><span class="kp-ico">' + (k.icon || "📌") + "</span><span><b>" + esc(k.name) + "</b>：" + esc(k.text) + "</span></li>";
      }).join("");

      var exercises = (c.exercises || []).map(function (ex, i) {
        return ex.type === "scenario" ? scenarioCard(p, ex, i) : choiceCard(p, ex, i);
      }).join("");

      var links = (c.links || []).map(function (l) {
        var t = byId[l.to];
        return (
          '<a class="link-card" href="#/knowledge/' + l.to + '">' +
          "🔗 学完 <b>" + esc(p.title) + "</b> 后你会发现：" + esc(l.text) +
          ' <span class="lc-target">→ ' + (t ? t.p.num + " " + esc(t.p.title) : esc(l.to)) + "</span></a>"
        );
      }).join("");

      var interviews = (c.interview || []).map(function (q) {
        return (
          '<div class="interview-item">' +
            '<div class="iq">❓ ' + esc(q.q) + '<span class="stars">' + starHtml(q.stars || p.stars) + "</span></div>" +
            '<div class="isrc">来源：' + esc(q.source || p.source) + "</div>" +
            (q.tip ? '<div class="itip">💡 答题要点：' + esc(q.tip) + "</div>" : "") +
          "</div>"
        );
      }).join("");

      app.innerHTML =
        '<div class="breadcrumb"><a href="#/">首页</a> / <a href="#/map/' + m.id + '">模块' + m.id + " · " + esc(m.name) + "</a> / " + p.num + "</div>" +
        '<header class="k-head" style="--mod:' + m.color + '">' +
          "<h1>" + p.num + " · " + esc(p.title) + "</h1>" +
          '<div class="k-meta">' +
            '<span class="stars">' + starHtml(p.stars) + "</span>" +
            '<span class="badge">面试频率 ⭐' + p.stars + "</span>" +
            "<span>来源：" + esc(p.source) + "</span>" +
            "<span>前置依赖：" + depsHtml + "</span>" +
          "</div>" +
        "</header>" +

        '<section class="k-section" style="--mod:' + m.color + '">' +
          '<div class="sec-title"><span class="sec-ico">🍼</span>小白定义</div>' +
          '<p>' + esc(c.definition) + "</p>" +
        "</section>" +

        '<section class="k-section" style="--mod:' + m.color + '">' +
          '<div class="sec-title"><span class="sec-ico">🎯</span>生活类比</div>' + analogies +
        "</section>" +

        '<section class="k-section" style="--mod:' + m.color + '">' +
          '<div class="sec-title"><span class="sec-ico">🎬</span>动画 / 交互演示</div>' +
          '<div class="demo-box">' +
            '<div class="demo-title">' + esc(c.demo.title) + "</div>" +
            '<div class="demo-desc">' + esc(c.demo.description) + "</div>" +
            sanitizeDemo(c.demo.html) +
          "</div>" +
        "</section>" +

        (kps ? '<section class="k-section" style="--mod:' + m.color + '"><div class="sec-title"><span class="sec-ico">📌</span>核心要点（双编码：要点+记忆图标）</div><ul class="kp-list">' + kps + "</ul></section>" : "") +

        '<section class="k-section" style="--mod:' + m.color + '">' +
          '<div class="sec-title"><span class="sec-ico">✍️</span>例题实战（提交即时判题）</div>' + exercises +
        "</section>" +

        '<section class="k-section" style="--mod:' + m.color + '">' +
          '<div class="sec-title"><span class="sec-ico">🗣️</span>费曼复述（讲给完全不懂的人听）</div>' +
          "<p><b>任务：</b>" + esc(c.feynman.prompt) + "</p>" +
          '<textarea class="ex-input" data-role="feynman" placeholder="用你自己的话写下来，越口语化越好……"></textarea>' +
          '<div class="feynman-hint">💡 提示：' + esc(c.feynman.hint) + "</div>" +
          '<div class="ex-foot"><button class="btn small" data-act="feynman-reveal">对照参考表达</button></div>' +
          '<div class="reveal-box hidden" data-role="feynman-model"><div class="rb-title">📖 参考表达（对意思即可，不要求逐字一致）</div>' + esc(c.feynman.modelAnswer) + "</div>" +
        "</section>" +

        '<section class="k-section" style="--mod:' + m.color + '">' +
          '<div class="sec-title"><span class="sec-ico">🔗</span>知识联系</div>' +
          '<div class="link-cards">' + links + "</div>" +
        "</section>" +

        '<section class="k-section" style="--mod:' + m.color + '">' +
          '<div class="sec-title"><span class="sec-ico">💼</span>面试视角（高频问法）</div>' + interviews +
        "</section>" +

        '<section class="k-section" style="--mod:' + m.color + '">' +
          '<div class="sec-title"><span class="sec-ico">🧠</span>提问式小结（先自己回答，再展开）</div>' +
          '<div class="summary-box">' + summaryHtml(c.summary) + "</div>" +
        "</section>" +

        '<nav class="knav">' +
          (prev
            ? '<a href="#/knowledge/' + prev.p.id + '"><div class="kn-lbl">← 上一考点</div><div class="kn-t">' + prev.p.num + " " + esc(prev.p.title) + "</div></a>"
            : '<a href="#/map"><div class="kn-lbl">← </div><div class="kn-t">返回学习地图</div></a>') +
          (next
            ? '<a class="next" href="#/knowledge/' + next.p.id + '"><div class="kn-lbl">下一考点 →</div><div class="kn-t">' + next.p.num + " " + esc(next.p.title) + "</div></a>"
            : '<a class="next" href="#/review/' + m.id.toLowerCase() + '"><div class="kn-lbl">🎉 已是本模块最后一考点</div><div class="kn-t">去做模块回顾测验 →</div></a>') +
        "</nav>";

      restoreExercises(p, c);
      restoreFeynman(p, c);
    });
  }

  function summaryHtml(s) {
    var parts = String(s || "").split(/\n+/).filter(Boolean);
    return parts.map(function (line) {
      var m = line.match(/^(Q：|问：)([\s\S]*?)(?:（答：([\s\S]*)）)?$/);
      if (m) {
        return '<div class="sq"><b>Q：</b>' + esc(m[2]) +
          (m[3] ? '<details><summary>展开参考回答</summary>' + esc(m[3]) + "</details>" : "") + "</div>";
      }
      return '<div class="sq">' + esc(line) + "</div>";
    }).join("");
  }

  /* ---------- 例题卡片 ---------- */
  function choiceCard(p, ex, i) {
    var letters = ["A", "B", "C", "D", "E"];
    var opts = (ex.options || []).map(function (o, j) {
      return '<button class="ex-opt" data-act="pick" data-opt="' + j + '"><span class="opt-letter">' + (letters[j] || j) + "</span>" + esc(o) + "</button>";
    }).join("");
    return (
      '<div class="ex-card" data-role="ex" data-ex="' + i + '" data-type="choice">' +
        '<span class="ex-tag">选择题 · 第 ' + (i + 1) + " 题</span>" +
        '<div class="ex-q">' + esc(ex.q) + "</div>" +
        '<div class="ex-opts">' + opts + "</div>" +
        '<div class="ex-foot"><button class="btn small primary" data-act="grade-choice">提交判题</button>' +
        '<span class="ex-result-chip" data-role="result"></span></div>' +
        '<div class="ex-explain hidden" data-role="explain"></div>' +
      "</div>"
    );
  }

  function scenarioCard(p, ex, i) {
    return (
      '<div class="ex-card" data-role="ex" data-ex="' + i + '" data-type="scenario">' +
        '<span class="ex-tag">场景分析题 · 第 ' + (i + 1) + " 题</span>" +
        '<div class="ex-q">' + esc(ex.q) + "</div>" +
        '<textarea class="ex-input" data-role="answer" placeholder="按条理写下你的分析（判题引擎会按关键要点逐条检查）……"></textarea>' +
        '<div class="ex-foot"><button class="btn small primary" data-act="grade-scenario">提交判题</button>' +
        '<span class="ex-result-chip" data-role="result"></span></div>' +
        '<ul class="check-list hidden" data-role="checks"></ul>' +
        '<div class="score-bar-row hidden" data-role="scorebar"><span data-role="scoretext"></span>' +
        '<div class="bar"><div class="fill" data-role="scorefill"></div></div></div>' +
        '<div class="reveal-box hidden" data-role="reference"><div class="rb-title">📖 参考答案</div>' + esc(ex.reference) + "</div>" +
      "</div>"
    );
  }

  function exKey(p, exEl) {
    return p.id + "#ex" + exEl.getAttribute("data-ex");
  }

  function restoreExercises(p, c) {
    $$('.ex-card[data-role="ex"]').forEach(function (card) {
      var i = +card.getAttribute("data-ex");
      var ex = (c.exercises || [])[i];
      if (!ex) return;
      var key = exKey(p, card);
      if (ex.type === "scenario") {
        var rec = state.scenario[key];
        if (rec) { paintScenario(card, ex, rec.text, false); }
      } else {
        var rec2 = state.choice[key];
        if (rec2) { paintChoice(card, ex, rec2.picked, false); }
      }
    });
  }

  function restoreFeynman(p, c) {
    var rec = state.feynman[p.id];
    if (!rec) return;
    var ta = $('[data-role="feynman"]');
    if (ta) ta.value = rec.text || "";
    if (rec.revealed) {
      var box = $('[data-role="feynman-model"]');
      if (box) box.classList.remove("hidden");
    }
  }

  function paintChoice(card, ex, picked, isNew) {
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

  function paintScenario(card, ex, text, isNew) {
    var g = J.gradeScenario(ex, text);
    var ta = $('[data-role="answer"]', card);
    if (ta) ta.value = text;
    var checks = (g.details || []).map(function (d) {
      return '<li class="' + (d.hit ? "hit" : "miss") + '"><span class="cl-ico">' + (d.hit ? "✓" : "✗") + "</span><span>" + esc(d.point) + "</span></li>";
    }).join("");
    var cl = $('[data-role="checks"]', card);
    cl.innerHTML = checks;
    cl.classList.remove("hidden");
    var ratio = g.total ? g.score / g.total : 0;
    var bar = $('[data-role="scorebar"]', card);
    bar.classList.remove("hidden");
    var fill = $('[data-role="scorefill"]', bar);
    fill.style.width = Math.round(ratio * 100) + "%";
    fill.className = "fill " + (ratio >= 0.8 ? "ok" : ratio >= 0.5 ? "mid" : "low");
    $('[data-role="scoretext"]', bar).textContent = "要点命中 " + g.score + "/" + g.total;
    var chip = $('[data-role="result"]', card);
    chip.textContent = ratio >= 0.8 ? "✅ 优秀！" : ratio >= 0.5 ? "🟡 部分命中，继续补充" : "🔴 要点覆盖不足，看看参考答案";
    chip.className = "ex-result-chip " + (ratio >= 0.8 ? "ok" : ratio >= 0.5 ? "bad" : "bad");
    var ref = $('[data-role="reference"]', card);
    ref.classList.remove("hidden");
    return { score: g.score, total: g.total };
  }

  /* ---------- 回顾测验 ---------- */
  function renderReview(app, mid) {
    var m = moduleById(mid);
    if (!m) {
      app.innerHTML = '<div class="content-pending">未找到该模块。<br><br><a class="btn" href="#/map">返回学习地图</a></div>';
      return;
    }
    getQuiz(m.id).then(function (quiz) {
      if (!quiz) {
        app.innerHTML =
          '<div class="breadcrumb"><a href="#/map">学习地图</a> / 模块' + m.id + "</div>" +
          '<div class="content-pending">📝 模块' + m.id + " 回顾测验生成中，先继续学习其它考点吧～<br><br><a class=\"btn\" href=\"#/map\">返回学习地图</a></div>";
        return;
      }
      var letters = ["A", "B", "C", "D", "E"];
      var qs = (quiz.questions || []).map(function (q, i) {
        var opts = (q.options || []).map(function (o, j) {
          return '<button class="ex-opt" data-act="pick" data-q="' + i + '" data-opt="' + j + '"><span class="opt-letter">' + (letters[j] || j) + "</span>" + esc(o) + "</button>";
        }).join("");
        return (
          '<div class="ex-card" data-role="quiz-q" data-q="' + i + '">' +
            '<span class="ex-tag">第 ' + (i + 1) + " 题" + (q.ref ? " · 关联 " + (byId[q.ref] ? byId[q.ref].p.num : "") : "") + "</span>" +
            '<div class="ex-q">' + esc(q.q) + "</div>" +
            '<div class="ex-opts">' + opts + "</div>" +
            '<div class="ex-explain hidden" data-role="explain"></div>' +
          "</div>"
        );
      }).join("");

      var best = state.quiz[m.id];
      app.innerHTML =
        '<div class="breadcrumb"><a href="#/map">学习地图</a> / 模块' + m.id + " · " + esc(m.name) + "</div>" +
        '<div class="quiz-head" style="--mod:' + m.color + '">' +
          "<h1>" + m.icon + " 模块" + m.id + " 回顾测验 · " + esc(m.name) + "</h1>" +
          "<p>间隔重复：学完一个模块后立刻自测，能显著提升长期记忆。共 " + (quiz.questions || []).length +
          " 道选择题，答对 " + S.quizPassScore + " 题及以上算通过。" +
          (best ? "（历史最佳：" + best.best + "/" + (quiz.questions || []).length + "）" : "") + "</p>" +
        "</div>" +
        qs +
        '<div class="ex-foot" style="margin-bottom:18px"><button class="btn primary" data-act="quiz-submit">交卷判分</button>' +
        '<a class="btn" href="#/map/' + m.id + '">返回本模块地图</a></div>' +
        '<div data-role="quiz-result"></div>';

      currentQuiz = { quiz: quiz, picks: {} };
      var picks = currentQuiz.picks;

      var submit = $('[data-act="quiz-submit"]');
      submit.addEventListener("click", function () {
        var questions = quiz.questions || [];
        var answerArr = questions.map(function (_, i) { return typeof picks[i] === "number" ? picks[i] : -1; });
        var unanswered = answerArr.filter(function (a) { return a < 0; }).length;
        var res = J.gradeQuiz(questions, answerArr);
        $$('#app [data-role="quiz-q"]').forEach(function (card, i) {
          var g = res.per[i];
          $$(".ex-opt", card).forEach(function (btn, j) {
            btn.disabled = true;
            if (j === answerArr[i]) btn.classList.add(g.correct ? "correct" : "wrong", "chosen");
            if (j === questions[i].answer) btn.classList.add("correct");
          });
          var explain = $('[data-role="explain"]', card);
          explain.className = "ex-explain" + (g.correct ? "" : " wrong-bg");
          explain.innerHTML = "<b>" + (g.correct ? "✅ 正确。" : "❌ 正确答案为 " + (letters[questions[i].answer] || questions[i].answer + 1) + "。") + "解析：</b>" + esc(questions[i].explain || "");
        });
        var pass = res.score >= S.quizPassScore;
        var prevBest = state.quiz[m.id] ? state.quiz[m.id].best : 0;
        if (res.score > prevBest) {
          state.quiz[m.id] = { best: res.score, total: res.total, date: new Date().toISOString().slice(0, 10) };
          save();
        }
        $('[data-role="quiz-result"]').innerHTML =
          '<div class="quiz-result-card">' +
            '<div class="qr-score ' + (pass ? "pass" : "fail") + '">' + res.score + " / " + res.total + "</div>" +
            '<div class="qr-msg">' + (pass
              ? "🎉 通过！本模块知识已初步巩固，建议 3 天后回来重做一次（间隔重复）。"
              : "💪 未达 " + S.quizPassScore + " 分通过线，建议回看错题对应的知识点后重试。") +
            (unanswered ? "（有 " + unanswered + " 题未作答）" : "") + "</div>" +
          "</div>";
        submit.disabled = true;
        updateHeader();
      });
    });
  }

  /* ---------- 我的进度 ---------- */
  function renderProgress() {
    var visited = Object.keys(state.visited).filter(function (k) { return state.visited[k] && byId[k]; }).length;
    var pct = ALL.length ? Math.round(visited / ALL.length * 100) : 0;

    var cards = S.modules.map(function (m) {
      var v = m.points.filter(function (p) { return state.visited[p.id]; }).length;
      var mpct = Math.round(v / m.points.length * 100);
      var choice = { done: 0, ok: 0 };
      var scen = { done: 0, sum: 0, total: 0 };
      m.points.forEach(function (p) {
        Object.keys(state.choice).forEach(function (k) {
          if (k.indexOf(p.id + "#ex") === 0) { choice.done++; if (state.choice[k].correct) choice.ok++; }
        });
        Object.keys(state.scenario).forEach(function (k) {
          if (k.indexOf(p.id + "#ex") === 0) { scen.done++; scen.sum += state.scenario[k].score || 0; scen.total += state.scenario[k].total || 0; }
        });
      });
      var q = state.quiz[m.id];
      return (
        '<div class="prog-card fade-in" style="--mod:' + m.color + '">' +
          '<div class="pc-head"><span>' + m.icon + "</span><span>模块" + m.id + " · " + esc(m.name) + '</span><span class="pc-pct">' + mpct + "%</span></div>" +
          '<div class="bar"><div class="fill" style="width:' + mpct + '%"></div></div>' +
          '<div class="pc-meta">' +
            "<span>已学 <b>" + v + "/" + m.points.length + "</b></span>" +
            "<span>选择题 <b>" + choice.ok + "/" + choice.done + "</b> 正确</span>" +
            (scen.total ? "<span>场景题要点命中 <b>" + scen.sum + "/" + scen.total + "</b></span>" : "") +
            (q ? "<span>测验最佳 <b>" + q.best + "/" + q.total + "</b>（" + q.date + "）</span>" : "<span>测验 <b>未完成</b></span>") +
          "</div>" +
        "</div>"
      );
    }).join("");

    return (
      '<h1 class="page-title">📈 我的进度</h1>' +
      '<p class="lead">学习进度保存在本机浏览器（localStorage），清除浏览器数据会重置进度。</p>' +
      '<div class="stats-row">' +
        statCard(pct + "%", "总体完成度（" + visited + "/" + ALL.length + "）") +
        statCard(Object.keys(state.choice).length, "选择题已作答") +
        statCard(Object.keys(state.scenario).length, "场景题已作答") +
        statCard(Object.keys(state.quiz).length + "/7", "模块测验已完成") +
      "</div>" +
      '<div class="prog-grid">' + cards + "</div>" +
      '<button class="btn danger" data-act="reset-progress">🗑️ 重置全部学习进度</button>'
    );
  }

  /* ---------- 全局事件委托 ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var act = el.getAttribute("data-act");

    if (act === "pick") {
      if (el.hasAttribute("data-q")) {
        if (currentQuiz) currentQuiz.picks[el.getAttribute("data-q")] = +el.getAttribute("data-opt");
        return;
      }
      var card = el.closest(".ex-card");
      if (!card || card.getAttribute("data-type") !== "choice") return;
      if (el.disabled) return;
      $$(".ex-opt", card).forEach(function (b) { b.classList.remove("chosen"); });
      el.classList.add("chosen");
      card.setAttribute("data-picked", el.getAttribute("data-opt"));
      return;
    }

    if (act === "grade-choice") {
      var card2 = el.closest(".ex-card");
      var exEl = card2.closest('[data-point]') || card2.closest(".k-section");
      var picked = card2.getAttribute("data-picked");
      var chip = $('[data-role="result"]', card2);
      if (picked == null) { chip.textContent = "请先选择一个选项"; chip.className = "ex-result-chip bad"; return; }
      var point = currentPoint;
      if (!point) return;
      var key = point.p.id + "#ex" + card2.getAttribute("data-ex");
      var ex = (currentContent.exercises || [])[+card2.getAttribute("data-ex")];
      var ok = paintChoice(card2, ex, +picked, true);
      state.choice[key] = { picked: +picked, correct: ok };
      save();
      return;
    }

    if (act === "grade-scenario") {
      var card3 = el.closest(".ex-card");
      var point2 = currentPoint;
      if (!point2 || !currentContent) return;
      var ta = $('[data-role="answer"]', card3);
      var text = ta ? ta.value.trim() : "";
      var chip3 = $('[data-role="result"]', card3);
      if (!text) { chip3.textContent = "请先写下你的分析再提交"; chip3.className = "ex-result-chip bad"; return; }
      var ex3 = (currentContent.exercises || [])[+card3.getAttribute("data-ex")];
      var res3 = paintScenario(card3, ex3, text, true);
      state.scenario[point2.p.id + "#ex" + card3.getAttribute("data-ex")] = {
        text: text.slice(0, 5000), score: res3.score, total: res3.total
      };
      save();
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

    if (act === "quiz-submit") { /* 测验页在 renderReview 内单独绑定 */ return; }

    if (act === "d-next" || act === "d-prev") {
      var wrap = document.querySelector(el.getAttribute("data-steps"));
      if (!wrap) return;
      var steps = $$(".d-step", wrap);
      var cur = steps.findIndex(function (s) { return s.classList.contains("active"); });
      var dir = act === "d-next" ? 1 : -1;
      var nxt = Math.min(steps.length - 1, Math.max(0, cur + dir));
      steps.forEach(function (s, i) { s.classList.toggle("active", i === nxt); });
      var ind = document.querySelector('[data-steps-indicator="' + el.getAttribute("data-steps") + '"]');
      if (ind) ind.textContent = (nxt + 1) + " / " + steps.length;
      $$('[data-act="d-prev"][data-steps="' + el.getAttribute("data-steps") + '"]').forEach(function (b) { b.disabled = nxt === 0; });
      $$('[data-act="d-next"][data-steps="' + el.getAttribute("data-steps") + '"]').forEach(function (b) { b.disabled = nxt === steps.length - 1; });
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
      $$(".d-anim, .d-anim-late, .d-pulse", scope).forEach(function (a) {
        a.style.animation = "none";
        void a.offsetWidth;
        a.style.animation = "";
      });
      return;
    }

    if (act === "d-tab") {
      var group = el.getAttribute("data-group");
      $$('[data-act="d-tab"][data-group="' + group + '"]').forEach(function (b) { b.classList.toggle("active", b === el); });
      $$('[data-pane][data-group="' + group + '"]').forEach(function (p2) {
        p2.classList.toggle("d-hidden", p2.getAttribute("data-pane") !== el.getAttribute("data-tab"));
      });
      return;
    }

    if (act === "reset-progress") {
      if (window.confirm("确定要清空全部学习进度吗？此操作不可恢复。")) {
        state = defaultState();
        save();
        render();
      }
      return;
    }
  });

  /* range 滑杆：更新输出文本 + 设置 --v 变量 */
  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.matches && t.matches('input[type="range"][data-output]')) {
      var out = document.querySelector(t.getAttribute("data-output"));
      if (out) out.textContent = t.value + (t.getAttribute("data-suffix") || "");
      var box = t.closest(".demo-box");
      if (box) box.style.setProperty("--v", t.value);
    }
  });

  /* ---------- 当前页面上下文（判题取数据用） ---------- */
  var currentPoint = null;
  var currentContent = null;
  var currentQuiz = null;
  var _origRenderKnowledge = renderKnowledge;
  renderKnowledge = function (app, id) {
    currentPoint = byId[id] || null;
    currentContent = null;
    _origRenderKnowledge(app, id);
    getContent(id).then(function (c) {
      var r = parseHash();
      if (r.page === "knowledge" && r.id === id) currentContent = c;
    });
  };

  /* ---------- 启动 ---------- */
  window.addEventListener("hashchange", render);
  render();
})();
