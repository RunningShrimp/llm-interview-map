# 模块B 检索报告 v2（层级化）

> v2 增补检索时间：2026-09-03；v1 基线：2026-09-02。
> v2 增补检索：共 5 次（主题：①L1 直觉类开场题形态 ②灾难性遗忘×数据配比真题问法 ③GRPO/RLVR 在 2025-2026 面试中的频率证据）。
> 星级口径沿用 v1：5=几乎必问，4=高频，3=常见延伸题，1-2=低频。
> v2 结论：b1~b9 的星级、来源与面试问法全部继承有效，无降级调整；GRPO/RLVR（v1 建议新增第 1 条）证据显著增强，建议定为 L4 前沿题。

## 继承考点（b1~b9 v1 结论）

| id | 星级 | 来源（v1 摘录，全部继续有效） | v1 面试问法锚点（节选） |
|---|---|---|---|
| b1-training-paradigms 训练范式全景（预训练→SFT→对齐） | ⭐4 | MoonOut 八股汇总（cnblogs.com/moonout/p/19702578）；CSDN 三阶段（145190449）；CSDN 先SFT后RL；GitHub pihang/LLM_Learning_ph | 「Pretrain / SFT / RLHF 三者的区别是什么？」 |
| b2-sft-instruction-tuning SFT 指令微调与数据构造 | ⭐4 | GitHub naginoa/LLMs_interview_notes；知乎 SFT 篇（p/714687583）；CSDN 微调面试30问（157256663）；卡码笔记；牛客2024汇总 | 「SFT 指令微调数据如何构建？」 |
| b3-rlhf-three-stages RLHF 三阶段流程 | ⭐5 | 牛客 RLHF 八股总结；知乎118题（七）（p/2057141212553950337）；卡码笔记；牛客话题聚合页 | 「RLHF 涉及几个模型？显存关系如何？」 |
| b4-ppo-vs-dpo PPO 与 DPO 对比 | ⭐5 | 牛客26届校招专项；知乎强化学习面试笔记（p/696588130）；知乎 PPO到DAPO（p/1967271772702376530）；CSDN 区别题（162825944）；掘金 | 「DPO 和 PPO 的区别是什么？」 |
| b5-lora-qlora LoRA/QLoRA 原理 | ⭐5 | 知乎 LoRA 面经（p/716005862）；掘金 LoRA（一）（7431459937865383971）；牛客2024汇总；牛客 Agent LoRA 篇；01.me 200问 | 「简单介绍一下 LoRA」 |
| b6-peft-family PEFT 家族对比 | ⭐3 | 知乎 SFT 篇；博客园 LoRA vs P-Tuning；掘金 LoRA（相邻检索间接命中，v1 已注明） | 「常用的轻量级微调方法有什么？异同点？」 |
| b7-catastrophic-forgetting 灾难性遗忘与缓解 | ⭐3 | naginoa 仓库（「为什么 SFT 之后感觉 LLM '傻了'？」）；知乎 SFT 面试专题（p/2026415688789553842） | 「为什么 SFT 之后感觉 LLM '傻了'？」 |
| b8-evaluation-benchmarks 模型评测（Benchmark/人工评估/LLM-as-Judge） | ⭐3 | 面试鸭；小林面试笔记（xiaolinnote.com）；后训练 Playbook；Datawhale | 「什么是 LLM-as-Judge？用大模型评估大模型靠谱吗？」 |
| b9-distributed-training 分布式训练基础 | ⭐4 | 知乎118题（五）（p/2057136905381230188）；CSDN 面试题53（156749916）；GitHub wdndev/llm_interview_note；CSDN 分布式总结；知乎分布式指南 | 「DP/TP/PP 的区别与适用场景？」 |

同时继承的 v1 建议新增 3 条中，以下 2 条 v2 未做改动、结论维持：
- 训练显存估算与参数量计算 ⭐4（naginoa 原题「全参数微调需要多少显存？」；CSDN 微调面试30问；01.me 200问；1point3acres 字节面经）
- Continue Pretrain 领域继续预训练 ⭐3（CSDN 微调面试30问）——v2 检索为其与 b7 补充了数据配比维度的真题与来源（见下文建议第 2 条）。

## 层级化新增/调整建议

