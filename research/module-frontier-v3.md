# C/D/E/F/B 前沿新增点检索报告（v3）

> 检索日期：2026-09-04｜检索工具：英文 exa ×4、中文 web-search-prime ×4，共 8 次（符合 6~8 次纪律；本轮 0 次批量抓取，全部 URL 来自检索结果原文摘录）
> 目标：为 v3 升级核实 6 个前沿新增考点（模块C·L4 Context Engineering / 模块D·L4 Agentic RAG / 模块E·L4 A2A / 模块H·L4 AI Coding 智能体 / 模块B·L4 合成数据 / 模块F·L4 端侧推理），优先 2025-09 之后内容，中英双语。
> 状态口径：**面试出现中**＝至少 2 个独立来源出现题面/考察形态描述；**趋势观察**＝技术与生态证据充分，但面试化证据不足或仅有单一来源线索。
> 汇总：6 考点核实 ｜ 面试出现中 5（考点 1/2/3/4/5） / 趋势观察 1（考点 6）。

---

## 考点 1｜Context Engineering 体系设计（模块 C·L4）

- 状态：**面试出现中**（Anthropic 官方方法论 + 2026 年多个独立专项面试指南，证据充分）
- 来源：
  - Anthropic 官方工程博客《Effective context engineering for AI agents》，https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents ，2025-09-29（发布日期经 exa 元数据核实）
  - Anthropic 官方 Cookbook《Context engineering: memory, compaction, and tool clearing》，https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools ，2026-03-20（三大原语已有第一方 API 支持，含 `compact_20260112` 上下文编辑原语）
  - InterviewsVector《Context Engineering Interview Guide (2026)》，https://www.interviewsvector.com/blog/context-engineering-interview-guide ，2026-08-22
  - 《Top 10 Context Engineering Interview Questions & Answers (2026)》，https://www.interviewquestionstolearn.com/2026/06/top-10-context-engineering-interview.html ，2026-06-27（原文称「Expect context engineering questions in virtually every senior ML/data/AI engineering interview in 2026」）
  - Scaler《Context Engineering vs Prompt Engineering | What Changed When Agents Got Memory》，https://www.scaler.com/topics/context-engineering-vs-prompt-engineering/ ，2026-08-30
  - Sourcegraph《Context Engineering: A Practical Guide for AI Agents (2026)》，https://sourcegraph.com/blog/context-engineering ，2026-05-28
- 面试问法/社区主题：「How is context engineering different from prompt engineering?」（InterviewsVector FAQ 原题；参考答法要点：prompt engineering 优化指令措辞，是 context engineering 的子集；context engineering 在固定 token 预算下决定整个输入负载——记忆/检索证据/工具/顺序/丢弃策略）
- 技术要点：
  1. **上下文＝有限注意力预算**：Anthropic 核心口径是「找到最小的高信号 token 集合，最大化期望行为的概率」；长窗口存在 context rot（上下文腐坏）与 lost in the middle，窗口大小是容量不是理解力（ForaSoft 2026-07-18 引 NoLiMa ICML 2025：13 个宣称 128K+ 的模型在 32K 处 11 个跌破自身短上下文基线一半，https://www.forasoft.com/blog/article/ai-agents-context-engineering ）。
  2. **长任务三杠杆**：compaction（临近窗口上限时高保真摘要重启，调优先保 recall 再提 precision）、structured note-taking / agentic memory（外部持久化笔记跨会话存续）、sub-agent 架构（子代理以干净上下文深度探索，仅回传 1,000–2,000 token 蒸馏摘要）——三者均已在 Claude API 有第一方原语（Cookbook 2026-03）。
  3. **just-in-time 检索与 agentic search**：从「预取式 RAG」转向「轻量标识符（文件路径/查询串）+ 运行时按需加载」；Claude Code 为混合范式样板（CLAUDE.md 预载 + glob/grep 即时探索）；配套要求 token-efficient tools 与前缀稳定性（prompt caching；Levelop 2026-06-08 引 Manus 数据：缓存 token 成本约为未缓存 1/10，https://levelop.dev/blog/context-engineering-vs-prompt-engineering-what-changed ）。
