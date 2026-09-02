# 模块E 检索报告（Agent 智能体）

> 检索时间：2026-09-02；共执行 8 次检索（1 次超时）。已检索到《AI Agent 面试 Top50 必刷题》原帖（牛客网）。
> 标注约定：「经外部检索」= 有可查 URL 的来源；「转述」= 来自搜索结果摘要、原帖 URL 未直接返回；「内置知识」= 未检索到、基于模型内部知识，可信度较低。

## e1-agent-anatomy Agent 核心架构（规划/记忆/工具）
- 星级：⭐4（维持。多来源显示它是 Agent 面试的开场定义题，但常作为 ReAct/Function Calling 的引子而非独立深挖，未达"几乎必问"的 ⭐5）
- 来源：
  - 牛客网《大模型Agent面试全攻略（附答题思路）》"核心概念与架构篇"首题即考架构组成：https://www.nowcoder.com/discuss/871718560224112640 （经外部检索）
  - 牛客网《AI Agent 面试Top50 必刷题》：https://www.nowcoder.com/discuss/886328246717911040 （经外部检索）
- 面试问法：
  - 「请简述Agent的基本架构组成，并解释其与传统LLM Chain的区别。」（牛客·大模型Agent面试全攻略，原文）
  - 「Agent = LLM + 规划(Planning) + 记忆(Memory) + 工具使用(Tool Use)」（同上文的标答要点，原文）
- 高频考点提示：
  - 四件套公式：LLM（大脑）+ Planning + Memory + Tool Use，要能逐项展开
  - Agent 与传统 Chain/Pipeline 的区别：动态决策循环 vs 固定流程编排
  - 各组件的工程落点：规划靠 ReAct/Plan-and-Execute，记忆靠上下文+外部存储，工具靠 Function Calling
  - 常被追问"你的项目里 Agent 是怎么架构的"，需结合自己做过的项目答

## e2-react-loop ReAct 循环
- 星级：⭐5（确认。《AI Agent 面试 Top50 必刷题》第 1 题即"什么是ReAct？"，且有真实面经帖专门记录被问 ReAct，属几乎必问）
- 来源：
  - 牛客网《AI Agent 面试Top50 必刷题》第 1 题：https://www.nowcoder.com/discuss/886328246717911040 （经外部检索）
  - 牛客真实面经《Agent面试会问什么？#面试官真问了ReAct》：https://www.nowcoder.com/feed/main/detail/54c6b1e12c8646d799d1c0bd18e4f471 （经外部检索）
  - 牛客《Top50 必刷题解析（ReAct 篇）》系列：https://www.nowcoder.com/discuss/1654835 （经外部检索）
  - 知乎·代码随想录《2026年Agent大厂面试题汇总：ReAct、Function Calling、MCP、RAG》：https://zhuanlan.zhihu.com/p/2028511483969937686 （经外部检索）
- 面试问法：
  - 「什么是ReAct？」（牛客 Top50 第 1 题，原文）
  - 「ReAct 就是让模型'边想边做'，先推理再调用工具；任务拆解分步走」（牛客真实面经中的答题要点，原文）
- 高频考点提示：
  - Reasoning + Acting 交替循环：Thought → Action → Observation，直到得出 Final Answer
  - 与 CoT 的区别：CoT 只推理不行动，ReAct 把工具观察结果写回推理链
  - ReAct 循环的终止条件与最大步数控制（与 e4 死循环防护联动，知乎汇总里就有"ReAct 循环会死循环吗"一题）
  - 手写伪代码级掌握：prompt 拼接、解析 Action、执行工具、回填 Observation

## e3-function-calling Function Calling 与参数校验
- 星级：⭐5（确认。小林面试笔记、代码随想录、Seven97 等多个独立题库均设专项，且"FC 怎么训练/微调""FC vs MCP"是高频追问）
- 来源：
  - 小林面试笔记《什么是 Function Calling？原理是什么？》：https://xiaolinnote.com/ai/tools/1_function_calling.html （经外部检索）
  - CSDN《大模型面试之 Function Call 详解》（含"怎么训练、怎么微调"问法）：https://blog.csdn.net/m0_37733448/article/details/147440119 （经外部检索）
  - 代码随想录《Function Calling 详解——为什么是 Agent 的基础》：https://notes.kamacoder.com/llm/app/function_calling.html （经外部检索）
  - Seven 的菜鸟成长之路《LLM 工具调用常见面试题》：https://www.seven97.top/interview/ai/tool.html （经外部检索）
  - 知乎面经《Function Call、MCP、A2A》：https://zhuanlan.zhihu.com/p/1898326676087223572 （经外部检索）
