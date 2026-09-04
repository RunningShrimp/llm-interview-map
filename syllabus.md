# 最终大纲 v3（八大模块 × 四层级，共 83 点）

> v3 增量：新增模块H（2026 前沿趋势 8 点，🆕）；C 模块升级为 Context Engineering；RLVR/GRPO 迁入 H；来源类型按 题库/社区/官方/论文 标注。数据源：data/syllabus.js v3.0。

| 模块 | L1 | L2 | L3 | L4 | 合计 | 区间 |
|---|---|---|---|---|---|---|
| A 深度学习与 Transformer 基础 | 3 | 3 | 6 | 2 | 14 | 10-14 ✓ |
| B 训练与对齐 | 2 | 3 | 4 | 2 | 11 | 10-13 ✓ |
| C Prompt 工程与 Context Engineering | 2 | 4 | 3 | 2 | 11 | 8-11 ✓ |
| D RAG 检索增强 | 2 | 4 | 3 | 2 | 11 | 9-13 ✓ |
| E Agent 智能体 | 2 | 4 | 2 | 2 | 10 | 9-13 ✓ |
| F 推理部署与 MLOps | 2 | 3 | 3 | 3 | 11 | 9-12 ✓ |
| G 综合架构与面试实战 | 0 | 2 | 2 | 3 | 7 | 6-9 ✓ |
| H 2026 前沿趋势 | 0 | 0 | 1 | 7 | 8 | 4-8 ✓ |
| **合计** | 13 | 23 | 24 | 23 | **83** | 65-95 ✓ |

🆕 前沿点数：11（配额 ≥10 ✓）


## 模块A 深度学习与 Transformer 基础（14 点）

| ID | 层级 | 标题 | 星级/🆕 | 来源 | 前置 |
|---|---|---|---|---|---|
| a1-what-is-llm | L1 | 什么是大模型（LLM） | ⭐4 | 牛客·大模型基础题/小林coding | 无 |
| a2-how-models-learn | L1 | 模型是怎么学的（训练与过拟合直觉） | ⭐3 | 内置知识（基础题） | A1 |
| a3-transformer-intuition | L1 | Transformer 直觉版：AI 怎么读句子 | ⭐5 | 牛客·大模型常考100道 | A1 |
| a4-tokenization-basics | L2 | 分词与 token：计费与上下文的计量单位 | ⭐3 | 内置知识（应用岗基础） | A1 |
| a5-embedding-basics | L2 | Embedding 初体验：语义坐标 | ⭐4 | 小林笔记（检索核实） | A1 |
| a6-model-family-basics | L2 | 主流模型家族速览与选型 | ⭐5 | 牛客·为什么大模型几乎都是 Decoder-only | A3 |
| a7-self-attention-qkv | L3 | Self-Attention 与 QKV 推导 | ⭐5 | 牛客·LLM面试题：Transformer | A3 |
| a8-multi-head-attention | L3 | Multi-Head Attention 原理 | ⭐5 | 知乎·LLM手撕代码合集 | A7 |
| a9-positional-encoding-rope | L3 | 位置编码与 RoPE 旋转机制 | ⭐4 | 小林笔记·位置编码/知乎 | A7 |
| a10-layer-vs-batch-norm | L3 | LayerNorm vs BatchNorm 与 RMSNorm | ⭐4 | CSDN·面试题33/知乎·归一化总结 | A3 |
| a11-residual-norm | L3 | 残差连接与 Pre/Post-LN | ⭐3 | 知乎·归一化方法总结（延伸） | A10 |
| a12-moe-experts | L3 | MoE 混合专家原理 | ⭐4 | 小林笔记·MoE（检索核实） | A8 |
| a13-architecture-trends | L4 | 架构演进趋势：Decoder-only 为何胜出 | ⭐5 | 牛客·Decoder-only 专题/掘金 | A6 |
| a14-attention-optimization | L4 | 注意力优化与长上下文前沿 | ⭐4 | 知乎·MHA+KV Cache/GitHub·107题 | A7 |

## 模块B 训练与对齐（11 点）

