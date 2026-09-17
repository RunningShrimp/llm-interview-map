#!/usr/bin/env node
/* ============================================================
 * validate-docs.js — 文档阅读页深度文档全量校验
 * 校验：51 篇齐全（43 锚点 + H×8）、10 节结构、行数 ≥250、
 *      表格 ≥3、代码块 ≥2、首行标题格式、无 emoji、无外部 URL
 * 用法：node tools/validate-docs.js
 * ============================================================ */
"use strict";
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
require(path.join(ROOT, "data", "syllabus.js"));
require(path.join(ROOT, "data", "index.js"));
const S = globalThis.SYLLABUS;
const IDX = globalThis.KNOWLEDGE_INDEX;

/* 与 app.js docsEntryFor 一致：锚点 → 文档 id */
const DOCS = [];
S.modules.forEach(m => {
  const primary = m.points[0];
  if (m.id === "H") {
    m.points.forEach(p => DOCS.push({ docId: p.num.toLowerCase(), label: p.num + " " + p.title }));
  } else {
    DOCS.push({ docId: primary.id, label: m.id + " " + m.name });
  }
});

const issues = [];
let pass = 0;
const DIR = path.join(ROOT, "data", "docs");
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

DOCS.forEach(d => {
  const f = path.join(DIR, d.docId + ".md");
  if (!fs.existsSync(f)) { issues.push(`缺少 ${d.docId}.md（${d.label}）`); return; }
  const raw = fs.readFileSync(f, "utf8");
  const lines = raw.split("\n");
  const name = `${d.docId}.md`;
  if (lines.length < 250) issues.push(`${name}：仅 ${lines.length} 行（≥250）`);
  const sections = (raw.match(/^## \d+\./gm) || []).length;
  if (sections !== 10) issues.push(`${name}：## 编号小节 ${sections}/10`);
  if (!/^# 讲解 /.test(raw)) issues.push(`${name}：首行标题应为「# 讲解 …」`);
  const tables = (raw.match(/^\|.+\|$/gm) || []).length;
  if (tables < 6) issues.push(`${name}：表格行 ${tables}（≥6，约 3 个表）`);
  const codes = (raw.match(/^```/gm) || []).length / 2;
  if (codes < 2) issues.push(`${name}：代码块 ${codes}（≥2）`);
  if (EMOJI_RE.test(raw)) issues.push(`${name}：含 emoji`);
  /* 外链检查：剔除代码块/行内码与示例域名占位后，不应有真实可点击外链 */
  const noCode = raw.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
  const realLinks = (noCode.match(/https?:\/\/[^\s）)」」]+/g) || [])
    .filter(u => !/example\.(com|org|net)|\.example|<host>|localhost|127\.0\.0\.1/i.test(u));
  if (realLinks.length) issues.push(`${name}：正文含外部 URL ${realLinks[0]}`);
  if (!raw.includes("### ") && !raw.includes("**")) issues.push(`${name}：缺少小节/粗体层次`);
  if (issues.length === 0 || !issues.some(x => x.startsWith(name))) pass++;
});

console.log(`=== 深度文档校验 === ${pass}/${DOCS.length} 篇合格（要求：10 节 / ≥250 行 / ≥3 表 / ≥2 代码块 / 首行标题 / 无 emoji / 无外链）`);
if (issues.length) {
  issues.forEach(x => console.log("  ✗ " + x));
  process.exit(1);
}
console.log("=== ALL PASS ✅ ===");
