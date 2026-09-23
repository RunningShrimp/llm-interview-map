# 讲解 H.4 Agentic RAG 与自主检索智能体

> 说明：前置 1.4 把 RAG 的管道组件（切分、混合检索、重排、引用、评估）与高级模式表讲透，2.6 给了反思与自我修正机制——本篇把两边合流：把检索降级为 Agent 工具箱里的一件工具，让模型在「规划-检索-反思」循环里自主决策，这就是 Agentic RAG（Agentic Retrieval-Augmented Generation，检索增强生成的智能体化）。
> 1.4 的高级模式表只给了它一行定义，本篇是那一行的深化：演进线、决策环、多跳分解、有界迭代、成本账与选型边界。运行节拍是 2.5 的执行循环，检索工具的封装规范见 2.3，轨迹级评估的体系做法见 2.9；企业级落地骨架在 4.2，token 预算与上下文工程的体系化延伸见 H.3。

---

## 1. 定位

H 层（前沿层）第 4 个锚点，星级 4，直接前置 1.4（RAG）与 2.6（反思与自我修正）。

站点状态口径：**面试出现中**——截至 2026 年，中英文题库多源确证：gitGood《RAG Interview Questions 2026》、AI Engineering Insider Top 70、小林 coding 2026 版 74 题、代码随想录 2026 面经汇总均覆盖 RAG / GraphRAG / Agentic 考点；考点卡来源口径为「Hugging Face Blog / 卡码笔记 / gitGood 2026」。

它回答 2026 年 RAG 面试的新一代问题：

- 「Fixed pipeline、Router 还是 Full agent——为企业知识助手选架构并辩护。」
- 「Agentic RAG 与传统 RAG 的本质区别？什么场景必须上、什么场景是过度设计？」

采分点不在「知道这个词」，而在三层：

1. **机制层**：能讲出 Naive → Advanced → Modular → Agentic 的演进线，说清检索决策权从流水线转移到 Agent 后，决策环的五个环节是什么。
2. **工程层**：自主检索必须有界迭代（Bounded Iteration）——max hops、token 预算、停止条件、轨迹留存，一样都不能少。
3. **架构层**：分级路由（Tiered Routing）——简单问题走标准 RAG，复杂问题才升级 Agentic，会算成本账。

前置关系三句话：

- 1.4 的检索质量是地基：切分、混合检索、重排做不好，Agent 再聪明也检不到东西。
- 2.6 的反思是自评机制：每轮检索后判断「证据够不够」，是决策环里结果评估与迭代两个环节的原型。
- 2.5 的执行循环是运行节拍：检索只是 agent loop 里的一次工具调用，工具封装规范在 2.3。

后续：4.2 把本篇放进企业级 RAG 知识库全案；检索者-复核者式的多 Agent 分工在 2.8；评估与安全口径在 2.9。

## 2. 一句话定义

Agentic RAG 是把检索降级为 Agent 工具箱里的一个工具、把检索策略升格为 Agent 自主决策的架构：要不要查、查什么、查几轮、结果够不够，由模型在「规划-检索-反思」循环里自行判断，而不是写死在流水线里。

简化公式：

```text
标准 RAG：    答案质量 = f(检索质量)              ← 一次检索定终身
Agentic RAG： 答案质量 = f(检索质量, 决策质量)     ← 决策环有界迭代
其中 决策质量 = 是否检索 + 查询生成 + 结果评估 + 迭代决策 + 终止作答
```

## 3. 为什么需要

标准 RAG（1.4）的流程是写死的：查询进来，检索一次，拼装上下文，生成答案。五个结构性缺陷随之而来：

1. **单次检索定终身** → 只检索一轮，第一轮没召回就硬答，召回率有天花板。
2. **查询不可分解** → 多跳（Multi-hop）问题「A 政策负责人的部门预算是多少」需要先后命中三个事实，单次嵌入检索基本失败。
3. **无法自评** → 检索结果好不好，系统自己不知道，LLM 只能基于喂进来的东西作答——喂了噪音就答错。
4. **不会选源** → 内部文档、结构化 SQL、Web 搜索各有擅长，固定流水线只能全部走同一个向量库。
5. **不会说「不查」** → 闲聊、常识、上下文里已有答案的问题也被迫检索一次，白付延迟与成本。

同一个多跳问题，两种架构的行为对比：

| 环节 | 标准 RAG | Agentic RAG |
|---|---|---|
| 输入 | 「A 政策负责人的部门预算是多少」 | 同左 |
| 检索 | 原句嵌入，检索 1 次 | 拆成 3 个子问题，链式检索 2-3 次 |
| 检索失败时 | 硬答或编造 | 自评发现缺口，改写重查或换源 |
| 结果 | 三跳漏一跳即答错 | 三跳分别验证，缺哪跳补哪跳 |
| 成本 | 1 次检索 + 1 次生成 | 3 次检索 + 若干次决策/评估调用 |

两个类比帮助记忆（考点卡口径）：

