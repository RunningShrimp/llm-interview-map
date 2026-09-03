/* 大纲数据 — LLM 应用开发面试学习地图
 * 注意：本文件为 UMD 风格，浏览器与 Node(validate.js) 均可加载。
 * 星级与来源由阶段1 检索校准后于阶段1.5 定稿更新。
 */
(function (g) {
  "use strict";
  g.SYLLABUS = {
    version: "1.1-final",
    updatedAt: "2026-09-02",
    siteName: "LLM 应用开发面试学习地图",
    quizPassScore: 4,
    modules: [
      {
        id: "A",
        name: "深度学习与 Transformer 基础",
        icon: "🧱",
        color: "#4f6ef7",
        tagline: "看懂大模型的『骨架』：注意力、归一化与三大架构家族",
        points: [
          { id: "a1-transformer-architecture", num: "A1", title: "Transformer 整体架构", stars: 5, source: "牛客网·大模型常考面试题100道", deps: [], oneLiner: "完全基于注意力机制的序列建模架构，可并行训练，是大模型的地基" },
          { id: "a2-self-attention-qkv", num: "A2", title: "Self-Attention 与 QKV", stars: 5, source: "牛客网·LLM面试题：Transformer", deps: ["a1-transformer-architecture"], oneLiner: "每个词用 Query 查询 Key、加权求和 Value，实现全句互相关联" },
          { id: "a3-multi-head-attention", num: "A3", title: "Multi-Head Attention 多头注意力", stars: 5, source: "牛客网·大模型常考面试题100道 / 知乎·LLM手撕代码合集", deps: ["a2-self-attention-qkv"], oneLiner: "把注意力拆成多组并行视角，分别捕捉不同类型的关系" },
          { id: "a4-positional-encoding", num: "A4", title: "位置编码（正弦/可学习/RoPE）", stars: 4, source: "小林笔记·位置编码 / 知乎·必会的位置编码", deps: ["a1-transformer-architecture"], oneLiner: "给并行处理注入词序信息的机制，RoPE 是当前主流方案" },
          { id: "a5-layer-vs-batch-norm", num: "A5", title: "LayerNorm vs BatchNorm", stars: 4, source: "CSDN·面试题33 LN vs BN / 知乎·归一化方法总结", deps: ["a1-transformer-architecture"], oneLiner: "两种归一化方式：LayerNorm 按样本归一，适合变长序列" },
          { id: "a6-residual-norm", num: "A6", title: "残差连接与 Pre-LN/Post-LN", stars: 3, source: "知乎·归一化方法总结（延伸考点）", deps: ["a1-transformer-architecture", "a5-layer-vs-batch-norm"], oneLiner: "跨层安全通道防止梯度消失；归一化位置影响训练稳定性" },
          { id: "a7-moe-mixture-of-experts", num: "A7", title: "MoE 混合专家（Router/Top-K/负载均衡）", stars: 4, source: "小林笔记·MoE（检索核实）", deps: ["a1-transformer-architecture"], oneLiner: "路由网络只为每个 token 激活 Top-K 个专家 FFN，总参数大而激活参数少" },
          { id: "a8-tokenization-embedding", num: "A8", title: "分词（BPE）与 Embedding", stars: 3, source: "未经外部检索（内置知识）", deps: [], oneLiner: "文本变 token、token 变向量的入口环节，决定模型能读什么" },
          { id: "a9-model-family", num: "A9", title: "Encoder-only / Decoder-only / Encoder-Decoder", stars: 5, source: "牛客网·为什么大模型几乎都是 Decoder-only", deps: ["a1-transformer-architecture"], oneLiner: "BERT、GPT、T5 三大架构家族各自的适用场景" },
          { id: "a10-attention-optimization", num: "A10", title: "注意力复杂度与优化方向", stars: 4, source: "知乎·MHA+KV Cache / GitHub·大模型基础必考题107题", deps: ["a2-self-attention-qkv"], oneLiner: "O(n²) 复杂度是瓶颈，稀疏/线性注意力与 IO 优化是解法" }
        ]
      },
      {
        id: "B",
        name: "训练与对齐",
        icon: "🎯",
        color: "#8b5cf6",
        tagline: "大模型如何从『会说话』到『听话好用』：SFT、RLHF 与高效微调",
        points: [
          { id: "b1-training-paradigms", num: "B1", title: "训练范式全景：预训练→SFT→对齐", stars: 4, source: "知乎·大模型面试118题（训练范式专章）", deps: ["a9-model-family"], oneLiner: "大模型先通识、后听话的三段式成长路线" },
          { id: "b2-sft-instruction-tuning", num: "B2", title: "SFT 指令微调与数据构造", stars: 4, source: "GitHub·大模型面试仓库 SFT 专章（检索核实）", deps: ["b1-training-paradigms"], oneLiner: "用指令-回答数据教模型听懂人话，数据质量大于数量" },
          { id: "b3-rlhf-three-stages", num: "B3", title: "RLHF 三阶段流程", stars: 5, source: "牛客网·RLHF 八股总结 / 知乎·RLHF 与对齐面试118题", deps: ["b1-training-paradigms"], oneLiner: "SFT→训练奖励模型→强化学习优化，让模型对齐人类偏好" },
          { id: "b4-ppo-vs-dpo", num: "B4", title: "PPO 与 DPO 对比", stars: 5, source: "牛客网·26届校招 PPO vs DPO 专项 / 知乎·秋招必考题", deps: ["b3-rlhf-three-stages"], oneLiner: "经典强化学习对齐 vs 免奖励模型的直接偏好优化" },
          { id: "b5-lora-qlora", num: "B5", title: "LoRA/QLoRA 原理", stars: 5, source: "知乎/掘金/CSDN·LoRA 专项面经", deps: ["b1-training-paradigms"], oneLiner: "冻结原模型、只训练低秩小矩阵的低成本微调法" },
          { id: "b6-peft-family", num: "B6", title: "PEFT 家族对比（Adapter/Prefix/P-tuning/LoRA）", stars: 3, source: "相邻检索命中（专项检索超时，见 research/module-b.md）", deps: ["b5-lora-qlora"], oneLiner: "各类只训一小部分参数的微调方案与取舍" },
          { id: "b7-grpo-rlvr", num: "B7", title: "GRPO 与推理模型对齐（RLVR）", stars: 4, source: "牛客网·DeepSeek-R1 相关面经（检索核实）", deps: ["b3-rlhf-three-stages", "b4-ppo-vs-dpo"], oneLiner: "组相对策略优化：组内奖励归一化替代 Critic，推理模型对齐主流算法" },
          { id: "b8-evaluation-benchmarks", num: "B8", title: "模型评测（Benchmark/人工评估/LLM-as-Judge）", stars: 3, source: "面试鸭 / 小林面试笔记·模型评测专项", deps: ["b1-training-paradigms"], oneLiner: "如何科学给模型打分：自动基准、人评、模型当裁判" },
          { id: "b9-distributed-training", num: "B9", title: "分布式训练基础（DP/TP/PP、DeepSpeed）", stars: 4, source: "知乎·大模型面试118题（五）：分布式训练 / CSDN·面试题53", deps: ["b1-training-paradigms"], oneLiner: "单卡装不下大模型时，如何把训练切到多卡多机" }
        ]
      },
      {
        id: "C",
        name: "Prompt 工程与 LLM API 应用",
        icon: "💬",
        color: "#06b6d4",
        tagline: "不动模型也能改变模型：提示词、思维链与 API 实战",
        points: [
          { id: "c1-prompt-fundamentals", num: "C1", title: "Prompt 基础与结构化写法", stars: 5, source: "牛客网·官方提示词工程题单 / 面试鸭 Prompt 题库", deps: [], oneLiner: "用角色+任务+约束+示例稳定操控模型输出" },
          { id: "c2-chain-of-thought", num: "C2", title: "思维链 CoT 与推理增强", stars: 5, source: "内置知识（旁证：面试鸭题库列 CoT 为常考）", deps: ["c1-prompt-fundamentals"], oneLiner: "让模型先写思考过程再给答案，提升复杂推理准确率" },
          { id: "c3-hallucination", num: "C3", title: "幻觉成因与缓解", stars: 5, source: "小林面试笔记·幻觉 / 知乎·幻觉面经", deps: ["c1-prompt-fundamentals"], oneLiner: "模型一本正经胡说八道的机制根源与工程缓解手段" },
          { id: "c4-llm-api-practice", num: "C4", title: "LLM API 实务（参数/流式/限流重试/成本）", stars: 4, source: "小林 coding·采样参数 / 前端&AI 工程化面试指南", deps: ["c1-prompt-fundamentals"], oneLiner: "temperature、top_p、流式输出、限流重试与成本核算" },
          { id: "c5-structured-output", num: "C5", title: "结构化输出与 JSON Mode", stars: 3, source: "未经外部检索（内置知识）", deps: ["c4-llm-api-practice"], oneLiner: "让模型稳定输出可被程序解析的结构化数据" },
          { id: "c6-long-context", num: "C6", title: "长上下文与 lost in the middle", stars: 3, source: "未经外部检索（内置知识；论文锚点 Lost in the Middle, TACL 2024）", deps: ["c4-llm-api-practice"], oneLiner: "上下文窗口很大不等于都能用好，中间信息容易被忽略" }
        ]
      },
      {
        id: "D",
        name: "RAG 检索增强",
        icon: "📚",
        color: "#10b981",
        tagline: "给模型配一个『外接图书馆』：检索、重排与开卷考试",
        points: [
          { id: "d1-rag-pipeline", num: "D1", title: "RAG 总体流程", stars: 5, source: "卡码笔记·RAG 大厂面试题汇总 / 小林面试笔记·RAG", deps: ["c1-prompt-fundamentals"], oneLiner: "先检索知识库再让模型开卷作答：索引→检索→生成" },
          { id: "d2-chunking-strategies", num: "D2", title: "文档解析与切分策略", stars: 4, source: "知乎·RAG面试通关指南 / 知乎·字节面试真题 Chunk 切分", deps: ["d1-rag-pipeline"], oneLiner: "把长文档切成合适的知识块，是检索质量的第一关" },
          { id: "d3-embedding-vector-db", num: "D3", title: "Embedding 与向量数据库", stars: 4, source: "面试鸭·HNSW vs IVF / 腾讯云·一文讲透 IVF/HNSW/PQ", deps: ["d1-rag-pipeline"], oneLiner: "语义向量化 + 近似最近邻索引（HNSW/IVF）支撑相似检索" },
          { id: "d4-hybrid-retrieval-rerank", num: "D4", title: "混合检索与重排", stars: 4, source: "卡码笔记·RAG 题单 / 掘金·Rerank 重排序全面介绍", deps: ["d3-embedding-vector-db"], oneLiner: "关键词+向量双路召回，再用 Rerank 模型精排" },
          { id: "d5-rag-vs-finetune-vs-longctx", num: "D5", title: "RAG vs 微调 vs 长上下文选型", stars: 5, source: "卡码笔记·第3题 / 知乎·851 道大模型面试题整理", deps: ["d1-rag-pipeline", "b5-lora-qlora"], oneLiner: "三种给模型注入知识路线的成本/时效/能力对比" },
          { id: "d6-rag-evaluation", num: "D6", title: "RAG 评估（忠实度/相关性/RAGAS）", stars: 3, source: "知乎·阿里大模型二面 RAGAS / 小林面试笔记·评估", deps: ["d1-rag-pipeline"], oneLiner: "用检索命中率与答案忠实度等指标量化 RAG 质量" },
          { id: "d7-advanced-rag", num: "D7", title: "高级 RAG（Self-RAG/CRAG/GraphRAG/多跳）", stars: 3, source: "卡码笔记·第26/27题（Agentic RAG / GraphRAG）", deps: ["d4-hybrid-retrieval-rerank"], oneLiner: "让 RAG 学会自我反思、纠错与结构化检索的进阶架构" },
          { id: "d8-rag-troubleshooting", num: "D8", title: "RAG 常见问题与调优", stars: 4, source: "卡码笔记·第22/23题 / 知乎·RAG 夺命10连问", deps: ["d4-hybrid-retrieval-rerank"], oneLiner: "检索不准、答案不全、表格失效等典型问题的排查套路" }
        ]
      },
      {
        id: "E",
        name: "Agent 智能体",
        icon: "🤖",
        color: "#f59e0b",
        tagline: "让模型从『答题者』变成『干活者』：ReAct、工具与记忆",
        points: [
          { id: "e1-agent-anatomy", num: "E1", title: "Agent 核心架构（规划/记忆/工具）", stars: 4, source: "牛客网·大模型 Agent 面试全攻略", deps: ["c4-llm-api-practice"], oneLiner: "LLM 当大脑 + 规划、记忆、工具三件套构成智能体" },
          { id: "e2-react-loop", num: "E2", title: "ReAct 循环", stars: 5, source: "牛客网·AI Agent 面试 Top50 必刷题（第1题）", deps: ["e1-agent-anatomy"], oneLiner: "思考→行动→观察交替进行，Agent 的基本运行节拍" },
          { id: "e3-function-calling", num: "E3", title: "Function Calling 与参数校验", stars: 5, source: "小林面试笔记·Function Calling / 牛客网·Top50", deps: ["c5-structured-output", "e1-agent-anatomy"], oneLiner: "模型按 JSON Schema 生成工具调用参数并校验执行" },
          { id: "e4-tool-error-loops", num: "E4", title: "工具调用异常与死循环防护", stars: 4, source: "牛客网·AI Agent 面试 Top50 必刷题", deps: ["e3-function-calling"], oneLiner: "工具失败、重试风暴、死循环的成因与工程防护" },
          { id: "e5-agent-memory", num: "E5", title: "Agent 记忆系统", stars: 4, source: "知乎·字节面试题 Agent 记忆系统", deps: ["e1-agent-anatomy", "d3-embedding-vector-db"], oneLiner: "短期上下文 + 长期向量记忆 + 总结压缩的分层记忆设计" },
          { id: "e6-planning-reflection", num: "E6", title: "规划与反思（Plan-and-Execute/Reflection）", stars: 3, source: "多来源间接佐证 + 内置知识", deps: ["e2-react-loop"], oneLiner: "先拆解任务再执行、执行后自我复盘修正" },
          { id: "e7-multi-agent", num: "E7", title: "多智能体协作", stars: 3, source: "多智能体专项检索超时（内置知识）", deps: ["e2-react-loop"], oneLiner: "多个角色化 Agent 分工协作（编排/路由/讨论）的模式" },
          { id: "e8-mcp-tools", num: "E8", title: "MCP 协议与工具生态", stars: 4, source: "腾讯云·你项目里接了 MCP / 知乎·FC、MCP、A2A 面经", deps: ["e3-function-calling"], oneLiner: "统一模型与工具连接标准的协议，工具生态的 USB-C" },
          { id: "e9-agent-frameworks", num: "E9", title: "Agent 开发框架对比（LangChain/AutoGen/LlamaIndex）", stars: 3, source: "小林面试笔记·Agent 开发框架", deps: ["e1-agent-anatomy"], oneLiner: "主流框架的定位、抽象与选型考量" }
        ]
      },
      {
        id: "F",
        name: "推理部署与 MLOps",
        icon: "🚀",
        color: "#ef4444",
        tagline: "把模型跑起来、跑得快、跑得稳：推理优化与安全合规",
        points: [
          { id: "f1-inference-basics", num: "F1", title: "自回归解码与采样策略", stars: 4, source: "CSDN·温度/Top-P/Top-K 面试问答 / 小林面试笔记·解码策略", deps: ["a2-self-attention-qkv"], oneLiner: "逐 token 生成 + greedy/beam/top-p 采样决定输出风格" },
          { id: "f2-kv-cache-pagedattention", num: "F2", title: "KV Cache 与 PagedAttention", stars: 5, source: "牛客网·阿里云 Agent 算法一面原题 / 知乎·KV Cache 的原理", deps: ["f1-inference-basics"], oneLiner: "缓存历史 Key/Value 加速生成；分页管理显存提升吞吐" },
          { id: "f3-quantization", num: "F3", title: "模型量化（INT8/INT4、GPTQ/AWQ）", stars: 4, source: "小林面试笔记·量化 / 知乎·大模型面试118题（九）", deps: ["f1-inference-basics"], oneLiner: "用更低精度存储权重，省显存换速度、几乎不掉点" },
          { id: "f4-inference-frameworks", num: "F4", title: "推理框架对比（vLLM/TensorRT-LLM/llama.cpp）", stars: 4, source: "牛客网·VLLM 必知必会 / 知乎·主流推理部署框架梳理", deps: ["f2-kv-cache-pagedattention"], oneLiner: "主流推理引擎的优化手段与选型" },
          { id: "f5-gpu-capacity-planning", num: "F5", title: "显存估算与 GPU 选型", stars: 4, source: "知乎·训练与推理显存估算（频次很高）/ 阿里云官方文档", deps: ["f1-inference-basics"], oneLiner: "权重+KV Cache+激活的显存账本与吞吐/延迟权衡" },
          { id: "f6-prompt-injection-defense", num: "F6", title: "Prompt 注入与越狱防护", stars: 4, source: "知乎·阿里大模型二面 Prompt 注入 / golangstar·LLM 面试系列", deps: ["c1-prompt-fundamentals"], oneLiner: "恶意指令劫持模型行为的攻击面与多层防御" },
          { id: "f7-llm-app-observability", num: "F7", title: "LLM 应用可观测性与线上评估", stars: 3, source: "CSDN·1000道算法工程师面试题（19）/ 阿里云·AI Agent 全栈开发面试宝典", deps: ["c4-llm-api-practice"], oneLiner: "日志/指标/回归测试/A-B 实验，让 LLM 应用可运维" },
          { id: "f8-llm-security-compliance", num: "F8", title: "内容安全与合规（输出过滤/红队）", stars: 3, source: "安全内参·提示词注入检测 / Prompt Engineering Guide 中文版（相邻来源）", deps: ["f6-prompt-injection-defense"], oneLiner: "输入输出双向过滤、红队测试与合规底线" },
          { id: "f9-cost-optimization", num: "F9", title: "成本优化（缓存/批处理/模型路由）", stars: 3, source: "牛客网·Agent 语义缓存/模型路由题面（检索核实）", deps: ["f4-inference-frameworks"], oneLiner: "语义缓存、批处理、大小模型分流等降本手段" }
        ]
      },
      {
        id: "G",
        name: "综合架构与面试实战",
        icon: "🏆",
        color: "#ec4899",
        tagline: "终极关卡：系统设计大题与把项目讲出彩",
        points: [
          { id: "g1-knowledge-qa-system", num: "G1", title: "企业知识库问答系统设计", stars: 5, source: "知乎·腾讯面试真题 RAG 知识库构建 / 掘金·万字详解面试题库 RAG 篇", deps: ["d8-rag-troubleshooting", "e4-tool-error-loops"], oneLiner: "RAG 全链路综合大题：需求→架构→数据→评估→上线" },
          { id: "g2-agent-system-design", num: "G2", title: "Agent 应用系统设计", stars: 4, source: "知乎·Agent 面试总结（工业界干货版）/ 牛客网·AI-Agent 面试题汇总", deps: ["e6-planning-reflection", "f7-llm-app-observability"], oneLiner: "客服/数据分析 Agent 设计题的全链路拆解" },
          { id: "g3-system-design-template", num: "G3", title: "系统设计答题模板", stars: 3, source: "牛客网·系统设计题目的回答要领", deps: ["g1-knowledge-qa-system"], oneLiner: "功能/数据/性能/成本/安全五维论证框架" },
          { id: "g4-star-project-narrative", num: "G4", title: "项目深挖与 STAR 法表达", stars: 4, source: "CSDN·使用 STAR 法则表现自己", deps: [], oneLiner: "用情境-任务-行动-结果讲好项目故事，扛住追问" },
          { id: "g5-interview-strategy", num: "G5", title: "高频追问、反问与临场策略", stars: 3, source: "GitHub·reverse-interview-zh", deps: ["g4-star-project-narrative"], oneLiner: "应对深挖式追问、合理的反问与临场心态" }
        ]
      }
    ]
  };
})(typeof window !== "undefined" ? window : globalThis);