- 与 Prompt Engineering 区别的论述锚点（官方原文）：「context engineering is the natural progression of prompt engineering」——是包含/演进关系而非替代；多来源共识：「prompt engineering is table stakes, context engineering is the multiplier」。
- 与 v2 衔接：v2 模块C 的「复杂 Prompt 体系设计/提示词工程化治理」覆盖提示词侧治理；本考点新增**上下文预算管理、压缩/清除/记忆三原语、多 Agent 上下文隔离（sub-agent 干净窗口）**三个维度，建议独立成 L4 知识点卡，讲授时与 v2 c2（多轮记忆）、评测驱动迭代互相引用。

---

## 考点 2｜Agentic RAG（模块 D·L4）

- 状态：**面试出现中**（v2 已将 d7 中 Agentic RAG 升 ⭐4；本轮 2026 英文侧证据进一步增强，中英双源一致）
- 来源：
  - gitGood《RAG Interview Questions (2026): The Complete Guide》，https://gitgood.dev/blog/complete-guide-rag-interview-questions-2026 ，2026-04-09（Q29「What is agentic RAG…」；Q37「How has agentic RAG changed what 'retrieval' means in an interview answer?」；Q39 GraphRAG vs vector 2026 判断题）
  - AI Engineering Insider《Cracking RAG and GraphRAG System Design Interviews for RAG Engineers 2026》，https://aiengineeringinsider.substack.com/p/cracking-rag-and-graphrag-system ，2026-08-15（Top 70 题体系：第 8 章 GraphRAG 混合图检索、第 9 章 Agentic GraphRAG 与多跳推理系统设计）
  - Cloud Soft Solutions《Top 45 RAG Interview Questions 2026》，https://cloudsoftsol.com/interview-questions/rag-interview-questions-2026/ ，2026-08-10（Q27 Agentic RAG / Q28 GraphRAG，Q41–45「Agentic RAG & Hybrid Approaches」专节）
  - ACL 2026 GEM《Is GraphRAG Needed? From Basic RAG to Graph-/Agentic Solutions with Context Optimization》，https://aclanthology.org/2026.gem-main.40.pdf ，2026（学术侧四范式统一评测：自主 Agentic RAG 综合表现最佳；发现 retrieval-generation gap）
  - v2 已核实中文侧（继承有效）：牛客·阿里 Agent 一面一手真题「介绍 GraphRAG，难点是什么？如何应对增量场景？」、卡码 GraphRAG/LightRAG 专刊（2026-07-30）、CSDN 5.2万字专题 Q7/Q8、技术栈「Agentic RAG 精讲」
- 面试问法/社区主题：「Fixed pipeline, router, or full agent? — Choose an architecture for an enterprise knowledge assistant and defend it.」（AI Engineering Insider Q61；同类中文形态即 v2 已录「什么是 Agentic RAG？与传统 RAG 的关键区别？」）
- 技术要点：
  1. **pipeline → loop 的范式迁移**：gitGood Q37 给出 2026 年权威表述——「retrieval 越来越多被框定为 agent loop 内的一次 tool call，而非固定管线阶段」；agent 自主决定何时检索/用哪个工具（vector/SQL/web）/结果是否够答；「标准 RAG 是恰好一步必选检索的 Agentic RAG 特例」。
  2. **有界迭代是答分点**：max hops、token 预算、显式停止条件；「无界 agent loop 是一桩等待发生的成本事故」；自纠错（CRAG/Self-RAG）与查询规划/子查询拆解。
  3. **与 GraphRAG 成熟度对比（真题化程度）**：GraphRAG 更「硬化」——已有独立章节/专刊 + 一手真题（阿里增量构图难点），考点集中于增量更新/构图成本/LightRAG 选型；Agentic RAG 更多以**权衡判断题与系统设计题**出现（何时值得为多跳放弃单遍管线的延迟与可调试性）；学术前沿开始两者融合（agent-graph integration、ReAct+ReWOO 批量检索降 token 19%–53%，ACL 2026）。
