# CONTENT-SPEC.md v2 — 知识点内容数据规范（层级版）

站点为纯静态 SPA：壳与交互在 `index.html`/`css`/`js`，每个知识点教学内容在
`data/content/<id>.json`，Boss 战题库在 `data/boss/<l1..l4>.json`。
页面模板、判题引擎、XP/等级、Boss 战、错题本已全部实现，你只需产出**合法 JSON**。

## 层级讲解深度校准（最重要）

| 层级 | 深度要求 | 定义/类比风格 | 例题难度 |
|---|---|---|---|
| L1 筑基 | 「是什么、为什么重要」，零术语门槛 | 生活类比为主，术语随手括号解释 | 直觉判断题 + 简单场景 |
| L2 应用 | 「怎么用、怎么选」 | 场景演练，给出可操作步骤与参数经验值 | 参数/选型题 + 工作场景题 |
| L3 原理 | 「为什么有效」机制推导 | 公式/机制拆解，方案对比表 | 机制辨析 + 排查类场景 |
| L4 专家 | 架构师权衡、趋势、能出题 | 权衡表（每个选择说代价）、演进路线 | 架构设计题 + 追问链场景 |

同一名词跨层级出现时：低层级用类比，高层级给机制；两页互挂知识联系。

## 一、知识点文件 `data/content/<id>.json`

```json
{
  "id": "a7-self-attention-qkv",
  "title": "Self-Attention 与 QKV 推导",
  "definition": "≤120 字，术语随手解释",
  "analogies": [{ "icon": "💡", "name": "类比名", "text": "场景化类比 100-200 字" }],
  "demo": { "title": "…", "description": "…怎么玩", "html": "…可交互把玩的 HTML…" },
  "keyPoints": [{ "icon": "📌", "name": "要点名", "text": "60 字内" }],
  "exercises": [
    { "type": "choice", "q": "…", "options": ["…"], "answer": 2, "explain": "自洽解析" },
    { "type": "scenario", "q": "…", "reference": "参考答案 150-300 字",
      "keyPoints": [{ "point": "要点描述", "kw": ["关键词"] }], "explain": "点评" }
  ],
  "feynman": { "prompt": "…", "hint": "…", "modelAnswer": "…" },
  "links": [
    { "to": "前置知识点id（学习顺序更早）", "text": "L3 你将看到…正是 L1 类比中的…" },
    { "to": "后继知识点id（学习顺序更晚）", "text": "学完本考点后你会发现…" }
  ],
  "interview": [{ "q": "真实问法", "stars": 5, "source": "来源", "tip": "答题要点" }],
  "summary": "Q：问题1？（答：要点）\nQ：问题2？（答：要点）"
}
```

### 硬性要求（validate.js 校验）
| 字段 | 要求 |
|---|---|
| definition | ≤120 字，术语随文解释 |
| analogies | ≥1，场景化 |
| demo | ≥1 个且**必须可交互把玩**：range 滑杆改参数观察变化（data-output + `--v` CSS 变量）、d-tab 切换对比、d-toggle 揭示、d-steps 步进；纯自动播放动画不算达标 |
| keyPoints | 3-8 条 |
| exercises | ≥2：≥1 choice（answer 合法、explain 自洽）+ ≥1 scenario（keyPoints 3-6 条，**每条 kw 必须逐字出现在 reference 中**） |
| feynman | prompt/hint/modelAnswer 齐全 |
| **links** | **≥2 条且同时覆盖前置（学习顺序更早）与后继（更晚）**；句式：前置「L3 你将看到 X 的原理正是 L1 类比中的 Y」；后继「学完本考点后你会发现…」 |
| interview | 1-2 条，用 research/module-x.md 真实问法与来源 |
| summary | ≥2 个「Q：…？（答：…）」行 |
| L4 专属 | 页面会自动出现「出一道题考别人」面板（app.js 内置），无需内容字段 |

## 二、demo.html 可用组件（禁止 script/on*、外部 URL；id 用 <id> 前缀）

- 布局：`.d-row/.d-col/.d-grid2/.d-grid3`；按钮 `.d-btn`；徽标 `.d-tag(.green/.red/.amber)`；
  卡片 `.d-card`；注释 `.d-note`；表格 `.d-table`；token 片 `.d-token(.hot)`；箭头 `.d-arrow`；
  进度条 `.d-bar>.d-fill`；对照 `.d-vs`
- 动画类：`.d-anim/.d-anim-late/.d-pulse/.d-float/.d-blink/.d-spin/.d-shake/.d-flow-line`
- 交互钩子：
  1. 滑杆：`<input type="range" min max value data-output="#id" data-suffix="…">`，输出元素 `<b id="id">…</b>`，同时把值写入最近 `.demo-box` 的 `--v`（内联样式可用 `var(--v)`/`calc()`）
  2. 步进：`.d-steps` 容器 + 多个 `.d-step`（第一个加 `active`）+ `data-act="d-prev/d-next" data-steps="#容器"` + 指示器 `data-steps-indicator="#容器"`
  3. 显隐：`data-act="d-toggle" data-target="#id"`（目标初始 `d-hidden`）
  4. 页签：按钮 `data-act="d-tab" data-group="g" data-tab="p1"`；面板 `data-pane="p1" data-group="g"`
  5. 重播：`data-act="d-replay" data-target="#id"`

## 三、Boss 战题库 `data/boss/<l1|l2|l3|l4>.json`

```json
{ "level": "L1", "title": "L1 筑基 Boss", "questions": [
  { "ref": "a3-transformer-intuition", "q": "题干", "options": ["…"], "answer": 1, "explain": "解析" } ] }
```
要求：10 道选择题，全部来自该层级考点的面试视角真题改写；覆盖该层级 ≥5 个不同知识点；answer 下标合法、explain 自洽。通过线 80%（10 题对 8）。

## 四、质量红线

- 技术事实准确；星级/来源以 `research/module-x.md` v2 为准，禁止编造来源。
- 所有 to/ref/deps 用 syllabus.js 精确 id；跨层级知识点在 links 中互相勾连（低层讲类比、高层讲机制）。
- JSON 严格合法；每文件写完 `python3 -m json.tool <f> > /dev/null` 自检；完成后 `node tools/validate.js [--module X]` 直至 ALL PASS。
- 语言面向零基础中文读者；L1 页面不得出现未解释的术语。
