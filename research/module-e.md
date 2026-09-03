# 模块E 检索报告 v2（层级化）

> v1 检索时间 2026-09-02（8 次）；v2 补充检索时间 2026-09-03（5 次：中文搜索 ×2 + Exa 英文/中文 ×3）。
> v2 补充方向：①「多 Agent 平台架构」L4 资深岗问法；②「Agent 评测与生产治理」真题形态；③ L1 直觉类开场题面经形态。
> 标注约定：「经外部检索」= 有可查 URL 的来源；「转述」= 来自搜索结果摘要、原帖未直接打开；「内置知识」= 未检索到、可信度较低。

## 继承考点（e1~e9 v1 结论）

| id | 名称 | 星级 | 主要来源（完整 URL 见文末 v1 来源索引） |
|---|---|---|---|
| e1-agent-anatomy | Agent 核心架构（规划/记忆/工具） | ⭐4 | 牛客·大模型Agent面试全攻略、牛客·Top50 必刷题（经外部检索） |
| e2-react-loop | ReAct 循环 | ⭐5 | 牛客 Top50 第 1 题、牛客真实面经"面试官真问了ReAct"、代码随想录 2026 汇总（经外部检索） |
| e3-function-calling | Function Calling 与参数校验 | ⭐5 | 小林面试笔记、CSDN FC 详解、代码随想录、Seven97、知乎 FC/MCP/A2A（经外部检索） |
| e4-tool-error-loops | 工具调用异常与死循环防护 | ⭐4 | 代码随想录 2026 汇总（原文）、面试鸭题库/字节追问（经转述） |
| e5-agent-memory | Agent 记忆系统 | ⭐4 | 知乎·字节面试题记忆系统、JavaGuide、JavaBetter 13 题（经外部检索） |
| e6-planning-reflection | 规划与反思（Plan-and-Execute/Reflection） | ⭐3 | 知乎 15 题、牛客全攻略（间接）；专项面经原文未检索到 |
| e7-multi-agent | 多智能体协作 | ⭐3 | 无虚熊 150+ 题、知乎 15 题、CSDN 框架对比（间接） |
| e8-mcp-tools | MCP 协议与工具生态 | ⭐4 | 知乎 MCP 必考题、腾讯云、JavaUp、阿里云（经外部检索） |
| e9-agent-frameworks | Agent 开发框架对比 | ⭐3 | 小林面试笔记、GolangStar、GitHub AgentGuide（经外部检索） |
| e10-context-engineering（v1 已建议新增） | 上下文工程（压缩/摘要/卸载） | ⭐4 | JavaBetter 13 题、阿里云记忆系统 ｜ v2 建议层级：L3 |
| e11-a2a-protocol（v1 已建议新增） | A2A 协议与 Agent 互操作 | ⭐3 | 知乎 FC/MCP/A2A、ANP 十问十答 ｜ v2 建议层级：L3~L4 |

## 层级化新增/调整建议

- [Agent vs Chatbot vs Workflow 三分谱系（开场定义题）] ｜ 建议层级 L1 ｜ ⭐4 ｜ 来源：JavaGuide《AI Agent 面试题总结》基础篇第 1 题即"AI Agent 是什么？和普通 Chatbot 有什么区别？"（https://javaguide.cn/ai/interview-questions/agent-interview-questions.html ，经外部检索）；牛客真实面经《Agent 概念与基本架构面试问答》Q2"Chatbot、Workflow 和 Agent 有什么区别？"（https://www.nowcoder.com/discuss/916877028622598144 ，经外部检索）；卡码笔记《Agent 到底是什么？和普通大模型问答、ChatBot、Workflow 有什么区别》专文（https://notes.kamacoder.com/llm/app/agent_intro.html ，经外部检索）；CSDN《agent面试必备2：搞懂 AI Agent 与 ChatBot、LLM Chain 的本质区别（面试必考）》（https://bqleng.blog.csdn.net/article/details/161744517 ，经外部检索） ｜ 一句话定义：用"是否由模型自己决定下一步"区分 Chatbot（生成回复）、Workflow（代码预定义路径）、Agent（模型动态决策+反馈闭环），是面经中确认存在的第一道开场题。
  - 调整建议：e1 的 L1 开场形态应前置为本题（比"架构四件套"更基础），四件套公式作为本题的展开答案；卡码文强调其筛选动机——"很多简历上写了 Agent，但讲出来还是一个 ChatBot"。
