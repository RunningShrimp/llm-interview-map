# 模块G 检索报告（综合架构与面试实战）

> 检索时间：2026-09-02；检索方式：WebSearch 中文面试资料，共 5 次，全部成功。
> 结论先行：5 个候选点全部经外部检索证实为真实面试考点，星级全部维持原判。

## g1-knowledge-qa-system 企业知识库问答系统设计
- 星级：⭐5（维持。RAG/知识库问答是当前大厂 LLM 应用面试资料密度最高的设计题：存在腾讯面试真题、多个专题题库（22 题、10 连问、大厂汇总），且普遍作为第一道系统设计题出现，确证为最高频。）
- 来源：
  - 腾讯面试真题：如何设计 RAG 知识库的构建方案（知乎）https://zhuanlan.zhihu.com/p/1975313777063920370
  - 万字详解面试题库 - RAG 篇，22 道核心题（稀土掘金）https://juejin.cn/post/7634065319066550323
  - RAG 夺命 10 连问（博客园·苏三说技术）https://www.cnblogs.com/12lisu/p/19921242
  - 2026 年 RAG 大厂面试题汇总：向量检索、混合检索、Rerank（卡码笔记）https://notes.kamacoder.com/interview/llm/rag_interview.html
  - RAG 面试知识点与详细解答——面试官问答篇（CSDN）https://blog.csdn.net/charles666666/article/details/147359748
- 面试问法：
  - 「RAG 解决了大模型的哪些痛点？」（RAG 夺命 10 连问）
  - 「如何设计 RAG 知识库的构建方案？」（知乎·腾讯面试真题）；「什么是 RAG？其核心价值是什么？」（CSDN 面试官问答篇）
- 高频考点提示：
  - RAG 与微调的取舍：解决幻觉与知识过期，何时该选 RAG
  - 离线链路：数据接入 → 清洗 → 分片策略（企业级最佳分片）→ Embedding 选型 → 向量化入库
  - 在线链路：向量检索 vs 混合检索、Rerank 重排序、召回与生成衔接
  - 企业级关注点：数据隐私、答案可溯源可追溯、成本与部署优化
  - 效果评估：如何评估 RAG 流水线性能（51CTO 架构设计题考点，与新增点 g6 呼应）

## g2-agent-system-design Agent 应用系统设计（客服/数据分析 Agent 设计题）
- 星级：⭐4（维持。Agent 系统设计题在 2025-2026 年资料中大量独立成题：知乎有「AI Agent 系统设计面试现场」专题、火山引擎精选 15 道工程高频题、牛客有专题汇总，但整体题量与资料密度略低于 RAG，定 4 星恰当。）
- 来源：
  - Agent 面试总结（三）工业界干货版本（知乎）https://zhuanlan.zhihu.com/p/2060785188943164764
  - AI 大模型面试精选之 Agent 软件工程架构设计，15 道高频题（火山引擎开发者社区）https://developer.volcengine.com/articles/7582490980381950015
  - AI-Agent 面试题汇总（大模型篇）（牛客网）https://www.nowcoder.com/discuss/860538803759386624
  - Agent 面试题 | RAG 面试题 | AI 应用开发面试指南（JavaGuide）https://javaguide.cn/ai/interview-questions/ai-interview-guide.html
  - AI 智能体与大模型应用开发面试题库（GitHub）https://github.com/didilili/ai-agents-from-zero/blob/main/AI%E6%99%BA%E8%83%BD%E4%BD%93%E4%B8%8E%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91%E9%9D%A2%E8%AF%95%E9%A2%98%E5%BA%93.md
- 面试问法：
  - 「如果一个工具的调用时间较长，如何让智能体在等待工具调用返回前能够……」（知乎·大模型面试题 200 问 part2，Q81）
  - 围绕「Agent 架构（ReAct / Plan-and-Execute）、多 Agent 协作、记忆机制如何设计」展开（牛客 AI-Agent 面试题汇总归纳的考察方向）
- 高频考点提示：
  - Agent 核心范式：ReAct、Plan-and-Execute、多 Agent 协作与任务编排
  - 记忆机制：短期上下文、长期记忆的存储与召回设计
  - 工具调用：Function Calling / MCP、长耗时工具的异步与等待处理
  - 工程化：插件系统、API 设计、版本管理、测试与监控日志（火山引擎 15 题方向）
  - 场景化设计题：客服 Agent、数据分析 Agent 的意图理解 → 工具编排 → 兜底回复链路

## g3-system-design-template 系统设计答题模板（功能/数据/性能/成本/安全）
- 星级：⭐3（维持。存在专门的「AI 系统设计面试题总结」栏目与通用答题框架文章，证实该考点真实存在；但模板本身多嵌套在具体题目中考察，很少作为独立命题，独立频率中等，3 星恰当。）
- 来源：
  - AI 系统设计面试题总结（JavaGuide）https://javaguide.cn/ai/interview-questions/ai-system-design-interview-questions.html
  - 系统设计面试怎么过？答题框架与准备策略，四步万能框架（超级简历）https://www.wondercv.com/blog/TT61czIu.html
  - 系统设计题目的回答要领（牛客网）https://www.nowcoder.com/discuss/743518189807505408
  - 2025 年 AI 大模型应用面试必问的 10 个架构设计题（CSDN）https://blog.csdn.net/musicml/article/details/150207822
  - 大模型面试题 200 问 part2（知乎）https://zhuanlan.zhihu.com/p/1906012520134706394
