# 模块H v4 核实报告（2026 前沿层 8 种子考点）

> 核实时间：2026-09-15 ｜ 方式：复用 v3 底稿（module-h.md / module-frontier-v3.md）+ 本轮 WebSearch 6 次
> 状态口径（从严）：**面试出现中**＝有 2026 题库/面经确证；**趋势观察**＝官方/论文/社区证据充分但无确证真题。
> 本轮总判定：面试出现中 5（考点1/2/3/4/6）｜ 趋势观察 3（考点5→升为5的例外见下、7、8）。

## 1. 推理模型与测试时扩展（DeepSeek-R1 / o 系列）
- 状态复核：**面试出现中**（维持）。2026 题库持续覆盖：小林coding「2026最全AI大模型面试题 74 题」含推理/Agent 模块（题库，xiaolincoding.com/project/xiaolinnote.html，2026）；英文侧 2026 备考内容活跃（社区，techinterview.net RLVR/推理系列、Raschka「State of LLMs 2026」演讲，2026）。
- 高频面试问法：
  - 「R1-Zero 为什么纯 RL 不用 SFT 就能涌现反思/自我验证？aha moment 怎么解释？」（题库，DataWhale hello-agents，2025-2026）
  - 「测试时扩展的并行采样与串行长 CoT 两条路线机制差异？thinking budget / reasoning_effort 如何权衡时延成本精度？」（论文+官方，arXiv 2507.02076、2507.14419，2025）
- 关键事实更新：
  - DeepSeek-R1 已通过 Nature 同行评审发表（论文，nature.com/articles/s41586-025-09422-z，2025）——引用层级提升，可作为权威出处。
  - 2026 研究焦点转向「极限与效率」：OpenReview《Does Thinking More Always Help? Mirage of Test-Time Scaling》质疑"想更多必更好"（论文，openreview.net/forum?id=tKPqbamNb9）；o 系列现役至 o3/o4-mini，R1 以约 4% 成本达 79.8% 精度成常见对比口径（社区，meta-intelligence.tech，2026）。

## 2. RLVR 与 GRPO 对齐
- 状态复核：**面试出现中**（维持并增强）。面灵AI《265 道 2026 版》设「RLHF 与 GRPO」分类（题库，mianlingai.com，2026）；英文 2026 备考文出现直接面试向文章《RLVR vs RLHF: Why Verifiable Rewards Win in 2026》（题库/社区，techinterview.net，2026）。
- 高频面试问法：
  - 「GRPO 相比 PPO 砍掉 value 网络、用组内相对奖励，省了什么丢了什么？」（社区，Raschka Ch.6 GRPO 从零实现/GRPO++ Tricks，2025-2026）
  - 「RLVR 到底是激发新推理能力还是提升已有能力采样率？稀疏奖励与 reward hacking 怎么处理？」（论文+社区，OpenReview jGbRWwIidy；opendilab/awesome-RLVR，2025-2026）
- 关键事实更新：GRPO/RLVR 已成 2026 LLM 训练岗标准叙事（「State of LLMs 2026: RLVR, GRPO, Inference Scaling」演讲，社区，2026）；工程落地参考 AWS SageMaker GRPO+RLVR 官方实战（官方，aws.amazon.com，2025-2026）。GRPO 变体研究持续（FEST 等，arXiv 2605.15012，2026）。

## 3. Context Engineering（compaction / 记忆 / 子代理隔离 / just-in-time）
- 状态复核：**面试出现中**（维持，证据最强之一）。Anthropic Cookbook 三原语 API 化（官方，platform.claude.com，2026-03）；多个独立 2026 专项面试指南：InterviewsVector（2026-08）、《Top 10 Context Engineering Interview Questions 2026》（2026-06，原文称「virtually every senior ML/AI engineering interview」）、Scaler（2026-08）、Sourcegraph（2026-05）（均题库/指南，见 v3 底稿）。
- 高频面试问法：
  - 「How is context engineering different from prompt engineering?」（题库，InterviewsVector 原题，2026）
  - 真题「用 Claude Code 时为什么使用时间越长响应越慢？」（面经，CSDN 161729146，2026）