| ID | 层级 | 标题 | 星级/🆕 | 来源 | 前置 |
|---|---|---|---|---|---|
| b1-pretraining-basics | L1 | 预训练是什么：AI 的三段成长故事 | ⭐4 | 知乎·训练范式专章 | A1 |
| b2-alignment-basics | L1 | 模型怎么变听话：SFT 与对齐的故事版 | ⭐4 | 牛客·RLHF 八股总结 | B1 |
| b3-sft-data-practice | L2 | SFT 数据怎么造：来源、清洗与配比 | ⭐4 | GitHub·大模型面试仓库 SFT 专章 | B2 |
| b4-lora-practice | L2 | LoRA 上手：一张卡调大模型 | ⭐5 | 知乎/掘金/CSDN·LoRA 专项面经 | B2 |
| b5-sft-pitfalls | L2 | 微调数据陷阱与灾难性遗忘对策 | ⭐3 | 知乎·SFT 延伸追问 | B3 |
| b6-rlhf-three-stages | L3 | RLHF 三阶段与奖励建模 | ⭐5 | 牛客·RLHF 八股总结/知乎·118题 | B2 |
| b7-ppo-vs-dpo | L3 | PPO vs DPO 原理对比 | ⭐5 | 牛客·26届校招专项/知乎·秋招必考 | B6 |
| b8-lora-principle | L3 | LoRA 低秩分解原理与参数账 | ⭐5 | 知乎/掘金·LoRA 面经 | B4 |
| b9-distributed-training | L3 | 分布式训练原理（DP/TP/PP/ZeRO） | ⭐4 | 知乎·118题（五）/CSDN·面试题53 | B1 |
| b10-synthetic-data | L4 | 合成数据与模型自进化前沿 | 🆕 ⭐3 | HF Blog / CSDN·27届备战（方向级面试出现中） | B3 |
| b11-training-cost-tradeoff | L4 | 训练成本权衡：架构师的微调决策账 | ⭐4 | 知乎·118题（综合）/卡码笔记·第3题 | B4 |

## 模块C Prompt 工程与 Context Engineering（11 点）

| ID | 层级 | 标题 | 星级/🆕 | 来源 | 前置 |
|---|---|---|---|---|---|
| c1-prompt-basics | L1 | 和 AI 对话的第一课：把话说清楚 | ⭐5 | 牛客·官方提示词题单/面试鸭 | 无 |
| c2-hallucination-basics | L1 | 幻觉直觉版：AI 为什么一本正经胡说 | ⭐5 | 小林面试笔记·幻觉 | A1 |
| c3-prompt-five-elements | L2 | 结构化 Prompt 五件套实操 | ⭐5 | 牛客·提示词题单/面试鸭 | C1 |
| c4-decoding-params-practice | L2 | 解码参数实操：temperature/top_p 怎么调 | ⭐4 | 小林 coding·采样参数/CSDN | C1 |
| c5-structured-output-practice | L2 | 结构化输出与 JSON Mode 三道关 | ⭐3 | 内置知识（应用岗常问） | C4 |
| c6-context-management-practice | L2 | 多轮对话与上下文管理实操 | ⭐3 | 内置知识（论文锚点 TACL 2024） | C4 |
| c7-cot-principle | L3 | CoT 为什么有效：测试时计算换准确率 | ⭐5 | 内置知识（CoT 常考） | C1 |
| c8-hallucination-mechanism | L3 | 幻觉机理：似真不等于为真 | ⭐5 | 小林面试笔记/知乎·幻觉面经 | C2 |
| c9-sampling-math | L3 | 采样机制的数学：温度与核采样 | ⭐4 | 小林 coding·采样参数 | C4 |
| c10-prompt-system-design | L4 | Context Engineering 体系设计 | 🆕 ⭐4 | Anthropic 官方工程博客（v3 检索证实） | C3 |
| c11-hallucination-defense | L4 | 幻觉治理的分层防御体系 | ⭐4 | 知乎·幻觉面经（综合） | C8 |

## 模块D RAG 检索增强（11 点）