- 与 v2 衔接：维持 d7 拆分建议（Agentic RAG ⭐4 与 GraphRAG 独立成卡）；本轮补充英文系统设计题形态（多跳问答限 15 秒、防死循环、非确定性重复作答排查 Q57/Q60），可作 L4 深挖素材。

---

## 考点 3｜A2A 协议与 MCP 分工（模块 E·L4）

- 状态：**面试出现中**（v2 曾标注「A2A 面试题未检索到直接面经原文」；本轮已补齐——至少 4 个独立中文题库设 A2A 专项题 + 官方最新表述）
- 来源：
  - A2A 官方站（Linux Foundation），https://a2a-protocol.org/latest/ ，2025–2026 在线（原文：「The Model Context Protocol (MCP) and the A2A Protocol are not competitors — they are highly complementary」）
  - Google Developers Blog《Announcing the Agent2Agent Protocol (A2A)》，https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/ ，2025-04-09（首发原文：「A2A is an open protocol that complements Anthropic's Model Context Protocol (MCP)」）
  - Linux Foundation 新闻稿《A2A Protocol Surpasses 150 Organizations, Lands in Major Cloud Platforms…in First Year》，https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year ，2026-04-09（一周年：150+ 组织、Google/Microsoft/AWS 平台深度集成、多行业生产部署）
  - GitHub a2aproject/A2A，https://github.com/google/A2A ，2025（JSON-RPC 2.0 over HTTP(S)、Agent Card 发现、SSE 流式 + 异步推送、企业级安全/可观测）
  - 小林面试笔记《什么是 A2A 协议？它和 MCP 协议的区别是什么？》，https://xiaolinnote.com/ai/tools/12_a2a_protocol.html
  - 知乎《大模型面试 118 题（十三）：MCP 与工具协议》，https://zhuanlan.zhihu.com/p/2057193793527533631 （第 79 题明确标注「2026 新题」）
  - 卡码笔记《Agent 大厂面试题汇总》，https://notes.kamacoder.com/interview/llm/agent_interview.html （第 8 题）
  - 面试鸭《A2A 协议与 MCP 协议的关系是怎样的？》，https://www.mianshiya.com/question/1916425042913247233
- 面试问法/社区主题：「MCP 和 A2A 都是协议，它们有什么区别？为什么 MCP 解决不了 A2A 要解决的问题？」（卡码笔记题面原文；中文通俗口径见小林笔记：「MCP 负责每个 Agent 和工具之间的纵向连接，A2A 负责 Agent 之间的横向协作通信」）
- 技术要点：
  1. **官方分工表述（2026 最新口径）**：MCP＝agent-to-tool（标准化 Agent 连接工具/API/内部数据源），A2A＝agent-to-agent（标准化跨框架/厂商/组织边界的 Agent 互发现、任务委托、结果共享）；两者互补非竞争、协同构成互操作基础层（a2a-protocol.org 与 LF 2026-04 新闻稿口径一致）。
  2. **A2A 核心机制**：Agent Card（能力与连接信息发现）、JSON-RPC 2.0 over HTTP(S)、同步请求/响应 + SSE 流式 + 异步推送三种交互模式、text/file/structured JSON 富数据交换；「opaque agent」设计——不暴露内部状态/内存/工具，以黑盒方式协作；企业级内建安全、认证、可观测。
  3. **治理与生态成熟度（可作答分证据）**：Google 2025-04 发布→捐赠 Linux Foundation，TSC 由 AWS/Cisco/Google/IBM Research/Microsoft/Salesforce/SAP/ServiceNow 代表组成；2026-04 一周年即 150+ 组织支持、进入主流云平台并落地生产部署——说明「Agent 互操作标准化」已从概念变为基础设施议题。
