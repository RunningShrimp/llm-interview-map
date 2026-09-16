#!/usr/bin/env node
/* ============================================================
 * validate.js v4 — rodmap 锚点 × 七关卡 大纲/内容/Boss/任务卡 校验
 * 用法：node tools/validate.js [--module 2.5]（可 0.4,H 逗号分隔）
 * 校验：43 锚点全覆盖、每锚点 1-4 点（主点+≤3子点）、总点数 60-95、
 *      🆕≥10、选修标记、deps 顺序、内容 schema、判题自洽、
 *      Boss s0-s6 题库、任务卡 t0-t6 结构
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
if (mi !== -1 && args[mi + 1]) filter = args[mi + 1].split(",").map(s => s.trim());

const norm = s => String(s == null ? "" : s).toLowerCase().replace(/\s+/g, "");
const issues = [], warns = [];
const err = m => issues.push(m);
const warn = m => warns.push(m);

/* rodmap.md 权威锚点清单（43 个） */
const RODMAP_ANCHORS = [
  "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7",
  "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7",
  "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9",
  "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9", "3.10",
  "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10"
];
const OPTIONAL_ANCHORS = new Set(["3.3", "4.4"]);
const STAGES = ["S0", "S1", "S2", "S3", "S4", "S5", "S6"];
const MASTERY = /^(了解|理解|会用|熟练|精通)(-(了解|理解|会用|熟练|精通))?$/;

/* ---------- 学习顺序：关卡 → 锚点（rodmap 顺序）→ 主点/子点 ---------- */
const STAGE_INDEX = {};
S.levels.forEach((lv, i) => { STAGE_INDEX[lv.id] = i; });
const ORDER = [];
S.levels.forEach(lv => {
  S.modules.forEach(m => m.points.forEach(p => { if (p.stage === lv.id) ORDER.push({ m, p }); }));
});
const allIds = new Set(ORDER.map(e => e.p.id));
const orderIdx = {};
ORDER.forEach((e, i) => { orderIdx[e.p.id] = i; });

/* ---------- 1. 大纲结构 ---------- */
if (!S || !Array.isArray(S.levels) || S.levels.length !== 7) err("大纲：关卡数应为 7");
S.levels.forEach((lv, i) => {
  if (lv.id !== STAGES[i]) err(`大纲：第 ${i + 1} 关应为 ${STAGES[i]}`);
  if (i > 0 && lv.unlockBy !== STAGES[i - 1]) err(`大纲：${lv.id} unlockBy 应为 ${STAGES[i - 1]}`);
  if (!lv.project) err(`大纲：${lv.id} 缺里程碑项目`);
});
if (!Array.isArray(S.modules) || S.modules.length !== 44) err(`大纲：锚点数应为 44（43+H），实际 ${S.modules && S.modules.length}`);

const seenIds = new Set();
const anchorIds = new Set();
const stageCount = {};
let total = 0;
(S.modules || []).forEach(m => {
  anchorIds.add(m.id);
  if (m.id !== "H") {
    if (!/^[0-4]\.[0-9]+$/.test(m.id)) err(`大纲：锚点编号非法 ${m.id}`);
  }
  if (OPTIONAL_ANCHORS.has(m.id) !== !!m.optional) err(`大纲：${m.id} 选修标记应为 ${OPTIONAL_ANCHORS.has(m.id)}`);
  if (!m.keyQuestion) err(`大纲：锚点 ${m.id} 缺 keyQuestion`);
  if (!m.mastery || !MASTERY.test(m.mastery)) err(`大纲：锚点 ${m.id} 掌握程度非法 ${m.mastery}`);
  const maxPts = m.id === "H" ? 8 : 4;
  if (m.points.length < 1 || m.points.length > maxPts) err(`大纲：锚点 ${m.id} 点数 ${m.points.length} 超出 1-${maxPts}`);
  m.points.forEach((p, pi) => {
    total++;
    if (seenIds.has(p.id)) err(`大纲：id 重复 ${p.id}`);
    seenIds.add(p.id);
    if (!STAGES.includes(p.stage)) err(`大纲：${p.id} 关卡非法 ${p.stage}`);
    stageCount[p.stage] = (stageCount[p.stage] || 0) + 1;
    if (!p.title || !p.oneLiner) err(`大纲：${p.id} 缺 title/oneLiner`);
    if (!(p.stars >= 1 && p.stars <= 5)) err(`大纲：${p.id} 星级非法`);
    if (!p.source) err(`大纲：${p.id} 缺来源`);
    if (pi === 0 && p.id !== m.id.replace(/\./g, "-") && !/^h\d/.test(p.id))
      err(`大纲：锚点 ${m.id} 主知识点 id 应为锚点号 ${p.id}`);
    if (p.optional && !m.optional) err(`大纲：${p.id} 标选修但锚点非选修`);
  });
});
RODMAP_ANCHORS.forEach(a => { if (!anchorIds.has(a)) err(`大纲：rodmap 锚点缺失 ${a}`); });
if (!anchorIds.has("H")) err("大纲：缺增量模块H");
if (total < 60 || total > 95) err(`大纲：总点数 ${total} 超出 60-95`);
const frontierCount = ORDER.filter(e => e.p.frontier).length;
if (frontierCount < 10) err(`大纲：🆕 前沿点数 ${frontierCount}（要求 ≥10）`);
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
    if (!hasBack && (p.deps || []).length) warn(`${pid}：无前置链接（依赖 ${p.deps.join(",")} 未出现在 links）`);
    if (!hasFwd && orderIdx[pid] < ORDER.length - 1) warn(`${pid}：无后继链接`);
  }
  if (!Array.isArray(c.interview) || c.interview.length < 1) err(`${pid}：interview ≥1`);
  else c.interview.forEach((q, i) => { if (!q.q || !q.source) err(`${pid}：interview[${i}] 缺 q/source`); });
  const qCount = String(c.summary || "").split("\n").filter(l => /^Q：/.test(l.trim())).length;
  if (qCount < 2) err(`${pid}：summary 应含 ≥2 个「Q：…（答：…）」行`);
}

