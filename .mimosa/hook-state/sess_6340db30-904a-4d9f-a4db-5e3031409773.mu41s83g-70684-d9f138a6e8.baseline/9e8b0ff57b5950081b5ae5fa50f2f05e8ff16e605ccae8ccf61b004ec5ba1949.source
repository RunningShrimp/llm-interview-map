/* 大纲数据 v4 — rodmap 43 锚点 × 七关卡（关0 基础热身 → 关6 综合项目与作品集） */
(function (g) {
  "use strict";
  g.SYLLABUS = {
    version: "4.0",
    updatedAt: "2026-09-15",
    siteName: "AI Agent 与 AI 工程化 · 七关晋升学习站",
    quizPassRatio: 0.8,
    xp: { visit: 10, choice: 15, scenario: 25, bossQuestion: 10, bossPass: 100, task: 60 },
    titleThresholds: [0, 400, 950, 1600, 2400, 3300, 4300],
    /* 关卡 = 学习阶段；unlockBy 指向需要通过的 Boss */
    levels: [
      { id: "S0", name: "基础热身", title: "AI 新手", color: "#10b981", icon: "🌱", desc: "数学、Python、Transformer、LLM 与提示的底层直觉", unlockBy: null, project: "调用 LLM API 的问答 CLI" },
      { id: "S1", name: "LLM 应用入门", title: "应用工程师", color: "#3b82f6", icon: "🛠️", desc: "稳定调用、参数、结构化输出、评估与成本入门", unlockBy: "S0", project: "信息抽取器 / JSON 输出助手" },
      { id: "S2", name: "单 Agent 核心", title: "单 Agent 工程师", color: "#f59e0b", icon: "🤖", desc: "规划、工具、记忆、执行循环与反思修正", unlockBy: "S1", project: "工具型研究助手" },
      { id: "S3", name: "RAG 与工具增强", title: "RAG 工程师", color: "#14b8a6", icon: "📚", desc: "私有知识 + 检索优化 + 单 Agent 架构模式 + 评估", unlockBy: "S2", project: "知识库问答 Agent" },
      { id: "S4", name: "AI 工程化", title: "AI 工程化工程师", color: "#8b5cf6", icon: "🏗️", desc: "可观测、评估体系、部署扩展、成本、安全与 2026 前沿", unlockBy: "S3", project: "带监控与评估的 Agent API" },
      { id: "S5", name: "多 Agent 与生产", title: "多 Agent 工程师", color: "#ef4444", icon: "🧩", desc: "多 Agent 协作判据、协作系统与平台化治理", unlockBy: "S4", project: "多 Agent 内容/研究团队" },
      { id: "S6", name: "综合项目与作品集", title: "准专家", color: "#ec4899", icon: "👑", desc: "端到端独立交付：实战全案、红队、运维与作品表达", unlockBy: "S5", project: "自选生产级 Agent 项目" }
    ],
    /* 层配色（锚点分组用） */
    layerColors: { L0: "#10b981", L1: "#3b82f6", L2: "#f59e0b", L3: "#8b5cf6", L4: "#ec4899", H: "#0ea5e9" },
    /* 模块 = rodmap 锚点（43 个，全部保留）+ 增量模块H；mastery 为锚点建议掌握程度 */
    modules: [
      {
        id: "0.1", layer: "L0", name: "数学与统计基础", icon: "📐", mastery: "了解-理解", optional: false,
        keyQuestion: "向量、矩阵、概率、损失函数分别解决什么？",
        points: [
          { id: "0-1", num: "0.1", stage: "S0", title: "AI 需要的数学：向量、概率与损失", stars: 3, source: "内置知识（基础层）/CSDN·天池机器学习题库", deps: [], oneLiner: "向量是文字的坐标、概率是置信度、损失是错得有多离谱的打分器" }
        ]
      },
      {
        id: "0.2", layer: "L0", name: "Python 工程基础", icon: "🐍", mastery: "会用", optional: false,
        keyQuestion: "我能否写出可维护、可测试的脚本和服务？",
        points: [
          { id: "0-2", num: "0.2", stage: "S0", title: "Python 工程底座：从脚本到服务", stars: 4, source: "阿里云·65题Agent宝典/掘金FastAPI题库", deps: ["0-1"], oneLiner: "异步 + 流式是 AI 岗的工程主考法，Git 与测试是素养底线" }
        ]
      },
      {
        id: "0.3", layer: "L0", name: "机器学习/深度学习基础", icon: "📈", mastery: "了解-理解", optional: false,
        keyQuestion: "模型如何学习、泛化、失败？",
        points: [
          { id: "0-3", num: "0.3", stage: "S0", title: "模型是怎么学的：训练、验证与过拟合直觉", stars: 4, source: "牛客·美团二面原题/技术栈AI大模型面试题", deps: ["0-1", "0-2"], oneLiner: "训练=海量刷题改答案本，把题目背下来就是过拟合" }
        ]
      },
      {
        id: "0.4", layer: "L0", name: "NLP 与 Transformer", icon: "🧱", mastery: "理解", optional: false,
        keyQuestion: "LLM 为什么能处理长上下文？",
        points: [
          { id: "0-4", num: "0.4", stage: "S0", title: "Transformer 直觉版：AI 怎么读句子", stars: 5, source: "牛客·大模型常考100道", deps: ["0-3"], oneLiner: "每个词环顾全句找相关词，几十层反复加工，位置号码牌补顺序" },
          { id: "0-4b", num: "0.4b", stage: "S0", title: "分词与 token：计费与上下文的计量单位", stars: 3, source: "内置知识（应用岗基础）", deps: ["0-4"], oneLiner: "文本被切成词块，token 数=API 费用与窗口长度的计量单位" },
          { id: "0-4c", num: "0.4c", stage: "S0", title: "Self-Attention 与 QKV：注意力机制原理", stars: 5, source: "牛客·LLM面试题：Transformer", deps: ["0-4"], oneLiner: "Q 查询 K 索引、加权 V、缩放 √d 防梯度消失——公式逐项拆" },
          { id: "0-4d", num: "0.4d", stage: "S0", title: "位置编码与 RoPE：AI 怎么知道词序", stars: 4, source: "小林笔记·位置编码/知乎", deps: ["0-4c"], oneLiner: "正弦→可学习→RoPE：旋转 Q/K 让内积携带相对位置" }
        ]
      },
      {
        id: "0.5", layer: "L0", name: "LLM 基础", icon: "🧠", mastery: "理解", optional: false,
        keyQuestion: "能力、幻觉、上下文窗口从哪来？",
        points: [
          { id: "0-5", num: "0.5", stage: "S0", title: "什么是大模型：能力、幻觉与上下文从哪来", stars: 4, source: "牛客·大模型基础题/小林coding", deps: ["0-4"], oneLiner: "一个读过几乎整个互联网、靠接龙说话的超级文字预测器" },
          { id: "0-5b", num: "0.5b", stage: "S0", title: "预训练与 SFT：AI 的三段成长", stars: 4, source: "知乎·训练范式专章/牛客·RLHF八股总结", deps: ["0-5"], oneLiner: "先狂读书→岗前培训，从会说话到会干活" },
          { id: "0-5c", num: "0.5c", stage: "S0", title: "RLHF 与 DPO：模型怎么变听话", stars: 4, source: "小林coding·RLHF/DPO/GRPO/卡码笔记", deps: ["0-5b"], oneLiner: "人类投票教分寸：PPO 在线闭环 vs DPO 离线直优" },
          { id: "0-5d", num: "0.5d", stage: "S0", title: "幻觉机理：似真不等于为真", stars: 5, source: "小林面试笔记·幻觉/知乎·幻觉面经", deps: ["0-5"], oneLiner: "下一词预测优化连贯性而非真实性，空白处按风格补全" }
        ]
      },
      {
        id: "0.6", layer: "L0", name: "提示工程基础", icon: "💬", mastery: "会用", optional: false,
        keyQuestion: "如何稳定引导模型输出？",
        points: [
          { id: "0-6", num: "0.6", stage: "S0", title: "和 AI 对话的第一课：把话说清楚", stars: 5, source: "牛客·官方提示词题单/面试鸭", deps: ["0-5"], oneLiner: "你是谁+做什么+边界在哪+交付长什么样+照着做" },
          { id: "0-6b", num: "0.6b", stage: "S0", title: "结构化 Prompt 五件套实操", stars: 5, source: "牛客·提示词题单/面试鸭", deps: ["0-6"], oneLiner: "角色+任务+约束+格式+示例，配评测驱动的迭代法" }
        ]
      },
      {
        id: "0.7", layer: "L0", name: "向量与嵌入基础", icon: "🧲", mastery: "会用", optional: false,
        keyQuestion: "如何把文本变成可检索向量？",
        points: [
          { id: "0-7", num: "0.7", stage: "S0", title: "Embedding 初体验：语义坐标", stars: 4, source: "小林笔记（检索核实）/知乎·Embedding原理", deps: ["0-4"], oneLiner: "文本变向量，意思越近坐标越近——换个说法也能搜到的底层" },
          { id: "0-7b", num: "0.7b", stage: "S0", title: "向量检索原理：ANN 与 HNSW/IVF", stars: 4, source: "面试鸭/腾讯云·IVF/HNSW/PQ", deps: ["0-7"], oneLiner: "分层图跳跃 vs 聚类分桶——召回/延迟/内存三角" }
        ]
      },
      {
        id: "1.1", layer: "L1", name: "LLM API 与模型选型", icon: "🔌", mastery: "会用", optional: false,
        keyQuestion: "什么任务该选什么模型？",
        points: [
          { id: "1-1", num: "1.1", stage: "S1", title: "主流模型家族速览与选型", stars: 5, source: "牛客·为什么大模型几乎都是 Decoder-only", deps: ["0-5"], oneLiner: "GPT 式会写、BERT 式会读、T5 式先懂后写——按任务选" },
          { id: "1-1b", num: "1.1b", stage: "S1", title: "解码参数实操：temperature/top_p 怎么调", stars: 4, source: "小林 coding·采样参数/CSDN", deps: ["0-6", "1-1"], oneLiner: "温度控随机性、top_p 控候选池——按任务选参数组合" },
          { id: "1-1c", num: "1.1c", stage: "S1", title: "采样机制的数学：温度与核采样", stars: 4, source: "小林 coding·采样参数", deps: ["1-1b"], oneLiner: "温度缩放分布、top-p 截断候选池——机制与经验值" }
        ]
      },
      {
        id: "1.2", layer: "L1", name: "Prompt Engineering 进阶", icon: "✍️", mastery: "会用", optional: false,
        keyQuestion: "如何减少随机性与注入风险？",
        points: [
          { id: "1-2", num: "1.2", stage: "S1", title: "进阶提示工程：少样本、CoT 与自洽性", stars: 5, source: "火山引擎·提示词要点15题/面试鸭", deps: ["0-6"], oneLiner: "分步思考=给草稿纸：生成步骤本身就是在计算" },
          { id: "1-2b", num: "1.2b", stage: "S1", title: "Prompt 注入防护实操", stars: 4, source: "知乎·阿里二面注入/golangstar", deps: ["1-2"], oneLiner: "指令数据分区、最小权限、人工确认、注入检测四层" }
        ]
      },
      {
        id: "1.3", layer: "L1", name: "结构化输出与 Function Calling", icon: "🧾", mastery: "会用", optional: false,
        keyQuestion: "如何让 LLM 安全调用工具？",
        points: [
          { id: "1-3", num: "1.3", stage: "S1", title: "结构化输出与 JSON Mode 三道关", stars: 3, source: "内置知识（应用岗常问）/Vellum 选型旁证", deps: ["1-1b"], oneLiner: "提示词给 Schema→API 严格模式→代码校验带错重试" },
          { id: "1-3b", num: "1.3b", stage: "S1", title: "工具调用的直觉：点餐小票", stars: 4, source: "小林面试笔记·Function Calling", deps: ["1-3"], oneLiner: "AI 只负责按格式填单，程序验单后才送厨房执行" },
          { id: "1-3c", num: "1.3c", stage: "S1", title: "Function Calling 与参数校验实操", stars: 5, source: "小林面试笔记/牛客·Top50/知乎·美团二面", deps: ["1-3b"], oneLiner: "工具定义三要素+应用侧校验+错误回传自修" }
        ]
      },
      {
        id: "1.4", layer: "L1", name: "RAG", icon: "📚", mastery: "熟练", optional: false,
        keyQuestion: "如何提升检索质量与答案可信度？",
        points: [
          { id: "1-4", num: "1.4", stage: "S3", title: "开卷考试：RAG 直觉版", stars: 5, source: "卡码笔记·RAG 题单/牛客字节一面", deps: ["0-7", "1-3"], oneLiner: "先翻资料找到相关段落，再照着回答并注明出处" },
          { id: "1-4b", num: "1.4b", stage: "S3", title: "RAG 最小可用版：搭一条完整链路", stars: 5, source: "卡码笔记·RAG 题单/小林面试笔记", deps: ["1-4"], oneLiner: "解析→切分→向量化→检索→引用生成的两周 MVP" },
          { id: "1-4c", num: "1.4c", stage: "S3", title: "检索质量优化：切分、混合检索与重排", stars: 4, source: "知乎·RAG通关指南/字节真题/掘金·Rerank", deps: ["1-4b"], oneLiner: "结构感知切分+BM25 双路召回+Cross-Encoder 精排" },
          { id: "1-4d", num: "1.4d", stage: "S3", title: "RAG vs 微调 vs 长上下文选型", stars: 5, source: "卡码笔记·第3题（rodmap 种子锚点）", deps: ["1-4b", "0-5b"], oneLiner: "缺知识选 RAG、缺能力选微调、单篇深读选长文" }
        ]
      },
      {
        id: "1.5", layer: "L1", name: "记忆与上下文管理", icon: "🗂️", mastery: "会用", optional: false,
        keyQuestion: "多轮中该记住什么、忘掉什么？",
        points: [
          { id: "1-5", num: "1.5", stage: "S1", title: "多轮对话与上下文管理实操", stars: 3, source: "内置知识（TACL 2024 lost-in-the-middle 锚点）", deps: ["1-1b"], oneLiner: "近期原文+远期摘要+相关检索；关键信息放头尾" }
        ]
      },
      {
        id: "1.6", layer: "L1", name: "LLM 应用评估与可观测性", icon: "📏", mastery: "理解-会用", optional: false,
        keyQuestion: "如何量化效果与定位问题？",
        points: [
          { id: "1-6", num: "1.6", stage: "S1", title: "怎么知道应用变好了：评估与 LLM-as-Judge 入门", stars: 4, source: "Prachub·Evals与Judge/TechInterview.net", deps: ["1-3"], oneLiner: "金标集+裁判模型：改一版 prompt 必须跑一遍评测" }
        ]
      },
      {
        id: "1.7", layer: "L1", name: "安全、权限、成本与延迟", icon: "🛡️", mastery: "理解-会用", optional: false,
        keyQuestion: "如何控制风险、成本与延迟？",
        points: [
          { id: "1-7", num: "1.7", stage: "S1", title: "生产四座大山：安全、权限、成本、延迟入门", stars: 4, source: "InterviewLoop·$2M账单题/Practical DevSecOps", deps: ["1-6"], oneLiner: "预算护栏、流式首 token、最小权限——上线前先算三笔账" },
          { id: "1-7b", num: "1.7b", stage: "S1", title: "幻觉治理的分层防御体系", stars: 4, source: "知乎·幻觉面经（综合）/博客园五重防御", deps: ["1-7", "0-5d"], oneLiner: "事前 RAG/事中约束/事后校验/运营兜底四层纵深" }
        ]
      },
      {
        id: "2.1", layer: "L2", name: "Agent 定义与范式", icon: "🤖", mastery: "理解", optional: false,
        keyQuestion: "Agent 与固定工作流的边界在哪？",
        points: [
          { id: "2-1", num: "2.1", stage: "S2", title: "Agent 是什么：给 AI 装上手手脚", stars: 4, source: "牛客·大模型 Agent 面试全攻略/JavaGuide", deps: ["1-3c", "1-5"], oneLiner: "聪明大脑+任务清单+笔记本+门禁卡四件套；模型自己决定下一步才是 Agent" }
        ]
      },
      {
        id: "2.2", layer: "L2", name: "规划 Planning", icon: "🗺️", mastery: "熟练", optional: false,
        keyQuestion: "如何把模糊目标拆成可执行步骤？",
        points: [
          { id: "2-2", num: "2.2", stage: "S2", title: "任务分解与规划：把模糊目标拆成步骤", stars: 4, source: "JavaBetter·Agent 13题/小林·三种范式/掘金 ReWOO", deps: ["2-1"], oneLiner: "Planner 先拆子任务标依赖，Executor 照单执行，错了回炉重规划" }
        ]
      },
      {
        id: "2.3", layer: "L2", name: "工具使用 Tool Use", icon: "🔧", mastery: "熟练", optional: false,
        keyQuestion: "如何安全、可靠地调用外部系统？",
        points: [
          { id: "2-3", num: "2.3", stage: "S2", title: "工具调用异常与死循环防护实操", stars: 4, source: "牛客·AI Agent Top50/代码随想录2026", deps: ["1-3c", "2-1"], oneLiner: "重试上限、步数/预算双阈值、指纹熔断、人工在环" },
          { id: "2-3b", num: "2.3b", stage: "S2", title: "MCP 实操：工具即插即用", stars: 4, source: "腾讯云·你项目里接了 MCP/MCP 官方规范", deps: ["2-3"], oneLiner: "MCP Server/Client 标准接入，M×N 集成变 M+N" }
        ]
      },
      {
        id: "2.4", layer: "L2", name: "记忆 Memory", icon: "🧷", mastery: "熟练", optional: false,
        keyQuestion: "状态如何持久化、检索与更新？",
        points: [
          { id: "2-4", num: "2.4", stage: "S2", title: "Agent 记忆机制原理", stars: 4, source: "知乎·字节面试题记忆系统/JavaBetter", deps: ["1-5", "2-1"], oneLiner: "短期窗口+长期向量库，写入过滤与检索注入的调度学" }
        ]
      },
      {
        id: "2.5", layer: "L2", name: "执行循环与状态机", icon: "🔄", mastery: "熟练", optional: false,
        keyQuestion: "如何防止死循环、跑偏、不可恢复？",
        points: [
          { id: "2-5", num: "2.5", stage: "S2", title: "ReAct 循环实操：边想边做", stars: 5, source: "牛客·AI Agent Top50（第1题）", deps: ["2-2", "2-3", "2-4"], oneLiner: "Thought→Action→Observation 循环，配终止与轨迹管理" },
          { id: "2-5b", num: "2.5b", stage: "S2", title: "ReAct 失败模式与状态机恢复", stars: 3, source: "牛客·Top50（延伸）/JavaGuide·Agent Loop/DataCamp LangGraph", deps: ["2-5"], oneLiner: "循环节拍、终止条件、图状态机与中断恢复——失控模式与工程刹车" }
        ]
      },
      {
        id: "2.6", layer: "L2", name: "反思与自我修正", icon: "🪞", mastery: "理解-会用", optional: false,
        keyQuestion: "如何判断错了并修正？",
        points: [
          { id: "2-6", num: "2.6", stage: "S2", title: "反思与自我修正：让 Agent 知错能改", stars: 4, source: "面试鸭·Reflexion 原题/CSDN·Reflexion 解析", deps: ["2-5"], oneLiner: "Reflexion：把失败教训写成经验存进记忆，下次带着上" }
        ]
      },
      {
        id: "2.7", layer: "L2", name: "单 Agent 架构模式", icon: "🏛️", mastery: "熟练", optional: false,
        keyQuestion: "何时用简单工作流，何时用自主 Agent？",
        points: [
          { id: "2-7", num: "2.7", stage: "S3", title: "单 Agent 四大架构模式：工具型/RAG型/工作流型/自主型", stars: 4, source: "小林·三种范式/The AI Engineer/DataCamp", deps: ["2-6", "1-4b"], oneLiner: "先问任务形状：路径固定用工作流，路径开放才用自主 Agent" },
          { id: "2-7b", num: "2.7b", stage: "S3", title: "何时用工作流，何时用自主 Agent", stars: 3, source: "LangChain 官方·when to build agents/rodmap 2.7", deps: ["2-7"], oneLiner: "看分支数量与不可预测性：能画成流程图就别上 Agent" }
        ]
      },
      {
        id: "2.8", layer: "L2", name: "多 Agent 协作", icon: "👥", mastery: "理解-会用", optional: false,
        keyQuestion: "多 Agent 何时真的优于单 Agent？",
        points: [
          { id: "2-8", num: "2.8", stage: "S5", title: "多 Agent 协作：角色分工、通信与监督", stars: 4, source: "知乎·多Agent架构全解析/Anthropic 官方", deps: ["2-7"], oneLiner: "主管-工人/流水线/辩论：把一个大脑拆成一支团队" },
          { id: "2-8b", num: "2.8b", stage: "S5", title: "多 Agent 何时真的优于单 Agent", stars: 4, source: "Anthropic·15×token/LangChain 官方·when NOT/arXiv 2505.18286", deps: ["2-8"], oneLiner: "默认单 Agent：可并行、读多写少、需要上下文隔离才上多 Agent" }
        ]
      },
      {
        id: "2.9", layer: "L2", name: "Agent 评估与安全", icon: "🕵️", mastery: "熟练", optional: false,
        keyQuestion: "如何证明 Agent 可信、可控、可审计？",
        points: [
          { id: "2-9", num: "2.9", stage: "S3", title: "RAG 评估体系与忠实度计算", stars: 3, source: "知乎·阿里二面 RAGAS/小林笔记", deps: ["1-4b", "1-6"], oneLiner: "检索层 Recall/MRR+生成层忠实度/相关性，RAGAS 四件套" },
          { id: "2-9b", num: "2.9b", stage: "S3", title: "Agent 评测与生产治理体系", stars: 4, source: "阿里云·Agent 宝典/Confident AI·2026", deps: ["2-5b", "2-9"], oneLiner: "轨迹评估+复合失败率（95%^8≈66%）+Trace 治理" }
        ]
      },
      {
        id: "3.1", layer: "L3", name: "架构与接口设计", icon: "🏗️", mastery: "熟练", optional: false,
        keyQuestion: "系统如何分层、解耦、扩展？",
        points: [
          { id: "3-1", num: "3.1", stage: "S4", title: "Agent 服务架构与接口设计", stars: 4, source: "PracHub·Amazon RAG 全案/skphd·生产架构30题", deps: ["2-7"], oneLiner: "接入→网关→编排→模型→数据→观测六层，每层说得出删掉它会坏什么" }
        ]
      },
      {
        id: "3.2", layer: "L3", name: "数据与知识工程", icon: "🗃️", mastery: "熟练", optional: false,
        keyQuestion: "知识如何持续更新且可追溯？",
        points: [
          { id: "3-2", num: "3.2", stage: "S4", title: "企业级 RAG 数据管线与权限治理", stars: 4, source: "知乎·腾讯真题（延伸）/牛客字节二面", deps: ["1-4c"], oneLiner: "多格式接入/增量更新/密级过滤/审计——生产数据面" },
          { id: "3-2b", num: "3.2b", stage: "S4", title: "合成数据与模型自进化前沿", stars: 3, source: "HF Blog / CSDN·27届备战（面试出现中）", deps: ["3-2"], oneLiner: "合成数据、自博弈与蒸馏驱动的数据工程前沿", frontier: true }
        ]
      },
      {
        id: "3.3", layer: "L3", name: "编排框架与运行时", icon: "🧰", mastery: "会用", optional: true,
        keyQuestion: "框架选型与抽象如何避免锁定？",
        points: [
          { id: "3-3", num: "3.3", stage: "S4", title: "编排框架选型：LangGraph/LlamaIndex/OpenAI SDK/MCP", stars: 3, source: "MCP 官方规范/DataCamp LangGraph/n1n.ai（选修）", deps: ["2-5", "3-1"], oneLiner: "框架管状态与流程，MCP 管工具接入——用标准协议防锁定", optional: true }
        ]
      },
      {
        id: "3.4", layer: "L3", name: "可观测性与追踪", icon: "🔭", mastery: "熟练", optional: false,
        keyQuestion: "出错时如何还原完整轨迹？",
        points: [
          { id: "3-4", num: "3.4", stage: "S4", title: "LLM 应用可观测性体系", stars: 4, source: "CSDN·1000道（19）/阿里云·宝典/LangSmith 官方", deps: ["1-6", "3-1"], oneLiner: "Trace/三指标/回归灰度——给不确定的输出装仪表盘" }
        ]
      },
      {
        id: "3.5", layer: "L3", name: "评估体系与实验管理", icon: "🧪", mastery: "熟练", optional: false,
        keyQuestion: "如何知道改版是变好还是变坏？",
        points: [
          { id: "3-5", num: "3.5", stage: "S4", title: "评估体系与实验管理：数据集、A/B 与 Judge 校准", stars: 4, source: "Mistral AI/DeepEval/Galtea/arXiv 2506.02945", deps: ["1-6", "3-4"], oneLiner: "评估集是回归护栏，judge 要对人评校准，A/B 才能归因" }
        ]
      },
      {
        id: "3.6", layer: "L3", name: "部署与扩展", icon: "🚀", mastery: "熟练", optional: false,
        keyQuestion: "如何稳定承载真实流量？",
        points: [
          { id: "3-6", num: "3.6", stage: "S4", title: "推理服务化认知：vLLM 部署一条龙", stars: 4, source: "牛客·VLLM 必知必会/MortalJobs LLMOps", deps: ["3-1"], oneLiner: "吞吐王者 vLLM vs 极致延迟 TRT-LLM vs 边缘 llama.cpp" },
          { id: "3-6b", num: "3.6b", stage: "S4", title: "显存估算原理与容量规划", stars: 4, source: "知乎·显存估算/阿里云官方文档", deps: ["3-6"], oneLiner: "权重+KV+开销三笔账，定 SLO→算并发→冗余→压测" },
          { id: "3-6c", num: "3.6c", stage: "S4", title: "端侧与边缘推理（AI PC/手机 NPU）", stars: 3, source: "HF Blog / Qualcomm 社区（趋势观察）", deps: ["3-6b"], oneLiner: "把 LLM 塞进手机与 PC：NPU 生态、功耗与隐私权衡", frontier: true }
        ]
      },
      {
        id: "3.7", layer: "L3", name: "成本、延迟与可靠性", icon: "💰", mastery: "熟练", optional: false,
        keyQuestion: "如何平衡效果、成本、延迟？",
        points: [
          { id: "3-7", num: "3.7", stage: "S4", title: "为什么大模型跑不快：逐字接龙的代价", stars: 4, source: "小林面试笔记·解码策略", deps: ["0-4c"], oneLiner: "每写一个字都要把前面全部重看一遍——越长越慢越贵" },
          { id: "3-7b", num: "3.7b", stage: "S4", title: "KV Cache 与 PagedAttention 原理", stars: 5, source: "牛客·阿里云 Agent 一面原题/知乎", deps: ["3-7"], oneLiner: "缓存历史 K/V 免重算；分页管理消灭碎片" },
          { id: "3-7c", num: "3.7c", stage: "S4", title: "全链路成本优化体系", stars: 4, source: "牛客·语义缓存/模型路由题面/InterviewLoop", deps: ["3-7b"], oneLiner: "缓存/路由/压缩/批处理四板斧+成本质量双看板" }
        ]
      },
      {
        id: "3.8", layer: "L3", name: "安全、合规与权限", icon: "🔐", mastery: "熟练", optional: false,
        keyQuestion: "如何做到最小权限与可审计？",
        points: [
          { id: "3-8", num: "3.8", stage: "S4", title: "Agent 最小权限、合规与审计", stars: 4, source: "feinterview·沙箱权限22题/火山引擎·合规15题/CSDN", deps: ["1-2b", "3-1"], oneLiner: "按任务动态授权、任务结束权限衰减、PII 脱敏、全链路留痕" }
        ]
      },
      {
        id: "3.9", layer: "L3", name: "CI/CD、版本管理与发布", icon: "🚦", mastery: "熟练", optional: false,
        keyQuestion: "如何安全发布与回滚？",
        points: [
          { id: "3-9", num: "3.9", stage: "S4", title: "Prompt 即代码：评估门禁与安全发布", stars: 4, source: "myengineeringpath·LLMOps Eval Gates/galtea/skphd", deps: ["3-5", "3-6"], oneLiner: "Code→Test→Eval Gate→Deploy：评分不过线就阻断上线" }
        ]
      },
      {
        id: "3.10", layer: "L3", name: "人机协同与反馈闭环", icon: "🤝", mastery: "理解-会用", optional: false,
        keyQuestion: "人在哪些节点介入最有效？",
        points: [
          { id: "3-10", num: "3.10", stage: "S4", title: "人机协同与反馈闭环：审批、标注与持续学习", stars: 2, source: "StackAI·审批工作流/DataGrid·反馈闭环（趋势，题库未成形）", deps: ["3-4", "3-5"], oneLiner: "高风险动作挂起等人批，用户反馈过滤后流回评估集" }
        ]
      },
      {
        id: "H", layer: "H", name: "2026 前沿趋势", icon: "🌌", mastery: "精通", optional: false,
        keyQuestion: "2026 格局里，哪些前沿已经进了面试真题？",
        points: [
          { id: "h1-test-time-scaling", num: "H1", stage: "S4", title: "推理模型与测试时扩展（R1/o 系列）", stars: 4, source: "DeepSeek-R1（Nature 2025）/OpenAI 官方（面试出现中）", deps: ["1-2", "0-5c"], oneLiner: "把算力花在推理时：思考越久答案越好——测试时扩展定律", frontier: true },
          { id: "h2-rlvr-grpo", num: "H2", stage: "S4", title: "RLVR 与 GRPO 对齐前沿", stars: 4, source: "DeepSeek-R1 论文/面灵AI 2026/techinterview.net（面试出现中）", deps: ["0-5c"], oneLiner: "可验证奖励+组相对优势：推理模型的对齐引擎", frontier: true },
          { id: "h3-context-engineering-practice", num: "H3", stage: "S4", title: "Context Engineering：体系设计与前沿实践", stars: 4, source: "Anthropic 官方工程博客/Weaviate（面试出现中）", deps: ["1-5", "2-4"], oneLiner: "压缩、记忆工具、子代理隔离——长任务上下文的前沿模式", frontier: true },
          { id: "h4-agentic-rag", num: "H4", stage: "S4", title: "Agentic RAG 与自主检索智能体", stars: 4, source: "Hugging Face Blog/卡码笔记/gitGood 2026（面试出现中）", deps: ["1-4c", "2-6"], oneLiner: "让 Agent 规划-检索-反思：RAG 的智能体化演进", frontier: true },
          { id: "h5-a2a-protocol", num: "H5", stage: "S4", title: "A2A 协议与多 Agent 互操作", stars: 4, source: "A2A 官方 v1.0（Linux Foundation 2026-03）/卡码（面试出现中）", deps: ["2-3b"], oneLiner: "Agent 互联的开放标准：v1.0 定稿，与 MCP 分工的互操作层", frontier: true },
          { id: "h6-ai-coding-agents", num: "H6", stage: "S4", title: "AI Coding 智能体（Claude Code/Cursor 类）", stars: 4, source: "Anthropic/Cursor 官方/牛客·面灵AI 2026（面试出现中）", deps: ["2-5", "2-7"], oneLiner: "Agentic Coding：能力边界来自 harness 而非模型本身", frontier: true },
          { id: "h7-computer-use-agents", num: "H7", stage: "S4", title: "计算机使用与多模态 Agent", stars: 3, source: "Anthropic/OpenAI 官方（趋势观察：Operator 已并入 ChatGPT Agent）", deps: ["2-5", "1-3c"], oneLiner: "让 AI 操作屏幕：截图-理解-点击的多模态 Agent", frontier: true },
          { id: "h8-agent-sandbox-reliability", num: "H8", stage: "S4", title: "Agent 沙箱与可靠执行", stars: 3, source: "E2B / Modal microVM 对比（趋势观察）", deps: ["2-3", "2-9b"], oneLiner: "微 VM/容器沙箱：让 Agent 敢执行代码的隔离层", frontier: true }
        ]
      },
      {
        id: "4.1", layer: "L4", name: "单 Agent 原型", icon: "🌱", mastery: "会用", optional: false,
        keyQuestion: "最小可用 Agent 是什么样？",
        points: [
          { id: "4-1", num: "4.1", stage: "S6", title: "最小可用 Agent：从 CLI 原型到闭环", stars: 5, source: "小林 coding 2026/代码随想录 2026 汇总", deps: ["2-7"], oneLiner: "单主循环+少量原语工具+参数校验与失败处理=最小可用" }
        ]
      },
      {
        id: "4.2", layer: "L4", name: "RAG 知识库 Agent", icon: "🏛️", mastery: "熟练", optional: false,
        keyQuestion: "检索和生成如何联合评估？",
        points: [
          { id: "4-2", num: "4.2", stage: "S6", title: "企业知识库设计的答题骨架", stars: 5, source: "知乎·腾讯面试真题/掘金·万字题库", deps: ["1-4b", "2-3"], oneLiner: "六板块：需求/架构/数据/安全/评估/成本，权限前置" },
          { id: "4-2b", num: "4.2b", stage: "S6", title: "终极架构题：企业知识库问答全案", stars: 5, source: "知乎·腾讯面试真题/PracHub·Amazon 真题", deps: ["4-2", "3-2"], oneLiner: "10 万文档/部门隔离/当天生效——六板块全展开" }
        ]
      },
      {
        id: "4.3", layer: "L4", name: "数据分析 Agent", icon: "📊", mastery: "熟练", optional: false,
        keyQuestion: "如何安全执行代码与查询？",
        points: [
          { id: "4-3", num: "4.3", stage: "S6", title: "数据分析 Agent：SQL/代码沙箱与结果解释", stars: 4, source: "牛客·80题沙箱原文/知乎·Agent面试总结", deps: ["2-3", "3-8"], oneLiner: "生成的 SQL/Python 必须进隔离沙箱，只读账号+白名单+超时" }
        ]
      },
      {
        id: "4.4", layer: "L4", name: "浏览器/计算机使用 Agent", icon: "🖥️", mastery: "了解-会用", optional: true,
        keyQuestion: "如何提升稳定性与可恢复性？",
        points: [
          { id: "4-4", num: "4.4", stage: "S6", title: "浏览器/计算机使用 Agent 入门", stars: 2, source: "arXiv 2511.19477/Firecrawl 基准（趋势观察·选修）", deps: ["2-3", "3-7c"], oneLiner: "截图 vs DOM 两类感知，步级错误累积是核心瓶颈", optional: true }
        ]
      },
      {
        id: "4.5", layer: "L4", name: "工作流自动化 Agent", icon: "🔁", mastery: "熟练", optional: false,
        keyQuestion: "权限、幂等、审计怎么做？",
        points: [
          { id: "4-5", num: "4.5", stage: "S6", title: "工作流自动化 Agent：权限、幂等与审计", stars: 3, source: "Coworker.ai·2026 评估框架/Vellum（幂等为内置知识）", deps: ["2-7", "3-1"], oneLiner: "人审闸门+幂等键+审计日志：一条消息绝不重复执行" }
        ]
      },
      {
        id: "4.6", layer: "L4", name: "多 Agent 协作系统", icon: "🧩", mastery: "理解-会用", optional: false,
        keyQuestion: "通信成本是否值得？",
        points: [
          { id: "4-6", num: "4.6", stage: "S5", title: "多 Agent 协作系统实战：研究/写作团队", stars: 3, source: "Anthropic·multi-agent research system/知乎", deps: ["2-8b"], oneLiner: "研究团队案例：15× token 买并行与上下文隔离，值不值看任务" }
        ]
      },
      {
        id: "4.7", layer: "L4", name: "生产级 Agent 平台", icon: "🏭", mastery: "熟练", optional: false,
        keyQuestion: "如何平台化复用与治理？",
        points: [
          { id: "4-7", num: "4.7", stage: "S5", title: "多 Agent 平台架构", stars: 4, source: "知乎·Agent 工业界总结/面试大师·网易真题", deps: ["2-8"], oneLiner: "主管-工人/流水线/辩论三模式与通信协议栈" },
          { id: "4-7b", num: "4.7b", stage: "S5", title: "终极架构题：Agent 系统全案", stars: 4, source: "知乎·Agent 工业界总结/PracHub·OpenAI 真题", deps: ["4-7", "3-1"], oneLiner: "客服/数据分析 Agent 的六层设计+可靠性+治理" }
        ]
      },
      {
        id: "4.8", layer: "L4", name: "评估与红队", icon: "🎯", mastery: "熟练", optional: false,
        keyQuestion: "如何证明安全与可靠？",
        points: [
          { id: "4-8", num: "4.8", stage: "S6", title: "评估与红队：OWASP 双 Top10 与对抗测试", stars: 4, source: "OWASP LLM/Agentic Top10/Promptfoo/DeepTeam/LangChain", deps: ["2-9b", "3-5"], oneLiner: "上线前跑红队清单：注入居首，agentic 风险有独立 Top10" }
        ]
      },
      {
        id: "4.9", layer: "L4", name: "部署与运维", icon: "🛠️", mastery: "熟练", optional: false,
        keyQuestion: "如何保证线上稳定？",
        points: [
          { id: "4-9", num: "4.9", stage: "S6", title: "Agent 部署与运维：软故障防御与告警", stars: 4, source: "火山引擎·运维监控15题/CSDN·软故障四层防御", deps: ["3-6", "3-9"], oneLiner: "不报错但跑偏才是常态：四层防御+黄金信号告警" }
        ]
      },
      {
        id: "4.10", layer: "L4", name: "作品集与复盘", icon: "🎖️", mastery: "熟练", optional: false,
        keyQuestion: "如何让别人相信我能做？",
        points: [
          { id: "4-10", num: "4.10", stage: "S6", title: "作品集与复盘：让别人相信你能做", stars: 3, source: "Data Vidhya·Peer Mocks/内置（rodmap 4.10）", deps: ["4-1"], oneLiner: "架构图+指标+演示+可复现文档——能力证明四件套" },
          { id: "4-10b", num: "4.10b", stage: "S6", title: "STAR 法：把项目讲成有证据链的故事", stars: 4, source: "CSDN·使用 STAR 法则表现自己", deps: ["4-10"], oneLiner: "情境-任务-行动-结果，每个数字备好怎么测的" },
          { id: "4-10c", num: "4.10c", stage: "S6", title: "架构师的表达：权衡论证与出题能力", stars: 3, source: "牛客·回答要领/myengineeringpath（综合）", deps: ["4-10b"], oneLiner: "每个 choice 说出代价；能出题考别人=真正掌握" }
        ]
      }
    ]
  };
})(typeof window !== "undefined" ? window : globalThis);
