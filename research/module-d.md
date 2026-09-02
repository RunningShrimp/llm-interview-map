# 模块D 检索报告（RAG 检索增强）

> 检索时间：2026-09-02 ｜ 检索方式：WebSearch 中文检索共 8 次（含 1 次超时重试，任务上限 6 次）｜ 覆盖情况：8/8 点均经外部检索核实，无「未经外部检索」项。
> 通用核心来源（多节点复用）：[卡码笔记：2026年RAG大厂面试题汇总](https://notes.kamacoder.com/interview/llm/rag_interview.html)（覆盖 RAG 是什么/链路/选库/切分/Embedding/Rerank/幻觉/Agentic RAG/GraphRAG/评测的完整题单）；[小林面试笔记：RAG interview questions](https://xiaolinnote.com/ai/rag/rag%20interview%20questions.html)；[知乎：RAG夺命10连问](https://zhuanlan.zhihu.com/p/1870334937015644160)。

## d1-rag-pipeline RAG 总体流程
- 星级：⭐5（维持锚点：所有 RAG 题库均以「是什么/为什么/完整链路」开篇，属必问开场题，校准置信度高）
- 来源：卡码笔记 RAG大厂面试题汇总 https://notes.kamacoder.com/interview/llm/rag_interview.html ；小林面试笔记 https://xiaolinnote.com/ai/rag/rag%20interview%20questions.html ；知乎 RAG夺命10连问 https://zhuanlan.zhihu.com/p/1870334937015644160 ；粉粉蕉的笔记本 RAG 面试题 https://fenfenjoe.top/interview/RAG.html
- 面试问法：「RAG 是什么？为什么需要 RAG？」「RAG 的完整链路是怎样的？」「RAG 常用的优化手段有哪些？」
- 高频考点提示：
  - 离线（解析→切分→Embedding→入库）与在线（召回→重排→生成）两阶段划分，能画链路图
  - RAG 价值：缓解幻觉、知识时效性、私有知识接入、答案可溯源
  - Naive RAG → Advanced RAG → Modular RAG 的演进与各环节优化手段
  - 为什么不直接把文档塞给大模型（上下文长度、成本、噪声、检索定位）

## d2-chunking-strategies 文档解析与切分策略
- 星级：⭐4（维持：专题文章与字节真题充分，属于项目深挖必追问项，但作为独立大题的出镜率略低于 d1/d5）
- 来源：知乎 RAG面试通关指南：文档解析与Chunk切分 https://zhuanlan.zhihu.com/p/1971950865725265033 ；知乎：字节面试真题 Chunk 切分 https://zhuanlan.zhihu.com/p/2017198718001111382 ；小林面试笔记 4_chunking https://xiaolinnote.com/ai/rag/4_chunking.html ；卡码笔记 how_to_chunking https://notes.kamacoder.com/llm/app/how_to_chunking.html ；拿个offer chunking-strategies https://nageoffer.com/ai/basics/rag/rag-core/chunking-strategies/ ；JavaGuide RAG 文档处理 https://javaguide.cn/ai/rag/rag-document-processing.html
- 面试问法：「如何选择合适的 Chunk 策略？Chunk Size 和 Overlap 怎么定？」「RAG 中的文档是怎么存的？粒度是多大？」「Chunk 切分为什么不能无脑按 500 字一刀切？」
- 高频考点提示：
  - 四种主流策略对比：固定长度 / 递归字符 / 语义切分 / 结构感知
  - Chunk 过大→噪声多检索不准；过小→语义不完整；需结合文档类型与 Embedding 模型能力
  - Overlap 是「被低估的关键参数」：避免语义在边界被截断
  - 表格整块保留不拆分、图片说明不丢失，多模态文档解析是加分项
  - 混合策略：递归粗切 + 语义细切

## d3-embedding-vector-db Embedding 与向量数据库（HNSW/IVF）
- 星级：⭐4（维持：向量索引原理有专门题库（17题合集、面试鸭专条、美团真题），是 RAG 岗最高频的底层原理题）
- 来源：面试鸭：HNSW 和 IVF 有什么区别 https://www.mianshiya.com/question/1991796741598388226 ；CSDN：17道向量数据库面试题 https://adg.csdn.net/6952553c5b9f5f31781b9363.html ；腾讯云：一文讲透 IVF/HNSW/PQ https://developer.cloud.tencent.com/article/2733971?policyId=1004 ；Zilliz：HNSW 与 IVF 选型 https://zilliz.com.cn/blog/Choosing-HNSW-vs-IVF-index-costs ；博客园：美团面试 Milvus 索引与优化 https://www.cnblogs.com/crazymakercircle/p/18867143 ；卡码笔记（向量数据库怎么选/Embedding 模型选型）https://notes.kamacoder.com/interview/llm/rag_interview.html
- 面试问法：「如何构建和使用向量索引？HNSW 和 IVF 有什么区别？」「向量数据库怎么选？Milvus、FAISS、Qdrant 各自的优缺点是什么？」「如何选择 Embedding 模型？bge、text-embedding、Jina 各自的优缺点是什么？」
- 高频考点提示：
  - HNSW：多层跳表式图、从顶层稀疏图贪心向下搜索；参数 M / efConstruction / ef
  - IVF：K-Means 聚类分桶，先找最近质心再桶内搜索；参数 nlist / nprobe
  - 召回率—延迟—内存三角权衡：HNSW 高召回低延迟但内存大，IVF 构建快内存省但召回受 nprobe 限制
  - Embedding 模型维度、最大输入长度、中英/多语种支持、C-MTEB/MTEB 评测选型
  - 结合项目答 Milvus/FAISS/Qdrant 选型与毫秒级响应优化

## d4-hybrid-retrieval-rerank 混合检索与重排
- 星级：⭐4（维持：「为什么还要 Rerank」是跨题库高频追问，混合检索+RRF+Cross-Encoder 是标准答题链）
- 来源：卡码笔记 RAG大厂面试题汇总 https://notes.kamacoder.com/interview/llm/rag_interview.html ；CSDN/AtomGit：RAG大厂面试题汇总 https://gitcode.csdn.net/69e75c5c0a2f6a37c5a15642.html ；GankInterview LLM 面试题库 https://www.gankinterview.cn/blog/llmlarge-model-ai-interview-rag-vector-search-alignment-evaluation-hallucination ；掘金：RAG中的Rerank重排序全面介绍 https://juejin.cn/post/7507564752434167845 ；腾讯云：混合检索RAG 多路召回+Reranker实战 https://developer.cloud.tencent.com/article/2710906
- 面试问法：「你已经用混合检索了，为什么还要 Rerank？检索结果不够好吗？」「为什么不直接用向量检索的结果给大模型，而要加一个 Rerank 阶段？」
- 高频考点提示：
  - BM25 与向量检索互补：关键词精确匹配 vs 语义泛化
  - RRF（倒数排序融合）做多路召回合并
  - Bi-Encoder（双塔，快、粗排）vs Cross-Encoder（逐对精打分，精排）
  - 指标分层：召回看 Recall@K，重排看 MRR/nDCG，只取 Top-N 喂给 LLM
  - 常见 Reranker：bge-reranker、Cohere Rerank、LLM Rerank、规则重排

## d5-rag-vs-finetune-vs-longctx RAG vs 微调 vs 长上下文选型
- 星级：⭐5（维持锚点：RAG vs 微调在卡码笔记题单中排第 3 题；「长上下文会不会取代 RAG」在两个独立来源中被列为高频/陷阱题）
- 来源：卡码笔记（第3题：相比直接微调LLM，RAG 解决了什么问题）https://notes.kamacoder.com/interview/llm/rag_interview.html ；知乎：851 道大模型面试题整理 https://zhuanlan.zhihu.com/p/2058150232085607301 ；B站：一周冲刺 2026 AI 大模型开发面试 https://www.bilibili.com/video/BV1eRbr6mEJE/ ；51CTO：RAG技术面试高频题目 https://blog.51cto.com/u_16099277/14876169 ；牛客：大模型算法工程师面试题汇总（微调侧）https://www.nowcoder.com/discuss/645706098464301056
- 面试问法：「相比直接微调 LLM，RAG 解决了什么问题？微调和 RAG 各自的优劣是什么？」「长上下文会取代 RAG 吗？」
- 高频考点提示：
  - 本质区别先行：微调改模型参数把知识「训练进」模型，RAG 不改参数、推理时注入知识
  - 四维对比：知识更新成本 / 可溯源 / 输出风格定制 / 算力成本
  - 长上下文适合一次性全文理解，但大规模知识库下成本高、有注意力稀释；不会简单取代 RAG
  - 高分答案：三者不互斥，生产上常组合（RAG 供知识、微调调行为/格式）
  - 垂类微调能力会被基模升级「抹平」，补知识优先 RAG，需改行为再考虑 PEFT（LoRA/QLoRA）

## d6-rag-evaluation RAG 评估（忠实度/相关性/RAGAS）
- 星级：⭐3（维持：有阿里二面 RAGAS 专题等确凿真题，但整体出镜率低于核心链路题，属中频进阶题）
- 来源：知乎：阿里大模型二面 RAGAS https://zhuanlan.zhihu.com/p/2025346540638597534 ；golangstar：RAGAS 评估框架核心指标 https://golangstar.cn/backend_series/llm_interview/ragas.html ；小林面试笔记 18_evaluation https://xiaolinnote.com/ai/rag/18_evaluation.html ；知乎：高级 RAG(四) Ragas 评估 https://zhuanlan.zhihu.com/p/675777378 ；粉粉蕉的笔记本（RAG 评估指标）https://fenfenjoe.top/interview/RAG.html
- 面试问法：「RAGAS 了解吗？它的评估指标有哪些？评估流程是怎样的？」「怎么量化你的 RAG 效果？」
- 高频考点提示：
  - 四大指标：Faithfulness 忠实度（答案是否忠于上下文、防幻觉）、Answer Relevancy、Context Precision、Context Recall
  - RAGAS 的评估哲学：把系统拆成检索/生成两环节分别评估，精准定位瓶颈
  - 忠实度可用 NLI 模型或 LLM-as-judge 判定；无标注集时的评估策略
  - 线上指标补充：引用命中率、用户点赞/转人工率、端到端回答采纳率

## d7-advanced-rag 高级 RAG（Self-RAG/CRAG/GraphRAG/多跳）
- 星级：⭐3（维持：Agentic RAG/GraphRAG 已进入 2026 题库并成独立考题；Self-RAG/CRAG 更多作为加分追问出现）
- 来源：卡码笔记（第26题 Agentic RAG、第27题 GraphRAG）https://notes.kamacoder.com/interview/llm/rag_interview.html ；知乎：RAG面试通关指南（含 GraphRAG 架构与优势）https://zhuanlan.zhihu.com/p/1971950865725265033 ；CSDN：高级RAG 优化全解析（召回/重排/生成三层架构）https://gitcode.csdn.net/6a09d7a410ee7a33f2733089.html
- 面试问法：「什么是 Agentic RAG？它解决了什么传统 RAG 管道的局限？」「GraphRAG 的核心思想和适用场景？相比向量 RAG 的优势是什么？」
- 高频考点提示：
  - 高级 RAG 三层架构：召回层（混合检索/多路召回）→ 重排层 → 生成层（证据回答+引用）
  - GraphRAG：实体关系抽取+社区摘要，适合多跳推理与全局性/总结性问题
  - Agentic RAG：把检索作为工具，由 LLM 自主决策是否检索、检索什么、检索几轮
  - Self-RAG（反思是否需要检索并自评）/ CRAG（检索质量纠错，触发 Web 补救）：本次检索未直接见到该二者的中文面试原题，属推断性加分考点（标注：推断）
  - 多跳检索：跨文档证据链拼装，常见于 Agent+RAG 结合场景

## d8-rag-troubleshooting RAG 常见问题与调优
- 星级：⭐4（上调 3→4：幻觉处理与「检索效果差怎么优化」在卡码笔记、知乎事故复盘、RAG夺命10连问等多个独立来源中均列为核心必答题，且是项目深挖环节的必然追问）
- 来源：卡码笔记（第22题 幻觉处理、第23题 检索效果差的原因与优化）https://notes.kamacoder.com/interview/llm/rag_interview.html ；知乎：RAG 系统常见线上事故 https://zhuanlan.zhihu.com/p/1908036603820242262 ；知乎：RAG夺命10连问 https://zhuanlan.zhihu.com/p/1870334937015644160
- 面试问法：「幻觉问题如何处理？如何确保生成的回答忠于检索到的上下文？」「如果检索效果不理想，可能有哪些原因？如何优化？」「你的 RAG 系统在线上遇到过哪些事故？」
- 高频考点提示：
  - 二分排查法：先定位是检索失败（没召回到）还是生成失败（召回到了但没答好）
  - 检索侧调优：切分/Embedding 换型/混合检索/重排/query 改写；生成侧：prompt 约束引用、温度、忠实度评估卡口
  - 典型 bad case：表格数据、否定句、多跳问题、时效性问题
  - 线上事故素材：索引不同步、切分破坏表格、权限泄漏、知识库脏数据（结合项目讲最有说服力）

## 建议新增知识点清单
- [查询理解与改写（Query Rewrite / Multi-Query / HyDE）] ⭐4 ｜ 卡码笔记 RAG题单第17–19题 https://notes.kamacoder.com/interview/llm/rag_interview.html ；知乎 RAG面试通关指南；知乎：字节面试真题 https://zhuanlan.zhihu.com/p/2017198718001111382 ｜ 定义：检索前对用户 query 做指代补全、同义扩展、多查询生成或假设性文档生成（HyDE），弥合 query 与文档间的语义差距，是「检索效果差」最优先的优化手段之一。
- [多轮对话 RAG（会话式检索与上下文补全）] ⭐3 ｜ 卡码笔记 RAG题单第19题「什么是多轮对话中的 Query Rewriting？」 https://notes.kamacoder.com/interview/llm/rag_interview.html （单一强来源，置信度中）｜ 定义：在多轮会话中先结合历史对话做指代消解与 query 重写、再进入检索链路，使「它怎么配置」这类追问能命中正确知识。
