# CONTENT-SPEC.md — 知识点内容数据规范（生成类子 Agent 必读）

本站点为纯静态 SPA：`index.html` + 共享 CSS/JS 负责壳与交互，每个知识点的教学内容存放在
`data/content/<知识点id>.json`，模块回顾测验存放在 `data/quizzes/module-<模块id小写>.json`。
页面模板、判题引擎、进度存储已全部实现，你只需要产出**合法 JSON 数据**。

## 一、知识点文件：`data/content/<id>.json`

`<id>` 必须与 `data/syllabus.js` 中的 `id` 完全一致（全小写、连字符）。字段：

```json
{
  "id": "d1-rag-pipeline",
  "title": "RAG 总体流程",
  "definition": "一句话小白定义，≤100 字。出现的术语必须在句中随手解释，如：检索（先去知识库里找资料）。",
  "analogies": [
    { "icon": "📖", "name": "开卷考试", "text": "具体场景化的类比说明，100–200 字，要具体到'谁在什么场景下做什么'。至少 1 个，建议 2 个。" }
  ],
  "demo": {
    "title": "演示标题",
    "description": "一两句话说明这个演示展示什么、怎么玩。",
    "html": "<div>…仅用规范允许的类名/钩子的 HTML+内联<style>…</div>"
  },
  "keyPoints": [
    { "icon": "📌", "name": "要点名", "text": "60 字内的要点解释。4–6 条。" }
  ],
  "exercises": [
    {
      "type": "choice",
      "q": "选择题题干（可含代码/场景描述）",
      "options": ["选项A文本", "选项B文本", "选项C文本", "选项D文本"],
      "answer": 2,
      "explain": "解析：为什么选 C，其他选项各错在哪。必须与答案自洽。"
    },
    {
      "type": "scenario",
      "q": "场景分析题题干：给出一个具体工作场景，要求考生分析/设计/排查",
      "reference": "参考答案：分点完整作答示范（150–300 字）。",
      "keyPoints": [
        { "point": "要点1的名称描述", "kw": ["关键词1", "同义词2"] },
        { "point": "要点2的名称描述", "kw": ["关键词"] },
        { "point": "要点3的名称描述", "kw": ["关键词"] }
      ],
      "explain": "补充点评：常见失分点/加分点。"
    }
  ],
  "feynman": {
    "prompt": "费曼任务：'请用自己的话向……解释……'",
    "hint": "提示：想想应该覆盖哪几个关键词。",
    "modelAnswer": "参考表达：口语化、正确的完整复述（80–150 字）。"
  },
  "links": [
    { "to": "d3-embedding-vector-db", "text": "RAG 的检索环节，本质上是 Embedding 技术在'相似度搜索'场景的应用" }
  ],
  "interview": [
    { "q": "真实面试问法原文（来自 research/module-x.md）", "stars": 5, "source": "来源名称（如：牛客网·XX面经）", "tip": "答题要点一两句" }
  ],
  "summary": "Q：提问式小结问题1？（答：简短参考回答）\nQ：提问式小结问题2？（答：简短参考回答）\nQ：提问式小结问题3？（答：简短参考回答）"
}
```

### 字段硬性要求（validate.js 会校验）
| 字段 | 要求 |
|---|---|
| id / title | 与 syllabus 完全一致；title 允许简化但含义一致 |
| definition | 非空，≤120 字 |
| analogies | ≥1 条；每条 name 与 text 非空 |
| demo | title/description/html 均非空；html 长度 ≥ 60 |
| keyPoints | 4–6 条 |
| exercises | ≥2 条且必须同时含 choice 与 scenario；choice 的 answer 为合法下标、explain 非空；scenario 的 keyPoints 3–6 条，且**每条 keyPoints 里的所有 kw 必须逐字出现在 reference 文本中**（判题自洽性硬校验） |
| feynman | prompt / hint / modelAnswer 均非空 |
| links | ≥1 条；to 必须是 syllabus 中存在的 id；text 是"联系描述"（不含"学完X后你会发现"前缀，模板自动加） |
| interview | 1–2 条；q 与 source 非空；优先原样使用 research/module-x.md 中的问法与来源 |
| summary | ≥2 个 Q：…？（答：…）行，用 \n 分隔 |

## 二、demo.html 允许的组件与交互钩子（严格限制，全站无任何自定义 JS）

**禁止**：`<script>` 标签（会被自动剥离）、内联 on* 事件、外部资源（CDN/图片/字体）、id 冲突（请用描述性唯一前缀，如 `d1-` 开头）。

