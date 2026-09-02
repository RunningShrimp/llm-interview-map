# 模块C 检索报告（Prompt 工程与 LLM API 应用）

> 检索日期：2026-09-02｜检索工具：WebSearch（共 6 次，其中 2 次超时失败）
> 星级口径：5=几乎必问，4=高频，3=常见，2=偶见，1=罕见
> 覆盖情况：c1 / c3 / c4 经外部检索核实；c2（两次检索超时）、c5 / c6（未检索）改用内置知识并逐条标注。

## c1-prompt-fundamentals Prompt 基础与结构化写法
- 星级：⭐5（维持；牛客有官方 Prompt 刷题题单（35 题）、面试鸭/力扣均有提示词工程专项题库，应用岗面经普遍出现「prompt 构造经验」，几乎必问）
- 来源：
  - 牛客网《大模型面试题，附答案！》：https://www.nowcoder.com/feed/main/detail/d939886827314e01a7643b93c79fa497
  - 牛客官方题单《提示词工程题》（35 题）：https://www.nowcoder.com/exam/oj/ta?tpId=408
  - 面试鸭《Prompt 提示词工程面试题》：https://www.mianshiya.com/bank/1991427562177298434
  - 力扣讨论《大厂提示词工程面试真题》：https://leetcode.cn/discuss/post/4020675/
  - 知乎《2024 NLP 大模型校招面经梳理》：https://zhuanlan.zhihu.com/p/692455162
- 面试问法：
  - 「一个专业的提示词（Prompt）模板通常包含以下几部分：角色定义（Role）→ 告诉模型'你是谁'……」（牛客面试题附答案，原文）
  - 「怎样的 prompt 更好？谈谈你的 prompt 构造经验」（知乎校招面经汇总，概括）
- 高频考点提示：
  - Prompt 模板四要素：角色（Role）/ 任务（Task）/ 约束（Constraints）/ 输出格式
  - Zero-Shot 与 Few-Shot 的区别及 few-shot 示例挑选原则
  - 提示词迭代优化方法（加分隔符、给示例、指定格式、思维链引导）
  - 行业趋势：考察已从「会不会写提示词」转向系统化评估（力扣观点）
  - 多轮对话中的上下文管理与角色设定一致性

## c2-chain-of-thought 思维链 CoT 与推理增强（CoT/ToT/Self-Consistency）
- 星级：⭐5（维持；注：本次两次检索均超时，为内置知识判断——CoT 属于大模型八股最高频题目之一，算法岗与应用岗都会问「CoT 原理/为什么有效」）
- 来源：未经外部检索：内置知识（旁证：c1 检索中面试鸭题库与牛客考点总结均列出「Chain of Thought（思维链）」为常考内容，来源 https://www.mianshiya.com/bank/1991427562177298434 ）
- 面试问法（内置知识示例，非检索原文）：
  - 「介绍一下 Chain of Thought，它为什么有效？」
  - 「Self-Consistency 和普通 CoT 的区别？Tree of Thought 用在什么场景？」
- 高频考点提示：
  - CoT 核心：中间推理步骤提升复杂推理任务表现；「Let's think step by step」的 zero-shot CoT
  - Self-Consistency：多次采样 + 多数投票，降低单次推理随机性
  - ToT：树状探索 + 剪枝/回溯，适合搜索式推理问题
  - CoT 与幻觉的关系（推理链可能放大错误传播）
  - 推理模型（o1/R1 类）兴起后「显式 CoT 提示」何时仍必要

## c3-hallucination 幻觉成因与缓解
- 星级：⭐5（维持；小林面试笔记、牛客、知乎、面试鸭均有幻觉专题且以面试问答形式组织，属大模型面试最经典题目）
- 来源：
  - 小林面试笔记《大模型为什么会出现幻觉？怎么缓解？》：https://xiaolinnote.com/ai/llm/hallucination.html
  - 牛客网《关于大模型的幻觉问题：LLM Hallucination》：https://www.nowcoder.com/discuss/512145145983152128
  - 知乎《大模型面经｜如何解决大模型幻觉问题？》：https://zhuanlan.zhihu.com/p/1895872773722711693
  - 知乎《2024年大模型面试准备（三）：聊一聊大模型的幻觉问题》：https://zhuanlan.zhihu.com/p/689203829
