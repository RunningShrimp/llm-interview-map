# 最终大纲 v2（阶段1.5 定稿，共 74 点：模块 × 层级矩阵）

> 定稿说明：v1 的 56 点按层级拆分重排（L3 主体复用 v1 内容与来源），新增 L1 直觉版 13 点、L4 架构师版 15 点。
> 星级与来源继承 v1 检索核实结果（50+ 点有可查来源），v2 新增分层考点经 7 个检索子 Agent 二次核实（详见 research/module-{a..g}.md v2）。
> 数据源版本：`data/syllabus.js` v2.0。

## 合并决策记录（阶段1 v2 新增建议 → 处理结果）

| 模块 | 建议 | 处理 | 说明 |
|---|---|---|---|
| A | 过拟合/欠拟合大模型形态（L1 ⭐4） | ✅ 即 a2 | 检索证实（美团二面/技术栈17），已在矩阵 |
| A | 混合架构与 Enc-Dec 复兴 2025-2026（L4 ⭐3） | 🔀 并入 a13 内容 | 作为 Decoder-only 趋势题的追问延伸 |
| A | 「什么是大模型」无真实面经原题 | 📌 保留 a1 | 定位为 L1 教学设计开篇，报告已如实标注 |
| B | 训练范式开场直觉题（L1 ⭐4） | ✅ 即 b1 | 已在矩阵 |
| B | 灾难性遗忘×数据配比 | ✅ 即 b5（L2） | 定位为应用陷阱更贴合 |
| B | GRPO/RLVR（L4 ⭐4） | ✅ 即 b10 | 腾讯混元/阿里/美团三份面经证实 |
| C | 复杂 Prompt 体系设计（L4 ⭐4） | ✅ 即 c10 | 中英双侧坐实（版本化/评测驱动） |
| C | 幻觉分层防御体系（L4 ⭐4） | ✅ 即 c11 | 高级岗追问链实证 |
| C | 评测驱动 Prompt 迭代（L3→L4 ⭐4） | 🔀 并入 c10 内容 | 与提示词治理同链 |
| D | 企业级数据管线（L4 ⭐4） | ✅ 即 d11 | 已在矩阵 |
| D | RAG 权限治理 ACL/密级/审计（L4 ⭐4） | 🔀 并入 d11 内容 | 数据治理同链 |
| D | Agentic RAG/GraphRAG ⭐3→⭐4 | ✅ 采纳 | d10 星级校准为 ⭐4（见 syllabus.js） |
| E | Agent/Chatbot/Workflow 谱系（L1 ⭐4） | 🔀 并入 e1 内容 | E 已达 10 点，谱系对比作为 e1 主体 |
| E | 多 Agent 平台架构（L4 ⭐4）/评测治理（L4 ⭐4） | ✅ 即 e9/e10 | 网易面经+LangSmith 等证实 |
| F | 推理慢且贵直觉题（L1 ⭐3） | ✅ 即 f1 | 已在矩阵 |
| F | 全链路成本体系（L4 ⭐4） | ✅ 即 f9 | 已在矩阵 |
| F | 可观测性 ⭐3→⭐4 | ✅ 采纳 | f10 校准为 ⭐4（补 2025-2026 工具栈证据） |
| G | 分步答题框架/权衡表达信号 | ✅ 并入 g3/g4/g7 | 权衡表达确认为资深考察信号；「出题考别人」定位为 L4 自测机制（app.js 内置面板） |

星级 v2 校准：d10 3→4、f10 3→4；其余继承 v1。

## 层级分布

| 层级 | 点数 | 定位 | 晋升条件 |
|---|---|---|---|
| L1 筑基 | 13 | 建立直觉，零术语门槛 | 本级全完成 + Boss 战 ≥80% |
| L2 应用 | 23 | 场景演练，学会使用 | 同上 |
| L3 原理 | 23 | 机制推导与选型依据 | 同上 |
| L4 专家 | 15 | 架构师权衡与前沿 | 全部完成 + 终极 Boss |