| ID | 层级 | 标题 | 星级/🆕 | 来源 | 前置 |
|---|---|---|---|---|---|
| d1-rag-intuition | L1 | 开卷考试：RAG 直觉版 | ⭐5 | 卡码笔记·RAG 题单 | C1 |
| d2-finetune-intuition | L1 | 微调是什么：送 AI 去培训班 | ⭐3 | 卡码笔记·第3题 | B2 |
| d3-rag-mvp | L2 | RAG 最小可用版：搭一条完整链路 | ⭐5 | 卡码笔记·RAG 题单/小林面试笔记 | D1 |
| d4-chunking-practice | L2 | 切分与元数据实操：块大小/重叠/标签 | ⭐4 | 知乎·RAG通关指南/字节真题 | D3 |
| d5-vector-db-practice | L2 | 向量库与混合检索实操 | ⭐4 | 面试鸭·HNSW vs IVF/腾讯云 | A5,D3 |
| d6-rag-vs-finetune-vs-longctx | L2 | RAG vs 微调 vs 长上下文选型 | ⭐5 | 种子锚点·卡码笔记第3题 | D3,D2 |
| d7-ann-principle | L3 | 向量检索原理：ANN 与 HNSW/IVF | ⭐4 | 面试鸭/腾讯云·IVF/HNSW/PQ | D5 |
| d8-rerank-principle | L3 | Rerank 原理：Bi vs Cross-Encoder | ⭐4 | 掘金·Rerank 全面介绍/卡码笔记 | D5 |
| d9-rag-evaluation | L3 | RAG 评估体系与忠实度计算 | ⭐3 | 知乎·阿里二面 RAGAS/小林笔记 | D3 |
| d10-graphrag-advanced | L4 | GraphRAG 与高级 RAG 架构 | ⭐4 | 卡码笔记·第26/27题 | D8 |
| d11-enterprise-rag-data | L4 | 企业级 RAG 数据管线与权限治理 | ⭐4 | 知乎·腾讯真题（延伸） | D4 |

## 模块E Agent 智能体（10 点）

| ID | 层级 | 标题 | 星级/🆕 | 来源 | 前置 |
|---|---|---|---|---|---|
| e1-agent-basics | L1 | Agent 是什么：给 AI 装上手手脚 | ⭐4 | 牛客·大模型 Agent 面试全攻略 | A1 |
| e2-tool-calling-basics | L1 | 工具调用的直觉：点餐小票 | ⭐4 | 小林面试笔记·Function Calling | E1 |
| e3-react-practice | L2 | ReAct 循环实操：边想边做 | ⭐5 | 牛客·AI Agent Top50（第1题） | E1 |
| e4-function-calling-practice | L2 | Function Calling 与参数校验实操 | ⭐5 | 小林面试笔记/牛客·Top50 | E2 |
| e5-tool-error-practice | L2 | 工具调用异常与死循环防护实操 | ⭐4 | 牛客·AI Agent Top50 | E4 |
| e6-mcp-practice | L2 | MCP 实操：工具即插即用 | ⭐4 | 腾讯云·你项目里接了 MCP | E4 |
| e7-memory-mechanism | L3 | Agent 记忆机制原理 | ⭐4 | 知乎·字节面试题记忆系统 | E1 |
| e8-react-mechanism | L3 | ReAct 机制与失败模式分析 | ⭐3 | 牛客·Top50（延伸） | E3 |
| e9-multi-agent-platform | L4 | 多 Agent 平台架构 | ⭐4 | 知乎·Agent 工业界总结 | E3 |
| e10-agent-eval-governance | L4 | Agent 评测与生产治理体系 | ⭐4 | 阿里云·AI Agent 全栈开发面试宝典 | E8 |

## 模块F 推理部署与 MLOps（11 点）

