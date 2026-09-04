# 模块H 检索报告（2026 前沿趋势）

> 检索时间：2026-09-04 ｜ 检索方式：中英双语 10 轮（官方博客/论文/面试题库交叉验证）｜ 时效要求：优先 2025-09 之后来源
> 状态判定标准：仅在有 2026 年面试题库或真实面经佐证时标「面试出现中」；只有官方/论文/社区讨论、无真题佐证的标「趋势观察」。

## 1. 推理模型与测试时扩展（Test-Time Scaling：DeepSeek-R1 / OpenAI o 系列 / thinking budget）
- 状态：面试出现中（2026 版中文面试题库均将「推理优化/推理模型」列为核心主题，R1 与 o 系列是推理岗必考背景）
- 来源：
  - DeepSeek-R1 论文与官方仓库（arXiv 2501.12948）：https://github.com/deepseek-ai/DeepSeek-R1 （2025）
  - 综述《A Survey of Adaptive and Controllable Test-Time Compute》：https://arxiv.org/html/2507.02076v1 （2025，系统梳理 thinking budget 与 reasoning effort 两类可控机制）
- 面试问法/社区主题：
  - 「R1-Zero 为什么纯 RL 不用 SFT 就能涌现反思、自我验证等推理行为？aha moment 怎么解释？」（DataWhale hello-agents 面试参考答案收录此类题：https://github.com/datawhalechina/hello-agents ）
  - 社区热议：长思维链存在 per-problem「sweet spot」，超过最优长度准确率反而下降、推理预算如何省钱（arXiv 2504.07128 的实证结论被广泛引用）
- 技术要点：
  1. 测试时扩展两条路线：并行采样（best-of-N、self-consistency、MCTS）与串行长 CoT；R1/o1 用 RL 让模型「自然学会」随训练延长思维链，而 s1 类蒸馏模型靠 budget forcing（截断缩放/追加"Wait"）人为制造缩放曲线，二者机制本质不同（arXiv 2507.14419）。
  2. 可控推理已成产品标配：OpenAI o 系列的 reasoning_effort（low/medium/high）与 Claude 3.7 起的 thinking budget（精确 thinking token 上限）允许用户在时延/成本/精度间权衡。
  3. 核心问题是 overthinking 与效率：推理模型输出可达基线 5 倍长度；强加 token 预算可在几乎不掉点的前提下砍掉近一半输出 token，自适应分配算力是当前研究主线。

## 2. RLVR 与 GRPO 对齐（可验证奖励、组相对策略优化）
- 状态：面试出现中（面灵AI《265 道大厂真题（2026 版）》明确设有「RLHF 与 GRPO 对齐」主题分类：https://www.mianlingai.com/topics/llm-agent-interview-questions-2026/ ）
- 来源：
  - GRPO 原始论文 DeepSeekMath（arXiv 2402.03300，2024）与 DeepSeek-R1 训练实践（arXiv 2501.12948，2025）：https://arxiv.org/abs/2402.03300
  - RLVR 讲解与资源合集：https://www.promptfoo.dev/blog/rlvr-explained/ （2025）；https://github.com/opendilab/awesome-RLVR （2025，持续更新）
- 面试问法/社区主题：
  - 「GRPO 相比 PPO 砍掉了 value 网络，用组内相对奖励估计 advantage，省了什么、丢了什么？」（解释类博客与博客圈标准考点）
  - 社区争论：「RLVR 到底是激发新推理能力还是只是提升基座已有能力的采样率」（Does RL Really Incentivize Reasoning 辩论：https://openreview.net/forum?id=4OsgYD7em5 ）
- 技术要点：
  1. RLVR：奖励来自确定性可验证信号（数学答案对错、代码单测通过、格式约束），替代昂贵且易被 reward hacking 的人类偏好奖励模型；Tulu 3 将其确立为开源后训练三阶段之一。
  2. GRPO：对同一 prompt 采样一组（G 个）回答，以组内均值/标准差做基线归一化得到相对优势，去掉 PPO 的 critic，显存与算力显著下降，是 R1 系的默认 RL 框架。
  3. R1-Zero 证明纯 RLVR（acc + 格式奖励）即可从基座涌现长 CoT、反思、自我验证；R1 补充冷启动数据 + 两轮 RL/SFT 迭代解决可读性与语言混杂，该多阶段流水线是面试高频图解题。