/* ---------- 3. Boss 题库 ---------- */
function checkBoss(sid) {
  const f = path.join(ROOT, "data", "boss", sid.toLowerCase() + ".json");
  if (!fs.existsSync(f)) { err(`Boss：缺少 ${sid.toLowerCase()}.json`); return; }
  let b;
  try { b = JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (e2) { err(`Boss：${sid}.json 解析失败：${e2.message}`); return; }
  const qs = b.questions || [];
  if (qs.length !== 10) err(`Boss ${sid}：题目应恰好 10 道，实际 ${qs.length}`);
  const stagePts = new Set(ORDER.filter(e => e.p.stage === sid).map(e => e.p.id));
  qs.forEach((q, i) => {
    if (!q.q) err(`Boss ${sid}：第 ${i + 1} 题缺题干`);
    if (!Array.isArray(q.options) || q.options.length < 2) err(`Boss ${sid}：第 ${i + 1} 题选项不足`);
    if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < (q.options || []).length))
      err(`Boss ${sid}：第 ${i + 1} 题 answer 非法`);
    if (!q.explain) err(`Boss ${sid}：第 ${i + 1} 题缺解析`);
    if (q.ref && !allIds.has(q.ref)) err(`Boss ${sid}：第 ${i + 1} 题 ref 不存在 ${q.ref}`);
    else if (q.ref && !stagePts.has(q.ref)) warn(`Boss ${sid}：第 ${i + 1} 题 ref 不属于本关卡（${q.ref}）`);
  });
  const covered = new Set(qs.map(q => q.ref).filter(Boolean));
  if (covered.size < 5) warn(`Boss ${sid}：仅覆盖 ${covered.size} 个考点（建议 ≥5）`);
}

/* ---------- 4. 实战任务卡 ---------- */
function checkTask(sid) {
  const f = path.join(ROOT, "data", "tasks", sid.toLowerCase() + ".json");
  if (!fs.existsSync(f)) { err(`任务卡：缺少 ${sid.toLowerCase()}.json`); return; }
  let t;
  try { t = JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (e2) { err(`任务卡：${sid}.json 解析失败：${e2.message}`); return; }
  if (t.stage !== sid) err(`任务卡 ${sid}：stage=${t.stage} 不符`);
  if (!t.project) err(`任务卡 ${sid}：缺 project`);
  if (!Array.isArray(t.steps) || t.steps.length < 3) err(`任务卡 ${sid}：steps 应 ≥3`);
  else t.steps.forEach((s2, i) => { if (!s2.title || !s2.detail) err(`任务卡 ${sid}：steps[${i}] 缺字段`); });
  if (!Array.isArray(t.checklist) || t.checklist.length < 3) err(`任务卡 ${sid}：checklist 应 ≥3`);
  if (t.arch && /https?:\/\//i.test(t.arch)) err(`任务卡 ${sid}：arch 含外部 URL`);
  if (!Array.isArray(t.tips) || t.tips.length < 1) warn(`任务卡 ${sid}：建议补 tips`);
}

/* ---------- 5. 执行与报告 ---------- */
const targets = filter ? S.modules.filter(m => filter.includes(m.id)) : S.modules;
targets.forEach(m => m.points.forEach(p => checkContent({ m, p })));
const checkAll = !filter;
if (checkAll) {
  STAGES.forEach(checkBoss);
  STAGES.forEach(checkTask);
  /* 退役文件检查：data/content 中不应残留大纲外的旧文件 */
  fs.readdirSync(JSONDIR).forEach(fn => {
    if (!fn.endsWith(".json")) return;
    const id = fn.slice(0, -5);
    if (!allIds.has(id)) err(`内容：${fn} 不在大纲中（退役未清理）`);
  });
}

console.log("=== 大纲校验（v4 七关卡 × 43 锚点）===");
console.log(`总点数 ${total}（60-95）｜ 🆕前沿 ${frontierCount} ｜ 锚点 ${anchorIds.size}/44`);
console.log(`关卡分布 ` + STAGES.map(s2 => `${s2}:${stageCount[s2] || 0}`).join(" "));
S.modules.forEach(m => {
  const st = m.points.map(p => p.stage).filter((v, i, a) => a.indexOf(v) === i).join(",");
  console.log(`  锚点 ${m.id}${m.optional ? "*" : ""} ${m.points.length}点（${st}）`);
});
const scopeIds = [];
targets.forEach(m => m.points.forEach(p => scopeIds.push(p.id)));
const have = scopeIds.filter(id => fs.existsSync(path.join(JSONDIR, id + ".json"))).length;
console.log(`=== 内容覆盖 === ${have}/${scopeIds.length}（当前范围）`);
if (warns.length) { console.log(`=== 警告（${warns.length}）===`); warns.forEach(w => console.log("  ⚠ " + w)); }
if (issues.length) {
  console.log(`=== 问题（${issues.length}）===`);
  issues.forEach(e2 => console.log("  ✗ " + e2));
  process.exit(1);
} else console.log("=== ALL PASS ✅ ===");
