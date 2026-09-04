#!/usr/bin/env node
/* ============================================================
 * validate.js v2 — 大纲 / 知识点内容 / Boss 题库 完整性校验
 * 用法：node tools/validate.js [--module A] （可 A,D 逗号分隔）
 * 校验：模块×层级区间、层级均衡(≥10)、deps 顺序、内容 schema、
 *      判题自洽（场景题 kw ⊆ reference）、Boss 题库、内容覆盖率
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
const issues = [], warns = [];
const err = m => issues.push(m);
const warn = m => warns.push(m);

/* ---------- 学习顺序：层级优先，同级 A→G ---------- */
const LEVEL_INDEX = {};
S.levels.forEach((lv, i) => { LEVEL_INDEX[lv.id] = i; });
const ORDER = [];
S.levels.forEach(lv => {
  S.modules.forEach(m => m.points.forEach(p => { if (p.level === lv.id) ORDER.push({ m, p }); }));
});
const allIds = new Set(ORDER.map(e => e.p.id));
const orderIdx = {};
ORDER.forEach((e, i) => { orderIdx[e.p.id] = i; });

/* ---------- 1. 矩阵结构 ---------- */
const MODULE_RANGES = { A: [10, 15], B: [10, 14], C: [8, 11], D: [9, 13], E: [9, 13], F: [9, 12], G: [6, 9] };
const LEVEL_MIN = 10;
if (!S || !Array.isArray(S.modules) || S.modules.length !== 7) err("大纲：模块数应为 7");
if (!Array.isArray(S.levels) || S.levels.length !== 4) err("大纲：层级数应为 4");
const levelCount = { L1: 0, L2: 0, L3: 0, L4: 0 };
const seenIds = new Set();
(S.modules || []).forEach(m => {
  const range = MODULE_RANGES[m.id];
  if (range && (m.points.length < range[0] || m.points.length > range[1]))
    err(`大纲：模块 ${m.id} 点数 ${m.points.length} 超出区间 ${range[0]}-${range[1]}`);
  m.points.forEach(p => {
    if (seenIds.has(p.id)) err(`大纲：id 重复 ${p.id}`);
    seenIds.add(p.id);
    if (!levelCount[p.level] && levelCount[p.level] !== 0) err(`大纲：${p.id} 层级非法 ${p.level}`);
    else levelCount[p.level]++;
    if (!p.title || !p.oneLiner) err(`大纲：${p.id} 缺 title/oneLiner`);
    if (!(p.stars >= 1 && p.stars <= 5)) err(`大纲：${p.id} 星级非法`);
    if (!p.source) err(`大纲：${p.id} 缺来源`);
  });
});
Object.keys(levelCount).forEach(k => {
  if (levelCount[k] < LEVEL_MIN) err(`大纲：层级 ${k} 仅 ${levelCount[k]} 点（要求 ≥${LEVEL_MIN}）`);
});
const total = ORDER.length;
if (total < 60 || total > 90) err(`大纲：总点数 ${total} 超出 60-90`);
ORDER.forEach(e => {
  (e.p.deps || []).forEach(d => {
    if (!allIds.has(d)) err(`大纲：${e.p.id} 依赖不存在 ${d}`);
    else if (orderIdx[d] >= orderIdx[e.p.id]) err(`大纲：${e.p.id} 依赖了学习顺序中更靠后的 ${d}`);
  });
});