## 3. Context Engineering 前沿实践（compaction / Agent 记忆 / 子代理隔离 / just-in-time context）
- 状态：面试出现中（2026 真实面经出现直接对应题：「用 Claude Code 时为什么使用时间越长响应越慢？」——考上下文膨胀与压缩，https://blog.csdn.net/weixin_44151034/article/details/161729146 ）
- 来源：
  - Anthropic 官方工程博客《Effective context engineering for AI agents》：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents （2025-09-29）
  - Anthropic 官方 Cookbook《Memory vs. Compaction vs. Tool Clearing》：https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools （2026-03，含三类 API 的正式标识符与配置项）
- 面试问法/社区主题：
  - 「Claude Code 越用越慢的原因与解法」（CSDN 2026 大厂面经真题；标准答案即上下文污染 + compaction/tool clearing）
  - 社区主题：compaction、tool-result clearing、memory 三者的选型边界——整窗压缩、清旧工具结果、跨会话持久化各解决什么瓶颈（Cookbook 核心议题）
- 技术要点：
  1. 核心心法：上下文是有限资源、边际收益递减（context rot），目标是「最小的高信号 token 集」；等更大窗口解决不了 context pollution。
  2. 三大官方原语已 API 化：server-side compaction（compact_20260112，阈值触发全窗摘要）、context editing/tool-result clearing（clear_tool_uses_20250919，删旧可重取的工具结果但保留调用记录）、memory tool（memory_20250818，模型自驱的文件式外部记忆）。
  3. just-in-time context：不全量预载，保留轻量标识符（文件路径、查询语句、链接）按需加载；Claude Code 即混合式——CLAUDE.md 先入上下文，glob/grep 运行时检索；子代理架构让探索型任务在干净窗口里消耗数万 token、只向主代理回传 1-2K 摘要。

## 4. Agentic RAG 与自主检索智能体（plan-search-reflect、Self-RAG 演进、search agents）
- 状态：面试出现中（javaguide《AI 应用开发面试指南》与面灵AI 2026 题库均把「RAG 全链路/Agentic RAG」列为独立考察模块：https://javaguide.cn/ai/interview-questions/ai-interview-guide.html ）
- 来源：
  - 综述《Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG》（arXiv 2501.09136）：https://arxiv.org/html/2501.09136v3 （2025，把 reflection 列为 agentic 工作流基础设计模式）
  - NVIDIA 开发者博客《Traditional RAG vs. Agentic RAG》：https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/ （2025）；IBM 概念页：https://www.ibm.com/think/topics/agentic-rag
- 面试问法/社区主题：
  - 「Agentic RAG 和传统 RAG 的本质区别？什么场景必须上 Agentic RAG，什么场景是过度设计？」（NVIDIA/IBM 博客的标准对比框架）
  - 「讲一个 plan-search-reflect 循环：检索质量差时 agent 如何判断改写 query、换数据源还是直接回答？」（Self-RAG 的反思令牌思想 → Corrective/Adaptive RAG 的演进链是常见追问）
- 技术要点：
  1. 核心跃迁：检索从固定管道的前置步骤变为 agent 可规划、可重试、可组合的「工具」——agent 决定何时检索、检索什么、多轮迭代、是否足够。
  2. 关键循环组件：路由（query 分诊到不同索引/数据源）→ 检索 → 评分与接地检查（grading/grounding，Self-RAG 的 ISREL/ISSUP 反思令牌思想）→ 改写或分解 query → 循环直至可信。
  3. 工程演进线：Self-RAG（2023，训练模型输出反思令牌）→ Corrective/Adaptive RAG（ corrective 动作：web 兜底）→ 2025 起以通用 LLM + 工具调用实现，无需专训；多代理版（Anthropic multi-agent research 系统模式）把检索隔离进子代理。

