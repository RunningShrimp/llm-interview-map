# 模块B 检索报告（训练与对齐）

> 检索时间：2026-09-02；检索工具：WebSearch（中文检索，共 8 次调用，其中 1 次 PEFT 专项查询超时失败）。
> 星级口径：5=几乎必问，4=高频，3=常见延伸题，1-2=低频。检索范围以中文大模型岗（算法/训练/应用开发）面经与面试题库为主。

## b1-training-paradigms 训练范式全景：预训练→SFT→对齐
- 星级：⭐4（校准理由：作为一切训练题的"开场框架题"被反复考核，多来源设独立专题讲解三阶段划分与阶段选型，是其他 8 个点的挂靠骨架，定 4 合理）
- 来源：
  - MoonOut·LLM 算法岗面试常问八股题目汇总（含「大模型训练流程与微调技术」专题）https://www.cnblogs.com/moonout/p/19702578
  - CSDN·大语言模型训练的三个阶段：从预训练到 RLHF https://blog.csdn.net/qq_38961840/article/details/145190449
  - CSDN·面试题解析：LLM 训练中，什么时候需要"先 SFT 后 RL"？ https://deepseek.csdn.net/6a7c325c662f9a54cb9ba1bf.html
  - GitHub·从零预训练 LLM、SFT、RLHF、DPO 笔记整理+面试问题 https://github.com/pihang/LLM_Learning_ph
- 面试问法：
  - 「Pretrain / SFT / RLHF 三者的区别是什么？」（MoonOut 八股问答目录原题）
  - 「LLM 训练中，什么时候需要"先 SFT 后 RL"？」（CSDN 面试题解析标题）
- 高频考点提示：
  - 三阶段各自目标：预训练学语言规律（next-token prediction 打地基）、SFT 学指令遵循、RLHF/DPO 做偏好对齐
  - Base 模型 vs Chat 模型的能力差异与选型（SFT 数据少用 Chat 基座、数据多用 Base 的经验法则）
  - 什么时候可以跳过 RL 阶段（数据量、任务性质、成本约束）
  - Continue Pretrain 在整条链路中的位置（领域适配场景）
  - 各阶段数据形态差异：预训练无标注语料 / SFT 指令对 / RM 偏好对

## b2-sft-instruction-tuning SFT 指令微调与数据构造
- 星级：⭐4（校准理由：维持种子锚点 4 星；GitHub 面试仓库与牛客汇总均设 SFT 专章，数据构造与显存估算是必问落点，但纯应用开发岗问得比算法岗略浅）
- 来源：
  - GitHub·naginoa/LLMs_interview_notes（SFT 微调专题目录）https://github.com/naginoa/LLMs_interview_notes
  - 知乎·LLM 常见面试问题 - SFT 篇 https://zhuanlan.zhihu.com/p/714687583
  - CSDN·大模型微调面试30问：原理+实战解析 https://blog.csdn.net/qq_38998213/article/details/157256663
  - 卡码笔记（小林coding 同系）·大模型微调面试详解：SFT、RLHF、DPO、PPO https://notes.kamacoder.com/interview/llm/finetuning_sft_rlhf_interview.html
  - 牛客网·2024 大模型算法工程师面试题汇总 https://www.nowcoder.com/discuss/645706098464301056
- 面试问法：
  - 「SFT 指令微调数据如何构建？」「为什么 SFT 之后感觉 LLM '傻了'？」（naginoa 仓库 SFT 专题目录原题）
  - 「SFT 数据集格式、RM（奖励模型）数据集格式」（牛客 2024 面试题汇总收录的问题方向）
- 高频考点提示：
  - 指令数据构造全链路：指令 induce → 回答生成 → 质量过滤（self-instruct、Evol-Instruct、PPL 过滤异常样本）
  - 数据格式：Alpaca / ShareGPT 模板、system/user/assistant 角色与 loss mask（只对 assistant 回答算 loss）
  - 质量 vs 数量的权衡（LIMA 思路：少量高质量数据即可激发能力）
  - 全参微调 vs 轻量微调的显存估算（面试常配计算题）
  - 灾难性遗忘、SFT 过拟合"变傻"的成因与缓解

