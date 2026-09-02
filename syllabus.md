# 最终大纲（阶段1.5 定稿，共 56 点）

> 定稿说明：本大纲由阶段0 草稿（56 点）与阶段1 七个检索子 Agent 的核实结果合并而成。
> 星级与来源均经外部检索校准（其中 50/56 点有可查来源，6 点标注"未经外部检索"由内置知识保底）。
> 校准明细见 `research/module-{a..g}.md`；数据源版本：`data/syllabus.js` v1.1-final。

## 合并决策记录（阶段1 建议新增清单 → 处理结果）

| 模块 | 建议新增 | 处理 | 理由 |
|---|---|---|---|
| A | MoE 混合专家 ⭐4 | ✅ 替换 A7（原 FFN 与激活函数 ⭐3，FFN 基础并入 MoE 页与 A1 页） | A 已达区间上限 10；MoE 星级更高、来源更硬（小林笔记专文+DeepSeek 语境） |
| A | 长度外推（PI/NTK/YaRN）⭐3 | 🔀 并入 A4 内容 | 与位置编码强关联，作 A4 延伸考点 |
| A | Self-Attention vs Cross-Attention ⭐3 | 🔀 并入 A2 内容 | A2 的直接延伸对比 |
| B | GRPO 与推理模型对齐 ⭐4 | ✅ 替换 B7（原灾难性遗忘 ⭐3，其缓解手段并入 B2 内容） | B 已达上限 9；GRPO 为 2025–2026 新晋必考 |
| B | 训练显存估算 ⭐4 | ❌ 合并至 F5 | 与 F5（显存估算）重复，F5 内容覆盖训练侧估算 |
| B | Continue Pretrain ⭐3 | ❌ 不合并 | B 已达上限；频率相对较低 |
| C | Function Calling ⭐4 | ❌ 已存在（E3 种子锚点） | 重复考点，按规则保留种子锚点位置 |
| C | 多轮对话管理与记忆 ⭐3 | 🔀 并入 C6 内容 | 与 C6（上下文管理）/E5（记忆系统）重叠 |
| D | 查询理解与改写 ⭐4 | 🔀 并入 D8 内容（"检索效果差怎么优化"的第一招） | D 已达上限 8；改写是 D8 调优链路的核心环节 |
| D | 多轮对话 RAG ⭐3 | 🔀 并入 D7/D8 内容 | 多轮 Query 改写属 D7/D8 范畴 |
| E | Agent 上下文工程 ⭐4 | 🔀 并入 E5 内容 | 与 E5（记忆系统）核心重叠 |
| E | A2A 协议 ⭐3 | 🔀 并入 E8 内容（FC vs MCP vs A2A 对比题） | 常以 E8 的对比追问形式出现 |
| F | MQA/GQA/MLA ⭐4 | 🔀 并入 F2 内容 | KV Cache 压缩是 F2 最高频追问 |
| F | FlashAttention ⭐4 | 🔀 并入 F4 内容（与 PagedAttention 的区别为常考对比） | 计算层优化属推理框架范畴 |
| G | LLM 应用效果评测 ⭐4 | 🔀 并入 G2/G3 内容（系统设计必含评估环节） | 与 D6/B8/F7 三点重叠，G 级作为综合应用 |
| G | 生产级 LLM 应用治理 ⭐3 | 🔀 并入 G2 内容 | 与 F7 重叠，G 级作为综合应用 |

星级校准变动：A3 4→5、A6 4→3、A9 4→5、A10 3→4、B4 4→5、D8 3→4、E8 3→4、F2 4→5；其余维持。

## 模块A 深度学习与 Transformer 基础（10 点）