## 5. A2A 协议与多 Agent 互操作（Google A2A → Linux Foundation、与 MCP 的分工）
- 状态：趋势观察（已进 2026 面试准备清单与官方标准体系，但检索未找到确证真题；知乎 851 题整理者称「MCP、A2A……每年冒出新版本」属备考材料而非真题佐证：https://zhuanlan.zhihu.com/p/2058150232085607301 ）
- 来源：
  - Linux Foundation 官方公告（A2A 项目成立、100+ 企业支持）：https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents （2025-06-23）
  - A2A 官方规范与站点：https://a2a-protocol.org/v0.3.0/specification/ （v0.3，The Linux Foundation）；MCP 分工说明：https://a2a-protocol.org/latest/
- 面试问法/社区主题：
  - 「A2A 和 MCP 是竞争还是互补？各自解决什么问题」（官方 FAQ 与社区最热对比题）
  - 社区主题：v0.3 新增 gRPC 支持、Agent Card 签名安全机制对企业落地的影响（Google Cloud 2025-07-31 升级公告：https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade ）
- 技术要点：
  1. 定位分工：MCP 管 agent↔tool（连接工具/API/资源），A2A 管 agent↔agent（不透明黑盒智能体间的发现、委派与协作），官方口径是互补而非竞争——「Build with ADK, equip with MCP, communicate with A2A」。
  2. 核心机制：Agent Card 自描述清单（身份、能力 skills、安全方案、支持传输）实现发现；JSON-RPC/gRPC/HTTP+JSON 三种传输等价、跑在 HTTP(S) 上；支持同步请求、SSE 流式与异步推送通知。
  3. 治理与生态：2025-04 Google 发布、2025-06 捐给 Linux Foundation（TSC 含 AWS/Cisco/Google/IBM/Microsoft/Salesforce/SAP/ServiceNow），Apache 2.0，社区配套 A2A Inspector 与 TCK 兼容性套件。

## 6. AI Coding 智能体（Claude Code / Cursor / Codex 类：Agentic Coding 的能力边界）
- 状态：面试出现中（CSDN 2026 大厂面经含 Claude Code 真题；kamacoder 面经库专设「AI 编程（Vibe Coding / Claude Code）」板块：https://notes.kamacoder.com/interview/llm/ ）
- 来源：
  - Anthropic《Claude Code: Best practices for agentic coding》官方工程博客：https://www.anthropic.com/engineering/claude-code-best-practices （2025）；产品页 https://www.anthropic.com/claude-code
  - 2026 面经佐证：https://blog.csdn.net/weixin_44151034/article/details/161729146 ；https://www.nowcoder.com/discuss/878709844730003456 （字节 Agent 两轮面经）
- 面试问法/社区主题：
  - 真题「用 Claude Code 时为什么使用时间越长响应就越慢？」（答：上下文膨胀 → compaction/清理/子代理）
  - 真题「有了解哪些比较火的 Agent？Claude Code 这类工具的能力边界在哪、适合什么任务不适合什么任务」（牛客字节面经围绕「Agent 架构设计与生产级工程落地」展开，几乎不问空概念）
- 技术要点：
  1. Agentic coding 的最小闭环：单主循环 LLM + 文件读写/Bash/搜索等少量原语工具，配合权限确认与沙箱执行；CLAUDE.md 提供项目级常驻上下文。
  2. 能力边界来自 harness 而非模型：上下文窗口与 context rot、工具结果膨胀、缺乏跨会话记忆决定其「能干多长」；工程手段（compaction、memory、子代理）是当前主要解法（与考点 3 同源）。
  3. 工作流模式：explore-plan-code-commit、TDD 红绿循环、用子 agent 校验代码被官方列为最佳实践；面试考察点集中在「你会如何设计/调优一个 coding agent 的工具集与上下文策略」。

