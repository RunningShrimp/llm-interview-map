# AI Agent 与 AI 工程化 · 七关晋升学习站

面向零基础同学的 **AI Agent 与 AI 工程化七关晋升游戏化学习站**：关0 基础热身 → 关6 综合项目与作品集，以 `rodmap.md`（43 锚点五层知识骨架）为大纲，共 82 个考点（含 2026 前沿 10 点 🆕）。每个考点包含小白定义、生活类比、可交互演示、即时判题例题、费曼复述、知识联系与面试真题视角。

## 在线访问

**https://runningshrimp.github.io/llm-interview-map/**

仓库：https://github.com/RunningShrimp/llm-interview-map

## 七关路线

| 关卡 | 名称 | 头衔 | 覆盖 |
|---|---|---|---|
| S0 | 基础热身 | AI 新手 | 数学 / Python / Transformer / LLM / 提示 / 向量 |
| S1 | LLM 应用入门 | 应用工程师 | API 与选型 / 进阶提示 / 结构化输出 / 评估 / 成本 |
| S2 | 单 Agent 核心 | 单 Agent 工程师 | 规划 / 工具 / 记忆 / ReAct / 反思 |
| S3 | RAG 与工具增强 | RAG 工程师 | RAG 全链路 / 架构模式 / 评估 |
| S4 | AI 工程化 | AI 工程化工程师 | 架构 / 可观测 / 评估体系 / 部署 / 成本 / 安全 + 2026 前沿（推理模型、RLVR/GRPO、Context Engineering、Agentic RAG、A2A、AI Coding 等 8 点 🆕） |
| S5 | 多 Agent 与生产 | 多 Agent 工程师 | 协作判据 / 协作系统 / 平台化 |
| S6 | 综合项目与作品集 | 准专家 | 全案 / 红队 / 运维 / STAR 作品表达 |

## 本地运行

纯静态站点，任意静态服务器即可：

```bash
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

> 注意：内容通过 fetch 加载 JSON，请使用 HTTP 服务访问（不要直接双击 index.html）。

## 功能

- 🗺️ 技能树：七关卡为地图区域、rodmap 锚点为分组、知识点为节点，锁定关卡显示解锁条件
- ⚔️ Boss 战：每关 10 道高频真题模拟面试，计时判题，≥80% 解锁下一关
- 🧰 实战任务卡：每关一个里程碑项目（步骤指引 + 自查清单 + 参考架构图），完成自评得 XP
- ⭐ XP 与头衔：阅读/答题/Boss/任务卡获得经验值，七大头衔晋升带庆祝动画
- 📖 错题本与遗忘曲线：答错自动收录，1/3/7 天间隔重复提醒
- 🎯 锚点标注：每页顶部显示锚点编号、建议掌握程度（了解/理解/会用/熟练/精通）与关键问题；带 * 锚点为进阶选修
- 🎓 精通级出题考别人：费曼终极检验，能出题才算真掌握
- 📈 战绩面板：XP/头衔/点亮进度/错题存量，localStorage 持久化

## 目录结构

```
├── index.html          # 入口（hash 路由 SPA）
├── css/                # 全站样式、游戏化组件与动画
├── js/app.js           # 路由 / 渲染 / 进度 / 交互
├── js/judge.js         # 判题引擎（纯函数）
├── data/syllabus.js    # 最终大纲（82 点 / 43 锚点 / 七关卡）
├── data/content/*.json # 每个知识点一个数据文件
├── data/boss/s0-s6.json# 七关 Boss 题库
├── data/tasks/s0-s6.json # 七张实战任务卡
├── research/*.md       # 检索研究底稿（含来源与星级依据）
├── rodmap.md           # 知识骨架（43 锚点，权威来源）
├── syllabus.md         # 最终大纲文档
└── tools/validate.js   # 内容完整性校验器
```

## 内容来源

知识点与真题来自牛客网面经、《AI Agent 面试 Top50 必刷题》、面灵AI 2026 真题、小林coding、卡码笔记、JavaGuide、Datawhale hello-agents、OpenAI / Anthropic / DeepSeek / MCP / A2A 官方文档与 arXiv 2025-2026 论文（详见 research/）。每个页面标注星级与来源，🆕 表示 2025-09 后前沿点（区分「面试出现中」与「趋势观察」）；技术表述以官方文档与论文为准，内容仅供学习参考。
