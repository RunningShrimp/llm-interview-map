# 草稿大纲（阶段0 产出，共 56 点）

> 说明：种子锚点为题库高频必考点；其余为基于牛客网面经、小林coding 大模型面试题、《AI Agent 面试 Top50 必刷题》等公开面试资料的高频考点初选。星级与来源将由阶段1 检索子 Agent 校准；最终大纲以阶段1.5 定稿为准。

## 模块A 深度学习与 Transformer 基础（10 点）

| ID | 标题 | 一句话定义 | 星级 | 前置依赖 | 来源 |
|---|---|---|---|---|---|
| a1-transformer-architecture | Transformer 整体架构 | 完全基于注意力机制的序列建模架构，可并行训练，是大模型的地基 | ⭐5 | 无 | 种子锚点 |
| a2-self-attention-qkv | Self-Attention 与 QKV | 每个词用 Query 查询 Key、加权求和 Value，实现"全句互相关联" | ⭐5 | a1 | 种子锚点 |
| a3-multi-head-attention | Multi-Head Attention 多头注意力 | 把注意力拆成多组并行的"视角"，分别捕捉不同类型的关系 | ⭐4 | a2 | 初选（面试高频） |
| a4-positional-encoding | 位置编码（正弦/可学习/RoPE） | 给并行处理注入"词序"信息的机制，RoPE 是主流方案 | ⭐4 | a1 | 初选（面试高频） |
| a5-layer-vs-batch-norm | LayerNorm vs BatchNorm | 两种归一化方式：LayerNorm 按样本归一，适合变长序列 | ⭐4 | a1 | 种子锚点 |
| a6-residual-norm | 残差连接与 Pre-LN/Post-LN | 跨层"安全通道"防止梯度消失；归一化位置影响训练稳定性 | ⭐4 | a1, a5 | 初选（面试高频） |
| a7-ffn-activation | FFN 与激活函数（GeLU/SwiGLU） | 每层中注意力之后的"知识加工车间"，激活函数决定表达力 | ⭐3 | a1 | 初选 |
| a8-tokenization-embedding | 分词（BPE）与 Embedding | 文本变 token、token 变向量的入口环节，决定模型能"读"什么 | ⭐3 | 无 | 初选 |
| a9-model-family | Encoder-only / Decoder-only / Encoder-Decoder | 三大架构家族：BERT、GPT、T5 各自的适用场景 | ⭐4 | a1 | 初选（面试高频） |
| a10-attention-optimization | 注意力复杂度与优化方向 | O(n²) 复杂度是瓶颈，稀疏/线性注意力与 IO 优化是解法 | ⭐3 | a2 | 初选 |

## 模块B 训练与对齐（9 点）

| ID | 标题 | 一句话定义 | 星级 | 前置依赖 | 来源 |
|---|---|---|---|---|---|
| b1-training-paradigms | 训练范式全景：预训练→SFT→对齐 | 大模型"先通识、后听话"的三段式成长路线 | ⭐4 | a9 | 初选（面试高频） |
| b2-sft-instruction-tuning | SFT 指令微调与数据构造 | 用"指令-回答"数据教模型听懂人话，数据质量 > 数量 | ⭐4 | b1 | 种子锚点 |
| b3-rlhf-three-stages | RLHF 三阶段流程 | SFT → 训练奖励模型 → 强化学习优化，让模型对齐人类偏好 | ⭐5 | b1 | 种子锚点 |
| b4-ppo-vs-dpo | PPO 与 DPO 对比 | 经典强化学习对齐 vs 免奖励模型的直接偏好优化 | ⭐4 | b3 | 初选（面试高频） |
| b5-lora-qlora | LoRA/QLoRA 原理 | 冻结原模型、只训练低秩小矩阵的低成本微调法 | ⭐5 | b1 | 种子锚点 |
| b6-peft-family | PEFT 家族对比（Adapter/Prefix/P-tuning/LoRA） | 各类"只训一小部分参数"的微调方案与取舍 | ⭐3 | b5 | 初选 |
| b7-catastrophic-forgetting | 灾难性遗忘与缓解 | 微调新知识时忘掉旧能力的现象与对策 | ⭐3 | b2 | 初选 |
| b8-evaluation-benchmarks | 模型评测（Benchmark/人工评估/LLM-as-Judge） | 如何科学地给模型打分：自动基准、人评、模型当裁判 | ⭐3 | b1 | 初选 |
| b9-distributed-training | 分布式训练基础（DP/TP/PP、DeepSpeed） | 单卡装不下大模型时，如何把训练切到多卡多机 | ⭐4 | b1 | 初选（面试高频） |