## b3-rlhf-three-stages RLHF 三阶段流程
- 星级：⭐5（校准理由：维持种子锚点 5 星；牛客设有「RLHF 八股总结」专题面经、知乎设有「RLHF 与对齐」面试 118 题专章，三阶段流程与"涉及几个模型"是出现频率最高的对齐题，几乎必问）
- 来源：
  - 牛客网·算法面经 | RLHF 八股总结 https://www.nowcoder.com/feed/main/detail/20e8f456d0c5418cad2b46b39c0d0f61
  - 知乎·大模型面试118题（七）：RLHF 与对齐 https://zhuanlan.zhihu.com/p/2057141212553950337
  - 卡码笔记·大模型微调面试详解：SFT、RLHF、DPO、PPO https://notes.kamacoder.com/interview/llm/finetuning_sft_rlhf_interview.html
  - 牛客网·大模型面试话题聚合页 https://www.nowcoder.com/creation/subject/278ae3e75eca413fa6f96d70cd03ae57
- 面试问法：
  - 「RLHF 相较 SFT 解决的核心问题是什么？请详述经典三阶段」（牛客 RLHF 八股总结核心问题方向）
  - 「RLHF 涉及几个模型？显存关系如何？」（多来源反复出现的追问：Actor/Ref/Reward/Critic 四模型）
- 高频考点提示：
  - 三阶段：SFT 打底 → 采样多候选回答 + 人类标注偏好对 → 训练 Reward Model → PPO 强化学习优化
  - RM 训练用成对偏好（Bradley-Terry / pairwise ranking loss），输出标量奖励
  - PPO 阶段四个模型的角色分工与显存开销（为何远大于 SFT）
  - KL 惩罚的作用：防止 policy 偏离参考模型过远（reward hacking 的约束）
  - 如何评估 RLHF 后的效果（生成质量、安全性、对齐性等多维度，牛客话题页原题方向）

## b4-ppo-vs-dpo PPO 与 DPO 对比
- 星级：⭐5（校准理由：上调 1 星；多个独立来源交叉印证为"必考"——牛客设有 26 届校招 PPO vs DPO 专项题，知乎明确称「PPO、DPO、GRPO、DAPO 已成为大模型岗位秋招必考题」，且 Llama 3 采用 DPO 使该题成为工业界热点）
- 来源：
  - 牛客网·26届校招算法面试题：PPO 与 DPO 核心解析 https://www.nowcoder.com/feed/main/detail/8d4084f6cfec4f3ca4f2016c15b8e6dd
  - 知乎·大模型强化学习面试题学习笔记 https://zhuanlan.zhihu.com/p/696588130
  - 知乎·RLHF 对齐算法"填坑"史：从 PPO 到 DAPO（称其为秋招必考题）https://zhuanlan.zhihu.com/p/1967271772702376530
  - CSDN·面试题：DPO 和 PPO 的区别是什么？ https://blog.csdn.net/qq1137623160/article/details/162825944
  - 掘金·RLHF 与 DPO 的本质区别 https://juejin.cn/post/7586892413890936878
- 面试问法：
  - 「DPO 和 PPO 的区别是什么？」（CSDN 面试题文章标题原句）
  - 「DPO 是 on-policy 还是 off-policy 的算法？」（知乎强化学习面试笔记高频陷阱题）
- 高频考点提示：
  - 核心差异：PPO 需要 Reward Model + RL 框架（4 模型在线交互）；DPO 把偏好优化转化为监督式目标函数，端到端、无独立 RM
  - DPO 的隐式奖励推导（从 RLHF 目标反解 optimal policy）
  - on/off-policy 之辨（DPO 是 off-policy，高频陷阱）
  - 稳定性与显存 trade-off：DPO 更简单省显存，PPO 上限更高但难调
  - 两者都以 SFT 模型为起点；工业界 Llama 3 用 DPO、推理模型转向 GRPO 系
  - DPO 的局限（对分布偏移敏感、可能拉大 chattering/GD 间隙）作为加分追问