## 模块A 深度学习与 Transformer 基础（14 点）

| ID | 层级 | 标题 | 一句话定义 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|---|
| a1-what-is-llm | L1 | 什么是大模型（LLM） | 读过互联网的接龙机器 | ⭐4 | 牛客·基础题/小林coding | 无 |
| a2-how-models-learn | L1 | 模型怎么学的（训练/过拟合直觉） | 刷题调旋钮，背死=过拟合 | ⭐4 | 技术栈17/美团二面 | a1 |
| a3-transformer-intuition | L1 | Transformer 直觉版 | 注意力环顾全句+几十层流水线 | ⭐5 | 牛客·常考100道 | a1 |
| a4-tokenization-basics | L2 | 分词与 token | token=计费与窗口的计量单位 | ⭐3 | 内置知识 | a1 |
| a5-embedding-basics | L2 | Embedding 初体验 | 语义坐标，越近越相似 | ⭐4 | 小林笔记 | a1 |
| a6-model-family-basics | L2 | 主流模型家族速览与选型 | GPT 会写/BERT 会读/T5 先懂后写 | ⭐5 | 牛客·Decoder-only | a3 |
| a7-self-attention-qkv | L3 | Self-Attention 与 QKV 推导 | Q 查 K、加权 V、√d 缩放 | ⭐5 | 牛客·Transformer | a3 |
| a8-multi-head-attention | L3 | Multi-Head Attention 原理 | 多头各学一种关系再融合 | ⭐5 | 知乎·手撕合集 | a7 |
| a9-positional-encoding-rope | L3 | 位置编码与 RoPE | 旋转 Q/K 携带相对位置 | ⭐4 | 小林笔记/知乎 | a7 |
| a10-layer-vs-batch-norm | L3 | LayerNorm vs BatchNorm | 统计方向决定命运 | ⭐4 | CSDN·面试题33 | a3 |
| a11-residual-norm | L3 | 残差连接与 Pre/Post-LN | 恒等通道防梯度消失 | ⭐3 | 知乎·归一化总结 | a10 |
| a12-moe-experts | L3 | MoE 混合专家原理 | Router 选 Top-K，总参大激活小 | ⭐4 | 小林笔记·MoE | a8 |
| a13-architecture-trends | L4 | 架构演进趋势 | Decoder-only 四点论证+混合架构前沿 | ⭐5 | 牛客·Decoder-only | a6 |
| a14-attention-optimization | L4 | 注意力优化与长上下文 | 三路优化+外推技术族 | ⭐4 | 知乎·MHA+KV | a7 |

## 模块B 训练与对齐（11 点）

| ID | 层级 | 标题 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| b1-pretraining-basics | L1 | 预训练是什么：三段成长故事 | ⭐4 | 知乎·训练范式专章 | a1 |
| b2-alignment-basics | L1 | 模型怎么变听话：SFT 与对齐故事版 | ⭐4 | 牛客·RLHF 八股 | b1 |
| b3-sft-data-practice | L2 | SFT 数据怎么造 | ⭐4 | GitHub·SFT 专章 | b2 |
| b4-lora-practice | L2 | LoRA 上手：一张卡调大模型 | ⭐5 | 知乎/掘金·LoRA 面经 | b2 |
| b5-sft-pitfalls | L2 | 微调数据陷阱与灾难性遗忘 | ⭐3 | 知乎·SFT 延伸 | b3 |
| b6-rlhf-three-stages | L3 | RLHF 三阶段与奖励建模 | ⭐5 | 牛客/知乎·118题 | b2 |
| b7-ppo-vs-dpo | L3 | PPO vs DPO 原理对比 | ⭐5 | 牛客·校招专项 | b6 |
| b8-lora-principle | L3 | LoRA 低秩分解原理与参数账 | ⭐5 | 知乎/掘金 | b4 |
| b9-distributed-training | L3 | 分布式训练原理 | ⭐4 | 知乎·118题（五） | b1 |
| b10-rlvr-grpo | L4 | 对齐前沿：RLVR/GRPO | ⭐4 | 牛客·DeepSeek-R1 面经 | b7 |
| b11-training-cost-tradeoff | L4 | 训练成本权衡决策账 | ⭐4 | 知乎/卡码·第3题 | b4 |