/* ---------- 2. 知识点内容 ---------- */
const JSONDIR = path.join(ROOT, "data", "content");
function checkDemoHooks(html, pid) {
  if (/<script/i.test(html)) err(`${pid}：demo.html 含 <script>`);
  if (/https?:\/\//i.test(html)) err(`${pid}：demo.html 含外部 URL`);
  ["data-steps", "data-target", "data-output"].forEach(attr => {
    const re = new RegExp(attr + '="#([^"]+)"', "g");
    let m2;
    while ((m2 = re.exec(html))) {
      if (!html.includes('id="' + m2[1] + '"')) err(`${pid}：demo.html ${attr}="#${m2[1]}" 找不到对应 id`);
    }
  });
  if (!/(d-anim|d-pulse|d-float|d-blink|d-spin|d-shake|d-flow-line|data-act|type="range")/i.test(html))
    warn(`${pid}：demo 未检出动画/交互钩子（规范要求可交互把玩）`);
}
function checkContent(e) {
  const p = e.p, pid = p.id;
  const f = path.join(JSONDIR, pid + ".json");
  if (!fs.existsSync(f)) { err(`内容：缺少 ${pid}.json`); return; }
  let c;
  try { c = JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (err2) { err(`内容：${pid}.json JSON 解析失败：${err2.message}`); return; }
  if (c.id !== pid) err(`${pid}：文件内 id=${c.id} 不符`);
  if (!c.title) err(`${pid}：缺 title`);
  if (!c.definition) err(`${pid}：缺 definition`);
  else if (c.definition.length > 120) err(`${pid}：definition ${c.definition.length} 字（≤120）`);
  if (!Array.isArray(c.analogies) || c.analogies.length < 1) err(`${pid}：analogies ≥1`);
  else c.analogies.forEach((a, i) => { if (!a.name || !a.text) err(`${pid}：analogies[${i}] 缺字段`); });
  if (!c.demo || !c.demo.title || !c.demo.description || !c.demo.html) err(`${pid}：demo 缺字段`);
  else { if (c.demo.html.length < 60) err(`${pid}：demo.html 过短`); checkDemoHooks(c.demo.html, pid); }
  if (!Array.isArray(c.keyPoints) || c.keyPoints.length < 3 || c.keyPoints.length > 8)
    err(`${pid}：keyPoints 应 3-8 条`);
  else c.keyPoints.forEach((k, i) => { if (!k.name || !k.text) err(`${pid}：keyPoints[${i}] 缺字段`); });

  const exs = c.exercises;
  if (!Array.isArray(exs) || exs.length < 2) err(`${pid}：exercises ≥2`);
  else {
    if (!exs.some(x => x.type === "choice")) err(`${pid}：缺选择题`);
    if (!exs.some(x => x.type === "scenario")) err(`${pid}：缺场景题`);
    exs.forEach((ex, i) => {
      if (!ex.q) err(`${pid}：exercises[${i}] 缺题干`);
      if (ex.type === "choice") {
        if (!Array.isArray(ex.options) || ex.options.length < 2) err(`${pid}：exercises[${i}] 选项不足`);
        if (!(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < (ex.options || []).length))
          err(`${pid}：exercises[${i}] answer 非法`);
        if (!ex.explain) err(`${pid}：exercises[${i}] 缺解析`);
      } else if (ex.type === "scenario") {
        if (!ex.reference) err(`${pid}：exercises[${i}] 缺 reference`);
        const kps = ex.keyPoints;
        if (!Array.isArray(kps) || kps.length < 3 || kps.length > 6) err(`${pid}：exercises[${i}] keyPoints 应 3-6`);
        else {
          const refNorm = norm(ex.reference);
          kps.forEach((k, j) => {
            if (!k.point) err(`${pid}：ex[${i}].keyPoints[${j}] 缺 point`);
            if (!Array.isArray(k.kw) || k.kw.length === 0) err(`${pid}：ex[${i}].keyPoints[${j}] 缺 kw`);
            else (k.kw || []).forEach(kw => {
              if (!refNorm.includes(norm(kw))) err(`${pid}：ex[${i}] 关键词「${kw}」不在参考答案中（判题自洽）`);
            });
          });
        }
      } else err(`${pid}：exercises[${i}] type 非法`);
    });
  }
  if (!c.feynman || !c.feynman.prompt || !c.feynman.hint || !c.feynman.modelAnswer) err(`${pid}：feynman 缺字段`);
  if (!Array.isArray(c.links) || c.links.length < 2) err(`${pid}：links 至少 2 条（前置+后继）`);
  else {
    let hasBack = false, hasFwd = false;
    c.links.forEach((l, i) => {
      if (!l.to || !allIds.has(l.to)) err(`${pid}：links[${i}] 指向不存在 ${l.to}`);
      else {
        if (orderIdx[l.to] < orderIdx[pid]) hasBack = true; else hasFwd = true;
      }
      if (!l.text) err(`${pid}：links[${i}] 缺 text`);
    });
    if (!hasBack && (p.deps || []).length) warn(`${pid}：无前向低层级链接（依赖 ${p.deps.join(",")} 未出现在 links）`);
    if (!hasFwd && orderIdx[pid] < ORDER.length - 1) warn(`${pid}：无后继链接`);
  }
  if (!Array.isArray(c.interview) || c.interview.length < 1) err(`${pid}：interview ≥1`);
  else c.interview.forEach((q, i) => { if (!q.q || !q.source) err(`${pid}：interview[${i}] 缺 q/source`); });
  const qCount = String(c.summary || "").split("\n").filter(l => /^Q：/.test(l.trim())).length;
  if (qCount < 2) err(`${pid}：summary 应含 ≥2 个「Q：…（答：…）」行`);
}

/* ---------- 3. Boss 题库 ---------- */
function checkBoss(lv) {
  const f = path.join(ROOT, "data", "boss", lv.toLowerCase() + ".json");
  if (!fs.existsSync(f)) { err(`Boss：缺少 ${lv.toLowerCase()}.json`); return; }
  let b;
  try { b = JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (e2) { err(`Boss：${lv}.json 解析失败：${e2.message}`); return; }
  const qs = b.questions || [];
  if (qs.length < 8) err(`Boss ${lv}：题目应 ≥8，实际 ${qs.length}`);
  const levelPts = new Set(ORDER.filter(e => e.p.level === lv).map(e => e.p.id));
  qs.forEach((q, i) => {
    if (!q.q) err(`Boss ${lv}：第 ${i + 1} 题缺题干`);
    if (!Array.isArray(q.options) || q.options.length < 2) err(`Boss ${lv}：第 ${i + 1} 题选项不足`);
    if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < (q.options || []).length))
      err(`Boss ${lv}：第 ${i + 1} 题 answer 非法`);
    if (!q.explain) err(`Boss ${lv}：第 ${i + 1} 题缺解析`);
    if (q.ref && !allIds.has(q.ref)) err(`Boss ${lv}：第 ${i + 1} 题 ref 不存在 ${q.ref}`);
    else if (q.ref && !levelPts.has(q.ref)) warn(`Boss ${lv}：第 ${i + 1} 题 ref 不属于本层级（${q.ref}）`);
  });
}

/* ---------- 4. 执行与报告 ---------- */
const targets = filter ? S.modules.filter(m => filter.includes(m.id)) : S.modules;
targets.forEach(m => m.points.forEach(p => checkContent({ m, p })));
const checkAllBoss = !filter;
if (checkAllBoss) ["L1", "L2", "L3", "L4"].forEach(checkBoss);

console.log("=== 矩阵校验 ===");
console.log(`总点数 ${total}（60-90）｜ 层级分布 L1:${levelCount.L1} L2:${levelCount.L2} L3:${levelCount.L3} L4:${levelCount.L4}（每级 ≥${LEVEL_MIN}）`);
S.modules.forEach(m => {
  const r = MODULE_RANGES[m.id];
  const ok = m.points.length >= r[0] && m.points.length <= r[1];
  const dist = ["L1", "L2", "L3", "L4"].map(l => m.points.filter(p => p.level === l).length).join("/");
  console.log(`  模块${m.id} ${m.points.length}点（L1/L2/L3/L4=${dist}）${ok ? "✓" : "✗超区间"}`);
});
const scopeIds = [];
targets.forEach(m => m.points.forEach(p => scopeIds.push(p.id)));
const have = scopeIds.filter(id => fs.existsSync(path.join(JSONDIR, id + ".json"))).length;
console.log(`=== 内容覆盖 === ${have}/${scopeIds.length}（当前范围）`);
if (warns.length) { console.log("=== 警告 ==="); warns.forEach(w => console.log("  ⚠ " + w)); }
if (issues.length) {
  console.log(`=== 问题（${issues.length}）===`);
  issues.forEach(e2 => console.log("  ✗ " + e2));
  process.exit(1);
} else console.log("=== ALL PASS ✅ ===");