## b5-lora-qlora LoRA/QLoRA 原理
- 星级：⭐5（校准理由：维持种子锚点 5 星；知乎、掘金、CSDN、牛客均有 LoRA 专项面经/题集，配套"参数量计算"进阶题，是微调方向出现密度最高的单点，几乎必问）
- 来源：
  - 知乎·大模型面经——LoRA 面经总结 https://zhuanlan.zhihu.com/p/716005862
  - 掘金·LoRA 面试常见问题总结（一） https://juejin.cn/post/7431459937865383971
  - 牛客网·2024 大模型算法工程师相关面试题汇总 https://www.nowcoder.com/discuss/645706098464301056
  - 牛客网·AI Agent 常考面试题汇总 - LoRA 篇 https://www.nowcoder.com/discuss/876512639952683008
  - 《图解大模型》配套·大模型面试题 200 问 https://01.me/2025/04/llm-interview-questions/
- 面试问法：
  - 「简单介绍一下 LoRA」（知乎 LoRA 面经总结开篇原题；标准答案起点："通过低秩分解来模拟参数的改变量"）
  - 「LoRA 权重是否可以合入原模型？LoRA 微调为啥能加速训练？如何在已有 LoRA 模型上继续训练？」（牛客 2024 面试题汇总收录的原题串）
- 高频考点提示：
  - 原理：冻结原始权重 W，旁路增加低秩矩阵 A、B，ΔW = BA（r << d），依据是预训练权重改动的低"内在秩"假设
  - 可合并性：推理前 W' = W + BA 合并，零额外推理延迟；多 LoRA 热切换部署
  - 关键超参：秩 r 的选择、缩放系数 α、应用层位（Q/V 最常见，扩到全线性层的效果）
  - QLoRA：4-bit NF4 量化底座 + LoRA 附加层，双重量化与 paged optimizer
  - 计算题：给定模型规模求 LoRA 可训练参数量、相对全量微调的压缩比（200 问收录的进阶题形态）

## b6-peft-family PEFT 家族对比（Adapter/Prefix/P-tuning/LoRA）
- 星级：⭐3（校准理由：维持 3 星；专项检索查询超时，但相邻两次检索（SFT 篇、LoRA 面经）均捕捉到该题作为"轻量微调方法异同"的延伸问法，说明它通常挂在 LoRA/SFT 之下被追问、较少独立成卷，3 星符合证据）
- 来源（专项检索超时，以下为相邻检索命中）：
  - 知乎·LLM 常见面试问题 - SFT 篇（原题含轻量级微调方法异同）https://zhuanlan.zhihu.com/p/714687583
  - 博客园·常用微调方法 LoRA 和 P-Tuning 的原理 https://www.cnblogs.com/xiaochouk/p/18268894
  - 掘金·LoRA 面试常见问题总结（含与 Adapter/Prefix-tuning 区别的追问方向）https://juejin.cn/post/7431459937865383971
- 面试问法：
  - 「常用的轻量级微调方法有什么？异同点？与传统的 fine-tuning 的区别？」（知乎 SFT 篇原题）
  - 「LoRA 与 Adapter / Prefix-tuning 的区别是什么？」（掘金 LoRA 题集列出的高频追问方向）
- 高频考点提示：
  - 三大类：附加结构（Adapter/Prefix/Prompt-tuning）、重参数化低秩（LoRA）、软提示（P-tuning v1/v2）
  - P-tuning v2 = deep prompt tuning（每层加可训练前缀），与 prefix-tuning 渊源
  - 各方法在参数量、推理延迟、效果上的横向对比（LoRA 可合并故推理零开销，Adapter 有串行延迟）
  - 为什么 LoRA 成为主流而 Adapter 逐渐边缘化
  - 软 prompt 与离散 prompt 的区别（embedding 空间连续优化）

