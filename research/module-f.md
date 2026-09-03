# 模块F 检索报告 v2（层级化）

（检索时间：2026-09-03；v2 本轮外部检索 5 次，叠加 v1 共 13 次；星级含义：5=几乎必问，1=罕见）

## 继承考点（f1~f9 v1 结论）

简表（星级与结论均继承 v1，未改动；关键来源列 1~2 条，完整来源清单以 v1 检索底稿为准）：

| id | 考点 | 星级 | 关键来源 |
|---|---|---|---|
| f1 | 自回归解码与采样策略（temperature/top_p/top_k） | ⭐4 | 知乎《大模型面试题200问 part2》 https://zhuanlan.zhihu.com/p/1906012520134706394 ；小林面试笔记《解码策略》 https://xiaolinnote.com/ai/llm/decoding_strategies.html |
| f2 | KV Cache 与 PagedAttention | ⭐5 | 牛客《阿里云Agent算法一面》原题 https://www.nowcoder.com/discuss/924431631111159808 ；知乎《KV Cache 的原理》 https://zhuanlan.zhihu.com/p/1896128191459996017 |
| f3 | 模型量化（INT8/INT4、GPTQ/AWQ） | ⭐4 | 小林面试笔记《量化》 https://xiaolinnote.com/ai/llm/quantization.html ；知乎《面试118题（九）：量化与部署》 https://zhuanlan.zhihu.com/p/2057146652046235476 |
| f4 | 推理框架对比（vLLM/TensorRT-LLM/llama.cpp） | ⭐4 | 知乎《主流推理部署框架》 https://zhuanlan.zhihu.com/p/1937266323156607848 ；掘金《SGLang/Ollama/vLLM/llama.cpp 如何选择》 https://juejin.cn/post/7455138070298017811 |
| f5 | 显存估算与 GPU 选型 | ⭐4 | 知乎《显存估算（频次很高）》 https://zhuanlan.zhihu.com/p/1891052810688242927 ；51CTO 福报厂面经 https://blog.51cto.com/u_16163442/13410438 |
| f6 | Prompt 注入与越狱防护 | ⭐4 | 知乎《阿里大模型二面：Prompt 注入》 https://zhuanlan.zhihu.com/p/2028965357902213891 ；golangstar《LLM 面试系列》 https://golangstar.cn/backend_series/llm_interview/prompt_injection.html |
| f7 | LLM 应用可观测性与线上评估 | ⭐3（v2 建议上调至 ⭐4，见调整3） | CSDN《1000道面试题第19部分》 https://blog.csdn.net/qq_38334677/article/details/155107246 ；博客园（LangSmith 全链路追踪） https://www.cnblogs.com/wusier/p/19084900 |
| f8 | 内容安全与合规（输出过滤/红队） | ⭐3 | 未经外部检索（v1 仅相邻安全来源，评级属推断，维持原判） |
| f9 | 成本优化（缓存/批处理/模型路由） | ⭐3 | 知乎《Agent算法工程师面经300题》 https://zhuanlan.zhihu.com/p/2013066841401099455 ；JavaGuide《大模型网关详解》 https://javaguide.cn/ai/system-design/llm-gateway.html |

v1 遗留待合并项（不单列）：MQA/GQA/MLA（⭐4）与 FlashAttention（⭐4）两条建议，v1 已附来源（牛客 Transformer/美团北斗面经），建议并入 f2 讲授结构。

## 层级化新增/调整建议

1. [为什么大模型推理慢且贵（推理经济学开场题）] ｜ 建议层级 L1（直觉/开场） ｜ ⭐3 ｜ 来源：夸智网《大模型面试通关指南》将该题列为开篇第一问且考点表标注难度 ⭐⭐（自回归、Prefill/Decode、访存瓶颈） https://www.kuazhi.com/post/716419235.html ；StubbornHuang《大模型推理为什么慢？》（2026-06-01，系统性科普：自回归串行 + prefill compute-bound / decode memory-bound + KV Cache 显存） https://www.stubbornhuang.com/3236/ ；《图解大模型》配套面试题200问含成本向原题「为什么推理型模型每个输出词元的成本一般高于架构和参数量相同的非推理模型？」 https://01.me/2025/04/llm-interview-questions/ ；CSDN《AI面试八股文 Vol.3.2：Token、采样、KV Cache 如何决定成本与效果》（2026-05） https://blog.csdn.net/weixin_66526635/article/details/161262614 ｜ 一句话定义：用「自回归逐 token 串行生成、decode 阶段访存瓶颈、KV Cache 显存随上下文与并发线性增长、token 阶梯计价」四点解释推理慢与贵的根因，是推理话题的低门槛开场题（v2 置信：中——多个通用面试指南一致列为开篇/低难度题，但未检索到明确标注「非算法岗」的一手面经原贴原句，「非算法岗形态」系推断）。