- **图书管理员升级为研究员**：标准 RAG 是按流程办事的管理员——递问题、查一次、抄一段、交卷；Agentic RAG 是研究员——先分析要查什么、拆成几个子问题，查完评估「这些资料够吗」，不够就换关键词再查或换个库，有把握才动笔。
- **从流水线到决策者**：检索变成工具箱里的一件工具，查不查、查几轮、查哪个库、要不要反思重查，都由模型在执行循环里决定——车间里多的是一位会看图纸、会返工的老师傅，而不是一台更快的机器。

能力上限更高，代价也直接：延迟与 token 成本数倍于固定 RAG——这是本篇反复出现的权衡主线，也是 4.10 选型边界的由来。

## 4. 核心原理

### 4.1 演进线：Naive → Advanced → Modular → Agentic

RAG 的架构史可以压缩成四次换问题：前三代都在改「这一次检索怎么做」，第四代把问题换成「检索该不该做、做几次、由谁决定」。

| 形态 | 核心做法 | 解决了什么 | 留下什么没解决 |
|---|---|---|---|
| Naive RAG | 查询嵌入 → Top-K → 拼上下文生成 | 从无到有：模型能引用外部知识 | 检索质量差、噪音多、多跳失败 |
| Advanced RAG | 查询改写（Query Rewriting）、混合检索、重排（Rerank）、元数据过滤 | 把一次检索的质量推到顶 | 仍然只有一次，错了不能补救 |
| Modular RAG | 检索、重排、记忆、路由做成可插拔模块，按需编排 | 组件可替换、流程可定制 | 编排仍是写死的代码，不随问题变化 |
| Agentic RAG | 检索变成工具，查不查/查什么/查几轮由模型在循环里决策 | 失败可补救、多跳可分解、多源可选 | 成本延迟数倍，需要护栏与评估 |

演进的关键认知：**Agentic 不是对前三代的否定，而是加了一层决策环**。1.4 的切分、混合检索、重排没有作废——它们是 Agent 手里那件工具的内部质量，地基不牢，决策再聪明也是空中楼阁。

### 4.2 决策环：五个决策点

「Agentic」具体指 Agent 接管五个检索决策点，它们首尾相接构成决策环（Decision Loop）：

| 决策点 | 固定 RAG 的做法 | Agentic RAG 的做法 | 输入 → 输出 |
|---|---|---|---|
| ① 是否检索 | 必查，无例外 | 闲聊/常识/已有上下文可答则不查 | 问题+已有证据 → 查/不查 |
| ② 查询生成 | 原始查询直接嵌入 | 改写、分解成子问题、生成多查询（Multi-Query） | 问题+证据缺口 → 新查询+选源 |
| ③ 结果评估 | 不评估，直接拼进上下文 | 逐篇相关性分级（Relevance Grading）+ 证据充分度整体判断 | 检索结果 → 相关/无关/缺口清单 |
| ④ 迭代决策 | 无此环节 | 证据不足 → 改写重查、换源、降级子问题 | 缺口分析 → 下一轮或收束 |
| ⑤ 终止与作答 | 生成即结束 | 自判足够、预算用尽、无进展——三种停止各有兜底 | 循环状态 → 答案+引用+轨迹 |

一句话概括：**决策权从工程代码转移到模型循环**。每轮循环的节拍就是 2.5 的 ReAct：Thought（拆解与选源）→ Action（一次检索工具调用）→ Observation（分级后的证据）→ 再 Thought，直到停止条件触发。

决策环每个环节都有典型失败模式，2026 年面试喜欢追问「Agentic RAG 会在哪坏」：

| 环节 | 失败模式 | 后果 | 对策 |
|---|---|---|---|
| 是否检索 | 过度检索：闲聊也查 | 延迟成本翻倍 | 路由前置，简单问题直答 |
| 是否检索 | 该查不查：自信硬答 | 幻觉 | 证据充分度门槛，无引用不作答 |
| 查询生成 | 改写漂移：越改越偏题 | 检索质量反而下降 | 改写带原问题锚定，新查询记入已查集合 |
| 查询生成 | 分解错误：子问题缺依赖标注 | 链式代入失败 | 子问题显式标注「可用前跳结论」 |
| 结果评估 | 自评过松：噪音入库 | 证据池污染 | 小模型分级+判据拆开（相关/支持/有用分开评） |
| 结果评估 | 自评过严：永远觉得不够 | 轮数耗尽 | 充分度门槛量化（相关证据覆盖子问题数 ≥ N） |
| 迭代决策 | 原地打转：换词重查同结果 | 预算空转 | 重复查询拒绝 + 无进展检测 |
| 终止作答 | 刹车无兜底：报错收场 | 体验崩塌 | 预算用尽 → 基于已有证据作答或声明不足 |

### 4.3 多跳检索与查询分解

多跳问题的本质：**答案依赖的事实分散在多篇文档里，且第二跳的查询词要从第一跳的结论里来**。单次嵌入检索无法表达这种依赖，处理它靠查询分解（Query Decomposition）加迭代检索，共三种形态：

