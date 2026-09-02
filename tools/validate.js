#!/usr/bin/env node
/* ============================================================
 * validate.js — 大纲 / 知识点内容 / 回顾测验 完整性校验
 * 用法：
 *   node tools/validate.js            校验全部
 *   node tools/validate.js --module A 校验指定模块（可 A,D 逗号分隔）
 * 退出码：0 全部通过；1 存在问题
 * ============================================================ */
"use strict";
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
require(path.join(ROOT, "data", "syllabus.js"));
const S = globalThis.SYLLABUS;

const args = process.argv.slice(2);
let filter = null;
const mi = args.indexOf("--module");
if (mi !== -1 && args[mi + 1]) filter = args[mi + 1].split(",").map(s => s.trim().toUpperCase());

const norm = s => String(s == null ? "" : s).toLowerCase().replace(/\s+/g, "");
const issues = [];
const warns = [];
function err(msg) { issues.push(msg); }
function warn(msg) { warns.push(msg); }

/* ---------- 1. 大纲结构 ---------- */
const MODULE_RANGES = { A: [8, 10], B: [7, 9], C: [5, 7], D: [6, 8], E: [7, 9], F: [7, 9], G: [4, 6] };
const allIds = new Set();
const idOrder = [];
if (!S || !Array.isArray(S.modules) || S.modules.length !== 7) err("大纲：模块数应为 7，实际 " + (S && S.modules ? S.modules.length : "无"));
let total = 0;
(S.modules || []).forEach(m => {
  const range = MODULE_RANGES[m.id];
  total += m.points.length;
  if (range && (m.points.length < range[0] || m.points.length > range[1]))
    err(`大纲：模块 ${m.id} 点数 ${m.points.length} 超出区间 ${range[0]}-${range[1]}`);
  m.points.forEach(p => {
    if (allIds.has(p.id)) err(`大纲：知识点 id 重复 ${p.id}`);
    allIds.add(p.id);
    idOrder.push(p);
    if (!p.title || !p.oneLiner) err(`大纲：${p.id} 缺 title/oneLiner`);
    if (!(p.stars >= 1 && p.stars <= 5)) err(`大纲：${p.id} 星级非法：${p.stars}`);
    if (!p.source) err(`大纲：${p.id} 缺来源`);
  });
});
if (total < 44 || total > 60) err(`大纲：总点数 ${total} 超出 44-60`);
(S.modules || []).forEach(m => {
  m.points.forEach(p => {
    (p.deps || []).forEach(d => {
      if (!allIds.has(d)) err(`大纲：${p.id} 的前置依赖 ${d} 不存在`);
      else {
        const dm = (S.modules.find(x => x.points.some(q => q.id === d)) || {}).id;
        if (dm && dm > m.id) err(`大纲：${p.id}（模块${m.id}）依赖了更靠后的模块${dm} 的 ${d}`);
      }
    });
  });
});