- 面试问法：
  - 「什么是Function Calling？原理是什么？」（小林面试笔记标题，原文）
  - 「Function Call 是怎么训练、怎么微调的？」（CSDN 面试详解，原文）
  - 「MCP 与 Function Call 的区别是什么？」（知乎面经高频对比题，原文）
- 高频考点提示：
  - 核心机制：模型只输出函数名 + JSON 参数（tool_calls），不真正执行，由应用侧执行后回传结果
  - Schema/参数校验：JSON Schema 定义、必填字段与枚举校验、幻觉参数（编造不存在的参数值）处理
  - 并行调用：一次响应输出多个 tool_calls（如"同时查北京和上海的天气"）
  - 进阶追问：FC 能力的来源（SFT 指令微调，Llama3/Qwen 技术报告有公开细节）
  - 对比题三连：Function Call vs MCP vs A2A

## e4-tool-error-loops 工具调用异常与死循环防护
- 星级：⭐4（维持。确认为字节等大厂高频追问、面试鸭设有专项题，但多以追问/场景题形式出现，独立出题密度略低于 e2/e3，故不上调 ⭐5）
- 来源：
  - 知乎·代码随想录《2026年Agent大厂面试题汇总》（原文含"死循环：工具持续失败 Agent 反复重试→解法：最大步数+相同动作检测；幻觉工具调用"）：https://zhuanlan.zhihu.com/p/2028511483969937686 （经外部检索）
  - 面试鸭 AI Agent 题库（含"Agent 死循环问题有遇到过吗？如何解决？"专项题）：https://nageoffer.com/ai/interview/home/ （经外部检索，问法经搜索摘要转述）
  - 字节面试追问「你的 Agent 调了三个工具就死循环了」「工具调用失败怎么办？」（转述：来自搜索摘要引述的知乎/面试鸭汇总内容，原帖 URL 未在结果中返回）
- 面试问法：
  - 「Agent 死循环问题有遇到过吗？如何解决？」（面试鸭题库，经转述）
  - 「工具调用失败怎么办？」（字节高频追问，经转述；标答要求覆盖调用前参数/权限校验、调用中超时、失败后区分临时性 vs 确定性错误）
- 高频考点提示：
  - 死循环三根因：参数错误未修正盲目重试、无重试上限、每轮重试都向用户发消息
  - 防护手段：最大步数/最大重试次数、相同（动作,参数）检测、超时与熔断
  - 错误分型处理：临时性错误指数退避重试，确定性错误降级/换工具/兜底告知用户
  - 幻觉工具调用：调用不存在的工具名，需在 Runtime 层严格校验并拦截
  - 加分项：把失败观察（error observation）回填给 LLM 让其自行修正，而非静默重试

## e5-agent-memory Agent 记忆系统
- 星级：⭐4（维持。有来源称"Memory 几乎是所有 AI Agent 面试的核心考点"（单一来源观点），另有字节真题与专项 13 题清单佐证；考虑其常并入 e1 架构题作答，维持 ⭐4、贴近 ⭐5）
- 来源：
  - 知乎《字节面试题：Agent 的记忆系统怎么设计？短期记忆和长期记忆到底有什么区别？》：https://zhuanlan.zhihu.com/p/2054956661874472543 （经外部检索）
  - 知乎《十分钟带你快速掌握Agent记忆管理高频面试题》：https://zhuanlan.zhihu.com/p/2056052651524109554 （经外部检索）
  - JavaGuide《AI Agent 记忆系统：短期记忆、长期记忆与记忆演化机制》：https://javaguide.cn/ai/agent/agent-memory.html （经外部检索）
  - JavaBetter《AI Agent 面试题第二弹：Memory 系统、RAG 检索、长上下文工程 13 题》：https://javabetter.cn/sidebar/itwanger/paicli/paicli-interview-memory-context.html （经外部检索）
- 面试问法：
  - 「Agent 的记忆系统怎么设计？短期记忆和长期记忆到底有什么区别？」（知乎·字节面试题标题，原文）
  - 「大模型应用中如何实现长短期记忆机制？怎么存、怎么检索？」（ai-master.cc 面试题标题，原文：https://www.ai-master.cc/interview/agent-memory-implementation-001 ）