- 与 v2 衔接：e11-a2a-protocol 原 ⭐3（v2 建议层级 L3~L4）——本轮面试证据足以支撑**升 ⭐4 并定为 L4**；v2 遗留开放问题（「A2A 面试题」直接题面）已解决。

---

## 考点 4｜AI Coding 智能体（模块 H·L4）

- 状态：**面试出现中**（本轮证据最强的一条：真实公司面试流程改革的一手描述 + 厂商官方认证，多源交叉印证）
- 来源：
  - DesignGurus《What Is the Cursor Interview Process Like? (Round by Round)》，https://www.designgurus.io/answers/detail/what-is-the-cursor-interview-process-like-round-by-round ，2026-07-07（约 8 小时带薪 on-site 项目：在 Cursor 真实代码库上做真实任务，AI 工具明确允许并鼓励；AI 协作模式是显式评分项）
  - Refolk《Saffron Put Claude Code in the Interview. Grade the Prompts, Not the Diff.》，https://www.refolk.ai/blog/saffron-claude-code-interview-attribution-metrics ，2026-07-06（YC P26 公司把 Claude Code 放进技术测评；披露 Google 2026 SWE loop 新增「code comprehension」轮——Gemini 可用，考察「AI fluency, including prompt engineering, output validation, and debugging skills」；Canva 2025-06 起面试强制允许 AI）
  - Codersera《Hire AI-Native Engineers (2026): CTO Interview Playbook》，https://codersera.com/blog/hiring-ai-native-engineers-2026-claude-code-cursor/ ，2026-05-03（六大新技能：多 agent 编排/输出批判性评估/上下文管理/规格写作/失败模式调试/MCP 素养；引 The Pragmatic Engineer 2026 调查：95% 工程师每周用 AI、Claude Code 为第一大日常工具、55% 常用 AI agent）
  - MindHunt《How to Hire a Claude Code Developer》，https://mindhunt.agency/en/blog/claude-code-developer-hiring-guide ，2026-07-11（Anthropic 2026-03 推出 Claude Partner Network 与首个监考认证 Claude Certified Architect——覆盖 agentic architecture、MCP、Claude Code 配置、prompt/context 管理）
  - techinterview.org《Interviewing at AI Tooling Companies: Cursor, Windsurf, Continue》，https://www.techinterview.org/post/3233475315/interviewing-ai-tooling-companies-cursor-windsurf-continue/ ，2026-05-06（系统设计原题「Design an agent that can read, edit, and run tests across a project」「Design a code-aware RAG system over a 5M-line monorepo」；编码题「token-budget allocator for a chat prompt」）
  - 交叉印证：Business Insider《Inside the Recruiting Practices at the Hottest AI Coding Startups》，https://www.businessinsider.com/recruiting-practices-ai-vibe-coding-startups-cognition-cursor-replit-interview-2026-7 ，2026-07-03
- 面试问法/社区主题（考察形态三种，原文归纳）：①**AI-permitted 实操轮**——「give the candidate a real repo and a feature ticket…watch how they work」（Codersera；Cursor 8h 项目为其极致形态）；②**AI 输出审查题**——「Hand the candidate a 300-line PR an agent generated…Three of the changes are subtly wrong…Can they find them in 20 minutes?」（Codersera 原题）；③**上下文工程白板题**——「You're asked to add OAuth to this 80k-line monorepo. What goes into the agent's context, in what order, and what do you deliberately leave out?」（Codersera 原题）
- 技术要点：
  1. **新评分维度**：AI reliance %（AI 生成占比）、prompt 质量（澄清式追问 vs 一把梭）、human-modification ratio（对 AI 输出的人工修改率）——「高 AI 依赖 + 低人工修改＝新式『没做完题』」（Refolk/Saffron；Canva 试点：失败模式是直接接受 diff）。
  2. **被考察的能力本质**：多 agent 并行编排（git worktree 隔离跑 3–5 个 agent）、harness 调试（区分失败在模型/工具接线/提示词/任务框架哪一层；同一模型不同 harness 可差 16 个百分点）、spec 写作（验收标准/文件边界/显式非目标，被视为「仓库里杠杆最高的源文件」）。
  3. **工具侧知识点**：MCP 服务器与自定义工具接线（「新的 stdlib」）、CLAUDE.md/规则文件维护、上下文压缩与缓存意识、拒绝误导性建议；Claude Certified Architect（2026-03）标志该技能正在被正式化——「Claude Code 经验」已成简历筛选项（MindHunt）。