| 形态 | 结构 | 适用 | 例子 |
|---|---|---|---|
| 链式（Chain） | s1 → s2（代入 s1 结论）→ s3（代入 s2 结论） | 后跳依赖前跳结论 | 负责人是谁 → 属于哪个部门 → 部门预算多少 |
| 并行（Parallel） | s1、s2 互不依赖，同时检索后合并 | 对比、汇总类问题 | A 产品的退货政策 vs B 产品的退货政策 |
| 混合 | 先并行后链式 | 复杂综合题 | 并行查两条政策 → 链式查叠加规则 |

工程要点三条：

1. **中间结论必须显式传递**：子问题用占位符（如 fact1）标注，检索后回填，下一跳代入再检索——每跳都拿原始问题去检索，等效单跳。
2. **分解交给小模型即可**：分解是结构化任务，用轻量模型 + JSON 输出（1.3 的结构化输出）成本只有主模型的零头。
3. **分解是确定性基线，Agent 是兜底**：分解路线可枚举、可测试，两周可落地；分解不动的开放问题再交给完整决策环——这是 4.10 三档选型的先手逻辑。

### 4.4 Self-RAG 与 CRAG 深化

两个先于 Agentic RAG 出现、又被其吸收的经典思路。面试常问：「Self-RAG、CRAG 和 Agentic RAG 是什么关系？」共识口径：前两者是**训练侧**的反思机制，Agentic RAG 把它们的反思循环**工程化、提示词化**——不重训模型，用 LLM 调用近似同等的判断。

| 维度 | Self-RAG（Asai 等，ICLR 2024） | CRAG（Corrective RAG，2024） |
|---|---|---|
| 核心机制 | 训练模型生成「反思 token（Reflection Token）」：要不要检索、文档相不相关、答案有没有被支持、答案有没有用 | 训练轻量「检索评估器（Retrieval Evaluator）」给检索质量打分，三分：正确/模糊/错误 |
| 质量差时 | 反思 token 驱动重新生成或弃答 | 低分触发纠正：Web 检索兜底 + 知识精炼（Knowledge Refinement，把文档拆条重组合） |
| 是否需要训练 | 需要专门微调主模型 | 只需训练评估器 |
| Agent 化后的形态 | 每轮检索后自评「相关吗/支持吗/有用吗」——决策环的③结果评估 | 质量差时改写重查或换 Web 源——决策环的④迭代决策 |

深化两点：

- Self-RAG 的反思 token 本质是**把四个判断题内化进模型**：要不要检索、检索结果相关吗、答案被证据支持吗、答案有用吗。工程上不必照搬训练方案——用一次 LLM 调用做逐篇相关性分级，就是它的实用近似，这正是 2.6 反思机制在检索场景的实例化。
- CRAG 的贡献是**分层纠正**：先评估（便宜、可并行），评估不过再触发昂贵的纠正动作（Web 兜底、知识精炼），而不是每次都全量补救。「评估便宜、纠正昂贵、按级触发」的分层思想贯穿所有 Agentic RAG 生产系统。

### 4.5 检索工具化

Agent 不直接访问检索器，检索以工具（Tool）形态进入工具箱。工具定义与调用的通用规范见 2.3，这里只讲检索作为工具的三条特有讲究：

1. **工具描述就是 Agent 的「检索认知」**。description 写「内部知识库，回答业务问题先查这里」与写「检索内部文档」，Agent 的选源行为完全不同；多源场景下，每个工具的 description 要写清适用的问题类型与使用时机。
2. **多源注册，按需调用**：向量检索（语义路）、BM25（编号/代码/专名）、SQL 工具（数值统计）、Web 搜索（时效性）、图查询（关系链）——每个源是一件工具，由 Agent 在②查询生成时选定，而不是写死的支路。
3. **权限过滤在工具内部强制执行**：租户、部门、密级过滤写进检索器的查询参数，不靠提示词约束（口径见 3.2 与 1.7）——Agent 自由组合查询时，提示词拦不住越权。

检索工具化的分界线也在这里：2.3 讲「工具怎么定义、怎么让模型可靠调用」，本篇讲「检索作为工具时，决策环怎么用得聪明」。

### 4.6 GraphRAG 的定位

GraphRAG（Graph-based RAG，图检索增强生成）常与 Agentic RAG 并列讨论，但定位不同：**它不是检索决策的智能化，而是检索底座的增强**。

- **机制**：从文档抽取实体与关系构建知识图谱，多跳查询用图遍历替代向量相似度；对语料做社区摘要，回答全局性问题。
- **分工**：关系密集型问题（组织架构、供应链、引文网络、审批链）图有优势；语义模糊的开放问题向量仍是主力。两者通常混合共存，由 Agent 在选源时路由。
- **代价**：图谱构建与增量更新成本高，实体抽取质量决定上限（知识工程口径见 3.2）。
- **一句话定位**：Agentic RAG 回答「怎么查更聪明」，GraphRAG 回答「用什么结构存知识更好查」——一个是决策层，一个是存储层，不是竞争关系。