## 模块C Prompt 工程与 LLM API 应用（6 点）

| ID | 标题 | 一句话定义 | 星级 | 前置依赖 | 来源 |
|---|---|---|---|---|---|
| c1-prompt-fundamentals | Prompt 基础与结构化写法 | 用角色+任务+约束+示例（few-shot）稳定操控模型输出 | ⭐5 | 无 | 种子锚点（Prompt 基础） |
| c2-chain-of-thought | 思维链 CoT 与推理增强 | 让模型"先写思考过程再给答案"以提升复杂推理准确率 | ⭐5 | c1 | 种子锚点（思维链 CoT） |
| c3-hallucination | 幻觉成因与缓解 | 模型一本正经胡说八道的机制根源与工程缓解手段 | ⭐5 | c1 | 种子锚点 |
| c4-llm-api-practice | LLM API 实务（参数/流式/限流重试/成本） | temperature、top_p、流式输出、限流重试与成本核算 | ⭐4 | c1 | 初选（面试高频） |
| c5-structured-output | 结构化输出与 JSON Mode | 让模型稳定输出可被程序解析的结构化数据 | ⭐3 | c4 | 初选 |
| c6-long-context | 长上下文与"lost in the middle" | 上下文窗口很大≠都能用好，中间信息容易被忽略 | ⭐3 | c4 | 初选 |

## 模块D RAG 检索增强（8 点）

| ID | 标题 | 一句话定义 | 星级 | 前置依赖 | 来源 |
|---|---|---|---|---|---|
| d1-rag-pipeline | RAG 总体流程 | 先检索知识库再让模型"开卷作答"：索引→检索→生成 | ⭐5 | c1 | 种子锚点 |
| d2-chunking-strategies | 文档解析与切分策略 | 把长文档切成合适的"知识块"，是检索质量的第一关 | ⭐4 | d1 | 初选（面试高频） |
| d3-embedding-vector-db | Embedding 与向量数据库 | 语义向量化 + 近似最近邻索引（HNSW/IVF）支撑相似检索 | ⭐4 | d1 | 初选（面试高频） |
| d4-hybrid-retrieval-rerank | 混合检索与重排 | 关键词+向量双路召回，再用 Rerank 模型精排 | ⭐4 | d3 | 初选（面试高频） |
| d5-rag-vs-finetune-vs-longctx | RAG vs 微调 vs 长上下文选型 | 三种"给模型注入知识"路线的成本/时效/能力对比 | ⭐5 | d1, b5 | 种子锚点 |
| d6-rag-evaluation | RAG 评估（忠实度/相关性/RAGAS） | 用检索命中率与答案忠实度等指标量化 RAG 质量 | ⭐3 | d1 | 初选 |
| d7-advanced-rag | 高级 RAG（Self-RAG/CRAG/GraphRAG/多跳） | 让 RAG 学会自我反思、纠错与结构化检索的进阶架构 | ⭐3 | d4 | 初选 |
| d8-rag-troubleshooting | RAG 常见问题与调优 | 检索不准、答案不全、表格失效等典型问题的排查套路 | ⭐3 | d4 | 初选 |

## 模块E Agent 智能体（9 点）

| ID | 标题 | 一句话定义 | 星级 | 前置依赖 | 来源 |
|---|---|---|---|---|---|
| e1-agent-anatomy | Agent 核心架构（规划/记忆/工具） | LLM 当大脑 + 规划、记忆、工具三件套构成智能体 | ⭐4 | c4 | 初选（面试高频） |
| e2-react-loop | ReAct 循环 | "思考→行动→观察"交替进行，Agent 的基本运行节拍 | ⭐5 | e1 | 种子锚点 |
| e3-function-calling | Function Calling 与参数校验 | 模型按 JSON Schema 生成工具调用参数并校验执行 | ⭐5 | c5, e1 | 种子锚点 |
| e4-tool-error-loops | 工具调用异常与死循环防护 | 工具失败、重试风暴、死循环的成因与工程防护 | ⭐4 | e3 | 种子锚点 |
| e5-agent-memory | Agent 记忆系统 | 短期上下文 + 长期向量记忆 + 总结压缩的分层记忆设计 | ⭐4 | e1, d3 | 初选（面试高频） |
| e6-planning-reflection | 规划与反思（Plan-and-Execute/Reflection） | 先拆解任务再执行、执行后自我复盘修正 | ⭐3 | e2 | 初选 |
| e7-multi-agent | 多智能体协作 | 多个角色化 Agent 分工协作（编排/路由/讨论）的模式 | ⭐3 | e2 | 初选 |
| e8-mcp-tools | MCP 协议与工具生态 | 统一"模型↔工具"连接标准的协议，工具生态的 USB-C | ⭐3 | e3 | 初选（新晋高频） |
| e9-agent-frameworks | Agent 开发框架对比（LangChain/AutoGen/LlamaIndex） | 主流框架的定位、抽象与选型考量 | ⭐3 | e1 | 初选 |

