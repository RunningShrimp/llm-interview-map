/* ============================================================
 * md.js — 轻量 Markdown 渲染器（文档阅读页专用，无外部依赖）
 * 支持：# 标题(1-4级)、表格、```代码块```、> 引用、有序/无序列表、
 *      --- 分隔线、**粗体**、`行内代码`、段落
 * 安全：先转义 HTML，再应用转换；代码块整体转义。
 * 用法：MD.render(markdownText) -> html
 * ============================================================ */
(function (g) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function inline(s) {
    /* 输入已转义；处理 **粗体** 与 `行内代码`（行内码内容不再处理粗体） */
    var parts = String(s).split(/(`[^`]+`)/g);
    return parts.map(function (seg) {
      if (/^`[^`]+`$/.test(seg)) return "<code class=\"md-code\">" + seg.slice(1, -1) + "</code>";
      return seg.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    }).join("");
  }

  function renderTable(rows) {
    /* rows: 已去掉首尾 | 的单元格数组数组；第 2 行为分隔行 */
    var head = rows[0], body = rows.slice(2);
    var html = '<div class="md-table-wrap"><table class="md-table"><thead><tr>' +
      head.map(function (c) { return "<th>" + inline(c) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      body.map(function (r) {
        return "<tr>" + head.map(function (_, i) { return "<td>" + inline(r[i] || "") + "</td>"; }).join("") + "</tr>";
      }).join("") +
      "</tbody></table></div>";
    return html;
  }

  function render(mdText) {
    var codes = [];
    /* 1. 摘出代码块 */
    var text = String(mdText || "").replace(/\r\n/g, "\n").replace(/```(\w*)\n([\s\S]*?)```/g, function (m, lang, code) {
      codes.push('<pre class="md-pre"><code>' + esc(code.replace(/\n$/, "")) + "</code></pre>");
      return "\u0000C" + (codes.length - 1) + "\u0000";
    });

    /* 2. 转义其余文本 */
    text = esc(text);

    /* 3. 逐行分块 */
    var lines = text.split("\n");
    var out = [];
    var i = 0;
    function flushPara(buf) {
      if (buf.length) out.push("<p>" + inline(buf.join("<br>")) + "</p>");
    }
    var para = [];
    while (i < lines.length) {
      var line = lines[i];
      var t = line.trim();

      /* 代码块占位（独占一行） */
      var cm = t.match(/^\u0000C(\d+)\u0000$/);
      if (cm) { flushPara(para); para = []; out.push(codes[+cm[1]]); i++; continue; }

      if (!t) { flushPara(para); para = []; i++; continue; }

      /* 标题：# → h1，## → h2 …… */
      var h = t.match(/^(#{1,4})\s+(.*)$/);
      if (h) { flushPara(para); para = []; var lv = h[1].length; out.push("<h" + lv + ' class="md-h">' + inline(h[2]) + "</h" + lv + ">"); i++; continue; }

      /* 分隔线 */
      if (/^(-{3,}|\*{3,})$/.test(t)) { flushPara(para); para = []; out.push('<hr class="md-hr">'); i++; continue; }

      /* 表格 */
      if (/^\|.*\|$/.test(t)) {
        flushPara(para); para = [];
        var rows = [];
        while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
          var cells = lines[i].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(function (c) { return c.trim(); });
          rows.push(cells);
          i++;
        }
        if (rows.length >= 2) out.push(renderTable(rows));
        else if (rows.length === 1) out.push("<p>" + inline(rows[0].join(" | ")) + "</p>");
        continue;
      }

      /* 引用 */
      if (/^&gt;\s?/.test(t) || /^>\s?/.test(t)) {
        flushPara(para); para = [];
        var qs = [];
        while (i < lines.length && (/^&gt;\s?/.test(lines[i].trim()) || /^>\s?/.test(lines[i].trim()))) {
          qs.push(lines[i].trim().replace(/^(&gt;|>)\s?/, ""));
          i++;
        }
        out.push('<blockquote class="md-quote"><p>' + qs.map(inline).join("<br>") + "</p></blockquote>");
        continue;
      }

      /* 无序列表 */
      if (/^[-*]\s+/.test(t)) {
        flushPara(para); para = [];
        var ul = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          ul.push("<li>" + inline(lines[i].trim().replace(/^[-*]\s+/, "")) + "</li>");
          i++;
        }
        out.push("<ul>" + ul.join("") + "</ul>");
        continue;
      }

      /* 有序列表 */
      if (/^\d+\.\s+/.test(t)) {
        flushPara(para); para = [];
        var ol = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          ol.push("<li>" + inline(lines[i].trim().replace(/^\d+\.\s+/, "")) + "</li>");
          i++;
        }
        out.push("<ol>" + ol.join("") + "</ol>");
        continue;
      }

      /* 普通段落 */
      para.push(t);
      i++;
    }
    flushPara(para);
    return out.join("\n");
  }

  g.MD = { render: render, esc: esc };
})(typeof window !== "undefined" ? window : globalThis);