- 关键事实更新：Agent 记忆已从技巧升级为「生产工程学科」：Mem0 发布《State of AI Agent Memory 2026》年度报告（含 BEAM 偏好衰减基准与运维实践）（社区/厂商报告，mem0.ai，2026）——讲授时可把「记忆/压缩/清除」三原语与记忆基准评测衔接。

## 4. Agentic RAG
- 状态复核：**面试出现中**（维持）。2026 题库多源确证：gitGood《RAG Interview Questions 2026》Q29/Q37/Q39（2026-04）、AI Engineering Insider Top 70（2026-08）、Cloud Soft Solutions Q27/Q28（2026-08）；中文侧小林coding 2026 版 74 题与代码随想录 2026 面经汇总均含 RAG/GraphRAG/Agentic（题库，2026）；学术侧 ACL 2026 GEM 四范式评测（论文，2026）。
- 高频面试问法：
  - 「Fixed pipeline, router, or full agent? — 为企业知识助手选架构并辩护」（题库，AI Engineering Insider Q61，2026）
  - 「Agentic RAG 与传统 RAG 本质区别？什么场景必须上、什么场景是过度设计？」（题库/官方对比框架，NVIDIA/IBM，2025）
- 关键事实更新：无重大变化；维持 v3 结论——retrieval 被 2026 题库框定为「agent loop 内一次 tool call」，答分点在有界迭代（max hops/token 预算/停止条件）。

## 5. A2A 协议与多 Agent 互操作
- 状态复核：**面试出现中**（维持 v3 升级结论）。4 个独立中文题库设 A2A 专项题：小林面试笔记、知乎 118 题（第 79 题标注「2026 新题」）、卡码 Agent 题库第 8 题、面试鸭（题库，2025-2026）。
- 高频面试问法：
  - 「MCP 和 A2A 都是协议，有什么区别？为什么 MCP 解决不了 A2A 要解决的问题？」（题库，卡码笔记原题面，2025-2026）
- 关键事实更新（重要）：
  - A2A 已于 **2026-03 达 v1.0.0**（后发 v1.0.1），正式定稿于 Linux Foundation（官方，a2a-protocol.org 2026 博客档案；rapidclaw.dev/niteagent.com 2026 指南）——v3 底稿的「v0.3」口径已过时，知识点卡需更新。
  - 2026-04 一周年：150+ 组织、进入主流云平台并有企业生产部署、新增 Signed Agent Cards（签名 Agent Card）与 Salesforce 集成（官方，linuxfoundation.org 新闻稿，2026-04）。
  - 生态口径扩展：2026 协议格局常并列 A2A/MCP/ACP/ANP（社区，2026）；MCP 侧亦有 2026-07-28 大版本更新与 stateless mode 的说法（厂商报告，mcpmanager.ai，2026，单一来源、写入前需二次核实）。

## 6. AI Coding 智能体（Claude Code / Cursor 类）
- 状态复核：**面试出现中**（维持，证据持续增强）。新增 2026 题库证据：代码随想录《2026最全大模型面经汇总》专列「Vibe Coding、Claude Code、多 Agent 架构、**Harness Engineering**」板块（题库，programmercarl.com/qita/0022.llminterview.html，2026）；JavaGuide 博客园发布《Cursor/Claude Code/Skills 面试题》（题库，cnblogs.com/javaguide/p/19637656，2026）；卡码 AI 编程板块延续（题库，2026）。英文侧 Cursor 8h 实操轮、Claude Code 进面试测评、Claude Certified Architect 等见 v3 底稿（2026-05~07）。
- 高频面试问法：
  - 真题「有了解哪些比较火的 Agent？Claude Code 这类工具的能力边界在哪？」（面经，牛客字节 Agent 两轮 878709844730003456，2026）
  - 「Hand the candidate a 300-line PR an agent generated…three changes are subtly wrong…」（题库，Codersera CTO Playbook 原题，2026-05）
- 关键事实更新：中文题库出现「Harness Engineering」作为独立考察词（代码随想录，2026）——与 v3「能力边界来自 harness 而非模型」结论互证，可作为中文讲授术语。