## 模块C Prompt 工程与 LLM API 应用（11 点）

| ID | 层级 | 标题 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| c1-prompt-basics | L1 | 把话说清楚（提示词直觉） | ⭐5 | 牛客·提示词题单 | 无 |
| c2-hallucination-basics | L1 | 幻觉直觉版 | ⭐5 | 小林面试笔记 | a1 |
| c3-prompt-five-elements | L2 | 结构化 Prompt 五件套实操 | ⭐5 | 牛客/面试鸭 | c1 |
| c4-decoding-params-practice | L2 | 解码参数实操 | ⭐4 | 小林 coding | c1 |
| c5-structured-output-practice | L2 | 结构化输出三道关 | ⭐3 | 内置知识 | c4 |
| c6-context-management-practice | L2 | 多轮对话与上下文管理 | ⭐3 | 内置+TACL 2024 | c4 |
| c7-cot-principle | L3 | CoT 为什么有效 | ⭐5 | 内置（常考） | c1 |
| c8-hallucination-mechanism | L3 | 幻觉机理 | ⭐5 | 小林/知乎 | c2 |
| c9-sampling-math | L3 | 采样机制的数学 | ⭐4 | 小林 coding | c4 |
| c10-prompt-system-design | L4 | 复杂 Prompt 体系设计 | ⭐4 | 牛客（进阶） | c3 |
| c11-hallucination-defense | L4 | 幻觉分层防御体系 | ⭐4 | 知乎·幻觉面经 | c8 |

## 模块D RAG 检索增强（11 点）

| ID | 层级 | 标题 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| d1-rag-intuition | L1 | 开卷考试：RAG 直觉版 | ⭐5 | 卡码笔记 | c1 |
| d2-finetune-intuition | L1 | 微调是什么：培训班类比 | ⭐3 | 卡码·第3题 | b2 |
| d3-rag-mvp | L2 | RAG 最小可用版 | ⭐5 | 卡码/小林 | d1 |
| d4-chunking-practice | L2 | 切分与元数据实操 | ⭐4 | 知乎·字节真题 | d3 |
| d5-vector-db-practice | L2 | 向量库与混合检索实操 | ⭐4 | 面试鸭/腾讯云 | a5, d3 |
| d6-rag-vs-finetune-vs-longctx | L2 | 三方选型 | ⭐5 | 种子锚点 | d3, d2 |
| d7-ann-principle | L3 | ANN 与 HNSW/IVF 原理 | ⭐4 | 面试鸭/腾讯云 | d5 |
| d8-rerank-principle | L3 | Bi vs Cross-Encoder | ⭐4 | 掘金/卡码 | d5 |
| d9-rag-evaluation | L3 | RAG 评估与忠实度 | ⭐3 | 知乎·阿里二面 | d3 |
| d10-graphrag-advanced | L4 | GraphRAG 与高级 RAG | ⭐4 | 卡码·第26/27题 | d8 |
| d11-enterprise-rag-data | L4 | 企业级数据管线与权限治理 | ⭐4 | 知乎·腾讯真题 | d4 |

## 模块E Agent 智能体（10 点）