- 高频考点提示：
  - 两层模型：短期记忆 = Session 级对话历史/滑动窗口/摘要压缩；长期记忆 = 跨 Session 持久化（向量库/结构化 DB）
  - 记忆生命周期：写入时机、存储粒度、检索策略（相似度召回 + 注入上下文）、淘汰与遗忘
  - 进阶：记忆压缩（Memory Summary）、用户画像沉淀、记忆冲突与治理
  - 可提的四层架构：感知记忆/短期（工作台）/长期（知识库）/实体记忆（结构化关键事实）
  - 常与上下文窗口限制、RAG 的边界一起追问

## e6-planning-reflection 规划与反思（Plan-and-Execute/Reflection）
- 星级：⭐3（维持。仅获间接佐证——知乎《Agent 精选15题》覆盖"规划执行"、牛客全攻略将 Planning 列为架构四件套之一；Reflection/Plan-and-Execute 专项题未检索到，故维持 ⭐3）
- 来源：
  - 知乎《Agent 精选15题》（涵盖记忆管理、规划执行、多Agent系统）：https://zhuanlan.zhihu.com/p/1980294044010702447 （经外部检索，间接）
  - 牛客《大模型Agent面试全攻略》（Planning 为标答四件套之一）：https://www.nowcoder.com/discuss/871718560224112640 （经外部检索，间接）
  - Plan-and-Execute/Reflection 专项面试题：未经外部检索：内置知识
- 面试问法（内置知识，未检索到原文）：
  - 「ReAct 和 Plan-and-Execute 有什么区别？各自适用什么场景？」（内置知识）
  - 「什么是 Reflection/Self-Critique？如何用反思提升 Agent 完成率？」（内置知识）
- 高频考点提示：
  - 先规划后执行 vs 边想边做：Plan-and-Execute 适合长任务、ReAct 适合短平快，混合模式（执行中重规划）
  - Reflection 闭环：执行 → 自评/批判 → 修正再执行（Reflexion 思路）
  - 任务拆解（Decomposition）：子目标生成与依赖排序
  - 工程落点：计划的可变性、失败子任务的重规划成本

## e7-multi-agent 多智能体协作
- 星级：⭐3（维持。多智能体被多个独立考点清单收录（无虚熊 150+ 题、知乎 15 题、Top50 考点趋势），但专项检索超时未获直接面经原文，维持 ⭐3）
- 来源：
  - 无虚熊AI《AI Agent 面试题大全（150+ 题）》（含 Multi-Agent 协作专题）：https://www.wushixiongai.com/agent （经外部检索，间接）
  - 知乎《Agent 精选15题》（含多Agent系统）：https://zhuanlan.zhihu.com/p/1980294044010702447 （经外部检索，间接）
  - CSDN《LangChain+LlamaIndex+AutoGen+LangGraph对比》（AutoGen 多智能体协作模式：双人对话/群聊/经理-员工）：https://blog.csdn.net/usa_washington/article/details/151869985 （经外部检索，间接）
  - 多智能体专项面经原文：检索超时，未经外部检索：内置知识
- 面试问法（内置知识，未检索到原文）：
  - 「什么场景下需要多智能体？相比单 Agent 的收益和代价是什么？」（内置知识）
  - 「多智能体之间如何通信与任务编排？怎么解决消息传递失控/成本膨胀？」（内置知识）
- 高频考点提示：
  - 编排模式：中心化（Manager/Orchestrator）vs 去中心化（群聊/握手）；AutoGen/CrewA/LangGraph 的模式差异
  - 通信协议与消息格式、共享黑板 vs 点对点传话
  - 工程痛点：错误传播放大、上下文重复消耗、可观测性差
  - 适用性判断：能单 Agent 解决就不上多 Agent（面试官常考这个"反直觉"判断）

## e8-mcp-tools MCP 协议与工具生态
- 星级：⭐4（上调自 ⭐3。2025–2026 出现大量 MCP 专项面试资料，标题直用"必考题""高频面试题"表述，且进入 Top50 考点趋势与阿里云 65 题宝典，热度显著高于一般 ⭐3 主题）
- 来源：
  - 知乎《面试官最爱问的MCP问题！大模型岗位必考题精选》：https://zhuanlan.zhihu.com/p/1950977740351177021 （经外部检索）
  - 腾讯云《面试官：你项目里接了MCP，讲一下你的理解？》：https://cloud.tencent.com/developer/article/2664521 （经外部检索）
  - JavaUp《MCP协议面试速查》：https://javaup.chat/ai-interview/quick-review/mcp-protocol/ （经外部检索）
  - 知乎《MCP 最新面试八股文》：https://zhuanlan.zhihu.com/p/1955109180521314171 （经外部检索）
  - 阿里云开发者《面试被问MCP？看这一篇文章就行了》：https://developer.aliyun.com/article/1733890 （经外部检索）