- 边界提示：以上为「面试怎么考」的形态证据（招聘方视角指南 + 候选人流程回述）；国内大厂侧的同形态一手面经本轮未检索（推断：国内考察仍以「用没用 AI 工具/怎么用」的问答与系统设计题为主，未见系统性实操轮，属推断）。

---

## 考点 5｜合成数据与模型自进化（模块 B·L4）

- 状态：**面试出现中**（中文备战题库已专项覆盖；注意：phi 类预训练配方/自博弈作为独立逐字题面的一手面经未检索到，该子方向内部按趋势观察讲授）
- 来源：
  - CSDN《27 届大模型面试准备（二十三）：数据工程与合成数据——配方、去重…》，https://blog.csdn.net/thesky123456/article/details/163625396 （真题式问法多则，见下）
  - GitHub AgentGuide《数据合成 / Data Pipeline 彻底备战手册》，https://github.com/adongwanai/AgentGuide/blob/main/docs/04-interview/18-agent-interview-playbooks/data-synthesis-playbook.md （开源面试题库的合成数据专题手册，与 v2 已采信的 AgentGuide 同源）
  - CCL 2024《大语言模型合成数据方法简述》，https://aclanthology.org/2024.ccl-2.5/ ，2024（方法学三分法：基于蒸馏的合成数据 / 基于模型自我进化 / 基于工具的合成数据）
  - 《大语言模型数据合成与增强调查》（arXiv 2410.12896 中文页），https://www.alphaxiv.org/zh/abs/2410.12896 ，2024–2025（蒸馏：种子示例生成、推理步骤创建、属性控制、从头生成）
  - 知乎《合成数据 vs 真实网页数据：大模型训练的博弈》，https://zhuanlan.zhihu.com/p/2073415684193784508 ，2026（model collapse 底层机制）
  - 智源社区《Synthetic Data RL：仅需任务定义，高效微调大模型》，https://hub.baai.ac.cn/view/46795 ，2025–2026（合成数据强化学习框架）
- 面试问法/社区主题：「合成数据比例超过多少会开始有害？有没有可监控的早期指标？」（CSDN 27 届面试准备系列原题；同系列另有「WRAP 这类改写式合成，为什么不引入新信息却能提升效果？」「用 GPT-4 蒸馏数据训练，法律上有（何风险）？」）
- 技术要点：
  1. **方法谱系（按 CCL 三分法讲）**：蒸馏合成（强模型生成指令/CoT 再训练弱模型，phi 系列是「教科书级合成预训练」代表——推断：面试中多以「小模型+高质量数据能否逼近大模型」的叙事出现，未见逐字真题）、模型自我进化（Self-Instruct→Self-Rewarding→自博弈 Self-Play）、工具/程序化合成（WRAP 类改写、代码执行验证）。
  2. **质量与安全边界**：model collapse（合成数据递归自食导致分布退化）、合成比例红线与早期监控指标、去重与 benchmark 去污染、多样性控制——质量维度比生成维度更常被追问。
  3. **工程与合规**：蒸馏数据的许可/条款风险（教师模型 ToS）、许可合规的合成管线（NVIDIA《如何构建合规的 AI 模型蒸馏合成数据工作流》，https://developer.nvidia.cn/blog/how-to-build-license-compliant-synthetic-data-pipelines-for-ai-model-distillation/ ）、混合数据策略（真实数据保底 + 合成数据扩量）。