### 4.7 有界迭代：刹车与兜底

2026 年题库把 retrieval 框定为「agent loop 内一次 tool call」，答分点就在**有界迭代**。没有边界的自主检索必然失控：模型可能无限重查、重复检索同一内容、把上下文撑爆。生产系统的标准刹车：

| 刹车 | 典型值 | 防的事故 |
|---|---|---|
| max hops（最大轮数） | 3-6 轮 | 无限循环、延迟爆炸 |
| token 预算 | 单问 4K-16K 检索内容 | 上下文膨胀、成本失控 |
| 重复查询检测 | 相同查询直接拒绝 | 原地打转 |
| 无进展检测 | 连续 2 轮无新证据即收束 | 换词重查但结果雷同 |
| 证据充分度门槛 | 相关证据覆盖子问题数 ≥ N | 证据不足硬答 |
| 外部超时 | 单问总时长上限 | 长尾请求拖垮服务 |

三条铁律：

1. **每个上限都要有兜底动作**：轮数或预算用尽时不是报错，而是「基于已有证据作答，或明确说证据不足」。
2. **上限要进配置、进监控**：平均轮数、P95 轮数、预算命中率是 Agentic RAG 的核心运维指标（展开见 4.9 与 2.9）。
3. **预算优先级明确**：token 预算内优先保留经过重排的高相关证据，低相关内容先丢弃——预算内的上下文取舍衔接 H.3 的上下文工程（Context Engineering）。

### 4.8 成本与延迟：算清每一轮的账

决策环每转一圈，实际发生的不止一次检索。单轮调用构成：

| 调用 | 模型档位 | 次数/轮 | 成本量级 |
|---|---|---|---|
| 决策调用（规划/选源/是否继续） | 主模型 | 1 | 大头 |
| 查询分解/改写 | 小模型 | 0-1 | 零头 |
| 相关性分级 | 小模型 | 1 | 零头 |
| 检索本身 | 非模型调用 | 1-3 | 毫秒级 |
| 最终生成 | 主模型 | 1 | 大头 |

优化手段按收益排序：

1. **分级路由（最有效）**：让 70-80% 的简单问题根本不进决策环，成本倍数只作用于长尾。
2. **小模型下沉**：分解、改写、分级全部用轻量模型，主模型只出现在决策与生成。
3. **并行子查询**：并行型子问题一次发出，延迟从「跳数 × 单次」降为「批次数 × 单次」。
4. **流式与进度**：轮次进度流式展示（「正在查第 2/4 轮」），体感延迟先降一半。

成本与延迟的量化口径（面试可直接引用）：固定 RAG 是基线 1.0，Router 约 1.2 倍，Full agent 3-10 倍；延迟从 1-2 秒升到 5-30 秒。这不是「贵不贵」的定性判断，而是选型辩护里的硬通货。成本优化的体系做法见 3.7 与 1.7。

### 4.9 轨迹级评估

只评最终答案，Agentic RAG 坏了不知道坏在哪一环。轨迹（Trajectory）级评估把每一跳记录成 (Thought, Action, Observation) 三元组，按跳归因：

| 指标 | 定义 | 指向的问题 |
|---|---|---|
| 最终正确率 | 答案与标准答案比对 | 整体效果 |
| 平均/P95 轮数 | 决策环转了几圈 | 是否空转 |
| 各跳命中率 | 每次检索召回相关证据的比例 | 检索基建（1.4 的锅）还是查询生成（决策环的锅） |
| 预算利用率 | 有效证据 token / 总消耗 token | 证据池管理 |
| 引用准确率 | 引用编号指向正确来源 | 溯源可信度 |
| 停止原因分布 | 自判足够 / 预算耗尽 / 超时的占比 | 兜底是否成常态 |

归因逻辑：各跳命中率低 → 先修检索基建（回 1.4）；命中率高但正确率低 → 决策环的问题（改写漂移、自评过松）；预算耗尽占比高 → 刹车参数或充分度门槛设错。评估体系与安全口径在 2.9 展开，LLM-as-Judge 的校准风险见 1.6。

### 4.10 生产适用边界：何时固定 RAG 就够

面试高频问法：「企业知识助手，Fixed pipeline、Router 还是 Full agent？选一个并辩护。」三档是连续谱，不是二选一：

| 维度 | Fixed pipeline（固定流水线） | Router（路由） | Full agent（完整决策环） |
|---|---|---|---|
| 检索次数 | 固定 1 次 | 1 次，但选对库 | 1-N 轮，自主决定 |
| 掌握的决策点 | 无 | 「查询 → 源」映射 | 全部五个 |
| 延迟 | 最低（1-2 秒） | 低（+1 次分类调用） | 高（数轮循环，5-30 秒） |
| 成本 | 基线 | 基线约 1.2 倍 | 基线 3-10 倍 |
| 可预测性 | 完全可预期 | 高 | 需要护栏 |
| 适用 | FAQ、单跳事实 | 多源多域、查询分布杂 | 多跳、模糊、跨域综合 |