## 模块F 推理部署与 MLOps（9 点）

| ID | 标题 | 一句话定义 | 星级 | 前置依赖 | 来源 |
|---|---|---|---|---|---|
| f1-inference-basics | 自回归解码与采样策略 | 逐 token 生成 + greedy/beam/top-p 采样决定输出风格 | ⭐4 | a2 | 初选（面试高频） |
| f2-kv-cache-pagedattention | KV Cache 与 PagedAttention | 缓存历史 Key/Value 加速生成；分页管理显存提升吞吐 | ⭐4 | f1 | 种子锚点 |
| f3-quantization | 模型量化（INT8/INT4、GPTQ/AWQ） | 用更低精度存储权重，省显存换速度、几乎不掉点 | ⭐4 | f1 | 种子锚点 |
| f4-inference-frameworks | 推理框架对比（vLLM/TensorRT-LLM/llama.cpp） | 主流推理引擎的优化手段与选型 | ⭐4 | f2 | 初选（面试高频） |
| f5-gpu-capacity-planning | 显存估算与 GPU 选型 | 权重+KV Cache+激活的显存账本与吞吐/延迟权衡 | ⭐4 | f1 | 初选（面试高频） |
| f6-prompt-injection-defense | Prompt 注入与越狱防护 | 恶意指令劫持模型行为的攻击面与多层防御 | ⭐4 | c1 | 种子锚点 |
| f7-llm-app-observability | LLM 应用可观测性与线上评估 | 日志/指标/回归测试/A-B 实验，让 LLM 应用可运维 | ⭐3 | c4 | 初选 |
| f8-llm-security-compliance | 内容安全与合规（输出过滤/红队） | 输入输出双向过滤、红队测试与合规底线 | ⭐3 | f6 | 初选 |
| f9-cost-optimization | 成本优化（缓存/批处理/模型路由） | 语义缓存、批处理、大小模型分流等降本手段 | ⭐3 | f4 | 初选 |

## 模块G 综合架构与面试实战（5 点）

| ID | 标题 | 一句话定义 | 星级 | 前置依赖 | 来源 |
|---|---|---|---|---|---|
| g1-knowledge-qa-system | 企业知识库问答系统设计 | RAG 全链路综合大题：需求→架构→数据→评估→上线 | ⭐5 | d8, e4 | 种子锚点 |
| g2-agent-system-design | Agent 应用系统设计 | 客服/数据分析 Agent 设计题的全链路拆解 | ⭐4 | e6, f7 | 初选 |
| g3-system-design-template | 系统设计答题模板 | 功能/数据/性能/成本/安全五维论证框架 | ⭐3 | g1 | 初选 |
| g4-star-project-narrative | 项目深挖与 STAR 法表达 | 用情境-任务-行动-结果讲好项目故事，扛住追问 | ⭐4 | 无 | 种子锚点 |
| g5-interview-strategy | 高频追问、反问与临场策略 | 应对"深挖式"追问、合理的反问与临场心态 | ⭐3 | g4 | 初选 |

## 汇总

| 模块 | 点数 | 区间要求 | 达标 |
|---|---|---|---|
| A | 10 | 8–10 | ✓ |
| B | 9 | 7–9 | ✓ |
| C | 6 | 5–7 | ✓ |
| D | 8 | 6–8 | ✓ |
| E | 9 | 7–9 | ✓ |
| F | 9 | 7–9 | ✓ |
| G | 5 | 4–6 | ✓ |
| **总计** | **56** | 44–60 | ✓ |

种子锚点覆盖核对：A1✓ A2✓ A5✓ ｜ B3✓ B5✓ B2✓ ｜ C1✓ C2✓ C3✓ ｜ D1✓ D5✓ ｜ E2✓ E3✓ E4✓ ｜ F2✓ F3✓ F6✓ ｜ G1✓ G4✓（共 18/18）