## b7-catastrophic-forgetting 灾难性遗忘与缓解
- 星级：⭐3（校准理由：维持 3 星；证据显示它以"SFT 后模型变傻"的形态作为 SFT 延伸题出现，且有专题文章点名"灾难性遗忘与位置编码偏移"，但未见独立专章，属高频延伸而非独立必问）
- 来源：
  - GitHub·naginoa/LLMs_interview_notes（SFT 专题目录原题「为什么 SFT 之后感觉 LLM '傻了'？」）https://github.com/naginoa/LLMs_interview_notes
  - 知乎·LLM SFT 面试，看下面这些就够了（点名灾难性遗忘与位置编码偏移）https://zhuanlan.zhihu.com/p/2026415688789553842
- 面试问法：
  - 「为什么 SFT 之后感觉 LLM '傻了'？」（naginoa 仓库目录原题）
  - 「SFT 训练中的灾难性遗忘问题如何缓解？」（知乎 SFT 面试专题讨论方向，原文提及"灾难性遗忘与位置编码偏移"）
- 高频考点提示：
  - 成因：微调数据分布窄于预训练分布、学习率过高、训练轮数过多导致通用能力退化
  - 缓解手段：混入通用数据（replay/数据配比）、降低学习率与 epoch、LoRA 等参数高效微调约束改动量、EWC/L2 正则
  - 与"对齐税"（alignment tax）现象的关联：对齐后 benchmark 分数下降
  - 判别口径：能力遗忘 vs 格式退化 vs 位置编码外推问题（位置编码偏移）
  - 实践检验方法：混测通用 benchmark 观察回退幅度

## b8-evaluation-benchmarks 模型评测（Benchmark/人工评估/LLM-as-Judge）
- 星级：⭐3（校准理由：维持 3 星但偏应用岗高频；面试鸭与小林面试笔记均设专项问答页，后训练 Playbook 有速查专章，证据扎实；在训练算法岗它是辅助题，在 LLM 应用/产品岗频率更高）
- 来源：
  - 面试鸭·什么是 LLM-as-Judge？用大模型评估大模型靠谱吗？ https://www.mianshiya.com/question/2052284832318238721
  - 小林面试笔记·大模型能力评测指标有哪些？ https://xiaolinnote.com/ai/llm/evaluation_metrics.html
  - 后训练 Playbook·评测与 LLM-as-judge 速查表 https://ac.fzhiy.net/post-training-playbook/cheatsheet-eval-and-judges.html
  - Datawhale·模型评估 https://github.com/datawhalechina/signal-to-intelligence/blob/main/docs/05_llm_basics/06_evaluation.md
- 面试问法：
  - 「什么是 LLM-as-Judge？用大模型评估大模型靠谱吗？」（面试鸭题库原题）
  - 「大模型能力评测指标有哪些？」（小林面试笔记页面标题原题）
- 高频考点提示：
  - 三条评测线：能力 benchmark（有标答、自动判分）、偏好/对话评测（judge 打分）、RM 评测
  - 自动指标（BLEU/ROUGE）只能做表面文本匹配，不适合开放式生成
  - LLM-as-Judge 的四大系统偏置：位置偏置、冗长偏置、自我偏好、格式偏好（进阶加分点）
  - 成对比较（win/tie/lose）与人类一致性高于直接打分制；经典基准 MT-Bench、AlpacaEval 的设计
  - 工业界落地：LLM 打分 + 人工抽查 10-20% 校准的混合方案

## b9-distributed-training 分布式训练基础（数据并行/张量并行/流水线并行、DeepSpeed）
- 星级：⭐4（校准理由：维持 4 星；知乎有「大模型面试118题（五）：分布式训练」专章、CSDN 有编号专题系列（面试题53），wdndev 面试仓库设完整分布式章节含 DeepSpeed 专题，证据密度支持 4 星）
- 来源：
  - 知乎·大模型面试118题（五）：分布式训练 https://zhuanlan.zhihu.com/p/2057136905381230188
  - CSDN·大模型面试题53：大模型训练时的并行方式有哪些？DP/PP/TP/CP https://blog.csdn.net/weixin_45264425/article/details/156749916
  - GitHub·wdndev/llm_interview_note（分布式训练专章 + DeepSpeed 专题）https://github.com/wdndev/llm_interview_note
  - CSDN·【大模型 LLM 面试合集】分布式训练总结 https://blog.csdn.net/chen695969/article/details/146224337
  - 知乎·大模型面经—分布式训练指南 https://zhuanlan.zhihu.com/p/7218198821