## 7. 计算机使用与多模态 Agent（Computer Use / Operator 类屏幕操作 Agent）
- 状态：趋势观察（官方产品与文档成熟、社区对比文章密集，但 2026 面试题库与面经中未检索到确证真题）
- 来源：
  - OpenAI《Introducing Operator》与《Computer-Using Agent》：https://openai.com/index/introducing-operator/ （2025-01）；https://openai.com/index/computer-using-agent/ （2025）
  - Anthropic 官方文档《Computer use tool》：https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool （2025，截图 + 鼠标键盘控制原语）
- 面试问法/社区主题：
  - 社区主题：「Operator 已并入 ChatGPT Agent，CUA 与 Claude Computer Use 的能力与形态对比」（2026 对比文：https://www.askui.com/blog-posts/claude-vs-openai-operator-vs-askui ）
  - 备考讨论：CUA 类 Agent 的可靠性、确认机制与安全边界（workos 对比文：https://workos.com/blog/anthropics-computer-use-versus-openais-computer-using-agent-cua ）
- 技术要点：
  1. 原理：模型以「感知-行动」循环操作 GUI——截图作为视觉输入，输出坐标级点击/打字/滚动动作；OpenAI CUA 专门训练在按钮、菜单、文本框等人机交互元素上闭环操作。
  2. 两类形态：浏览器内虚拟环境（Operator 起家，现并入 ChatGPT Agent）vs 直控本机桌面（Claude Computer Use，覆盖 Windows/Mac/Linux）。
  3. 核心瓶颈：步级错误累积与可靠性（对高危害动作必须人工确认），工程上靠动作白名单、域限制、human-in-the-loop 闸门兜底。

## 8. Agent 沙箱与可靠执行（代码执行沙箱、微 VM 隔离、E2B 类工具）
- 状态：趋势观察（E2B/Firecracker 路线已成 2026 基础设施共识、对比文密集，但未检索到确证面试真题；推测（推断）在 Agent 平台/infra 岗会更早进入面试）
- 来源：
  - E2B 官方站点（Firecracker microVM、<200ms 冷启动、单沙箱最长 24h）：https://e2b.dev/ ；开源仓库 https://github.com/e2b-dev/E2B
  - 横向对比（2026）：Modal《Best microVM Sandboxes for AI Code Execution》：https://modal.com/resources/best-microvm-sandboxes-ai-code-execution ；Northflank《E2B vs Modal》：https://northflank.com/blog/e2b-vs-modal
- 面试问法/社区主题：
  - 社区主题：「E2B vs Modal vs Daytona（gVisor 路线）怎么选」——隔离强度、冷启动、GPU 透传的取舍（https://www.spheron.network/blog/ai-agent-code-execution-sandbox-e2b-daytona-firecracker/ ）
  - 社区主题：容器 vs microVM 的隔离层级——每个 Firecracker VM 独立内核镜像，强隔离带来高开销的设计权衡
- 技术要点：
  1. 隔离谱系：共享内核容器 → 用户态内核 gVisor → Firecracker microVM（KVM 级硬件虚拟化，AWS Lambda/Fargate 同源技术）；执行不可信 agent 代码的底线是 microVM 级硬件隔离。
  2. E2B 模式：按需创建/销毁的 Firecracker 沙箱，冷启动 <200ms、最长运行 24h，暴露文件系统/进程/网络 API 与代码解释器 SDK，支持自托管（OSS 版）。
  3. 工程要点：沙箱即 agent 的「计算机」——与 MCP 工具调用互补（动态跑代码 vs 固定工具），快照恢复、并发扇出（map-reduce 式批量执行）、产物（文件/图表）回传是选型与面试深挖点。

---

## 附：核实说明与开放问题
- 「面试出现中」判定依据集中于 2026 年更新的中文面试题库（面灵AI、javaguide、kamacoder、小林coding）与真实面经（CSDN、牛客）；英文面试题库佐证较少，属开放问题。
- A2A、Computer Use、沙箱三个考点均具备成熟官方来源，但未检索到确证真题，按纪律如实标注「趋势观察」；若后续拿到平台岗面经可升级。
- 检索限制：Exa 免费额度中途限流（1 轮失败，改用备用检索通道完成）；Agentic RAG 首轮检索为空，第二轮换词成功。