1. [训练范式 L1 开场直觉题：什么是预训练 / 为什么需要微调] ｜ 建议层级 L1 ｜ ⭐4 ｜ 来源：AI智能范式网《大模型微调技术面试12问与实战解析》 https://intelliparadigm.com/article/weixin_29041767/2185662 （原文引述「面试官通常会从基础概念切入：请解释什么是大模型微调？为什么需要微调？」，并给出定义/必要性/优势三层答法）；技术栈《【大模型面试突击】06_预训练与微调》 https://jishuzhan.net/article/2025384651666292738 （原题「预训练和微调哪个阶段注入知识？预训练学到了什么，SFT 又学到了什么？」标注⭐⭐高频，采用「一句话秒答」体例：预训练灌知识、SFT 教说话方式、RLHF 学价值观）；CSDN《大模型算法岗最频繁问的200道面试题总结》 https://blog.csdn.net/2301_78285120/article/details/140059146 （第 21、22 题即此形态）；AI简历姬面经解析 https://www.resumemakeroffer.com/blog/post/107552 （「微调是面试高频题，尤其对实习生和初级岗位」；注意其「微调占 60%/预训练 25%/对齐 15%」占比为单一来源观点） ｜ 一句话定义：以「预训练学知识、SFT 学格式、对齐学价值观」类比开场的基础题，是 L1 用户的天然第一课，答法重直觉类比而非公式细节。
   - 局限：逐字为「什么是预训练」的独立题库条目未在检索中命中（未经外部检索逐字确认），真题多以「预训练和微调哪个阶段注入知识」「大模型 LLM 的训练目标是什么」（GitHub km1994/LLMs_interview_notes）等变体出现。

2. [b7 调整：灾难性遗忘×数据配比（通用数据混入比例是缓解遗忘的关键杠杆）] ｜ 建议层级 L1（配比数字与「混测通用 benchmark 看回退」的实践可作 L2 追问） ｜ 维持 ⭐3，真题密度显著增强 ｜ 来源：牛客2024汇总 https://www.nowcoder.com/discuss/645706098464301056 （第 5 题「领域数据训练后，通用能力往往会有所下降，如何缓解模型遗忘通用能力？」、第 17 题「微调后的模型出现能力劣化，灾难性遗忘是怎么回事？」）；CSDN《LLM大模型如何微调？面试经验回答汇总》 https://blog.csdn.net/qq_45591302/article/details/140150276 （同题收录）；Datawhale《大模型面试宝典60题》Q44 https://segmentfault.com/a/1190000046862028 ；GitHub AI-Compass《持续预训练和灾难性遗忘》 https://github.com/tingaicompass/AI-Compass/blob/main/11.blog/3.LLM_Interview/7.持续预训练和灾难性遗忘.md （「通用数据按 1:5 至 1:10 比例混合……数据配比是缓解能力遗忘的关键杠杆」）；知乎《大模型学习路线（二）：预训练》 https://zhuanlan.zhihu.com/p/1985885183640105260 （数据回放 Replay 混入 10%-15% 通用数据）；CSDN 八股《大模型训练中如何应对灾难性遗忘问题？》 https://blog.csdn.net/qq_62223405/article/details/149127060 ｜ 一句话定义：缓解遗忘的核心答法是把通用数据按比例混回训练集（replay），配合低学习率与通用能力回退监控。
   - 冲突提示：通用数据混入比例各来源口径不一（10%-15%、10%-30%、20%-40%、1:5~1:10），均自称经验值；作答应给「经验区间 + 按通用 benchmark 回退监控调参」，不要背单一数字。

