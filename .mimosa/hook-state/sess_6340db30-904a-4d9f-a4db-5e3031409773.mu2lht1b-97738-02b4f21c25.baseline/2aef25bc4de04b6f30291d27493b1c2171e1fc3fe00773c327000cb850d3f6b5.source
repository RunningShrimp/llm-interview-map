#!/usr/bin/env node
/* judge.test.js — 判题引擎单元测试（node tools/judge.test.js） */
"use strict";
const path = require("path");
require(path.join(__dirname, "..", "js", "judge.js"));
const J = globalThis.Judge;

let failed = 0;
function t(name, cond) {
  if (cond) { console.log("  ✓ " + name); }
  else { console.log("  ✗ " + name); failed++; }
}

/* ---------- hitAny ---------- */
t("hitAny: 中文关键词命中", J.hitAny("我会用向量数据库存 embedding", ["向量数据库"]));
t("hitAny: 大小写与空白不敏感", J.hitAny("Using  LayerNorm to stabilize", ["layernorm"]));
t("hitAny: 同义词任一命中", J.hitAny("加上残差链接", ["残差连接", "残差"]));
t("hitAny: 未命中返回 false", J.hitAny("完全无关的内容", ["向量数据库"]) === false);
t("hitAny: 空文本安全", J.hitAny("", ["kw"]) === false);
t("hitAny: 空 kw 安全", J.hitAny("text", []) === false);

/* ---------- gradeChoice ---------- */
const ex = { options: ["A", "B", "C"], answer: 2 };
t("gradeChoice: 正确", J.gradeChoice(ex, 2).correct === true);
t("gradeChoice: 错误", J.gradeChoice(ex, 0).correct === false);
t("gradeChoice: 返回正确下标", J.gradeChoice(ex, 1).answerIndex === 2);

/* ---------- gradeScenario ---------- */
const sc = {
  keyPoints: [
    { point: "提到 RAG", kw: ["rag", "检索增强"] },
    { point: "提到向量库", kw: ["向量数据库", "milvus", "faiss"] },
    { point: "提到重排", kw: ["rerank", "重排"] }
  ]
};
const r1 = J.gradeScenario(sc, "我们的 RAG 系统用向量数据库存文档，再用 rerank 模型重排。");
t("gradeScenario: 全命中 3/3", r1.score === 3 && r1.total === 3);
t("gradeScenario: 逐点命中标记", r1.details.every(d => d.hit === true));
const r2 = J.gradeScenario(sc, "只提到向量数据库。");
t("gradeScenario: 部分命中 1/3", r2.score === 1);
t("gradeScenario: 未命中项标记 miss", r2.details.filter(d => !d.hit).length === 2);
const r3 = J.gradeScenario(sc, "");
t("gradeScenario: 空作答 0 分", r3.score === 0);

/* ---------- gradeQuiz ---------- */
const qs = [{ answer: 1 }, { answer: 0 }, { answer: 2 }, { answer: 3 }];
const rq = J.gradeQuiz(qs, [1, 2, 2, 3]);
t("gradeQuiz: 得分 3/4", rq.score === 3 && rq.total === 4);
t("gradeQuiz: 逐题判定", rq.per[1].correct === false && rq.per[0].correct === true);
const ru = J.gradeQuiz(qs, [-1, -1, -1, -1]);
t("gradeQuiz: 全未作答 0 分", ru.score === 0);

/* ---------- 真实数据自洽性抽测：全部知识点 scenario 判题 ---------- */
const fs = require("fs");
const pathRoot = path.join(__dirname, "..");
const contentDir = path.join(pathRoot, "data", "content");
let scenarioTotal = 0;
if (fs.existsSync(contentDir)) {
  fs.readdirSync(contentDir).forEach(f => {
    if (!f.endsWith(".json")) return;
    const c = JSON.parse(fs.readFileSync(path.join(contentDir, f), "utf8"));
    (c.exercises || []).forEach((ex2, i) => {
      if (ex2.type !== "scenario") return;
      scenarioTotal++;
      /* 用参考答案本身作答应得满分（判题自洽） */
      const full = J.gradeScenario(ex2, ex2.reference);
      t(`${c.id}#ex${i} 参考答案自洽（满分）`, full.score === full.total && full.total >= 3);
    });
  });
  console.log(`  （共抽测 ${scenarioTotal} 道场景题的自洽性）`);
} else {
  console.log("  （内容目录尚未生成，跳过数据自洽抽测）");
}

console.log(failed === 0 ? "=== 判题引擎单测 ALL PASS ✅ ===" : `=== ${failed} 项失败 ✗ ===`);
process.exit(failed === 0 ? 0 : 1);