| ID | 层级 | 标题 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| e1-agent-basics | L1 | Agent 是什么 | ⭐4 | 牛客·全攻略 | a1 |
| e2-tool-calling-basics | L1 | 工具调用直觉：点餐小票 | ⭐4 | 小林面试笔记 | e1 |
| e3-react-practice | L2 | ReAct 循环实操 | ⭐5 | 牛客·Top50 | e1 |
| e4-function-calling-practice | L2 | Function Calling 实操 | ⭐5 | 小林/牛客 | e2 |
| e5-tool-error-practice | L2 | 异常与死循环防护实操 | ⭐4 | 牛客·Top50 | e4 |
| e6-mcp-practice | L2 | MCP 实操 | ⭐4 | 腾讯云 | e4 |
| e7-memory-mechanism | L3 | 记忆机制原理 | ⭐4 | 知乎·字节真题 | e1 |
| e8-react-mechanism | L3 | ReAct 机制与失败模式 | ⭐3 | 牛客·Top50 | e3 |
| e9-multi-agent-platform | L4 | 多 Agent 平台架构 | ⭐4 | 知乎·工业界总结 | e3 |
| e10-agent-eval-governance | L4 | Agent 评测与生产治理 | ⭐4 | 阿里云·宝典 | e8 |

## 模块F 推理部署与 MLOps（10 点）

| ID | 层级 | 标题 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| f1-slow-inference-basics | L1 | 为什么跑不快：逐字接龙 | ⭐4 | 小林·解码策略 | a3 |
| f2-gpu-memory-basics | L1 | 显存：AI 酒店的房间账 | ⭐3 | 知乎·显存估算 | a1 |
| f3-quantization-practice | L2 | 量化认知与选型 | ⭐4 | 小林/知乎 | f2 |
| f4-vllm-practice | L2 | 推理服务化认知 | ⭐4 | 牛客·VLLM | f1 |
| f5-injection-defense-practice | L2 | 注入防护实操 | ⭐4 | 知乎·阿里二面 | c1 |
| f6-kv-cache-pagedattention | L3 | KV Cache 与 PagedAttention | ⭐5 | 牛客·阿里云一面 | f1 |
| f7-quantization-principle | L3 | 量化原理 GPTQ/AWQ | ⭐4 | 小林/知乎 | f3 |
| f8-memory-planning | L3 | 显存估算与容量规划 | ⭐4 | 知乎/阿里云 | f2, f6 |
| f9-cost-optimization-system | L4 | 全链路成本优化体系 | ⭐4 | 牛客·路由题面 | f4 |
| f10-observability-system | L4 | 可观测性体系 | ⭐4 | CSDN/阿里云/LangSmith | c4 |

## 模块G 综合架构与面试实战（7 点）

| ID | 层级 | 标题 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| g1-star-narrative | L2 | STAR 法与证据链 | ⭐4 | CSDN·STAR | 无 |
| g2-interview-strategy | L2 | 临场策略与反问 | ⭐3 | GitHub·reverse-interview | g1 |
| g3-knowledge-qa-skeleton | L3 | 知识库设计答题骨架 | ⭐5 | 知乎·腾讯真题 | d3, e5 |
| g4-system-design-template | L3 | 系统设计六步法 | ⭐3 | 牛客·回答要领 | g3 |
| g5-knowledge-qa-full | L4 | 终极架构题：知识库全案 | ⭐5 | 知乎·腾讯真题 | g3, d11 |
| g6-agent-system-full | L4 | 终极架构题：Agent 全案 | ⭐4 | 知乎·工业界总结 | g4, e9 |
| g7-architect-expression | L4 | 架构师的表达与出题 | ⭐3 | 牛客·回答要领 | g5 |

## 汇总核对

- 总点数 **74**（60–90 ✓）
- 层级：L1 13 ｜ L2 23 ｜ L3 23 ｜ L4 15（每级 ≥10 ✓）
- 模块区间：A14✓ B11✓ C11✓ D11✓ E10✓ F10✓ G7✓
- 种子锚点 18/18 全覆盖（跨层拆分：直觉版低层级 + 机制/架构版高层级，知识联系互链）
