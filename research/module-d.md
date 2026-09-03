# 模块D 检索报告 v2（层级化）

> 检索时间：2026-09-03 ｜ 检索方式：Web 检索 5 次（中文为主：题库站 + 牛客一手面经 + 工程实践文交叉验证）｜ 基线：完整继承 v1（2026-09-02）d1~d8 及 2 条建议新增的全部结论与来源。
> v2 核实三个分层问题：①「企业级 RAG 数据管线/权限治理」在资深岗的问法；②GraphRAG/Agentic RAG 的 2025-2026 面试频率；③L1 直觉类开场题在非算法岗面经中的形态。
> 可信度说明：牛客网面经为一手候选人事后回忆（一手性最高）；卡码/小林/技术栈为题库站；掘金/知乎/SegmentFault/OceanBase 为工程实践文；mianshidashi.cn（面试大师）自称「真实面经题」但无法独立验证一手性，仅作答题骨架参考、不作定星依据。

## 继承考点（d1~d8 v1 结论）

| id ｜ 考点 | 星级（v1） | 来源 |
|---|---|---|---|
| d1-rag-pipeline ｜ RAG 总体流程 | ⭐5 | 卡码笔记 https://notes.kamacoder.com/interview/llm/rag_interview.html ；小林面试笔记 https://xiaolinnote.com/ai/rag/rag%20interview%20questions.html ；知乎 RAG夺命10连问 https://zhuanlan.zhihu.com/p/1870334937015644160 ；粉粉蕉 https://fenfenjoe.top/interview/RAG.html |
| d2-chunking-strategies ｜ 文档解析与切分 | ⭐4 | 知乎通关指南 https://zhuanlan.zhihu.com/p/1971950865725265033 ；知乎字节真题 https://zhuanlan.zhihu.com/p/2017198718001111382 ；小林 4_chunking https://xiaolinnote.com/ai/rag/4_chunking.html ；卡码 how_to_chunking https://notes.kamacoder.com/llm/app/how_to_chunking.html ；拿个offer https://nageoffer.com/ai/basics/rag/rag-core/chunking-strategies/ ；JavaGuide 文档处理 https://javaguide.cn/ai/rag/rag-document-processing.html |
| d3-embedding-vector-db ｜ Embedding 与向量库（HNSW/IVF） | ⭐4 | 面试鸭 https://www.mianshiya.com/question/1991796741598388226 ；CSDN 17题 https://adg.csdn.net/6952553c5b9f5f31781b9363.html ；腾讯云 https://developer.cloud.tencent.com/article/2733971?policyId=1004 ；Zilliz https://zilliz.com.cn/blog/Choosing-HNSW-vs-IVF-index-costs ；博客园美团真题 https://www.cnblogs.com/crazymakercircle/p/18867143 ；卡码（选型题） |
| d4-hybrid-retrieval-rerank ｜ 混合检索与重排 | ⭐4 | 卡码 ；CSDN/AtomGit https://gitcode.csdn.net/69e75c5c0a2f6a37c5a15642.html ；GankInterview https://www.gankinterview.cn/blog/llmlarge-model-ai-interview-rag-vector-search-alignment-evaluation-hallucination ；掘金 Rerank https://juejin.cn/post/7507564752434167845 ；腾讯云混合检索 https://developer.cloud.tencent.com/article/2710906 |
| d5-rag-vs-finetune-vs-longctx ｜ RAG vs 微调 vs 长上下文 | ⭐5 | 卡码（第3题） ；知乎 851题 https://zhuanlan.zhihu.com/p/2058150232085607301 ；B站冲刺课 https://www.bilibili.com/video/BV1eRbr6mEJE/ ；51CTO https://blog.51cto.com/u_16099277/14876169 ；牛客（微调侧） https://www.nowcoder.com/discuss/645706098464301056 |
| d6-rag-evaluation ｜ RAG 评估（RAGAS） | ⭐3 | 知乎阿里二面 RAGAS https://zhuanlan.zhihu.com/p/2025346540638597534 ；golangstar https://golangstar.cn/backend_series/llm_interview/ragas.html ；小林 18_evaluation https://xiaolinnote.com/ai/rag/18_evaluation.html ；知乎 Ragas https://zhuanlan.zhihu.com/p/675777378 ；粉粉蕉 |
| d7-advanced-rag ｜ 高级 RAG（Self-RAG/CRAG/GraphRAG/多跳） | ⭐3（v2 建议升 ⭐4，见下） | 卡码（第26/27题） ；知乎通关指南 ；CSDN 高级RAG优化 https://gitcode.csdn.net/6a09d7a410ee7a33f2733089.html |
| d8-rag-troubleshooting ｜ 常见问题与调优 | ⭐4 | 卡码（第22/23题） ；知乎线上事故 https://zhuanlan.zhihu.com/p/1908036603820242262 ；知乎夺命10连问 |
| v1-add-a ｜ 查询理解与改写（Rewrite/Multi-Query/HyDE） | ⭐4 | 卡码（第17–19题） ；知乎通关指南 ；知乎字节真题 https://zhuanlan.zhihu.com/p/2017198718001111382 |
| v1-add-b ｜ 多轮对话 RAG（Query Rewriting） | ⭐3（单一强来源，置信度中） | 卡码（第19题） |