| ID | 层级 | 标题 | 星级/🆕 | 来源 | 前置 |
|---|---|---|---|---|---|
| f1-slow-inference-basics | L1 | 为什么大模型跑不快：逐字接龙的代价 | ⭐4 | 小林面试笔记·解码策略 | A3 |
| f2-gpu-memory-basics | L1 | 显存是什么：AI 酒店的房间账 | ⭐3 | 知乎·显存估算专文 | A1 |
| f3-quantization-practice | L2 | 模型量化认知与选型 | ⭐4 | 小林面试笔记·量化/知乎·118题（九） | F2 |
| f4-vllm-practice | L2 | 推理服务化认知：vLLM 部署一条龙 | ⭐4 | 牛客·VLLM 必知必会 | F1 |
| f5-injection-defense-practice | L2 | Prompt 注入防护实操 | ⭐4 | 知乎·阿里二面注入/golangstar | C1 |
| f6-kv-cache-pagedattention | L3 | KV Cache 与 PagedAttention 原理 | ⭐5 | 牛客·阿里云 Agent 一面原题/知乎 | F1 |
| f7-quantization-principle | L3 | 量化原理：GPTQ/AWQ 怎么压 | ⭐4 | 小林笔记/知乎·118题（九） | F3 |
| f8-memory-planning | L3 | 显存估算原理与容量规划 | ⭐4 | 知乎·显存估算/阿里云官方文档 | F2,F6 |
| f9-cost-optimization-system | L4 | 全链路成本优化体系 | ⭐4 | 牛客·语义缓存/模型路由题面 | F4 |
| f10-observability-system | L4 | LLM 应用可观测性体系 | ⭐4 | CSDN·1000道（19）/阿里云·宝典/LangSmith 官方 | C4 |
| f11-edge-inference | L4 | 端侧与边缘推理（AI PC/手机 NPU） | 🆕 ⭐3 | HF Blog / Qualcomm 社区（趋势观察） | F3 |

## 模块G 综合架构与面试实战（7 点）

| ID | 层级 | 标题 | 星级/🆕 | 来源 | 前置 |
|---|---|---|---|---|---|
| g1-star-narrative | L2 | STAR 法：把项目讲成有证据链的故事 | ⭐4 | CSDN·使用 STAR 法则表现自己 | 无 |
| g2-interview-strategy | L2 | 面试临场策略与反问 | ⭐3 | GitHub·reverse-interview-zh | G1 |
| g3-knowledge-qa-skeleton | L3 | 企业知识库设计的答题骨架 | ⭐5 | 知乎·腾讯面试真题/掘金·万字题库 | D3,E5 |
| g4-system-design-template | L3 | 系统设计六步法与 LLM 特有维度 | ⭐3 | 牛客·回答要领 | G3 |
| g5-knowledge-qa-full | L4 | 终极架构题：企业知识库问答全案 | ⭐5 | 知乎·腾讯面试真题 | G3,D11 |
| g6-agent-system-full | L4 | 终极架构题：Agent 系统全案 | ⭐4 | 知乎·Agent 工业界总结 | G4,E9 |
| g7-architect-expression | L4 | 架构师的表达：权衡论证与出题能力 | ⭐3 | 牛客·回答要领（综合） | G5 |

## 模块H 2026 前沿趋势（8 点）

| ID | 层级 | 标题 | 星级/🆕 | 来源 | 前置 |
|---|---|---|---|---|---|
| h1-test-time-scaling | L3 | 推理模型与测试时扩展（R1/o 系列） | 🆕 ⭐4 | DeepSeek-R1 论文 / OpenAI 官方（面试出现中） | C7,B6 |
| h2-rlvr-grpo | L4 | RLVR 与 GRPO 对齐前沿 | 🆕 ⭐4 | DeepSeek-R1 论文 / 牛客·面经（面试出现中） | B7 |
| h3-context-engineering-practice | L4 | Context Engineering 前沿实践 | 🆕 ⭐4 | Anthropic 官方工程博客（面试出现中） | C10,E7 |
| h4-agentic-rag | L4 | Agentic RAG 与自主检索智能体 | 🆕 ⭐4 | Hugging Face Blog / 卡码笔记（面试出现中） | D8,E3 |
| h5-a2a-protocol | L4 | A2A 协议与多 Agent 互操作 | 🆕 ⭐4 | A2A 官方（Linux Foundation）/小林·卡码·知乎118题（面试出现中） | E9,E6 |
| h6-ai-coding-agents | L4 | AI Coding 智能体（Claude Code/Cursor 类） | 🆕 ⭐4 | Anthropic/Cursor 官方 / 牛客·面灵AI 2026（面试出现中） | E3,E9 |
| h7-computer-use-agents | L4 | 计算机使用与多模态 Agent | 🆕 ⭐3 | Anthropic / OpenAI Operator 官方（趋势观察） | E3,E4 |
| h8-agent-sandbox-reliability | L4 | Agent 沙箱与可靠执行 | 🆕 ⭐3 | E2B / AutoGen 沙箱实践（趋势观察） | E5,E10 |