2. [全链路成本优化体系（计量→缓存→路由→压缩→批处理→成本看板/告警）] ｜ 建议层级 L4（体系/资深岗） ｜ ⭐4 ｜ 来源：CalibreOS《LLM Cost Optimization》明确按级别分层考：senior 须说出 caching/routing/compression/batching 四杠杆，staff 须量化 tradeoff（命中率 vs 新鲜度、批量 vs 实时）并关联 unit economics（$/resolved query、$/MAU） https://www.calibreos.com/learn/genai-cost-optimization ；InterviewLoop 系统设计原题「每月 $2M LLM API 账单，CTO 要求降 60% 且不牺牲高价值场景质量」并要求给出成本看板/按功能归因方案 https://interviewloop.app/learn/ml/llm-cost-optimization ；CompoundLearn 将「LLM 账单一周翻了四倍，如何排查」列为 senior 信号题，并给出按四层缓存逐层审计的答法 https://www.compoundlearn.ai/topics/llm-routing-and-caching ；MortalJobs《LLMOps 面试指南》（2026-06）称 2026 年「几乎每场现代 AI 系统设计面试都包含限流、fallback、缓存、成本追踪与评估管线」，监控黄金信号含 TTFT、token 消耗（输入/输出分列）、单请求成本、缓存命中率 https://mortaljobs.com/interview-prep/llmops-interview-questions/ ；中文侧：技术栈《27届大模型面试准备（五十四）》称面试官常问「怎么把推理成本降一半」，标准答法是「量化压权重 + KV 量化压显存 + PD 分离稳延迟 + 连续批处理提利用率」的组合拳并量化每步收益 https://jishuzhan.net/article/2091754075071893505 ｜ 一句话定义：以「先计量归因（按租户/功能打 token 标签建成本看板）→ 再逐层加杠杆（前缀缓存/语义缓存→模型路由与级联→prompt 压缩→批处理）→ 全程质量门禁（eval 确认降本不掉点）」为骨架的系统性成本工程方法。与 f9 关系：f9 收录的是单点技术原题（模型路由、语义缓存），本条是其 L4 体系化升级，建议合并讲授、分层出题。

3. [调整] f7 可观测性：星级 ⭐3 → ⭐4（Agent/后端应用岗），层级维持 L3，内容补入 2025-2026 工具栈与真题 ｜ 来源：面试大师《阿里巴巴 后端开发面经解析》收录题面「Agent 系统可观测性平台应记录哪些 trace，LangSmith 和 Langfuse 如何用于调试与评估？」（标注真实面经题；注意该站为题库解析站，非一手面经贴） https://mianshidashi.cn/interview-questions/alibaba/backend-development/alibaba-backend-agent-observability-langsmith-langfuse ；BirJob《AI Agent Observability 2026》（2026-05-19：LangSmith/Langfuse/Braintrust/Arize/OTel 五方案对比；OTel gen_ai.* 语义约定已 CNCF 标准化、2026-03 起广泛支持；Langfuse 2026-01 被 ClickHouse 收购并保持 MIT 自托管） https://www.birjob.com/blog/ai-observability-stack-2026 ；n1n.ai《Langfuse vs LangSmith vs OpenTelemetry》（2026-05-17，选型三分法：成本敏感选 Langfuse、LangChain 栈选 LangSmith、企业防锁定选 OTel） https://explore.n1n.ai/blog/llm-observability-langfuse-langsmith-opentelemetry-2026-05-17 ；GitHub AgentGuide 题库（1500+题）将「LangSmith/LangFuse 链路追踪、成本监控与 Token 审计」列为 Agent 开发岗核心技能项 https://github.com/adongwanai/AgentGuide ｜ 一句话定义：以 Trace/Span/Generation 三层数据模型 + OpenTelemetry gen_ai.* 语义约定为底座，覆盖链路追踪、成本归因、LLM-as-judge 在线评估与「生产 trace 沉淀回归集」闭环的工具体系；上调依据是 2026 年真题面与题库显示该题已从架构师专属下沉到后端/Agent 应用岗常规题（置信：中高——多来源一致，但缺一手原贴面经，v1 的 ⭐3 判断部分来自该缺口已部分补齐）。

## 面试问法补充

- 为什么大模型推理慢且贵（L1）：
  - 「大模型推理为什么这么慢？」（夸智网通关指南开篇第一问）
  - 「为什么推理型模型每个输出词元的成本一般高于架构和参数量相同的非推理模型？」（《图解大模型》配套 200 问原题）
- 全链路成本优化体系（L4）：
  - 「你们公司每月 LLM API 花费 200 万美元，CTO 要求降 60% 且不牺牲高价值场景质量，设计一个成本优化策略（覆盖 token 管理、模型选型、缓存、推理效率）。」（InterviewLoop 系统设计题面归纳）
  - 「LLM 账单这周翻了四倍，给我讲讲你怎么排查。」（CompoundLearn senior 信号题）
  - 追问形态：「怎么把推理成本降一半？」（技术栈 A54，中文高频）；「语义缓存相似度阈值从 0.95 降到 0.85 会怎样，怎么决策？」（InterviewLoop 追问）
- f7 可观测性（L3，调整后）：
  - 「Agent 系统可观测性平台应记录哪些 trace？LangSmith 和 Langfuse 如何用于调试与评估？」（面试大师阿里后端题面）
  - 「LangSmith、Langfuse、自建 OpenTelemetry 怎么选？高 QPS 下 trace 全量上报会有什么问题、怎么做采样？」（据 n1n.ai 选型文与 learnagent.wiki 中级题归纳）