- 面试问法：
  - 「面试官：你项目里接了MCP，讲一下你的理解？」（腾讯云文章标题，原文）
  - 「MCP协议要解决什么问题？」（JavaUp 速查 Q1，原文）
  - 「MCP 如何做到跨平台兼容？」（CSDN MCP 篇必考问，原文：https://mcp.csdn.net/6a2e3b13662f9a54cb7ed3a1.html ）
- 高频考点提示：
  - 定位：Anthropic 2024 年底开源协议，把 M×N 工具接入碎片化降为 M+N
  - 架构三角色：Host / Client / Server；传输 stdio（本地）与 SSE/Streamable HTTP（远程）
  - 三大能力原语：Tools、Resources、Prompts
  - 必考对比：MCP（系统级能力接入协议）vs Function Calling（单次调用接口），及与 A2A 的分工
  - 项目向追问："你项目里怎么接的 MCP"，要能讲接入与鉴权实操

## e9-agent-frameworks Agent 开发框架对比（LangChain/AutoGen/LlamaIndex）
- 星级：⭐3（维持。小林面试笔记、GolangStar 等设有"框架了解/选型"专项题，属常问但不属于每场必问的深水区）
- 来源：
  - 小林面试笔记《你了解过哪些AI Agent 开发框架？》：https://xiaolinnote.com/ai/langchain/agent_frameworks.html （经外部检索）
  - GolangStar《LangChain vs LlamaIndex 核心场景对比（LLM 面试题）》：https://golangstar.cn/backend_series/llm_interview/agent_frame_compare.html （经外部检索）
  - GitHub AgentGuide《Agent 开发框架对比》（含 Star 数与难度评级）：https://github.com/adongwanai/AgentGuide/blob/main/resources/agent/frameworks.md （经外部检索）
- 面试问法：
  - 「你了解过哪些AI Agent 开发框架？」（小林面试笔记标题，原文）
  - 「LangChain 和 LlamaIndex 有什么区别、分别适合什么场景？」（GolangStar 对比题主旨，原文）
- 高频考点提示：
  - 定位差异：LangChain 通用编排、LlamaIndex 数据索引/RAG 专精、AutoGen 多 Agent 对话、LangGraph 状态图流程控制
  - 组合使用是加分项：如 LlamaIndex 做检索并封装成 Tool，LangGraph 做编排
  - 按场景选型：简单 RAG 用轻量方案，复杂长任务/多 Agent 才上 LangGraph/CrewAI/AutoGen
  - 追问"为什么不用/要去框架化"：抽象层开销、调试黑盒、版本迭代快

## 建议新增知识点清单
- [Agent 上下文工程（Context Engineering：压缩/摘要/卸载）] ⭐4 ｜ 来源：JavaBetter《AI Agent 面试题第二弹：Memory 系统、RAG 检索、长上下文工程 13 题》（https://javabetter.cn/sidebar/itwanger/paicli/paicli-interview-memory-context.html ）、阿里云开发者《AI Agent 的记忆系统》（含压缩、卸载等上下文工程策略，https://developer.aliyun.com/article/1710635 ）｜ 一句话定义：通过滑动窗口、摘要压缩、外部化卸载（写入文件/存储再按需取回）等手段管理 Agent 长任务中的上下文窗口，防止爆窗与信息丢失。
- [A2A 协议与 Agent 互操作] ⭐3 ｜ 来源：知乎面经《大模型算法面经：Function Call、MCP、A2A》（https://zhuanlan.zhihu.com/p/1898326676087223572 ）、Agent Network Protocol《MCP十问十答》（https://agent-network-protocol.com/zh/blogs/posts/mcp-10-questions ）｜ 一句话定义：Google 提出的 Agent2Agent 开放协议，标准化跨 Agent 的任务委托与状态通信，面试中常以"FC vs MCP vs A2A"三方对比题出现（MCP 连接工具，A2A 连接 Agent）。

## 开放问题
- e6（Plan-and-Execute/Reflection）与 e7（Multi-Agent）未检索到可直接引用的面经原文问法，星级基于多个间接考点清单与内置知识判断，建议后续用"Reflection 面试题""CrewAI 面经"等关键词补一轮定向检索。
- "Memory 几乎是所有 AI Agent 面试的核心考点"为单一来源（知乎）表述，e5 是否上调 ⭐5 需更多面经样本佐证。