继承考点 v1 代表问法速查：d1「RAG 是什么？为什么需要 RAG？完整链路？」；d2「Chunk Size/Overlap 怎么定？」；d3「HNSW 和 IVF 区别？向量库怎么选？」；d4「已有混合检索为什么还要 Rerank？」；d5「长上下文会取代 RAG 吗？」；d6「RAGAS 指标有哪些？」；d7「什么是 Agentic RAG？GraphRAG 核心思想？」；d8「检索效果差怎么排查优化？」；v1-add-a「Query Rewrite 有什么用？HyDE 原理？」；v1-add-b「多轮对话中的 Query Rewriting 是什么？」（各点完整问法与高频考点提示见 v1 底稿沉淀，本项目知识点卡中沿用）。

## 层级化新增/调整建议

- [企业级 RAG 数据管线与知识库更新（多格式接入/增量更新/版本一致性）] ｜ 建议层级 L4 ｜ ⭐4 ｜ 来源：牛客·字节大模型应用二面一手真题（Q10 局部更新增量索引、Q16 大规模 PDF 解析多线程 vs 多进程）https://www.nowcoder.com/feed/main/detail/30b6f37830414df5a32d851f2004df7a ；牛客·虾皮 Java 后端二面一手真题（Q4 多格式文档扩展）https://www.nowcoder.com/feed/main/detail/937b3ddc25964ed480c9daaad0222721 ；JavaGuide 知识库更新专文（content_hash/软删除/审计日志/灰度回滚）https://github.com/Snailclimb/JavaGuide/blob/main/docs/ai/rag/rag-knowledge-update.md ；掘金·企业级知识库架构（2026-05，别名蓝绿切换+CDC 同步）https://juejin.cn/post/7644135664519184393 ；技术栈·增量更新专文 https://jishuzhan.net/article/2061969082731278337 ｜ 一句话定义：面向生产的 RAG 离线侧工程——多格式解析（扫描件 OCR、表格结构保留）、幂等入库、content_hash 变更检测、增量索引与删除 tombstone、索引别名零停机切换与回滚、更新审计日志；属资深后端/应用岗系统设计题。
- [RAG 权限治理（ACL/密级过滤/检索时权限对齐/审计）] ｜ 建议层级 L4 ｜ ⭐4（置信度中：题库直接出镜少于核心链路题，但工程实践文 2025-2026 密集出现且有一手追问） ｜ 来源：技术栈·Agent 面试攻略真题「企业 RAG 如何做权限隔离、防止数据泄露」https://jishuzhan.net/article/2082728743373520898 ；掘金·企业级知识库架构（CTO 三问 + SOC2 审计日志设计）https://juejin.cn/post/7644135664519184393 ；SegmentFault·企业级 RAG 权限控制实践（文档 ACL→检索结果过滤）https://segmentfault.com/a/1190000047835089 ；知乎·企业知识库 RAG 为什么必须做权限控制（角色/组织/密级控制访问范围）https://zhuanlan.zhihu.com/p/2057851004574503747 ；OceanBase·AI 知识库权限实战（实习生越权案例）https://open.oceanbase.com/blog/24155468560 ；53AI·Metadata 过滤实现权限访问控制 https://www.53ai.com/news/hangyeyingyong/1408.html ｜ 一句话定义：把用户身份/角色/密级作为元数据绑定到文档或 Chunk，检索阶段强制前置过滤（或召回后二次过滤），防止越权召回造成数据泄漏，并留存检索与生成全链路审计日志。
- [调整 d7：高级 RAG 升级并拆分——Agentic RAG 升 ⭐4；GraphRAG（含 LightRAG 对比、增量构图难点）独立成点] ｜ 建议层级 L3 讲概念与适用场景、L4 讲深挖（增量更新/成本/路由） ｜ ⭐3→⭐4 ｜ 来源：牛客·阿里大模型 Agent 一面一手真题「介绍 GraphRAG，难点是什么？GraphRAG 如何应对增量场景？」https://www.nowcoder.com/feed/main/detail/9d63b88b260c4aa9876a62e435de3c3f ；卡码笔记·GraphRAG 与 LightRAG 专刊题单（2026-07-30，独立成题单即频率证据）https://notes.kamacoder.com/interview/llm/graphrag_interview.html ；CSDN·AI×Data×Agent 面试专题 5.2万字（2026-05，Q7 Agentic RAG/Q8 GraphRAG/Q13 十万级文档企业级 RAG）https://blog.csdn.net/U013411339/article/details/160936002 ；技术栈·Agentic RAG 精讲（称其为「当前面试最高频、最拉分模块」）https://jishuzhan.net/article/2082728743373520898 ；GitHub AgentGuide·Agentic RAG 备战手册（Naive→Advanced→Modular→Agentic 四代演进）https://github.com/adongwanai/AgentGuide/blob/main/docs/04-interview/18-agent-interview-playbooks/agentic-rag-deep-research-playbook.md ；火山引擎·Agent+RAG 15 道高频题（2025-12）https://developer.volcengine.com/articles/7582491158316580907 ｜ 一句话定义：d7 v1 结论维持并升级——GraphRAG 已从「加分追问」变为独立考题（含 LightRAG 选型、增量更新难点）；Agentic RAG 被多个 2025-2026 题库列为核心拉分模块；v1 标注「推断」的 Self-RAG/CRAG 追问已获直接真题佐证，可转正为正式考点。
- [调整 d1：维持 ⭐5@L1，补非算法岗一手佐证] ｜ 建议层级 L1 ｜ ⭐5 ｜ 来源：牛客·字节后端 AI 开发一面一手真题（Q7「介绍 RAG 的核心流程」、Q9「为什么要做 RAG」，与 MySQL/Redis 八股同场）https://www.nowcoder.com/feed/main/detail/ab0601f3dbad49ab87ea870a00bb3691 ；牛客·腾讯 AI 后端二面（Q4「知识库问答的流程是怎么样的」）https://www.nowcoder.com/feed/main/detail/770ace354631496db18ed50ac3a7e417 ；牛客·AI 产品经理被问「什么是 RAG？你理解的 RAG 技术及整体应用流程」https://www.nowcoder.com/feed/main/detail/2dc1267fdf614a4bb1cf080552aaa0af ；JavaGuide·AI 应用开发面试指南（应用岗从一次模型调用问起再延伸到 RAG）https://javaguide.cn/ai/interview-questions/ai-interview-guide.html ；小林coding·应用开发岗导航（主看 Agent+RAG+工具调用三大专题）https://www.xiaolincoding.com/project/xiaolinnote.html ｜ 结论：L1 开场题形态跨岗位稳定——「RAG 是什么/为什么/核心流程」在后端、AI 产品、应用开发岗均为开篇必问，仅答案深度按岗位分层（非算法岗答到价值+链路图即可，不展开索引原理）。