- 面试问法：
  - 「大模型为什么会出现幻觉？怎么缓解？」（小林面试笔记标题，原文）
  - 「如何解决大模型幻觉问题？」（知乎面经标题，原文）
- 高频考点提示：
  - 定义两分法：Faithfulness（不遵循输入/原文）与 Factualness（不符合事实）
  - 成因：Next Token Prediction 训练目标、数据噪声、知识边界、RLHF「迎合」倾向
  - 缓解三阶段：训练侧（数据清洗/对齐）、推理侧（解码策略/CoT/自洽性）、外部增强（RAG/工具调用/引用溯源）
  - 幻觉分类：Intrinsic（内在冲突）vs Extrinsic（与事实不符）
  - RAG 与 Prompt 结合缓解幻觉是应用岗最常追问的落地方向

## c4-llm-api-practice LLM API 实务（参数/流式/限流重试/成本）
- 星级：⭐4（维持；temperature/top_p 是参数类必考题（多篇面试问答体文章专门讲解），流式/限流/超限截断在工程化面试指南中以面试官提问形式出现，但成本与重试细节问频略低于参数题）
- 来源：
  - 小林 coding《大模型的参数：温度值、Top-P、Top-K 分别是什么？各场景怎么设置？》（面试问答形式）：https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html
  - 知乎《温度(temperature)、top_p 与 top_k 如何控制大语言模型输出》：https://zhuanlan.zhihu.com/p/1932579774422819015
  - 《LLM 原理 - 前端 & AI 工程化面试指南》（含流式输出/重试/超限截断面试题）：https://opc-43d279b8.mintlify.app/ai/llm
  - JavaGuide《LLM 运行机制：Token、上下文窗口与采样参数》：https://javaguide.cn/ai/llm-basis/llm-operation-mechanism.html
- 面试问法：
  - 「temperature 和 top_p 有什么区别？代码生成和创意写作场景分别怎么设置？」（小林 coding 面试问答，概括）
  - 「输入超过上下文限制时如何截断而不影响质量？流式输出为什么能降低重试成本？」（前端 & AI 工程化面试指南考点，概括）
- 高频考点提示：
  - temperature 控制 softmax 分布平坦度（τ→0 趋向贪婪采样），top_p/top_k 控制候选集范围
  - 事实性/准确性任务调低温度，创意任务调高；两参数一般不要同时大幅调整
  - 流式输出（SSE）原理与用户体验/超时收益
  - 限流（429/TPM/RPM）处理：指数退避重试、请求排队、降级路由
  - 成本意识：token 计费、max_tokens、缓存（prompt caching）与模型按需路由

## c5-structured-output 结构化输出与 JSON Mode
- 星级：⭐3（维持；注：本次未及检索，为内置知识判断——应用开发岗常问「如何稳定拿到可解析 JSON」，热度随 Agent/Function Calling 普及上升）
- 来源：未经外部检索：内置知识
- 面试问法（内置知识示例，非检索原文）：
  - 「如何让 LLM 稳定输出合法 JSON？输出不合法（字段缺失/带 markdown 代码块）怎么兜底？」
  - 「JSON Mode、Structured Outputs 和 Function Calling 之间是什么关系？」
- 高频考点提示：
  - 三种实现层次：prompt 约定格式 → JSON Mode（约束解码）→ Schema 约束（Structured Outputs/JSON Schema）
  - 失败兜底：重试、few-shot 示例、输出后校验（pydantic/jsonschema）、容错解析
  - 约束解码原理（按 grammar/token 采样）是加分项
  - 与下游系统的对接：解析失败的重试成本与幂等性

## c6-long-context 长上下文与 lost in the middle
- 星级：⭐3（维持；注：本次未及检索，为内置知识判断——常作为 RAG 问题的追问点出现（「上下文够长还要 RAG 吗」「检索文档放前后有讲究吗」），单独出题频率中等）
- 来源：未经外部检索：内置知识（论文锚点：Liu et al., "Lost in the Middle: How Language Models Use Long Contexts", TACL 2024）
- 面试问法（内置知识示例，非检索原文）：
  - 「什么是 lost in the middle？对 RAG 的文档排序有什么指导意义？」
  - 「上下文窗口到 1M 了，还需要 RAG 和分块吗？」
