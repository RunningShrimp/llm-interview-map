/* 大纲数据 v2 — 模块 × 层级矩阵（L1 筑基 → L4 专家），UMD 风格 */
(function (g) {
  "use strict";
  g.SYLLABUS = {
    version: "2.0",
    updatedAt: "2026-09-02",
    siteName: "LLM 应用开发四级晋升学习站",
    quizPassRatio: 0.8,
    xp: { visit: 10, choice: 15, scenario: 25, bossQuestion: 10, bossPass: 100 },
    titleThresholds: [0, 400, 1200, 2400],
    levels: [
      { id: "L1", name: "筑基", title: "AI 小白", color: "#10b981", icon: "🌱", desc: "建立直觉：是什么、为什么重要，零术语门槛", unlockBy: null },
      { id: "L2", name: "应用", title: "应用工程师", color: "#3b82f6", icon: "🛠️", desc: "学会使用：真实场景演练，API 与参数怎么选", unlockBy: "L1" },
      { id: "L3", name: "原理", title: "原理达人", color: "#8b5cf6", icon: "🔬", desc: "懂其所以然：机制推导、方案对比与选型依据", unlockBy: "L2" },
      { id: "L4", name: "专家", title: "面试架构师", color: "#f59e0b", icon: "🏆", desc: "架构师视角：系统设计、成本权衡、能出题考别人", unlockBy: "L3" }
    ],
    modules: [
      {
        id: "A", name: "深度学习与 Transformer 基础", icon: "🧱", color: "#4f6ef7",
        points: [
          { id: "a1-what-is-llm", num: "A1", level: "L1", title: "什么是大模型（LLM）", stars: 4, source: "牛客·大模型基础题/小林coding", deps: [], oneLiner: "一个读过几乎整个互联网、靠接龙说话的超级文字预测器" },
          { id: "a2-how-models-learn", num: "A2", level: "L1", title: "模型是怎么学的（训练与过拟合直觉）", stars: 3, source: "内置知识（基础题）", deps: ["a1-what-is-llm"], oneLiner: "训练=海量刷题改答案本，把题目背下来就是过拟合" },
          { id: "a3-transformer-intuition", num: "A3", level: "L1", title: "Transformer 直觉版：AI 怎么读句子", stars: 5, source: "牛客·大模型常考100道", deps: ["a1-what-is-llm"], oneLiner: "每个词环顾全句找相关词，几十层反复加工，位置号码牌补顺序" },
          { id: "a4-tokenization-basics", num: "A4", level: "L2", title: "分词与 token：计费与上下文的计量单位", stars: 3, source: "内置知识（应用岗基础）", deps: ["a1-what-is-llm"], oneLiner: "文本被切成词块，token 数=API 费用与窗口长度的计量单位" },
          { id: "a5-embedding-basics", num: "A5", level: "L2", title: "Embedding 初体验：语义坐标", stars: 4, source: "小林笔记（检索核实）", deps: ["a1-what-is-llm"], oneLiner: "文本变向量，意思越近坐标越近——换个说法也能搜到的底层" },
          { id: "a6-model-family-basics", num: "A6", level: "L2", title: "主流模型家族速览与选型", stars: 5, source: "牛客·为什么大模型几乎都是 Decoder-only", deps: ["a3-transformer-intuition"], oneLiner: "GPT 式会写、BERT 式会读、T5 式先懂后写——按任务选" },
          { id: "a7-self-attention-qkv", num: "A7", level: "L3", title: "Self-Attention 与 QKV 推导", stars: 5, source: "牛客·LLM面试题：Transformer", deps: ["a3-transformer-intuition"], oneLiner: "Q 查询 K 索引、加权 V、缩放 √d 防梯度消失——公式逐项拆" },
          { id: "a8-multi-head-attention", num: "A8", level: "L3", title: "Multi-Head Attention 原理", stars: 5, source: "知乎·LLM手撕代码合集", deps: ["a7-self-attention-qkv"], oneLiner: "拆 h 个低维头各学一种关系，拼接后过 W_O 融合" },
          { id: "a9-positional-encoding-rope", num: "A9", level: "L3", title: "位置编码与 RoPE 旋转机制", stars: 4, source: "小林笔记·位置编码/知乎", deps: ["a7-self-attention-qkv"], oneLiner: "正弦→可学习→RoPE：旋转 Q/K 让内积携带相对位置" },
          { id: "a10-layer-vs-batch-norm", num: "A10", level: "L3", title: "LayerNorm vs BatchNorm 与 RMSNorm", stars: 4, source: "CSDN·面试题33/知乎·归一化总结", deps: ["a3-transformer-intuition"], oneLiner: "统计方向决定命运：按样本归一适配变长序列" },
          { id: "a11-residual-norm", num: "A11", level: "L3", title: "残差连接与 Pre/Post-LN", stars: 3, source: "知乎·归一化方法总结（延伸）", deps: ["a10-layer-vs-batch-norm"], oneLiner: "恒等通道让梯度无衰减，LN 位置决定深层可训性" },
          { id: "a12-moe-experts", num: "A12", level: "L3", title: "MoE 混合专家原理", stars: 4, source: "小林笔记·MoE（检索核实）", deps: ["a8-multi-head-attention"], oneLiner: "Router 打分选 Top-K 专家：总参数大、激活参数小" },
          { id: "a13-architecture-trends", num: "A13", level: "L4", title: "架构演进趋势：Decoder-only 为何胜出", stars: 5, source: "牛客·Decoder-only 专题/掘金", deps: ["a6-model-family-basics"], oneLiner: "目标统一/信号密度/KV 契合/涌现最好——四点论证" },
          { id: "a14-attention-optimization", num: "A14", level: "L4", title: "注意力优化与长上下文前沿", stars: 4, source: "知乎·MHA+KV Cache/GitHub·107题", deps: ["a7-self-attention-qkv"], oneLiner: "O(n²) 三路优化（少算/算巧/省存）+长度外推技术族" }
        ]
      },
      {
        id: "B", name: "训练与对齐", icon: "🎯", color: "#8b5cf6",
        points: [
          { id: "b1-pretraining-basics", num: "B1", level: "L1", title: "预训练是什么：AI 的三段成长故事", stars: 4, source: "知乎·训练范式专章", deps: ["a1-what-is-llm"], oneLiner: "先狂读书→岗前培训→师傅带教，从会说话到会干活" },
          { id: "b2-alignment-basics", num: "B2", level: "L1", title: "模型怎么变听话：SFT 与对齐的故事版", stars: 4, source: "牛客·RLHF 八股总结", deps: ["b1-pretraining-basics"], oneLiner: "拿几万份问题-满分回答教格式，再让人类投票教分寸" },
          { id: "b3-sft-data-practice", num: "B3", level: "L2", title: "SFT 数据怎么造：来源、清洗与配比", stars: 4, source: "GitHub·大模型面试仓库 SFT 专章", deps: ["b2-alignment-basics"], oneLiner: "真实日志+难例+通用数据混合，质量大于数量" },
          { id: "b4-lora-practice", num: "B4", level: "L2", title: "LoRA 上手：一张卡调大模型", stars: 5, source: "知乎/掘金/CSDN·LoRA 专项面经", deps: ["b2-alignment-basics"], oneLiner: "冻结大模型只训小马甲，QLoRA 把底座压到 4bit" },
          { id: "b5-sft-pitfalls", num: "B5", level: "L2", title: "微调数据陷阱与灾难性遗忘对策", stars: 3, source: "知乎·SFT 延伸追问", deps: ["b3-sft-data-practice"], oneLiner: "全用领域数据会学傻——混通用、控学习率、留验证集" },
          { id: "b6-rlhf-three-stages", num: "B6", level: "L3", title: "RLHF 三阶段与奖励建模", stars: 5, source: "牛客·RLHF 八股总结/知乎·118题", deps: ["b2-alignment-basics"], oneLiner: "SFT 打底→人类排序训 RM→PPO 优化，KL 惩罚防刷分" },
          { id: "b7-ppo-vs-dpo", num: "B7", level: "L3", title: "PPO vs DPO 原理对比", stars: 5, source: "牛客·26届校招专项/知乎·秋招必考", deps: ["b6-rlhf-three-stages"], oneLiner: "四模型在线闭环 vs 两模型离线直优——五维取舍表" },
          { id: "b8-lora-principle", num: "B8", level: "L3", title: "LoRA 低秩分解原理与参数账", stars: 5, source: "知乎/掘金·LoRA 面经", deps: ["b4-lora-practice"], oneLiner: "ΔW=BA 低秩假设、B 零初始化、QLoRA 三件套" },
          { id: "b9-distributed-training", num: "B9", level: "L3", title: "分布式训练原理（DP/TP/PP/ZeRO）", stars: 4, source: "知乎·118题（五）/CSDN·面试题53", deps: ["b1-pretraining-basics"], oneLiner: "切数据/切算子/切层+训练状态分摊，16 字节/参数账本" },
          { id: "b10-rlvr-grpo", num: "B10", level: "L4", title: "对齐前沿：RLVR/GRPO 与推理模型", stars: 4, source: "牛客·DeepSeek-R1 相关面经", deps: ["b7-ppo-vs-dpo"], oneLiner: "组内相对优势替代 critic，可验证奖励刷出推理能力" },
          { id: "b11-training-cost-tradeoff", num: "B11", level: "L4", title: "训练成本权衡：架构师的微调决策账", stars: 4, source: "知乎·118题（综合）/卡码笔记·第3题", deps: ["b4-lora-practice"], oneLiner: "显存/数据/维护成本 vs RAG——何时训何时挂" }
        ]
      },
      {
        id: "C", name: "Prompt 工程与 LLM API 应用", icon: "💬", color: "#06b6d4",
        points: [
          { id: "c1-prompt-basics", num: "C1", level: "L1", title: "和 AI 对话的第一课：把话说清楚", stars: 5, source: "牛客·官方提示词题单/面试鸭", deps: [], oneLiner: "你是谁+做什么+边界在哪+交付长什么样+照着做" },
          { id: "c2-hallucination-basics", num: "C2", level: "L1", title: "幻觉直觉版：AI 为什么一本正经胡说", stars: 5, source: "小林面试笔记·幻觉", deps: ["a1-what-is-llm"], oneLiner: "它的目标把话说像，不是把话说对——空白处按风格补全" },
          { id: "c3-prompt-five-elements", num: "C3", level: "L2", title: "结构化 Prompt 五件套实操", stars: 5, source: "牛客·提示词题单/面试鸭", deps: ["c1-prompt-basics"], oneLiner: "角色+任务+约束+格式+示例，配评测驱动的迭代法" },
          { id: "c4-decoding-params-practice", num: "C4", level: "L2", title: "解码参数实操：temperature/top_p 怎么调", stars: 4, source: "小林 coding·采样参数/CSDN", deps: ["c1-prompt-basics"], oneLiner: "温度控随机性、top_p 控候选池——按任务选参数组合" },
          { id: "c5-structured-output-practice", num: "C5", level: "L2", title: "结构化输出与 JSON Mode 三道关", stars: 3, source: "内置知识（应用岗常问）", deps: ["c4-decoding-params-practice"], oneLiner: "提示词给 Schema→API 严格模式→代码校验带错重试" },
          { id: "c6-context-management-practice", num: "C6", level: "L2", title: "多轮对话与上下文管理实操", stars: 3, source: "内置知识（论文锚点 TACL 2024）", deps: ["c4-decoding-params-practice"], oneLiner: "近期原文+远期摘要+相关检索；关键信息放头尾" },
          { id: "c7-cot-principle", num: "C7", level: "L3", title: "CoT 为什么有效：测试时计算换准确率", stars: 5, source: "内置知识（CoT 常考）", deps: ["c1-prompt-basics"], oneLiner: "生成每个 token 都是一次计算，推理步骤=草稿纸扩容" },
          { id: "c8-hallucination-mechanism", num: "C8", level: "L3", title: "幻觉机理：似真不等于为真", stars: 5, source: "小林面试笔记/知乎·幻觉面经", deps: ["c2-hallucination-basics"], oneLiner: "下一词预测优化连贯性而非真实性，三层缓解防线" },
          { id: "c9-sampling-math", num: "C9", level: "L3", title: "采样机制的数学：温度与核采样", stars: 4, source: "小林 coding·采样参数", deps: ["c4-decoding-params-practice"], oneLiner: "温度缩放分布、top-p 截断候选池——机制与经验值" },
          { id: "c10-prompt-system-design", num: "C10", level: "L4", title: "复杂 Prompt 体系设计", stars: 4, source: "牛客·提示词题单（进阶）", deps: ["c3-prompt-five-elements"], oneLiner: "角色体系/工具协议/评测驱动——把提示词当代码治理" },
          { id: "c11-hallucination-defense", num: "C11", level: "L4", title: "幻觉治理的分层防御体系", stars: 4, source: "知乎·幻觉面经（综合）", deps: ["c8-hallucination-mechanism"], oneLiner: "事前 RAG/事中约束/事后校验/运营兜底四层纵深" }
        ]
      },
      {
        id: "D", name: "RAG 检索增强", icon: "📚", color: "#10b981",
        points: [
          { id: "d1-rag-intuition", num: "D1", level: "L1", title: "开卷考试：RAG 直觉版", stars: 5, source: "卡码笔记·RAG 题单", deps: ["c1-prompt-basics"], oneLiner: "先翻资料找到相关段落，再照着回答并注明出处" },
          { id: "d2-finetune-intuition", num: "D2", level: "L1", title: "微调是什么：送 AI 去培训班", stars: 3, source: "卡码笔记·第3题", deps: ["b2-alignment-basics"], oneLiner: "把能力练进模型本身：慢、贵，但学会就长在身上" },
          { id: "d3-rag-mvp", num: "D3", level: "L2", title: "RAG 最小可用版：搭一条完整链路", stars: 5, source: "卡码笔记·RAG 题单/小林面试笔记", deps: ["d1-rag-intuition"], oneLiner: "解析→切分→向量化→检索→引用生成的两周 MVP" },
          { id: "d4-chunking-practice", num: "D4", level: "L2", title: "切分与元数据实操：块大小/重叠/标签", stars: 4, source: "知乎·RAG通关指南/字节真题", deps: ["d3-rag-mvp"], oneLiner: "结构感知切分+15% 重叠+来源标签，检索质量第一关" },
          { id: "d5-vector-db-practice", num: "D5", level: "L2", title: "向量库与混合检索实操", stars: 4, source: "面试鸭·HNSW vs IVF/腾讯云", deps: ["a5-embedding-basics", "d3-rag-mvp"], oneLiner: "HNSW 索引+BM25 双路召回+RRF 融合的工程组合" },
          { id: "d6-rag-vs-finetune-vs-longctx", num: "D6", level: "L2", title: "RAG vs 微调 vs 长上下文选型", stars: 5, source: "种子锚点·卡码笔记第3题", deps: ["d3-rag-mvp", "d2-finetune-intuition"], oneLiner: "缺知识选 RAG、缺能力选微调、单篇深读选长文" },
          { id: "d7-ann-principle", num: "D7", level: "L3", title: "向量检索原理：ANN 与 HNSW/IVF", stars: 4, source: "面试鸭/腾讯云·IVF/HNSW/PQ", deps: ["d5-vector-db-practice"], oneLiner: "分层图跳跃 vs 聚类分桶——召回/延迟/内存三角" },
          { id: "d8-rerank-principle", num: "D8", level: "L3", title: "Rerank 原理：Bi vs Cross-Encoder", stars: 4, source: "掘金·Rerank 全面介绍/卡码笔记", deps: ["d5-vector-db-practice"], oneLiner: "联合编码捕捉词级交互所以更准——先粗后精两段式" },
          { id: "d9-rag-evaluation", num: "D9", level: "L3", title: "RAG 评估体系与忠实度计算", stars: 3, source: "知乎·阿里二面 RAGAS/小林笔记", deps: ["d3-rag-mvp"], oneLiner: "检索层 Recall/MRR+生成层忠实度/相关性，RAGAS 四件套" },
          { id: "d10-graphrag-advanced", num: "D10", level: "L4", title: "GraphRAG 与高级 RAG 架构", stars: 4, source: "卡码笔记·第26/27题", deps: ["d8-rerank-principle"], oneLiner: "自反思/纠错网关/图谱检索——RAG 的智能体化演进" },
          { id: "d11-enterprise-rag-data", num: "D11", level: "L4", title: "企业级 RAG 数据管线与权限治理", stars: 4, source: "知乎·腾讯真题（延伸）", deps: ["d4-chunking-practice"], oneLiner: "多格式接入/增量更新/密级过滤/审计——生产数据面" }
        ]
      },
      {
        id: "E", name: "Agent 智能体", icon: "🤖", color: "#f59e0b",
        points: [
          { id: "e1-agent-basics", num: "E1", level: "L1", title: "Agent 是什么：给 AI 装上手手脚", stars: 4, source: "牛客·大模型 Agent 面试全攻略", deps: ["a1-what-is-llm"], oneLiner: "聪明大脑+任务清单+笔记本+门禁卡四件套" },
          { id: "e2-tool-calling-basics", num: "E2", level: "L1", title: "工具调用的直觉：点餐小票", stars: 4, source: "小林面试笔记·Function Calling", deps: ["e1-agent-basics"], oneLiner: "AI 只负责按格式填单，程序验单后才送厨房执行" },
          { id: "e3-react-practice", num: "E3", level: "L2", title: "ReAct 循环实操：边想边做", stars: 5, source: "牛客·AI Agent Top50（第1题）", deps: ["e1-agent-basics"], oneLiner: "Thought→Action→Observation 循环，配终止与轨迹管理" },
          { id: "e4-function-calling-practice", num: "E4", level: "L2", title: "Function Calling 与参数校验实操", stars: 5, source: "小林面试笔记/牛客·Top50", deps: ["e2-tool-calling-basics"], oneLiner: "工具定义三要素+应用侧校验+错误回传自修" },
          { id: "e5-tool-error-practice", num: "E5", level: "L2", title: "工具调用异常与死循环防护实操", stars: 4, source: "牛客·AI Agent Top50", deps: ["e4-function-calling-practice"], oneLiner: "重试上限、步数/预算双阈值、指纹熔断、人工在环" },
          { id: "e6-mcp-practice", num: "E6", level: "L2", title: "MCP 实操：工具即插即用", stars: 4, source: "腾讯云·你项目里接了 MCP", deps: ["e4-function-calling-practice"], oneLiner: "MCP Server/Client 标准接入，M×N 集成变 M+N" },
          { id: "e7-memory-mechanism", num: "E7", level: "L3", title: "Agent 记忆机制原理", stars: 4, source: "知乎·字节面试题记忆系统", deps: ["e1-agent-basics"], oneLiner: "短期窗口+长期向量库，写入过滤与检索注入的调度学" },
          { id: "e8-react-mechanism", num: "E8", level: "L3", title: "ReAct 机制与失败模式分析", stars: 3, source: "牛客·Top50（延伸）", deps: ["e3-react-practice"], oneLiner: "循环节拍、终止条件、轨迹裁剪——失控模式与工程刹车" },
          { id: "e9-multi-agent-platform", num: "E9", level: "L4", title: "多 Agent 平台架构", stars: 4, source: "知乎·Agent 工业界总结", deps: ["e3-react-practice"], oneLiner: "主管-工人/流水线/辩论三模式与通信协议栈" },
          { id: "e10-agent-eval-governance", num: "E10", level: "L4", title: "Agent 评测与生产治理体系", stars: 4, source: "阿里云·AI Agent 全栈开发面试宝典", deps: ["e8-react-mechanism"], oneLiner: "轨迹评估+业务闭环指标+Trace 治理——从 demo 到产品" }
        ]
      },
      {
        id: "F", name: "推理部署与 MLOps", icon: "🚀", color: "#ef4444",
        points: [
          { id: "f1-slow-inference-basics", num: "F1", level: "L1", title: "为什么大模型跑不快：逐字接龙的代价", stars: 4, source: "小林面试笔记·解码策略", deps: ["a3-transformer-intuition"], oneLiner: "每写一个字都要把前面全部重看一遍——越长越慢越贵" },
          { id: "f2-gpu-memory-basics", num: "F2", level: "L1", title: "显存是什么：AI 酒店的房间账", stars: 3, source: "知乎·显存估算专文", deps: ["a1-what-is-llm"], oneLiner: "模型住楼（权重）+客人占房（KV），房间不够开不了业" },
          { id: "f3-quantization-practice", num: "F3", level: "L2", title: "模型量化认知与选型", stars: 4, source: "小林面试笔记·量化/知乎·118题（九）", deps: ["f2-gpu-memory-basics"], oneLiner: "INT8 近无损、INT4 省四倍——AWQ/GPTQ 生产选型" },
          { id: "f4-vllm-practice", num: "F4", level: "L2", title: "推理服务化认知：vLLM 部署一条龙", stars: 4, source: "牛客·VLLM 必知必会", deps: ["f1-slow-inference-basics"], oneLiner: "吞吐王者 vLLM vs 极致延迟 TRT-LLM vs 边缘 llama.cpp" },
          { id: "f5-injection-defense-practice", num: "F5", level: "L2", title: "Prompt 注入防护实操", stars: 4, source: "知乎·阿里二面注入/golangstar", deps: ["c1-prompt-basics"], oneLiner: "指令数据分区、最小权限、人工确认、注入检测四层" },
          { id: "f6-kv-cache-pagedattention", num: "F6", level: "L3", title: "KV Cache 与 PagedAttention 原理", stars: 5, source: "牛客·阿里云 Agent 一面原题/知乎", deps: ["f1-slow-inference-basics"], oneLiner: "缓存历史 K/V 免重算；分页管理消灭碎片" },
          { id: "f7-quantization-principle", num: "F7", level: "L3", title: "量化原理：GPTQ/AWQ 怎么压", stars: 4, source: "小林笔记/知乎·118题（九）", deps: ["f3-quantization-practice"], oneLiner: "误差补偿 vs 激活感知保护——4bit 的算法门道" },
          { id: "f8-memory-planning", num: "F8", level: "L3", title: "显存估算原理与容量规划", stars: 4, source: "知乎·显存估算/阿里云官方文档", deps: ["f2-gpu-memory-basics", "f6-kv-cache-pagedattention"], oneLiner: "权重+KV+开销三笔账，定 SLO→算并发→冗余→压测" },
          { id: "f9-cost-optimization-system", num: "F9", level: "L4", title: "全链路成本优化体系", stars: 4, source: "牛客·语义缓存/模型路由题面", deps: ["f4-vllm-practice"], oneLiner: "缓存/路由/压缩/批处理四板斧+成本质量双看板" },
          { id: "f10-observability-system", num: "F10", level: "L4", title: "LLM 应用可观测性体系", stars: 4, source: "CSDN·1000道（19）/阿里云·宝典/LangSmith 官方", deps: ["c4-decoding-params-practice"], oneLiner: "Trace/三指标/回归灰度——给不确定的输出装仪表盘" }
        ]
      },
      {
        id: "G", name: "综合架构与面试实战", icon: "🏆", color: "#ec4899",
        points: [
          { id: "g1-star-narrative", num: "G1", level: "L2", title: "STAR 法：把项目讲成有证据链的故事", stars: 4, source: "CSDN·使用 STAR 法则表现自己", deps: [], oneLiner: "情境-任务-行动-结果，每个数字备好怎么测的" },
          { id: "g2-interview-strategy", num: "G2", level: "L2", title: "面试临场策略与反问", stars: 3, source: "GitHub·reverse-interview-zh", deps: ["g1-star-narrative"], oneLiner: "不会的题三步兜底；反问问业务挑战不问薪资" },
          { id: "g3-knowledge-qa-skeleton", num: "G3", level: "L3", title: "企业知识库设计的答题骨架", stars: 5, source: "知乎·腾讯面试真题/掘金·万字题库", deps: ["d3-rag-mvp", "e5-tool-error-practice"], oneLiner: "六板块：需求/架构/数据/安全/评估/成本，权限前置" },
          { id: "g4-system-design-template", num: "G4", level: "L3", title: "系统设计六步法与 LLM 特有维度", stars: 3, source: "牛客·回答要领", deps: ["g3-knowledge-qa-skeleton"], oneLiner: "澄清→架构→链路→四维→评估→权衡，LLM 多成本与安全" },
          { id: "g5-knowledge-qa-full", num: "G5", level: "L4", title: "终极架构题：企业知识库问答全案", stars: 5, source: "知乎·腾讯面试真题", deps: ["g3-knowledge-qa-skeleton", "d11-enterprise-rag-data"], oneLiner: "10 万文档/部门隔离/当天生效——六板块全展开" },
          { id: "g6-agent-system-full", num: "G6", level: "L4", title: "终极架构题：Agent 系统全案", stars: 4, source: "知乎·Agent 工业界总结", deps: ["g4-system-design-template", "e9-multi-agent-platform"], oneLiner: "客服/数据分析 Agent 的六层设计+可靠性+治理" },
          { id: "g7-architect-expression", num: "G7", level: "L4", title: "架构师的表达：权衡论证与出题能力", stars: 3, source: "牛客·回答要领（综合）", deps: ["g5-knowledge-qa-full"], oneLiner: "每个 choice 说出代价；能出题考别人=真正掌握" }
        ]
      }
    ]
  };
})(typeof window !== "undefined" ? window : globalThis);
