#!/usr/bin/env node
/* ============================================================
 * build-index.js — 知识点索引单一数据源构建器
 * 从 data/syllabus.js（最终大纲）+ data/content/*.json 自动生成
 * data/index.js（window.KNOWLEDGE_INDEX）。
 * 技能树 / 知识点索引页 / 错题本 共用这一份数据，禁止手工编辑。
 * 用法：node tools/build-index.js
 * ============================================================ */
"use strict";
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");

function buildIndex() {
  require(path.join(ROOT, "data", "syllabus.js"));
  const S = globalThis.SYLLABUS;
  const entries = [];
  S.modules.forEach(m => {
    m.points.forEach(p => {
      let exCount = 0;
      const cf = path.join(ROOT, "data", "content", p.id + ".json");
      if (fs.existsSync(cf)) {
        try { exCount = (JSON.parse(fs.readFileSync(cf, "utf8")).exercises || []).length; } catch (e) { /* 内容缺失时 0 */ }
      }
      entries.push({
        id: p.id,
        num: p.num,
        anchor: m.id,
        anchorName: m.name,
        mastery: m.mastery,
        optional: !!(m.optional || p.optional),
        layer: m.layer,
        stage: p.stage,
        title: p.title,
        stars: p.stars,
        frontier: !!p.frontier,
        oneLiner: p.oneLiner || "",
        exCount
      });
    });
  });
  /* 索引默认排序：0 层 → 4 层 → H（锚点编号平铺顺序） */
  const layerOrder = { L0: 0, L1: 1, L2: 2, L3: 3, L4: 4, H: 5 };
  entries.sort((a, b) => {
    const la = layerOrder[a.layer] ?? 9, lb = layerOrder[b.layer] ?? 9;
    if (la !== lb) return la - lb;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
  return entries;
}

function render(entries) {
  return "/* 自动生成：node tools/build-index.js —— 数据单一来源（最终大纲），请勿手工编辑 */\n"
    + "(function (g) {\n  \"use strict\";\n  g.KNOWLEDGE_INDEX = "
    + JSON.stringify(entries)
    + ";\n})(typeof window !== \"undefined\" ? window : globalThis);\n";
}

function buildRendered() { return render(buildIndex()); }

if (require.main === module) {
  const out = path.join(ROOT, "data", "index.js");
  fs.writeFileSync(out, buildRendered(), "utf8");
  const n = buildIndex().length;
  console.log(`data/index.js 已生成：${n} 个知识点（来源：data/syllabus.js）`);
}

module.exports = { buildIndex, buildRendered };