- [多 Agent 平台架构（编排模式/通信协议栈/平台化治理）] ｜ 建议层级 L4（资深岗） ｜ ⭐4 ｜ 来源：知乎《多Agent架构面试全解析：通信、编排、Tool取舍与工程代价》，含"面试官问主Agent和子Agent的通信链路、为什么用多Agent而不是Tool"（https://zhuanlan.zhihu.com/p/2040834441451459515 ，经外部检索）；卡码笔记《Multi-Agent Harness面试详解：未来竞争不是谁的Agent更多》，讲"架构编排层与决策权"（https://notes.kamacoder.com/interview/llm/multi_agent_harness_interview.html ，经外部检索）；面试大师·网易 AI 应用开发真实面经题《对接多家国内大模型官方 API 时，如何设计统一调用网关来屏蔽接口差异？》（https://mianshidashi.cn/interview-questions/netease/ai-application-development/netease-ai-application-llm-provider-gateway ，经外部检索，页面标注"真实面经题"）；技术栈《AI面试临阵磨枪-59：企业内部 AI 系统权限、数据隔离、审计设计》（https://jishuzhan.net/article/2058539259574403073 ，经外部检索）；AI Master《设计一个 AI Gateway：支持多模型路由、降级与成本优化》（https://www.ai-master.cc/interview/ai-gateway-design-001 ，经外部检索） ｜ 一句话定义：把 e7 的"多 Agent 协作"上升到平台层——主/子 Agent 编排与决策权设计、MCP/A2A 构成的通信协议栈、以及多租户权限/审计/成本治理（AI Gateway、Agent Harness 六层治理）的平台化能力。
  - 层级理由：编排与协作本身是 L3（e7 ⭐3），但"平台化治理"（网关收敛密钥与审计、多租户隔离、Token 预算熔断）只出现在资深岗系统设计题，符合 L4 定位；"Agent 无密钥、Gateway 掌密钥"（AI Master）与 Harness 六层治理结构（yeasy.gitbook.io/agentic_ai_guide 9.5，经外部检索）可作为标答框架。
- [Agent 评测与生产治理（轨迹评估/解决率/Trace 可观测）] ｜ 建议层级 L4（基础问法下探 L3） ｜ ⭐4 ｜ 来源：CSDN 智能体开发者社区《【AI Agent面试题】LLM-as-a-Judge：让大模型当裁判，怎么做、坑在哪？》，覆盖 Pointwise/Pairwise/Reference-based 三形态（https://adg.csdn.net/6a87b5d210ee7a33f29d5a54.html ，经外部检索）；知乎《大模型面试118题（十六）：模型评估》Q94 LLM-as-a-Judge 可靠性、Q96 LLM Observability（https://zhuanlan.zhihu.com/p/2057196604575290069 ，经外部检索）；ZiCode《Agent面试详解（下）：评测、安全与落地判断》——"用 Trace 还原轨迹，用四层测试控制不确定性"（https://zicode.com/blog/agent-interview-guide-part-3/ ，经外部检索）；LangChain LangSmith 官方教程《Evaluate a complex agent》三粒度：final response / trajectory / single step（https://docs.langchain.com/langsmith/evaluate-complex-agent ，经外部检索）；LangChain《Evaluating AI Agents at the Run, Trace, and Thread Level》——Run/Trace/Thread 三原语、会话级指标 resolution rate/escalation frequency/goal completion、89% 组织有可观测但仅 52% 跑离线评测（https://www.langchain.com/resources/agent-evals ，经外部检索，2026-06）；Galileo《How to Become An AI Agent Evaluation Engineer?》含多道原文面试题（https://galileo.ai/blog/how-to-become-agent-evaluation-engineer-career-guide ，经外部检索） ｜ 一句话定义：对非确定性 Agent 用 Run/Trace/Thread 三级粒度做评估——最终答案、工具调用轨迹（trajectory match 的 strict/unordered/subset/superset 四模式）、跨轮会话解决率，配合 LLM-as-Judge 校准与线上可观测（LangSmith 类 Trace 工具）形成"生产 Trace→回归数据集"治理闭环。
  - 层级与星级理由：中文面试资料已出现专项题（CSDN/知乎/ZiCode），符合 v1 对 ⭐4 的判据（"出现大量专项面试资料"）；但中文真实面经原文样本仍少于 MCP，故不评 ⭐5；基础问法（"怎么评估 Agent 效果"）L3 即需掌握，系统设计形态（"给一群 Agent 设计生产监控"）属 L4。