| ID | 标题 | 一句话定义 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| a1-transformer-architecture | Transformer 整体架构 | 完全基于注意力机制的序列建模架构，可并行训练，是大模型的地基 | ⭐5 | 牛客网·大模型常考面试题100道 | 无 |
| a2-self-attention-qkv | Self-Attention 与 QKV | 每个词用 Query 查询 Key、加权求和 Value，实现全句互相关联 | ⭐5 | 牛客网·LLM面试题：Transformer | A1 |
| a3-multi-head-attention | Multi-Head Attention 多头注意力 | 把注意力拆成多组并行视角，分别捕捉不同类型的关系 | ⭐5 | 牛客网·100道 / 知乎·LLM手撕代码合集 | A2 |
| a4-positional-encoding | 位置编码（正弦/可学习/RoPE） | 给并行处理注入词序信息的机制，RoPE 是当前主流方案 | ⭐4 | 小林笔记·位置编码 / 知乎·必会的位置编码 | A1 |
| a5-layer-vs-batch-norm | LayerNorm vs BatchNorm | 两种归一化方式：LayerNorm 按样本归一，适合变长序列 | ⭐4 | CSDN·面试题33 / 知乎·归一化方法总结 | A1 |
| a6-residual-norm | 残差连接与 Pre-LN/Post-LN | 跨层安全通道防止梯度消失；归一化位置影响训练稳定性 | ⭐3 | 知乎·归一化方法总结（延伸考点） | A1, A5 |
| a7-moe-mixture-of-experts | MoE 混合专家（Router/Top-K/负载均衡） | 路由网络只为每个 token 激活 Top-K 个专家 FFN，总参数大而激活参数少 | ⭐4 | 小林笔记·MoE（检索核实） | A1 |
| a8-tokenization-embedding | 分词（BPE）与 Embedding | 文本变 token、token 变向量的入口环节，决定模型能读什么 | ⭐3 | 未经外部检索（内置知识） | 无 |
| a9-model-family | Encoder-only / Decoder-only / Encoder-Decoder | BERT、GPT、T5 三大架构家族各自的适用场景 | ⭐5 | 牛客网·为什么大模型几乎都是 Decoder-only | A1 |
| a10-attention-optimization | 注意力复杂度与优化方向 | O(n²) 复杂度是瓶颈，稀疏/线性注意力与 IO 优化是解法 | ⭐4 | 知乎·MHA+KV Cache / GitHub·必考题107题 | A2 |

## 模块B 训练与对齐（9 点）

| ID | 标题 | 一句话定义 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| b1-training-paradigms | 训练范式全景：预训练→SFT→对齐 | 大模型先通识、后听话的三段式成长路线 | ⭐4 | 知乎·大模型面试118题（训练范式专章） | A9 |
| b2-sft-instruction-tuning | SFT 指令微调与数据构造 | 用指令-回答数据教模型听懂人话，数据质量大于数量 | ⭐4 | GitHub·大模型面试仓库 SFT 专章 | B1 |
| b3-rlhf-three-stages | RLHF 三阶段流程 | SFT→训练奖励模型→强化学习优化，让模型对齐人类偏好 | ⭐5 | 牛客网·RLHF 八股总结 / 知乎·118题 | B1 |
| b4-ppo-vs-dpo | PPO 与 DPO 对比 | 经典强化学习对齐 vs 免奖励模型的直接偏好优化 | ⭐5 | 牛客网·26届校招专项 / 知乎·秋招必考题 | B3 |
| b5-lora-qlora | LoRA/QLoRA 原理 | 冻结原模型、只训练低秩小矩阵的低成本微调法 | ⭐5 | 知乎/掘金/CSDN·LoRA 专项面经 | B1 |
| b6-peft-family | PEFT 家族对比（Adapter/Prefix/P-tuning/LoRA） | 各类只训一小部分参数的微调方案与取舍 | ⭐3 | 相邻检索命中（专项检索超时） | B5 |
| b7-grpo-rlvr | GRPO 与推理模型对齐（RLVR） | 组相对策略优化：组内奖励归一化替代 Critic，推理模型对齐主流算法 | ⭐4 | 牛客网·DeepSeek-R1 相关面经 | B3, B4 |
| b8-evaluation-benchmarks | 模型评测（Benchmark/人工评估/LLM-as-Judge） | 如何科学给模型打分：自动基准、人评、模型当裁判 | ⭐3 | 面试鸭 / 小林面试笔记·模型评测专项 | B1 |
| b9-distributed-training | 分布式训练基础（DP/TP/PP、DeepSpeed） | 单卡装不下大模型时，如何把训练切到多卡多机 | ⭐4 | 知乎·118题（五） / CSDN·面试题53 | B1 |

## 模块C Prompt 工程与 LLM API 应用（6 点）

| ID | 标题 | 一句话定义 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| c1-prompt-fundamentals | Prompt 基础与结构化写法 | 用角色+任务+约束+示例稳定操控模型输出 | ⭐5 | 牛客网·官方提示词工程题单 / 面试鸭 | 无 |
| c2-chain-of-thought | 思维链 CoT 与推理增强 | 让模型先写思考过程再给答案，提升复杂推理准确率 | ⭐5 | 内置知识（旁证：面试鸭题库） | C1 |
| c3-hallucination | 幻觉成因与缓解 | 模型一本正经胡说八道的机制根源与工程缓解手段 | ⭐5 | 小林面试笔记·幻觉 / 知乎·幻觉面经 | C1 |
| c4-llm-api-practice | LLM API 实务（参数/流式/限流重试/成本） | temperature、top_p、流式输出、限流重试与成本核算 | ⭐4 | 小林 coding·采样参数 / 前端&AI 工程化面试指南 | C1 |
| c5-structured-output | 结构化输出与 JSON Mode | 让模型稳定输出可被程序解析的结构化数据 | ⭐3 | 未经外部检索（内置知识） | C4 |
| c6-long-context | 长上下文与 lost in the middle | 上下文窗口很大不等于都能用好，中间信息容易被忽略 | ⭐3 | 未经外部检索（内置知识；Lost in the Middle, TACL 2024） | C4 |