## 7. 计算机使用与多模态 Agent
- 状态复核：**趋势观察**（维持从严判定；本轮仍未检索到确证真题，仅官方/社区证据）。
- 社区主题：「Operator 已并入 ChatGPT Agent；CUA vs Claude Computer Use 能力形态对比；Browser Use 开源方案 89.1% WebVoyager」（社区，askui/workos 对比文，2025-2026）。
- 关键事实更新（产品格局剧变，知识点卡需改写）：
  - OpenAI Operator 已于 2025-08-31 关停，能力并入 ChatGPT Agent（2025-07 发布）；OpenAI 还于 2026-06-03 通知弃用 Agent Builder、Assistants API 定于 2026-08-26 关停——Agent 工具线大整合（官方，developers.openai.com/api/docs/deprecations，2026）。
  - Claude 侧持续迭代并 C 端化：检索摘要称 Sonnet 4.6 达 72.5% OSWorld-Verified、Opus 4.7 达 82.3% OSWorld，2026-03-23 推出面向消费者的 Claude Computer Use（Mac 桌面直控）（官方线索，anthropic.com/news/developing-computer-use 等，2026；**具体版本号/分数为检索摘要，写入卡前需打开原文二次核实**）。
  - 判读：可靠性从 2025 初 15-38% 升至 72-89%，但仍无 Agent 被认为完全自主；「趋势观察」不升级，若后续拿到多模态 Agent 岗面经可重估。

## 8. Agent 沙箱与可靠执行
- 状态复核：**趋势观察**（维持；本轮无新增真题证据，E2B/Firecracker 路线仍是基础设施共识，见 v3 底稿来源 E2B/Modal/Northflank 对比，2025-2026）。
- 社区主题：「E2B vs Modal vs Daytona（gVisor）选型——隔离强度/冷启动/GPU 透传取舍」（社区对比文，2025-2026）。
- 关键事实更新：安全焦点从 prompt 安全转向「工具、代码执行、上下文暴露、MCP 权限与审计」（社区，medium/@pankaj_pandey，2026）；Agent Skills 安全扫描称 3,984 个技能中 36.82% 存在问题（厂商报告，mintmcp.com，2026，单一来源）——沙箱话题正与 Skills/工具供应链安全合流，讲授时可延伸。

## 建议新增（候选，均为趋势观察，从严不标必考）
1. **Agent Skills（技能包 / SKILL.md 生态与治理）**
   - 一句话：Claude 的 Skills（文件夹式可复用能力包）已形成生态，并进入中文面试题库视野与安全治理议题。
   - 来源：JavaGuide 博客园《Cursor/Claude Code/Skills 面试题》（题库线索，cnblogs.com/javaguide/p/19637656，2026，单一题库来源）；MintMCP《Secure AI Agents in Production》（厂商报告，2026）。
   - 状态：**趋势观察（偏面试化）**——仅 1 个题库来源，不满足「2 个独立来源」的面试出现中标准；待下轮定向检索「Agent Skills 面试题」再定。
2. **Agent 记忆工程化（跨会话记忆作为独立学科）**
   - 一句话：Agent memory 在 2026 被从业者明确称为「生产工程学科」，出现年度报告、基准（BEAM）与运维手册。
   - 来源：Mem0《State of AI Agent Memory 2026》（厂商年度报告，mem0.ai，2026）；Fountain City 运营手册（社区，2026）。
   - 状态：**趋势观察**——无真题证据；建议先作为考点 3（Context Engineering）的延伸小节讲授，不单独设卡，等面试证据出现再升级。

---
## 核实说明
- A2A v1.0（2026-03）与 Operator 关停/产品整合为本次最重要的事实更新，v3 底稿相应条目需修订。
- 考点 7 中 Claude 具体模型版本号/OSWorld 分数、考点 5 中 MCP 2026-07-28 更新细节，均来自本轮检索摘要（单一来源或二手转述），写入知识点卡前须打开原文二次核实。
- 沙箱考点本轮未做专项检索（检索预算用尽），状态沿用 v3 判定。