**可用 CSS 类**（定义在 css/styles.css）：
- 布局：`.d-row`（横向排列）、`.d-col`、`.d-grid2`、`.d-grid3`
- 按钮：`.d-btn`（可加 `disabled`）
- 徽标：`.d-tag`（变体 `.green` `.red` `.amber`）
- 卡片：`.d-card`；小注释：`.d-note`；对照布局：`.d-vs > .d-vs左侧/.vs-mid/.d-vs右侧`
- 表格：`.d-table`（th/td）；token 片：`.d-token`（高亮 `.hot`）；箭头字符：`.d-arrow`
- 进度条：`.d-bar > .d-fill`（宽度用内联 `style="width:63%"`）
- 步进面板：`.d-steps` 容器内放多个 `.d-step`（初始给第一个加 `active`）
- 动画类：`.d-anim`（入场淡入）、`.d-anim-late`（延迟入场）、`.d-pulse`（脉冲呼吸）、`.d-float`（上下浮动）、`.d-blink`（闪烁）、`.d-spin`（旋转）、`.d-shake`（抖动）、`.d-flow-line`（SVG 虚线流动，用在 `<line>`/`<path>` 上）
- 自定义细节样式可写内联 `style` 与 demo.html 内的一个 `<style>` 块（类名加 `<id>` 前缀防冲突）

**交互钩子**（app.js 全局委托，直接用属性即可）：
1. 步进器：`<div class="d-steps" id="d1-steps">` 内多个 `.d-step`（第一个加 class `active`）；
   按钮 `<button class="d-btn" data-act="d-prev" data-steps="#d1-steps">上一页</button>`、`data-act="d-next"`；
   指示器 `<span class="d-step-indicator" data-steps-indicator="#d1-steps">1 / 4</span>`。
2. 显隐开关：`<button class="d-btn" data-act="d-toggle" data-target="#d1-detail">切换说明</button>`，目标元素初始加 `d-hidden`。
3. 重播动画：`<button class="d-btn" data-act="d-replay" data-target="#d1-animwrap">重播</button>`。
4. 滑杆：`<input type="range" min="0" max="100" value="50" data-output="#d1-val" data-suffix="%">`，
   输出元素 `<b id="d1-val">50%</b>`；滑杆同时会把值写入最近 `.demo-box` 的 CSS 变量 `--v`（可在内联样式中用 `calc()`/`var(--v)`）。
5. 页签：按钮 `data-act="d-tab" data-group="d1g" data-tab="p1"`；面板 `data-pane="p1" data-group="d1g"`（初始非当前面板加 `d-hidden`）。

**SVG 示意**：可直接内联 `<svg>`，配合 `.d-flow-line` 做流动线、`marker` 做箭头。保持 viewBox 尺寸克制（≤ 700 宽），有 `overflow-x:auto` 兜底。

**演示设计要求**：每个 demo 必须至少有 1 处"动"（CSS 动画类或交互钩子），且要服务于理解（例如：注意力热力图 → 用 d-grid3 + 内联背景色 + d-pulse；RAG 流程 → d-steps 步进；温度采样 → range 滑杆 + 不同颜色 token；KV Cache → 逐格增长动画）。

## 三、模块回顾测验：`data/quizzes/module-<x>.json`

```json
{
  "moduleId": "A",
  "title": "模块A 回顾测验",
  "questions": [
    { "ref": "a2-self-attention-qkv", "q": "题干", "options": ["A", "B", "C", "D"], "answer": 1, "explain": "解析" }
  ]
}
```
要求：6 道选择题，覆盖模块内 ≥4 个不同知识点（ref 填知识点 id），难度分布：基础 2 + 进阶 2 + 应用 2；answer 为下标；explain 必须自洽。

## 四、教学口径（Pedagogy 摘要）

1. **小白定义**：≤100 字；行内术语随手解释（用括号）。
2. **生活类比**：具体场景（如"RAG = 开卷考试：先翻书找到那一页，再用自己的话作答"）。
3. **动画演示**：见上；必须"动"起来。
4. **例题**：≥1 选择 + ≥1 场景分析；答案自洽（scenario 的 kw ⊆ reference 由校验器强制）。
5. **记忆锚点**：keyPoints（双编码）、feynman（费曼）、summary（精细加工提问）、模块测验（间隔重复）。
6. **知识联系**：句式模板"学完 X 后你会发现：Y 本质上是 X 在 Z 场景的应用"——text 只写后半句。
7. **面试视角**：用 research/module-x.md 里的真实问法与来源，禁止编造来源。
8. 语言：面向零基础中文读者；先直觉后术语；每条解释都要"说完人话再给行话"。

## 五、质量红线

- 技术事实必须正确、无争议（有争议处写主流观点并注明）。
- 星级/来源以 `research/module-x.md` 为准（其中「未经外部检索」的条目照常撰写内容，来源写该标注）。
- 所有跨页链接 `to`、`ref`、`deps` 一律使用 syllabus 中的精确 id。
- JSON 严格合法：双引号、无尾逗号、控制字符转义；写完立即 `python3 -m json.tool <file> > /dev/null` 自检。
- 每个文件单点成档，一个知识点一个 JSON；写完运行 `node tools/validate.js --module <X>` 直至全绿。