- 面试问法：
  - 「大模型限流为什么要同时看 RPM、TPM、并发数和租户预算？」（JavaGuide AI 系统设计面试题总结）
  - 「如何设计模型 fallback？哪些任务不能自动降级？」（JavaGuide）；通用考察点为「沟通表达能力 + 知识广度与深度」（牛客·系统设计题回答要领）
- 高频考点提示：
  - 答题顺序：先澄清需求与功能边界，再依次覆盖数据、性能、成本、安全维度（多来源共识）
  - 成本维度：模型选型用「性能-成本比」权衡（如 GPT-4 vs GPT-3.5，知乎 200 问）
  - 性能维度：限流（RPM/TPM/并发/租户预算）、重试策略、降级与 fallback
  - 展现权衡：主动与面试官交流需求细节、说明取舍理由，比背模板更重要（牛客）

## g4-star-project-narrative 项目深挖与 STAR 法表达
- 星级：⭐4（维持。STAR 法则是行为面/项目面的通用考察框架，来源跨 CSDN、腾讯云、牛客、知乎、阿里云等多个独立渠道，且面试官侧明确用 STAR 追问验证项目真实性；通用性极强但非 LLM 岗特有，4 星恰当。）
- 来源：
  - 程序员如何高效准备简历和面试 06：使用 STAR 法则表现自己（CSDN）https://blog.csdn.net/fegus/article/details/127296291
  - STAR 法则在数据产品经理求职面试中的应用（人人都是产品经理）https://www.woshipm.com/pmd/5517853.html
  - 项目经验介绍的 STAR 法则（CSDN）https://blog.csdn.net/weixin_42537413/article/details/106137902
  - 职场工具箱之 STAR 面试法（知乎）https://zhuanlan.zhihu.com/p/1997427327630610921
  - 程序员 STAR 法则简历（腾讯云开发者社区）https://cloud.tencent.com/developer/article/2130459
- 面试问法：
  - 「为什么做这个项目？目标是什么？遇到什么困难如何解决？」（人人都是产品经理：面试官按 STAR 逐层提问的原文示例）
  - 面试官视角：「按照 STAR 法则可以询问出候选人的过往经历和工作能力，还能判断是否真的做过某些项目还是编造经历」（CSDN 原文）
- 高频考点提示：
  - S/T：2-3 分钟内讲清项目背景、目标与个人职责（知乎：讲好项目故事）
  - A：技术难点 → 方案选型 → 具体行动，体现个人贡献而非团队笼统描述
  - R：结果必须量化（性能提升 X%、成本下降 Y%），无数据的成果说服力弱
  - 防编造验证：面试官会用 STAR 层层追问细节，项目每个环节都要能展开
  - 项目介绍三部曲：背景 → 设计 → 行动（CSDN 项目经验介绍法）

## g5-interview-strategy 高频追问、反问与临场策略
- 星级：⭐3（维持。反问环节有专门开源仓库（reverse-interview-zh）与按轮次分类的专题文章，证实为真实准备需求；但属软性加分项，出现频率与资料密度低于技术考点，3 星恰当。）
- 来源：
  - reverse-interview-zh：技术面试反问问题大全（GitHub）https://github.com/perkfly/reverse-interview-zh
  - 反问环节：技术面初面、二面、三面应该问些什么（牛客网）https://www.nowcoder.com/discuss/537284339151790080
  - 技术面试的「反问环节」：问对问题，比答对问题更加分（CSDN）https://blog.csdn.net/2501_94480392/article/details/161111418
  - 技术面试反问的「灵魂 50 问」（CVMart）https://www.cvmart.net/community/detail/1078
- 面试问法：
  - 「就我的这次面试，您觉得我的能力有哪些地方（技术上或表达上）需要提升？」（牛客网反问环节帖原文示例）
  - 「该职位为何会空缺？」「这份工作/团队最好和最坏的方面是什么？」（reverse-interview-zh 收录问题）
- 高频考点提示：
  - 反问雷区：说「没有什么问题」等于放弃加分机会；初面/技术面别过早问薪资细节
  - 反问雷区：问官网能查到的信息（如「咱们公司主要做什么产品」）暴露没做功课
  - 按轮次分层：技术面问技术栈与团队分工，HR 面问培养机制，Leader 面问团队目标
  - 高分话术：请面试官反馈「您觉得我还有什么可以加强的地方」，把评价者变成引导者
  - 追问应对：面试官会用 STAR 式追问验证项目真实性（与 g4 呼应），答不上时要坦承边界而非硬编

## 建议新增知识点清单
- [g6-llm-app-evals LLM 应用效果评测（RAG/Agent 评估体系）] ⭐4 ｜ 2025 年 AI 大模型应用面试必问的 10 个架构设计题（51CTO https://www.51cto.com/aigc/7056.html，其中一题即「如何评估一个 RAG 流水线的性能」）；JavaGuide AI 系统设计面试题总结（含评测章节）；牛客 AI-Agent 面试题汇总（含评测专题）｜ 一句话定义：用指标集（召回质量、答案忠实度、任务完成率）+ 评测集 + 线上 A/B 对 LLM 应用做系统性质量评估的方法与工程实践。
- [g7-llm-prod-governance 生产级 LLM 应用治理（模型网关、可观测性与安全合规）] ⭐3 ｜ JavaGuide AI 系统设计面试题总结（https://javaguide.cn/ai/interview-questions/ai-system-design-interview-questions.html，覆盖生产级架构、模型网关、调用治理、可观测性、安全合规）；火山引擎 Agent 软件工程架构设计 15 题（https://developer.volcengine.com/articles/7582490980381950015，含监控、日志）｜ 一句话定义：LLM 应用上线后的运行保障体系——模型网关与调用治理、监控日志与可观测性、安全合规与敏感内容防护。