选型判据按顺序过：

1. 查询分布能否枚举？能画成流程图就别上 Agent——写死的编排更便宜更稳（2.7 的判据在 RAG 里同样成立）。
2. 是否多源异构（文档库 + SQL + Web）？是则至少上 Router。
3. 是否存在真实的多跳需求（A 依赖 B、B 依赖 C）？有才考虑 Full agent。
4. 延迟预算多少？秒级回复的客服场景慎用 Full agent。

以下信号出现时，上 Full agent 是过度设计：

1. **查询分布以 FAQ/单跳事实为主**（占比 80% 以上）：固定 RAG 一次命中，决策环纯属浪费。
2. **延迟敏感**：客服、搜索框联想等秒级场景，数轮循环直接超时。
3. **文档量小且结构稳定**：几百份同构文档，检索空间小，一轮足够。
4. **评估体系建不起来**：没有多跳测试集，Agentic 的收益无法验证，只剩成本。
5. **预算刚性**：单问成本卡死，3-10 倍的成本倍数不可接受。
6. **失败不可兜底**：Agent 答错的代价远高于「检不到就转人工」。

正确姿势是分级：简单问题路由回标准 RAG，多跳/模糊/复杂问题才升级 Agentic——第 5 节的架构图就是这个形态。

## 5. 架构 / 流程

生产级 Agentic RAG 的推荐形态：**分级路由 + 有界自主检索决策环**。

```text
                        用户查询
                           │
                ┌──────────▼──────────┐
                │ 复杂度路由器（前置门） │   规则 + 小模型分类
                └─────┬──────────┬────┘
         简单/单跳    │          │    多跳/模糊/跨源
                     ▼          ▼
           ┌──────────────┐  ┌─────────────────────────────────┐
           │ 标准 RAG      │  │  Agentic 决策环（有界）            │
           │ 检索一次      │  │                                 │
           │ 重排 → 生成   │  │ ① 是否检索：闲聊/已有证据可答      │
           └──────┬───────┘  │     → 跳过检索直接生成           │
                  │          │ ② 查询生成：改写/分解/多查询       │
                  │          │     + 选源 vector/bm25/sql/web  │
                  │          │              │                  │
                  │          │              ▼ 工具调用（2.3）    │
                  │          │ ③ 结果评估：逐篇相关性分级         │
                  │          │     + 证据充分度整体判断           │
                  │          │ ④ 迭代决策：不足 → 改写重查/       │
                  │          │     换源/降级子问题 ──→ 回到 ②    │
                  │          │ ⑤ 终止作答：自判足够 or 刹车触发    │
                  │          │     刹车：max hops=5             │
                  │          │           token 预算=8K          │
                  │          │           重复查询拒绝/无进展/超时  │
                  │          └──────────────┬──────────────────┘
                  │                         │
                  ▼                         ▼
            ┌───────────────────────────────────┐
            │ 统一出口：答案 + 引用 + 完整轨迹     │
            │ 监控：轮数/成本/各跳命中率/停止原因   │
            └───────────────────────────────────┘
```

决策环单轮的节拍，就是 2.5 的 ReAct 在检索场景的实例化（一条完整轨迹示例）：

```text
Thought：已有 fact1（A 政策负责人=张三），还缺「张三所在部门」→ 选 vector 工具
Action：vector_search("张三 所属部门")
Observation：3 篇相关（分级通过，入库）/ 2 篇无关（剔除）
Thought：fact2=市场部；还差部门预算，数值问题 → 转 SQL 工具
Action：sql_query("SELECT budget FROM dept WHERE name='市场部'")
Observation：预算 1200 万 → 证据覆盖全部子问题 → 停止条件触发
Answer：A 政策负责人张三属市场部，部门预算 1200 万 [1][2]
```

## 6. 代码 / 工具

### 6.1 自主检索决策环最小实现（含全部刹车）