- 高频考点提示：
  - 现象：模型对长上下文首尾信息利用好、中部信息检索性能下降（U 形曲线）
  - 工程启示：关键指令放开头/结尾、检索结果重排序后放置、控制塞入文档数量
  - 长上下文 ≠ 无限记忆：注意力稀释、成本随长度线性/平方增长、时效性问题仍需外部检索
  - 位置编码外推（RoPE 缩放等）属加分项

## 建议新增知识点清单
- [Function Calling 与工具调用（Tool Use）] ⭐4 ｜ 来源：牛客网《AI-Agent 面试题汇总 - 大模型篇》 https://www.nowcoder.com/discuss/860538803759386624 ；面试鸭《Prompt 提示词工程面试题》 https://www.mianshiya.com/bank/1991427562177298434 （Agent/工具话题在高频题库中广泛出现）｜ 一句话定义：通过 API 传入函数 Schema 让模型输出结构化调用参数并由应用执行，是 LLM API 应用连接外部能力（搜索/数据库/业务接口）的标准机制。
- [多轮对话管理与记忆（Memory/上下文管理）] ⭐3 ｜ 来源：面试鸭《Prompt 提示词工程面试题》（含「多轮对话优化」条目） https://www.mianshiya.com/bank/1991427562177298434 ；牛客《大模型面试题，附答案！》（角色设定与上下文管理） https://www.nowcoder.com/feed/main/detail/d939886827314e01a7643b93c79fa497 ｜ 一句话定义：在多轮会话中通过历史截断、摘要压缩、滑动窗口等策略管理系统提示与对话记忆，平衡效果、成本与上下文上限。

## 参考来源汇总
| 来源 | 类型 | URL |
|---|---|---|
| 牛客网《大模型面试题，附答案！》 | 面试题库（社区） | https://www.nowcoder.com/feed/main/detail/d939886827314e01a7643b93c79fa497 |
| 牛客官方题单《提示词工程题》 | 官方题单 | https://www.nowcoder.com/exam/oj/ta?tpId=408 |
| 牛客《AI-Agent 面试题汇总 - 大模型篇》 | 面试题库（社区） | https://www.nowcoder.com/discuss/860538803759386624 |
| 牛客《关于大模型的幻觉问题：LLM Hallucination》 | 面经（社区） | https://www.nowcoder.com/discuss/512145145983152128 |
| 面试鸭《Prompt 提示词工程面试题》 | 商业题库 | https://www.mianshiya.com/bank/1991427562177298434 |
| 力扣《大厂提示词工程面试真题》 | 面试讨论（社区） | https://leetcode.cn/discuss/post/4020675/ |
| 知乎《2024 NLP 大模型校招面经梳理》 | 面经汇总（社区） | https://zhuanlan.zhihu.com/p/692455162 |
| 小林面试笔记（幻觉/采样参数篇） | 技术博客（面试问答体） | https://xiaolinnote.com/ai/llm/hallucination.html ；https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html |
| 知乎《大模型面经｜如何解决大模型幻觉问题？》 | 面经（社区） | https://zhuanlan.zhihu.com/p/1895872773722711693 |
| 知乎《温度、top_p 与 top_k 如何控制输出》 | 技术博客 | https://zhuanlan.zhihu.com/p/1932579774422819015 |
| 前端 & AI 工程化面试指南（LLM 原理） | 技术文档/面试指南 | https://opc-43d279b8.mintlify.app/ai/llm |
| JavaGuide《LLM 运行机制》 | 技术文档/面试指南 | https://javaguide.cn/ai/llm-basis/llm-operation-mechanism.html |

## 开放问题
- c2（CoT/ToT/Self-Consistency）与 c5/c6 未获得本次检索的直接来源，星级为内置知识判断，建议下次检索补验（候选关键词：「CoT 自洽性 面试」「JSON mode 面试」「lost in the middle RAG 面试」）。
- 各点在「算法岗 vs 应用岗」的问频差异未做分层统计，现有星级更偏向应用开发岗口径。