- 与 v2 衔接：模块 B 现有 b1~b9 偏训练范式与对齐（GRPO/RLVR 已为 L4 前沿题）；本点作为其姊妹 L4 考点补「数据侧前沿」，与 b7 数据配比话题天然衔接。
- 口径说明：状态「面试出现中」依据两个独立备战来源（CSDN 27 届系列 + AgentGuide 手册）；自博弈/phi 类的逐字面经缺失部分，讲授与出题时请标注为趋势观察，勿当真题引用。

---

## 考点 6｜端侧与边缘推理（模块 F·L4）

- 状态：**趋势观察**（2025–2026 生态证据充分、岗位赛道讨论升温；但一手面经原题未检索到，面试化判断属推断——按纪律标注）
- 来源：
  - 牛客社区《端侧模型部署：被聚光灯漏掉的那条主赛道》，https://www.nowcoder.com/discuss/919315636675698688 （求职赛道视角：算力墙/时延功耗约束；**单一来源线索**）
  - CSDN《高通端侧 AI 实战(3)：骁龙平台端侧大模型部署实战》，https://blog.csdn.net/weixin_38498942/article/details/159979197 （骁龙 8 至尊版 Hexagon NPU 75 TOPS + INT4 量化，手机端流畅运行 7B–13B @ 20–30 tokens/s）
  - vivo 蓝心大模型端侧部署分享（AICon 2025 上海站，腾讯开发者社区转载），https://developer.cloud.tencent.com/article/2546388 （模型小型化 + NPU 优化 + 1+N LoRA 架构）
  - InfoQ《"像把大象塞进冰箱一样困难"，端侧大模型是噱头还是未来？》，https://www.infoq.cn/article/atf5mZKSWCXk2LgfdHlr （华为 CANN 工具链：NPU 友好低比特量化与内存优化）
  - matt33《LLM 系列(二十二)：端侧大模型，大模型如何在本地设备上运行》，https://matt33.com/2026/07/10/llm-on-device/ ，2026-07-10
  - 知乎《7 大品牌获批：一文读懂端侧 AI 大模型技术、生态与前景》，https://zhuanlan.zhihu.com/p/2061173764516210058 （手机/PC/车载三品类生态盘点）
- 面试问法/社区主题：「端侧模型部署为什么是一条被低估的主赛道？把 7B 模型塞进手机 NPU，如何保证时延和功耗可接受？」（前者为牛客帖主题概括，后者为据生态文章工程议题的推断问法——**均非一手面经原题**）
- 技术要点：
  1. **硬件底座**：CPU+GPU+NPU 异构分工，NPU 承担稳态低功耗推理；旗舰 NPU 算力已达 75 TOPS 量级（骁龙 8 至尊版，CSDN），但内存带宽与功耗墙（非峰值算力）才是真瓶颈。
  2. **模型侧适配链**：低比特量化（INT4 权重）→ 1–3B 级小型模型 → 1+N LoRA（共享基座 + 任务 LoRA 热插拔，vivo 方案）→ 端侧编译工具链（华为 CANN、高通 AI Stack：转换/量化/编译/推理验证）。
  3. **端云协同**：按任务分流（隐私/离线/低延迟任务走端侧，复杂任务上云）；与 f3（量化）、f4（推理框架 llama.cpp 等）直接衔接——L4 讲法是把「模型压缩 → 硬件适配 → 端云路由」连成体系，而非孤立讲 NPU。
- 入库建议：以「趋势观察（L4 储备）」入库，讲授时挂在 f3/f4 已有 ⭐4 星级上延伸，不单独给高频星；若后续检索到手机厂商（vivo/荣耀/OPPO）或高通端侧算法岗一手面经原题，再升级为「面试出现中」。