```python
import json
from openai import OpenAI

client = OpenAI(api_key="YOUR_KEY")

# ---- 检索即工具：多源注册（封装规范见 2.3）----
def vector_search(query: str, k: int = 5) -> list:
    """语义路：内部向量库（1.4 的切分+嵌入质量决定这里的天花板）"""
    return collection.query(query_texts=[query], n_results=k)["documents"][0]

def bm25_search(query: str, k: int = 5) -> list:
    """关键词路：命中编号、代码、专有名词"""
    return hybrid_bm25_topk(query, k)

def web_search(query: str) -> list:
    """外部兜底：CRAG 式纠正路径，时效性问题才用"""
    return call_web_api(query)

TOOLS = {"vector": vector_search, "bm25": bm25_search, "web": web_search}

MAX_HOPS = 5          # 刹车1：最大检索轮数
TOKEN_BUDGET = 8000   # 刹车2：检索内容总预算（粗估）

PLANNER = """你是自主检索智能体，管理一个证据池。已检索过的查询不可重复。
每轮只输出一个 JSON，二选一：
{"action":"retrieve","tool":"vector|bm25|web","query":"...","why":"一句话理由"}
{"action":"answer","answer":"...","sources":["证据片段..."]}
规则：证据不足不要硬答；证据足够立即作答；优先内部库，时效性问题才用 web。"""

def ask_model(question: str, evidence: dict, asked: set) -> dict:
    """决策调用：①是否检索 + ②查询生成 + ④迭代决策 + ⑤终止，压在一次结构化输出里"""
    seen = "\n".join(f"- {q}" for q in sorted(asked)) or "（无）"
    pool = "\n".join(evidence.values())[-4000:] or "（空）"
    resp = client.chat.completions.create(
        model="gpt-4o", temperature=0,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": PLANNER},
            {"role": "user", "content": f"问题：{question}\n已检索查询：\n{seen}\n当前证据池：\n{pool}"},
        ],
    )
    return json.loads(resp.choices[0].message.content)

def grade_relevance(question: str, docs: list) -> list:
    """③ 结果评估（Self-RAG 式自评，小模型下沉）：逐篇判相关。返回 [True/False, ...]"""
    listing = "\n".join(f"[{i}] {d[:200]}" for i, d in enumerate(docs))
    resp = client.chat.completions.create(
        model="gpt-4o-mini", temperature=0,
        response_format={"type": "json_object"},
        messages=[{"role": "user", "content":
            f'问题：{question}\n逐篇判断文档相关性，输出 {{"grades":[{{"idx":0,"relevant":true}}...]}}：\n{listing}'}],
    )
    grades = json.loads(resp.choices[0].message.content)["grades"]
    return [g["relevant"] for g in sorted(grades, key=lambda g: g["idx"])]

def token_len(text: str) -> int:
    return max(1, len(text) // 2)   # 中文粗估：2 字符约 1 token

def agentic_answer(question: str) -> dict:
    evidence: dict = {}          # 去重证据池
    asked: set = set()
    hops, spent = 0, 0

    for _ in range(MAX_HOPS):                         # 刹车1：轮数上限
        decision = ask_model(question, evidence, asked)

        if decision["action"] == "answer":            # 停止A：自判证据足够
            return {"answer": decision["answer"], "hops": hops,
                    "tokens": spent, "stop": "self_judged"}

        q = decision["query"].strip()
        if q in asked:                                # 刹车3：重复查询 → 收束
            break
        asked.add(q)

        docs = TOOLS[decision["tool"]](q)
        hops += 1

        for doc, relevant in zip(docs, grade_relevance(question, docs)):
            if relevant and doc not in evidence and spent < TOKEN_BUDGET:
                evidence[doc[:64]] = doc              # 刹车2：预算内才入库
                spent += token_len(doc)

        if spent >= TOKEN_BUDGET:                     # 停止B：预算耗尽
            break

    # 停止C/D：轮数或预算用尽 → 基于已有证据作答，或承认不足（兜底动作）
    pool = "\n".join(evidence.values()) or "（无证据）"
    final = client.chat.completions.create(
        model="gpt-4o", temperature=0,
        messages=[{"role": "user", "content":
            f"问题：{question}\n检索已达上限，只根据以下证据作答；"
            f"证据不足请明确说证据不足，不要编造。\n{pool}"}],
    )
    return {"answer": final.choices[0].message.content, "hops": hops,
            "tokens": spent, "stop": "budget_exhausted"}
```

### 6.2 查询分解模板 + 链式迭代检索（确定性基线）

考点卡架构题的推荐先手：分解为主、Agent 兜底。分解路线工程确定性强，两周可落地。

```python
DECOMPOSE_PROMPT = """把问题拆成可独立检索的子问题链，要求：
1. 每个子问题只含一个可检索事实；
2. 依赖前跳结论的子问题，用 {{fact{n}}} 占位符标注（如"{{fact1}} 所在部门的预算"）；
3. 标注子问题间的关系：chain（后跳依赖前跳）或 parallel（互不依赖）；
4. 输出 JSON：{{"subs":[{{"text":"...","mode":"chain|parallel"}}]}}
问题：{question}"""

def decompose(question: str) -> list:
    """查询分解：小模型 + 结构化输出（1.3）"""
    resp = client.chat.completions.create(
        model="gpt-4o-mini", temperature=0,
        response_format={"type": "json_object"},
        messages=[{"role": "user", "content": DECOMPOSE_PROMPT.format(question=question)}],
    )
    return json.loads(resp.choices[0].message.content)["subs"]

def iterative_retrieve(question: str, max_hops: int = 3) -> dict:
    """链式迭代：中间结论回填占位符，再进下一跳——多跳的正确姿势"""
    subs = decompose(question)
    context, log = {}, []                      # log 即轨迹，供 2.9 的轨迹级评估
    for i, sub in enumerate(subs[:max_hops]):
        filled = sub["text"].format(**context) if "{" in sub["text"] else sub["text"]
        docs = rerank(filled, vector_search(filled, k=10))   # 1.4 的基建：混合检索+重排
        context[f"fact{i+1}"] = docs[0] if docs else ""
        log.append({"hop": i + 1, "query": filled, "hit": bool(docs)})
    return {"facts": context, "trajectory": log}

# 分级路由：两档共用一套多跳测试集，指标 = 正确率 / 平均轮数 / 单问成本
def route(question: str) -> str:
    resp = client.chat.completions.create(
        model="gpt-4o-mini", temperature=0,
        messages=[{"role": "user", "content":
            f"判断查询复杂度，只输出 simple 或 complex：{question}"}],
    )
    return resp.choices[0].message.content.strip()

def answer(question: str) -> dict:
    if route(question) == "simple":
        return {"path": "rag", "result": standard_rag(question)}    # 简单走老流程
    return {"path": "agentic", "result": agentic_answer(question)}  # 难题升级决策环
```