## 面试问法补充

- Agent vs Chatbot vs Workflow（L1）：
  - 「AI Agent 是什么？和普通 Chatbot 有什么区别？」（JavaGuide 基础篇第 1 题，原文）
  - 「Chatbot、Workflow 和 Agent 有什么区别？」及追问「ChatBot 加上插件是不是就变成 Agent 了？」「RAG+Chat 算不算 Agent？」（牛客面经 Q2 原文 + CSDN agent面试必备2 原文）
- 多 Agent 平台架构（L4）：
  - 「主 Agent 和子 Agent 的通信链路是怎样的？为什么用多 Agent 而不是把能力做成 Tool？」（知乎·多Agent架构面试全解析，经转述自摘要）
  - 「在设计企业内部的 AI Agent 或 RAG 系统时，你如何实现多租户权限控制、企业级数据隔离以及全链路合规审计？」（技术栈·临阵磨枪-59，原文）
  - 「对接多家国内大模型官方 API 时，如何设计统一调用网关来屏蔽接口差异？」（网易 AI 应用开发真实面经题，原文）；同族题：「设计一个 AI Gateway：支持多模型路由、降级与成本优化」（AI Master 题库标题，原文）
- Agent 评测与生产治理（L4）：
  - 「How would you design an evaluation framework for a multi-step reasoning agent?」（Galileo 评测工程师指南原文；标答需覆盖轨迹级评估、Agent 专属指标、非确定性输出的统计方法）
  - 「An agent's tool selection accuracy dropped 3% this week. Walk through your debugging process.」（Galileo 原文场景题；考察数据漂移排查、失败案例归因、统计显著性）
  - 「LLM-as-a-Judge 怎么做？坑在哪？」（CSDN ADG 专项题标题，原文；标答覆盖 Pointwise/Pairwise/Reference-based 与 judge 校准）
  - 中文基础问法（推断，未检索到原句）：「怎么评估一个 Agent 的好坏？只看最终回复够吗？」——可由 ZiCode 评测篇与知乎 118 题 Q94/Q96 支撑作答。

## 开放问题

- 「多 Agent 平台架构」的"通信协议栈"问法（如"A2A 消息格式怎么设计""跨 Agent 身份与委托链"）未检索到直接面经原文，当前仅由编排/治理问法侧面覆盖；建议后续用"A2A 面试题""Agent 通信协议 面试"补检。
- 「解决率（resolution rate）」作为中文面试术语尚未在中文题库中直接出现（当前来源为 LangChain 英文资料），中文问法更可能以"上线后怎么衡量 Agent 效果/任务完成率"形式出现——此为推断。
- v1 遗留：e6（Reflection 专项）与 e7（Multi-Agent 直接面经）仍未获原文问法，本轮新增的知乎多Agent解析可部分缓解 e7，e6 维持内置知识标注。