## 模块D RAG 检索增强（8 点）

| ID | 标题 | 一句话定义 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| d1-rag-pipeline | RAG 总体流程 | 先检索知识库再让模型开卷作答：索引→检索→生成 | ⭐5 | 卡码笔记·RAG 大厂面试题汇总 / 小林面试笔记 | C1 |
| d2-chunking-strategies | 文档解析与切分策略 | 把长文档切成合适的知识块，是检索质量的第一关 | ⭐4 | 知乎·RAG面试通关指南 / 字节面试真题 | D1 |
| d3-embedding-vector-db | Embedding 与向量数据库 | 语义向量化 + 近似最近邻索引（HNSW/IVF）支撑相似检索 | ⭐4 | 面试鸭·HNSW vs IVF / 腾讯云·IVF/HNSW/PQ | D1 |
| d4-hybrid-retrieval-rerank | 混合检索与重排 | 关键词+向量双路召回，再用 Rerank 模型精排 | ⭐4 | 卡码笔记·RAG 题单 / 掘金·Rerank 全面介绍 | D3 |
| d5-rag-vs-finetune-vs-longctx | RAG vs 微调 vs 长上下文选型 | 三种给模型注入知识路线的成本/时效/能力对比 | ⭐5 | 卡码笔记·第3题 / 知乎·851 道面试题整理 | D1, B5 |
| d6-rag-evaluation | RAG 评估（忠实度/相关性/RAGAS） | 用检索命中率与答案忠实度等指标量化 RAG 质量 | ⭐3 | 知乎·阿里二面 RAGAS / 小林面试笔记·评估 | D1 |
| d7-advanced-rag | 高级 RAG（Self-RAG/CRAG/GraphRAG/多跳） | 让 RAG 学会自我反思、纠错与结构化检索的进阶架构 | ⭐3 | 卡码笔记·第26/27题（Agentic RAG/GraphRAG） | D4 |
| d8-rag-troubleshooting | RAG 常见问题与调优 | 检索不准、答案不全、表格失效等典型问题的排查套路 | ⭐4 | 卡码笔记·第22/23题 / 知乎·RAG 夺命10连问 | D4 |

## 模块E Agent 智能体（9 点）

| ID | 标题 | 一句话定义 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| e1-agent-anatomy | Agent 核心架构（规划/记忆/工具） | LLM 当大脑 + 规划、记忆、工具三件套构成智能体 | ⭐4 | 牛客网·大模型 Agent 面试全攻略 | C4 |
| e2-react-loop | ReAct 循环 | 思考→行动→观察交替进行，Agent 的基本运行节拍 | ⭐5 | 牛客网·AI Agent 面试 Top50（第1题） | E1 |
| e3-function-calling | Function Calling 与参数校验 | 模型按 JSON Schema 生成工具调用参数并校验执行 | ⭐5 | 小林面试笔记·Function Calling / 牛客 Top50 | C5, E1 |
| e4-tool-error-loops | 工具调用异常与死循环防护 | 工具失败、重试风暴、死循环的成因与工程防护 | ⭐4 | 牛客网·AI Agent 面试 Top50 必刷题 | E3 |
| e5-agent-memory | Agent 记忆系统 | 短期上下文 + 长期向量记忆 + 总结压缩的分层记忆设计 | ⭐4 | 知乎·字节面试题 Agent 记忆系统 | E1, D3 |
| e6-planning-reflection | 规划与反思（Plan-and-Execute/Reflection） | 先拆解任务再执行、执行后自我复盘修正 | ⭐3 | 多来源间接佐证 + 内置知识 | E2 |
| e7-multi-agent | 多智能体协作 | 多个角色化 Agent 分工协作（编排/路由/讨论）的模式 | ⭐3 | 专项检索超时（内置知识） | E2 |
| e8-mcp-tools | MCP 协议与工具生态 | 统一模型与工具连接标准的协议，工具生态的 USB-C | ⭐4 | 腾讯云·你项目里接了 MCP / 知乎·FC/MCP/A2A | E3 |
| e9-agent-frameworks | Agent 开发框架对比（LangChain/AutoGen/LlamaIndex） | 主流框架的定位、抽象与选型考量 | ⭐3 | 小林面试笔记·Agent 开发框架 | E1 |