## 面试问法补充

**企业级 RAG 数据管线与知识库更新（L4）**
- 「如果文档发生了局部更新，如何通过增量索引来避免全量重新向量化，并保证检索结果一致？」（字节·大模型应用开发二面一手真题，牛客）
- 「文档入库目前支持什么类型的文档？为什么先做 Markdown？后续支持 PDF、Word、Excel 你准备怎么扩展？」（虾皮·Java 后端二面一手真题，牛客）
- 参考变体（面经解析站，供答题骨架）：「生产级 RAG 的数据解析与入库流水线如何设计，如何处理 PDF、DOCX、表格、图片和多格式文档？」（快手后端，mianshidashi.cn）；「RAG 知识库如何做不停服更新，并保证检索结果一致性？」（腾讯后端，mianshidashi.cn）

**RAG 权限治理（L4）**
- 「企业 RAG 如何做权限隔离、防止数据泄露？」（技术栈·Agent 面试攻略原题，标准答案方向：向量级权限对齐——入库时为每条向量绑定部门/角色/用户权限标签，检索时携带身份过滤）
- 「法务部的文档，实习生能搜到吗？」（掘金·企业级知识库架构，CTO 三问之一）
- 常见追问：「权限应该绑定到文档还是 Chunk？」「权限过滤是检索前做还是召回后做？」「审计日志要记什么才能过 SOC2？」（SegmentFault 目录题、掘金问答式追问）

**GraphRAG / Agentic RAG（L3 概念 → L4 深挖）**
- 「介绍 GraphRAG，GraphRAG 的难点是什么？GraphRAG 如何应对增量场景？」（阿里·大模型 Agent 一面一手真题，牛客）
- 「什么是 Agentic RAG？它与传统 RAG 的关键区别在哪里？」（CSDN 5.2万字专题 Q7；技术栈 10 连问 Q9「不是套个 Agent 壳」）
- 追问：「Self-RAG 和 CRAG/Agentic RAG 最大区别？」（技术栈·2026 AI agent 面试 06；答：Self-RAG 需微调带 reflection token 的模型，CRAG/Agentic RAG 可在通用 LLM 上直接跑）「GraphRAG 和 LightRAG 怎么选？」（卡码 GraphRAG 专刊）

**L1 开场题·非算法岗形态（佐证 d1）**
- 「介绍 RAG 的核心流程？为什么要做 RAG？」（字节·后端 AI 开发一面一手真题，牛客——Java 后端岗与 MySQL/Redis 八股混着问）
- 「什么是 RAG？你理解的 RAG 技术及整体应用流程是什么样的？」（牛客·AI 产品经理帖标题原题）

---
附注：v2 新增 4 条均有外部来源支撑，无「未经外部检索」项；v1 的 d1~d8 星级与考点提示全部继承，仅 d7 星级按新证据上调（3→4）并建议拆分为 Agentic RAG 与 GraphRAG 两个知识点卡。