### 6.3 轨迹落盘：轨迹级评估的前置工程

```python
import time, hashlib

def log_trajectory(run_id: str, question: str, steps: list, result: dict):
    """每跳三元组 + 停止原因全落日志——4.9 与 2.9 轨迹级评估的数据底座"""
    record = {
        "run_id": run_id, "question": question,
        "steps": [  # 每步 = Thought + Action + Observation
            {"thought": s.get("why", ""),
             "action": f'{s["tool"]}:{s["query"]}',
             "fingerprint": hashlib.md5((s["tool"] + s["query"]).encode()).hexdigest()[:8],
             "relevant_docs": s.get("relevant", 0)}
            for s in steps
        ],
        "hops": result["hops"], "tokens": result["tokens"],
        "stop_reason": result["stop"], "ts": time.time(),
    }
    with open("trajectories.jsonl", "a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")

# 周报指标：平均轮数 / P95 轮数 / 预算命中率 / fingerprint 重复率（原地打转信号）
```

### 6.4 快速验证：LlamaIndex 两行式检索 Agent

```python
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import QueryEngineTool

rag_tool = QueryEngineTool.from_defaults(
    query_engine=index.as_query_engine(similarity_top_k=5),
    name="kb_search", description="内部知识库检索，回答业务问题前先查这里",
)
web_tool = QueryEngineTool.from_defaults(
    query_engine=web_engine, name="web_search", description="最新信息/内部没有时使用",
)
agent = ReActAgent.from_tools([rag_tool, web_tool], max_iterations=6, verbose=True)
# max_iterations 即 max hops；verbose=True 打印完整决策环轨迹，可直接当 4.9 的评估素材
print(agent.chat("A 政策负责人的部门预算是多少？"))
```

## 7. 案例

### 案例 A：电商客服的多跳分级架构

**场景**：某电商知识助手，日均 3 万问。70% 是「退货政策是什么」类单跳 FAQ，30% 是「我买的 A 商品适用 B 活动的优惠还能叠加 C 券吗」类多跳。原来全量标准 RAG，多跳问题正确率约 55%，是客诉重灾区。

**改造**：复杂度路由（规则 + 小模型分类）→ 简单问题走原 RAG，复杂问题升级为分解 + 迭代检索，仅 8% 的长尾进 Full agent 兜底。两档共用 200 条多跳测试集，指标为正确率 / 平均轮数 / 单问成本。

**效果**：多跳正确率 55% 提升到 82%，整体单问成本只上升约 20%（因为 70% 流量没变），P95 延迟从 3.2 秒升到 6.8 秒（仅复杂路径），在客服可接受范围。

### 案例 B：金融合规的多源路由

**场景**：一家金融科技公司的合规助手，需要同时查内部制度库、监管公告（时效性强）、结构化处罚数据库（SQL）。固定流水线全走向量库，时效性问题和数值问题频繁答错。

**改造**：决策环按子问题选源——制度问题走向量库，时效问题加 Web 检索并强制带日期，数值问题生成 SQL。每轮自评证据充分度，max hops=4，token 预算 6K，全部留轨迹可审计。

**效果**：合规问答准确率从 68% 提到 89%，其中「引用来源正确」一项从 71% 提到 96%——多源路由 + 强制引用的直接收益。监管问询响应准备时间从半天缩到 1 小时量级。

### 案例 C：一次过度设计复盘

**场景**：某 SaaS 公司给文档助手上了全量 Full agent（无路由、max hops=8、无预算），上线两周后单问平均成本是原 RAG 的 7 倍，P95 延迟 25 秒，且抽查发现 40% 的问题其实一轮检索就能答对——决策环在「充分反思」的幌子下反复重查。

**修正**：加复杂度路由；max hops 降到 4；加重复查询拒绝与 6K token 预算；轮数 / 成本进周报监控。修正后成本回到原来的 1.6 倍，正确率与 Full agent 版持平——多花的是该花的钱，省掉的是空转。

## 8. 常见坑