- 面试问法：
  - 「数据并行、张量并行、流水线并行的区别与适用场景？」（知乎 118 题专章原题）
  - 「大模型训练时的并行方式有哪些？DP/PP/TP/CP」（CSDN 专题标题原题，CP 为 Llama 3.1 提出的上下文并行）
- 高频考点提示：
  - DP：每卡完整模型副本、切分数据、迭代末同步梯度——解决吞吐但单卡须放下全模型
  - TP（Megatron-LM 式层内纵向切分）vs PP（按层横向切分 + micro-batch 流水线、Bubble 问题）的原理与通信代价
  - ZeRO 1/2/3 的区别：分别切分优化器状态/梯度/参数，解决 DP 显存冗余；DeepSpeed 3D 并行 = DP+MP+PP
  - 通信原语关联：TP 用 NVLink 高带宽（AllReduce/AllGather），PP 跨机只传边界激活（P2P）
  - 显存构成拆解（参数/梯度/优化器状态/激活）与"模型放不下怎么办"的方案排序题

## 建议新增知识点清单
- [GRPO 与推理模型对齐（RLVR 可验证奖励）] ⭐4 ｜ 来源：知乎《RLHF 对齐算法"填坑"史：从 PPO 到 DAPO》https://zhuanlan.zhihu.com/p/1967271772702376530 ；CSDN《大模型对齐进化史：一文看懂 PPO、DPO、GRPO、DAPO 与 GSPO》 https://agent.csdn.net/6a699c3310ee7a33f293e627.html ｜ 一句话定义：DeepSeek-R1 带火的组相对策略优化，以组内奖励归一化替代 Critic，是 2025-2026 推理模型（RLVR）对齐的主流算法与新兴必考题。
- [训练显存估算与参数量计算] ⭐4 ｜ 来源：GitHub naginoa/LLMs_interview_notes（原题「全参数微调需要多少显存？」）https://github.com/naginoa/LLMs_interview_notes ；CSDN《大模型微调面试30问》 https://blog.csdn.net/qq_38998213/article/details/157256663 ；《大模型面试题 200 问》计算题 https://01.me/2025/04/llm-interview-questions/ ；1point3acres 字节面经 https://www.1point3acres.com/bbs/thread-1085534-1-1.html ｜ 一句话定义：估算给定模型全参微调/LoRA 微调所需显存（参数+梯度+优化器状态+激活的定量拆解），多来源交叉印证的必考计算题。
- [Continue Pretrain 领域继续预训练与数据配比] ⭐3 ｜ 来源：CSDN《大模型微调面试30问：原理+实战解析》（原题方向「领域模型 Continue Pretrain 数据选择」）https://blog.csdn.net/qq_38998213/article/details/157256663 ｜ 一句话定义：在基座模型上用领域语料继续预训练以注入领域知识，核心考点是数据配比（领域数据与通用数据混合防遗忘）与数据选择策略。

---

### 附：证据覆盖度与局限说明
- 有效外部检索 7 次（第 8 次为 PEFT 专项查询超时失败），9/9 个知识点均获得至少一条外部来源；其中 b6 的证据来自相邻主题（SFT 篇、LoRA 面经）检索的间接命中，未做专项确认。
- 「PPO/DPO 为秋招必考题」的说法目前主要见于知乎文章表述，属于单一来源观点+多篇专题佐证的组合，已按多数共识处理为 5 星，如需更保守可回落至 4 星。
- 新增知识点第 3 条（Continue Pretrain）目前仅单一来源直接命中，故定 ⭐3；第 1、2 条为多来源交叉印证。