/* ---------- 2. 内容文件 ---------- */
const JSONDIR = path.join(ROOT, "data", "content");
function checkDemoHooks(html, pid) {
  if (/<script/i.test(html)) err(`${pid}：demo.html 含 <script>（禁止）`);
  if (/https?:\/\//i.test(html)) err(`${pid}：demo.html 含外部 URL（资源必须本地化）`);
  ["data-steps", "data-target", "data-output"].forEach(attr => {
    const re = new RegExp(attr + '="#([^"]+)"', "g");
    let m2;
    while ((m2 = re.exec(html))) {
      const idsel = m2[1];
      if (!html.includes('id="' + idsel + '"')) err(`${pid}：demo.html 中 ${attr}="#${idsel}" 找不到对应 id`);
    }
  });
  if (!/(d-anim|d-pulse|d-float|d-blink|d-spin|d-shake|d-flow-line|data-act|type="range")/i.test(html))
    warn(`${pid}：demo.html 未检出任何动画/交互钩子（教学规范要求演示必须“动”）`);
}

function checkContent(p) {
  const f = path.join(JSONDIR, p.id + ".json");
  if (!fs.existsSync(f)) { err(`内容：缺少 ${p.id}.json`); return; }
  let c;
  try { c = JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (e) { err(`内容：${p.id}.json JSON 解析失败：${e.message}`); return; }

  if (c.id !== p.id) err(`${p.id}：文件内 id=${c.id} 与文件名不符`);
  if (!c.title) err(`${p.id}：缺 title`);
  if (!c.definition) err(`${p.id}：缺 definition`);
  else if (c.definition.length > 120) err(`${p.id}：definition 长 ${c.definition.length} 字（要求 ≤120）`);

  if (!Array.isArray(c.analogies) || c.analogies.length < 1) err(`${p.id}：analogies 至少 1 条`);
  else c.analogies.forEach((a, i) => { if (!a.name || !a.text) err(`${p.id}：analogies[${i}] 缺 name/text`); });

  if (!c.demo || !c.demo.title || !c.demo.description || !c.demo.html) err(`${p.id}：demo 缺 title/description/html`);
  else {
    if (c.demo.html.length < 60) err(`${p.id}：demo.html 过短`);
    checkDemoHooks(c.demo.html, p.id);
  }

  if (!Array.isArray(c.keyPoints) || c.keyPoints.length < 3 || c.keyPoints.length > 8)
    err(`${p.id}：keyPoints 应为 3-8 条，实际 ${c.keyPoints ? c.keyPoints.length : 0}`);
  else c.keyPoints.forEach((k, i) => { if (!k.name || !k.text) err(`${p.id}：keyPoints[${i}] 缺 name/text`); });

  const exs = c.exercises;
  if (!Array.isArray(exs) || exs.length < 2) err(`${p.id}：exercises 至少 2 道`);
  else {
    if (!exs.some(e => e.type === "choice")) err(`${p.id}：至少 1 道选择题`);
    if (!exs.some(e => e.type === "scenario")) err(`${p.id}：至少 1 道场景分析题`);
    exs.forEach((ex, i) => {
      if (!ex.q) err(`${p.id}：exercises[${i}] 缺题干 q`);
      if (ex.type === "choice") {
        if (!Array.isArray(ex.options) || ex.options.length < 2) err(`${p.id}：exercises[${i}] 选项不足`);
        if (!(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < (ex.options || []).length))
          err(`${p.id}：exercises[${i}] answer 下标非法`);
        if (!ex.explain) err(`${p.id}：exercises[${i}] 缺解析 explain`);
      } else if (ex.type === "scenario") {
        if (!ex.reference) err(`${p.id}：exercises[${i}] 缺参考答案 reference`);
        const kps = ex.keyPoints;
        if (!Array.isArray(kps) || kps.length < 3 || kps.length > 6) err(`${p.id}：exercises[${i}] keyPoints 应 3-6 条`);
        else {
          const refNorm = norm(ex.reference);
          kps.forEach((k, j) => {
            if (!k.point) err(`${p.id}：exercises[${i}].keyPoints[${j}] 缺 point`);
            if (!Array.isArray(k.kw) || k.kw.length === 0) err(`${p.id}：exercises[${i}].keyPoints[${j}] 缺 kw`);
            else (k.kw || []).forEach(kw => {
              if (!refNorm.includes(norm(kw)))
                err(`${p.id}：exercises[${i}] 关键词「${kw}」未出现在参考答案中（判题自洽性）`);
            });
          });
        }
      } else err(`${p.id}：exercises[${i}] type 非法：${ex.type}`);
    });
  }

  if (!c.feynman || !c.feynman.prompt || !c.feynman.hint || !c.feynman.modelAnswer)
    err(`${p.id}：feynman 缺 prompt/hint/modelAnswer`);

  if (!Array.isArray(c.links) || c.links.length < 1) err(`${p.id}：links 至少 1 条`);
  else c.links.forEach((l, i) => {
    if (!l.to || !allIds.has(l.to)) err(`${p.id}：links[${i}] 指向不存在的 id：${l.to}`);
    if (!l.text) err(`${p.id}：links[${i}] 缺 text`);
  });

  if (!Array.isArray(c.interview) || c.interview.length < 1) err(`${p.id}：interview 至少 1 条`);
  else c.interview.forEach((q, i) => {
    if (!q.q || !q.source) err(`${p.id}：interview[${i}] 缺 q/source`);
    if (!(q.stars >= 1 && q.stars <= 5)) warn(`${p.id}：interview[${i}] 星级未标注`);
  });

  const qCount = String(c.summary || "").split("\n").filter(l => /^Q：/.test(l.trim())).length;
  if (qCount < 2) err(`${p.id}：summary 应包含 ≥2 个「Q：…（答：…）」行`);
}

/* ---------- 3. 回顾测验 ---------- */
function checkQuiz(m) {
  const f = path.join(ROOT, "data", "quizzes", "module-" + m.id.toLowerCase() + ".json");
  if (!fs.existsSync(f)) { err(`测验：缺少 module-${m.id.toLowerCase()}.json`); return; }
  let q;
  try { q = JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (e) { err(`测验：module-${m.id.toLowerCase()}.json 解析失败：${e.message}`); return; }
  const qs = q.questions || [];
  if (qs.length < 4) err(`测验${m.id}：题目应 ≥4，实际 ${qs.length}`);
  const refs = new Set();
  qs.forEach((x, i) => {
    if (!x.q) err(`测验${m.id}：第 ${i + 1} 题缺题干`);
    if (!Array.isArray(x.options) || x.options.length < 2) err(`测验${m.id}：第 ${i + 1} 题选项不足`);
    if (!(Number.isInteger(x.answer) && x.answer >= 0 && x.answer < (x.options || []).length))
      err(`测验${m.id}：第 ${i + 1} 题 answer 非法`);
    if (!x.explain) err(`测验${m.id}：第 ${i + 1} 题缺解析`);
    if (x.ref) {
      if (!allIds.has(x.ref)) err(`测验${m.id}：第 ${i + 1} 题 ref 不存在：${x.ref}`);
      refs.add(x.ref);
    }
  });
  if (refs.size < 4) warn(`测验${m.id}：覆盖知识点 ${refs.size} 个（建议 ≥4）`);
}

/* ---------- 4. 执行 ---------- */
const targets = filter ? (S.modules || []).filter(m => filter.includes(m.id)) : (S.modules || []);
targets.forEach(m => {
  m.points.forEach(checkContent);
  checkQuiz(m);
});

/* ---------- 5. 报告 ---------- */
console.log("=== 大纲校验 ===");
console.log(`模块数 ${S.modules.length}，总点数 ${total}（要求 44-60）`);
(S.modules || []).forEach(m => {
  const inRange = (() => { const r = MODULE_RANGES[m.id]; return m.points.length >= r[0] && m.points.length <= r[1]; })();
  console.log(`  模块${m.id} ${m.name}: ${m.points.length} 点 ${inRange ? "✓" : "✗超区间"}`);
});
const targetIds = [];
targets.forEach(m => m.points.forEach(p => targetIds.push(p.id)));
const have = targetIds.filter(id => fs.existsSync(path.join(JSONDIR, id + ".json"))).length;
console.log(`=== 内容覆盖 === ${have}/${targetIds.length}（当前校验范围）`);
if (warns.length) { console.log("=== 警告 ==="); warns.forEach(w => console.log("  ⚠ " + w)); }
if (issues.length) {
  console.log(`=== 问题（${issues.length}）===`);
  issues.forEach(e => console.log("  ✗ " + e));
  process.exit(1);
} else {
  console.log("=== ALL PASS ✅ ===");
}