## 参考来源（含类型与检索时间 2026-09-02）
| 来源 | 类型 | URL |
|---|---|---|
| 牛客·AI Agent 面试Top50 必刷题 | 社区题库（种子已核实） | https://www.nowcoder.com/discuss/886328246717911040 |
| 牛客·Top50 必刷题解析（ReAct 篇） | 社区解析 | https://www.nowcoder.com/discuss/1654835 |
| 牛客·大模型Agent面试全攻略 | 社区攻略 | https://www.nowcoder.com/discuss/871718560224112640 |
| 牛客·面试官真问了ReAct（真实面经） | 真实面经 | https://www.nowcoder.com/feed/main/detail/54c6b1e12c8646d799d1c0bd18e4f471 |
| 知乎·2026年Agent大厂面试题汇总（代码随想录） | 社区题库 | https://zhuanlan.zhihu.com/p/2028511483969937686 |
| 小林面试笔记·Function Calling | 技术博客题库 | https://xiaolinnote.com/ai/tools/1_function_calling.html |
| CSDN·大模型面试之 Function Call 详解 | 技术博客 | https://blog.csdn.net/m0_37733448/article/details/147440119 |
| 代码随想录·Function Calling 详解 | 技术博客题库 | https://notes.kamacoder.com/llm/app/function_calling.html |
| Seven97·LLM 工具调用常见面试题 | 技术博客题库 | https://www.seven97.top/interview/ai/tool.html |
| 知乎·大模型算法面经 FC/MCP/A2A | 社区面经 | https://zhuanlan.zhihu.com/p/1898326676087223572 |
| 知乎·MCP 最新面试八股文 | 社区题库 | https://zhuanlan.zhihu.com/p/1955109180521314171 |
| JavaUp·MCP 协议面试速查 | 技术博客题库 | https://javaup.chat/ai-interview/quick-review/mcp-protocol/ |
| 知乎·面试官最爱问的MCP问题 | 社区题库 | https://zhuanlan.zhihu.com/p/1950977740351177021 |
| 腾讯云·你项目里接了MCP | 云厂商社区 | https://cloud.tencent.com/developer/article/2664521 |
| CSDN·MCP 篇大模型高频面试题目 | 社区题库 | https://mcp.csdn.net/6a2e3b13662f9a54cb7ed3a1.html |
| 阿里云·面试被问MCP | 云厂商社区 | https://developer.aliyun.com/article/1733890 |
| ANP·MCP 十问十答 | 技术博客 | https://agent-network-protocol.com/zh/blogs/posts/mcp-10-questions |
| 知乎·字节面试题 Agent 记忆系统 | 社区面经 | https://zhuanlan.zhihu.com/p/2054956661874472543 |
| 知乎·Agent 记忆管理高频面试题 | 社区题库 | https://zhuanlan.zhihu.com/p/2056052651524109554 |
| JavaGuide·Agent 记忆系统 | 权威技术文档站 | https://javaguide.cn/ai/agent/agent-memory.html |
| JavaBetter·Memory/长上下文工程 13 题 | 社区题库 | https://javabetter.cn/sidebar/itwanger/paicli/paicli-interview-memory-context.html |
| ai-master·长短期记忆机制面试题 | 题库站 | https://www.ai-master.cc/interview/agent-memory-implementation-001 |
| 知乎·Agent 精选15题 | 社区题库 | https://zhuanlan.zhihu.com/p/1980294044010702447 |
| 无虚熊AI·Agent 面试题大全 150+ | 题库站 | https://www.wushixiongai.com/agent |
| 面试鸭·AI Agent 开发面试题库 | 题库站 | https://nageoffer.com/ai/interview/home/ |
| 阿里云·65题 AI Agent 全栈开发面试宝典 | 云厂商社区 | https://developer.aliyun.com/article/1739618 |
| 小林面试笔记·Agent 开发框架 | 技术博客题库 | https://xiaolinnote.com/ai/langchain/agent_frameworks.html |
| GolangStar·LangChain vs LlamaIndex | 技术博客题库 | https://golangstar.cn/backend_series/llm_interview/agent_frame_compare.html |
| GitHub AgentGuide·框架对比 | 开源指南 | https://github.com/adongwanai/AgentGuide/blob/main/resources/agent/frameworks.md |
| CSDN·LangChain/LlamaIndex/AutoGen/LangGraph 对比 | 技术博客 | https://blog.csdn.net/usa_washington/article/details/151869985 |
| 阿里云·AI Agent 记忆系统（上下文工程） | 云厂商社区 | https://developer.aliyun.com/article/1710635 |