1. **无路由全量 Agentic**。  
   简单问题也被迫多轮循环，成本延迟双爆。先路由再升级。

2. **没有 max hops**。  
   模型可能无限重查。3-6 轮上限 + 预算用尽的兜底作答是标配。

3. **停止条件只有「模型说够了」**。  
   自评会误判。叠加重复查询拒绝、无进展检测、外部超时多重刹车。

4. **检索基建没做好就上 Agent**。  
   切分差、无混合检索、无重排，Agent 改写十轮也检不到。先修 1.4。

5. **自评与生成用同一个模型同一句话术**。  
   自评形同虚设。分级用小模型、判据明确（相关/支持/有用分开评）。

6. **证据池不去重**。  
   同一文档换词重查后重复入库，预算被垃圾占满。按内容指纹去重。

7. **多跳中间结论不传递**。  
   每跳都从原始问题检索，等效单跳。子问题链必须回填前跳结论。

8. **轨迹不留存**。  
   答错了不知道卡在哪一跳。每轮 Thought/Action/Observation 全落日志（6.3 的做法）。

9. **权限过滤被 Agent 绕过**。  
   Agent 自由组合查询时可能漏掉租户过滤。过滤在检索工具层强制执行，不靠提示词（3.2 与 1.7 的口径）。

10. **只用最终答案评估**。  
    无法定位检索问题还是决策问题。加评：平均轮数、预算命中率、各跳命中率（4.9 的指标）。

11. **把 GraphRAG 当 Agentic RAG 的替代品**。  
    一个是存储层增强，一个是决策层升级。关系密集场景两者叠加使用（4.6 的定位）。

12. **改写查询没有约束**。  
    Agent 把查询改到面目全非，检索反而更差。改写要带原问题锚定，新查询记入已查集合。

13. **忽视首 token 延迟体验**。  
    多轮循环用户界面干等。轮次进度流式展示，或先答「正在查 X」再补全。

14. **Agent 化后放弃引用**。  
    多轮证据更难溯源。每条证据入库时带来源元数据，生成强制标注（1.4 的引用纪律不豁免）。

## 9. 练习

1. 把 1.4 的最小 RAG 改造成自主检索决策环：加 max hops=3 与重复查询拒绝，观察多跳问题上的行为差异。
2. 实现 6.1 的相关性分级，统计 20 个问题上「自评结果与人工标注」的一致率。
3. 构造 10 个多跳问题（A→B→C 链式），对比标准 RAG、分解+迭代、Full agent 三档的正确率与单问成本。
4. 给决策环加 token 预算（4K/8K/16K 三档），画「预算-正确率-成本」曲线，找性价比拐点。
5. 写一个复杂度路由（规则版与 LLM 版各一），用测试集算路由准确率与错分代价。
6. 用 6.3 的轨迹日志算三个指标：平均轮数、各跳命中率、fingerprint 重复率，并各给出一条对应的改进动作。
7. 把 6.4 的 LlamaIndex Agent 接上你的向量库与一个模拟 Web 工具，打印完整决策环轨迹并复盘每一跳的必要性。
8. 做一次「过度设计诊断」：统计你们查询分布的单跳占比，给出三档分流阈值并写一页辩护。

## 10. 小结

- 本质区别一句话：**检索决策权从固定流水线交给 Agent**——是否检索、查询生成、结果评估、迭代决策、终止作答，五个决策点全部模型自决。
- 演进线四步：**Naive 建底、Advanced 提质、Modular 拼装、Agentic 决策**——前三代改「这一次检索怎么做」，Agentic 换成「该不该查、查几次」。
- 决策环五环节各有失败模式：**过度检索、改写漂移、自评过松/过严、原地打转、刹车无兜底**——每个失败模式都有对策，面试按环作答。
- 多跳正解是查询分解：**链式回填中间结论、并行合并对比**；分解是确定性基线，Agent 兜底。
- Self-RAG / CRAG 的思想被 Agent 化吸收：**逐篇相关性分级 + 分层纠正（评估便宜、纠正昂贵、按级触发）**，工程上用 LLM 调用近似即可。
- 自主检索必须有界：**max hops 3-6、token 预算、重复查询拒绝、无进展检测、超时兜底**——每个上限都要有兜底动作。
- GraphRAG 定位：**存储层增强（图结构）而非决策层替代**，关系密集场景与 Agentic 混用。
- 过度设计信号：**FAQ 占比 80% 以上、延迟敏感、文档量小、评估建不起来、预算刚性、失败不可兜底**。
- 生产姿势：**分级路由——简单走标准 RAG，复杂升级决策环**，用多跳测试集 + 三指标（正确率/轮数/成本）定阈值；成本口径：Router 约 1.2 倍、Full agent 3-10 倍。
- 地基顺序不能反：**先修检索质量（1.4），再上自主决策**；检索没召回，Agent 再聪明也白搭。
- 这些能力直接支撑：4.2 RAG 知识库 Agent、2.9 Agent 评估与安全、3.2 数据与知识工程。