---

## 开放问题

1. 考点 5 的 phi 类/自博弈子方向与考点 6 的端侧推理，均缺一手面经逐字原题；建议下轮定向检索牛客「端侧部署 面经」「vivo/荣耀 算法 面经」与知乎 LLM 训练面经中「合成数据」关键词。
2. 考点 4 的国内形态（国内大厂是否出现 AI-permitted 实操轮）未检索到一手证据，本轮仅按英文多源 + Business Insider 交叉印证；国内考察形态推断为「问答 + 系统设计」为主。
3. Anthropic Cookbook 的 `compact_20260112` 等 API 原语命名来自 exa 摘录（2026-03-20 页面），未二次抓取核实；写入知识点卡前建议打开原文确认。

## 参考来源速查（全部 URL 均来自本轮检索结果，未编造）

| 考点 | 来源 | 类型 | 年份 |
|---|---|---|---|
| 1 | anthropic.com/engineering/effective-context-engineering-for-ai-agents | 官方工程博客 | 2025-09 |
| 1 | platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools | 官方 Cookbook | 2026-03 |
| 1 | interviewsvector.com/blog/context-engineering-interview-guide | 面试指南 | 2026-08 |
| 2 | gitgood.dev/blog/complete-guide-rag-interview-questions-2026 | 面试指南 | 2026-04 |
| 2 | aiengineeringinsider.substack.com/p/cracking-rag-and-graphrag-system | 面试指南/Substack | 2026-08 |
| 2 | aclanthology.org/2026.gem-main.40.pdf | 学术论文（ACL GEM） | 2026 |
| 3 | a2a-protocol.org/latest/ | 官方协议站（Linux Foundation） | 2025–2026 |
| 3 | developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/ | 官方博客 | 2025-04 |
| 3 | linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations… | 官方新闻稿 | 2026-04 |
| 3 | xiaolinnote.com/ai/tools/12_a2a_protocol.html；notes.kamacoder.com/interview/llm/agent_interview.html；zhuanlan.zhihu.com/p/2057193793527533631；mianshiya.com/question/1916425042913247233 | 中文面试题库 ×4 | 2025–2026 |
| 4 | designgurus.io/answers/detail/what-is-the-cursor-interview-process-like-round-by-round | 面试流程解析 | 2026-07 |
| 4 | refolk.ai/blog/saffron-claude-code-interview-attribution-metrics | 招聘科技博客 | 2026-07 |
| 4 | codersera.com/blog/hiring-ai-native-engineers-2026-claude-code-cursor/ | CTO 招聘指南 | 2026-05 |
| 4 | mindhunt.agency/en/blog/claude-code-developer-hiring-guide | 招聘机构指南 | 2026-07 |
| 4 | techinterview.org/post/3233475315/interviewing-ai-tooling-companies-cursor-windsurf-continue/ | 面试指南 | 2026-05 |
| 5 | blog.csdn.net/thesky123456/article/details/163625396 | 面试备战系列 | 2026 |
| 5 | github.com/adongwanai/AgentGuide/blob/main/docs/04-interview/18-agent-interview-playbooks/data-synthesis-playbook.md | 开源备战手册 | 2026 |
| 5 | aclanthology.org/2024.ccl-2.5/ | 学术论文（CCL） | 2024 |
| 6 | nowcoder.com/discuss/919315636675698688 | 社区求职讨论（单一来源） | 2026 |
| 6 | blog.csdn.net/weixin_38498942/article/details/159979197；developer.cloud.tencent.com/article/2546388；infoq.cn/article/atf5mZKSWCXk2LgfdHlr；matt33.com/2026/07/10/llm-on-device/；zhuanlan.zhihu.com/p/2061173764516210058 | 技术博客/厂商实践 ×5 | 2025–2026 |