3. [GRPO/RLVR 推理模型对齐（v1 建议新增第 1 条，本次频率证据增强）] ｜ 建议层级 L4（对齐前沿/晋升题；算法训练岗逼近 ⭐5） ｜ ⭐4 ｜ 新增频率证据（2025-2026 真实面经三连 + 专项题库两处）：火山引擎 ADG《腾讯混元1面：GRPO比PPO到底好在哪？》 https://adg.csdn.net/6970abc1437a6b40336b254d.html （转述学员当年秋招大模型面试原题）；云栈社区《阿里大模型算法一面复盘：GRPO深度穿透》 https://yunpan.plus/t/23865-1-1 （2026-04，13 个问题中 11 个直接命中 GRPO 与强化学习核心机理，含信用分配、KL 系数等深挖追问）；面试大师·美团算法工程师面经题 https://mianshidashi.cn/interview-questions/meituan/algorithm-engineer/meituan-algorithm-dpo-ppo-grpo-engineering-choice （标注「真实面经题」的 DPO/PPO/GRPO 工程选型题）；MoonOut《八股问答（3）·强化学习与RLHF》 https://www.cnblogs.com/moonout/p/19749191 （2026-03，首题即「介绍一下 PPO、DPO、GRPO 的定义、结构区别、优缺点及适用场景」）；YM博客《GRPO算法面试题大全》 https://www.ymshichi.com/tech/3160.html （2026-08 更新，称其「已成为大模型面试的高频考点」）；ARIS《RLHF / DPO / GRPO / PPO 面试 Cheat Sheet》 https://wanshuiyin.github.io/ARIS-in-AI-Offer/tutorials/rlhf_dpo_grpo_ppo_tutorial.html （25 道高频题按 L1 必会/L2 进阶/L3 顶级 lab 分层，GRPO 省掉 value model 列入 L1 必会）；RLVR 侧：知乎118题（七） https://zhuanlan.zhihu.com/p/2057141212553950337 （「RLVR 是 2025-2026 年推理模型训练的关键技术，DeepSeek-R1 和 OpenAI o1 都使用了类似方法」）+ TalentMe 面试知识卡《RLVR 可验证奖励》 https://talentme.airsota.com/resources/tech/roadmap/mindmap/RL/card/rlvr （2026-08 更新的独立面试刷题卡） ｜ 一句话定义：以组内奖励归一化替代 Critic 的 GRPO 与以规则验证器发放奖励的 RLVR，是 DeepSeek-R1 之后推理模型对齐的主流范式，2025-2026 已从「加分题」变为大厂对齐/训练岗真实面经常客。
   - 口径说明：ARIS Cheat Sheet 的 L1/L2/L3 是其自身难度分层，与本站四级分层无对应关系，仅作「GRPO 基础问法已下探到通用工程岗必会层」的佐证。

## 面试问法补充

### 考点1 L1 开场直觉题
- 「请解释什么是大模型微调？为什么需要微调？」（AI智能范式网《大模型微调技术面试12问》原文引述的开场问法）
- 「预训练和微调哪个阶段注入知识？预训练学到了什么，SFT 又学到了什么？」（技术栈面试突击06 标注⭐⭐高频原题；牛客2024汇总第 14 题、CSDN 200 道第 21 题为同题变体）

### 考点2 灾难性遗忘×数据配比
- 「领域数据训练后，通用能力往往会有所下降，如何缓解模型遗忘通用能力？」（牛客2024汇总第 5 题原题；CSDN《LLM大模型如何微调？面试经验回答汇总》同题）
- 「在继续预训练时，如何在保证模型获得特定领域知识的同时，最大限度地保留其通用能力？」（Datawhale《大模型面试宝典60题》Q44 原题）

### 考点3 GRPO/RLVR
- 「DeepSeek-R1 的 GRPO 算法相比 PPO 好在哪里？直接用 PPO 可以吗？」（腾讯混元一面真题）
- 「DPO、PPO、GRPO 三种对齐方法在工程上如何选择，各自适合什么反馈和决策场景？」（面试大师收录的美团算法工程师面经题，标注「真实面经题」）
- 深挖追问形态（阿里一面实录）：「GRPO 的 KL 散度惩罚系数设了多少？怎么定出来的？」「序列奖励如何分配到每个 Token（信用分配）？」

### 附：v2 证据覆盖度说明
- v2 增补 5 次检索；上述 3 条建议均有 ≥2 个独立来源支撑（第 3 条有 7+ 来源，含 3 份大厂真实面经）。
- 未命中项如实标注：逐字「什么是预训练」的独立题库条目未找到（多以变体出现）；灾难性遗忘的通用数据混入比例无统一权威口径（各来源经验值互相冲突，已并陈）。
- 所有 URL 均来自实际检索命中，未编造；层级口径「L1=直觉/开场层、L4=前沿/晋升层」为本站四级体系，与外部来源的难度分层标注无关。