## 参考来源

### v2 新增（检索时间 2026-09-03）
| 来源 | 类型 | URL |
|---|---|---|
| JavaGuide·AI Agent 面试题总结 | 权威技术文档站题库 | https://javaguide.cn/ai/interview-questions/agent-interview-questions.html |
| 牛客·agent面经 Agent 概念与基本架构问答 | 真实面经 | https://www.nowcoder.com/discuss/916877028622598144 |
| 卡码笔记·Agent vs ChatBot/Workflow 区别 | 技术博客题库 | https://notes.kamacoder.com/llm/app/agent_intro.html |
| 卡码笔记·Agent 大厂面试题汇总 | 技术博客题库 | https://notes.kamacoder.com/interview/llm/agent_interview.html |
| CSDN·agent面试必备2 ChatBot/Chain/Agent 区别 | 技术博客题库 | https://bqleng.blog.csdn.net/article/details/161744517 |
| 犬小哈教程·Agent 与大模型本质不同 | 技术博客题库 | https://www.quanxiaoha.com/java-interview/agent-vs-llm-difference |
| 知乎·多Agent架构面试全解析 | 社区题解 | https://zhuanlan.zhihu.com/p/2040834441451459515 |
| 卡码笔记·Multi-Agent Harness 面试详解 | 技术博客题库 | https://notes.kamacoder.com/interview/llm/multi_agent_harness_interview.html |
| 面试大师·网易 AI 应用开发面经（统一调用网关） | 面经解析站（标注真实面经题） | https://mianshidashi.cn/interview-questions/netease/ai-application-development/netease-ai-application-llm-provider-gateway |
| 技术栈·企业内部 AI 权限/数据隔离/审计设计 | 面试题解析站 | https://jishuzhan.net/article/2058539259574403073 |
| AI Master·设计一个 AI Gateway | 题库站 | https://www.ai-master.cc/interview/ai-gateway-design-001 |
| yeasy GitBook·Agentic AI 指南 9.5 企业级部署 | 开源指南（背景参考） | https://yeasy.gitbook.io/agentic_ai_guide/di-san-bu-fen-gong-cheng-shi-jian-yu-luo-di/09_agentops/9.5_enterprise.md |
| CSDN ADG·LLM-as-a-Judge 面试题 | 社区题库 | https://adg.csdn.net/6a87b5d210ee7a33f29d5a54.html |
| 知乎·大模型面试118题（十六）模型评估 | 社区题库 | https://zhuanlan.zhihu.com/p/2057196604575290069 |
| ZiCode·Agent面试详解（下）：评测、安全与落地判断 | 技术博客题库 | https://zicode.com/blog/agent-interview-guide-part-3/ |
| LangSmith 官方·Evaluate a complex agent | 官方文档 | https://docs.langchain.com/langsmith/evaluate-complex-agent |
| LangChain·Agent Evals（Run/Trace/Thread） | 官方白皮书（2026-06） | https://www.langchain.com/resources/agent-evals |
| LangChain 博客·Agent observability powers evaluation | 官方博客（2026-01） | https://www.langchain.com/blog/agent-observability-powers-agent-evaluation |
| Galileo·How to Become An AI Agent Evaluation Engineer | 厂商博客（含面试题，2025-12） | https://galileo.ai/blog/how-to-become-agent-evaluation-engineer-career-guide |
| AWS·Agent 质量评估（Agentic AI 基础设施系列六） | 云厂商博客（背景参考） | https://aws.amazon.com/cn/blogs/china/agent-quality-evaluation/ |

### v1 来源索引（检索时间 2026-09-02，星级判定依据）
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
| JavaBetter·Agent 核心架构 13 题（ReAct/Plan-and-Execute/Multi-Agent） | 社区题库 | https://javabetter.cn/sidebar/itwanger/paicli/paicli-interview-agent-core.html |
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