## 模块F 推理部署与 MLOps（9 点）

| ID | 标题 | 一句话定义 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| f1-inference-basics | 自回归解码与采样策略 | 逐 token 生成 + greedy/beam/top-p 采样决定输出风格 | ⭐4 | CSDN·温度/Top-P/Top-K / 小林笔记·解码策略 | A2 |
| f2-kv-cache-pagedattention | KV Cache 与 PagedAttention | 缓存历史 Key/Value 加速生成；分页管理显存提升吞吐 | ⭐5 | 牛客网·阿里云 Agent 算法一面原题 / 知乎·KV Cache 原理 | F1 |
| f3-quantization | 模型量化（INT8/INT4、GPTQ/AWQ） | 用更低精度存储权重，省显存换速度、几乎不掉点 | ⭐4 | 小林面试笔记·量化 / 知乎·118题（九） | F1 |
| f4-inference-frameworks | 推理框架对比（vLLM/TensorRT-LLM/llama.cpp） | 主流推理引擎的优化手段与选型 | ⭐4 | 牛客网·VLLM 必知必会 / 知乎·主流推理框架梳理 | F2 |
| f5-gpu-capacity-planning | 显存估算与 GPU 选型 | 权重+KV Cache+激活的显存账本与吞吐/延迟权衡 | ⭐4 | 知乎·显存估算（频次很高）/ 阿里云官方文档 | F1 |
| f6-prompt-injection-defense | Prompt 注入与越狱防护 | 恶意指令劫持模型行为的攻击面与多层防御 | ⭐4 | 知乎·阿里二面 Prompt 注入 / golangstar | C1 |
| f7-llm-app-observability | LLM 应用可观测性与线上评估 | 日志/指标/回归测试/A-B 实验，让 LLM 应用可运维 | ⭐3 | CSDN·1000道（19）/ 阿里云·Agent 全栈面试宝典 | C4 |
| f8-llm-security-compliance | 内容安全与合规（输出过滤/红队） | 输入输出双向过滤、红队测试与合规底线 | ⭐3 | 安全内参 / Prompt Engineering Guide（相邻来源） | F6 |
| f9-cost-optimization | 成本优化（缓存/批处理/模型路由） | 语义缓存、批处理、大小模型分流等降本手段 | ⭐3 | 牛客网·语义缓存/模型路由题面 | F4 |

## 模块G 综合架构与面试实战（5 点）

| ID | 标题 | 一句话定义 | 星级 | 来源 | 前置 |
|---|---|---|---|---|---|
| g1-knowledge-qa-system | 企业知识库问答系统设计 | RAG 全链路综合大题：需求→架构→数据→评估→上线 | ⭐5 | 知乎·腾讯面试真题 / 掘金·万字题库 RAG 篇 | D8, E4 |
| g2-agent-system-design | Agent 应用系统设计 | 客服/数据分析 Agent 设计题的全链路拆解 | ⭐4 | 知乎·Agent 面试总结（工业界）/ 牛客·AI-Agent 汇总 | E6, F7 |
| g3-system-design-template | 系统设计答题模板 | 功能/数据/性能/成本/安全五维论证框架 | ⭐3 | 牛客网·系统设计题目的回答要领 | G1 |
| g4-star-project-narrative | 项目深挖与 STAR 法表达 | 用情境-任务-行动-结果讲好项目故事，扛住追问 | ⭐4 | CSDN·使用 STAR 法则表现自己 | 无 |
| g5-interview-strategy | 高频追问、反问与临场策略 | 应对深挖式追问、合理的反问与临场心态 | ⭐3 | GitHub·reverse-interview-zh | G4 |

## 汇总核对

| 模块 | 点数 | 区间 | 达标 | ⭐5 点数 |
|---|---|---|---|---|
| A | 10 | 8–10 | ✓ | 4 |
| B | 9 | 7–9 | ✓ | 3 |
| C | 6 | 5–7 | ✓ | 3 |
| D | 8 | 6–8 | ✓ | 2 |
| E | 9 | 7–9 | ✓ | 2 |
| F | 9 | 7–9 | ✓ | 1 |
| G | 5 | 4–6 | ✓ | 1 |
| **总计** | **56** | 44–60 | ✓ | **16** |

种子锚点覆盖：18/18 全部保留（A1 A2 A5 ｜ B2 B3 B5 ｜ C1 C2 C3 ｜ D1 D5 ｜ E2 E3 E4 ｜ F2 F3 F6 ｜ G1 G4）
来源统计：经外部检索核实 50 点；未经外部检索（内置知识保底）6 点：a8、c2（有旁证）、c5、c6（有论文锚点）、e6（有旁证）、e7。
