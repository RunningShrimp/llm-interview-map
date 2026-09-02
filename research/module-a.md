# 模块A 检索报告（深度学习与 Transformer 基础）

> 检索时间：2026-09-02。检索来源：WebSearch（共 8 次，6 次成功返回带链接结果，2 次超时）。
> 主要信源：牛客网面经/题库、知乎专栏、CSDN 面经、小林笔记（xiaolinnote.com）、卡码笔记、掘金、GitHub 题库。
> 星级定义：5=几乎必问；4=高频；3=中频常作为追问或手撕项；2=偶尔；1=冷门。

## a1-transformer-architecture Transformer 整体架构
- 星级：⭐5（校准理由：牛客《大模型常考面试题100道》第 1 题即「Transformer 的整体结构是什么？」，属于开场必问题，维持 5 星）
- 来源：
  - 牛客网·大模型常考面试题100道（第1～25道）https://www.nowcoder.com/discuss/865888054261706752
  - 牛客网·LLM面试题：Transformer https://www.nowcoder.com/discuss/867917874684297216
  - 卡码笔记·Transformer大厂面试题汇总 https://notes.kamacoder.com/interview/llm/transformer_interview.html
- 面试问法：
  - 「Transformer 的整体结构是什么？」（牛客 100 道题·第 1 题）
  - 「自注意力机制如何工作？为什么比 RNN 更适合处理长序列？」（牛客·LLM面试题：Transformer，标注字节/阿里/腾讯高频）
- 高频考点提示：
  - 整体数据流：输入 Embedding + 位置编码 → N 层 Encoder/Decoder → Linear + Softmax，能画图讲清
  - Encoder 与 Decoder 模块差异：因果掩码自注意力、Cross-Attention 的有无
  - 与 RNN/LSTM 对比：并行性、长距离依赖、训练效率
  - Decoder 生成流程：自回归逐 token、每步输出作为下一步输入
  - 常见追问：Encoder 输出如何被 Decoder 使用（Cross-Attention 中 K/V 来源）

## a2-self-attention-qkv Self-Attention 与 QKV
- 星级：⭐5（校准理由：牛客 100 道题中第 3、4 题连续考 Self-Attention 公式与 √d_k 缩放，多个面经标注字节/阿里/腾讯高频，几乎必问）
- 来源：
  - 牛客网·大模型常考面试题100道 https://www.nowcoder.com/discuss/865888054261706752
  - 掘金·大厂高频 LLM 面试36题详解 https://juejin.cn/post/7624738045101375538
  - 极市平台·大模型面试八股含答案 https://www.cvmart.net/community/detail/7940
- 面试问法：
  - 「Self-Attention 的原理和公式是什么？」「为什么 Attention 里要除以 √d_k？」（牛客 100 道题·第 3、4 题）
  - 「Self-Attention 和 Cross-Attention 的区别？」（CSDN·2026 字节大模型岗面经汇总 https://blog.csdn.net/qq_45717425/article/details/160315245）
- 高频考点提示：
  - 公式 softmax(QK^T/√d_k)V，Q/K/V 的物理含义（查询/键/值）
  - 为什么除以 √d_k：维度大时点积方差大 → softmax 进入饱和区 → 梯度消失
  - 两类 Mask：padding mask 与 causal mask 的作用位置与实现
  - Self-Attention 的 O(n²·d) 复杂度来源（QK^T 与权重矩阵相乘两步）
  - 对比 RNN：任意两 token 一步直达、完全并行

## a3-multi-head-attention Multi-Head Attention 多头注意力
- 星级：⭐5（校准理由：从候选 ⭐4 上调——概念题在牛客 100 道题中列第 5 题，且「手撕 MHA」是算法岗手撕四大件之一，CSDN/知乎/卡码均有专文，概念+手撕双重高频）
- 来源：
  - 牛客网·大模型常考面试题100道 https://www.nowcoder.com/discuss/865888054261706752
  - CSDN·面试手撕多头注意力代码 https://blog.csdn.net/weixin_44151034/article/details/161667240
  - 知乎·LLM手撕代码合集 https://zhuanlan.zhihu.com/p/2022092403721479678
  - 牛客网·大模型算法面试手撕代码总结 https://www.nowcoder.com/feed/main/detail/5a43a5d03e5746e5b743bb488a5c00f9
- 面试问法：
  - 「Multi-Head Attention 机制（是什么/为什么有效）」（牛客 100 道题·第 5 题）
  - 「手撕多头注意力代码，考察的核心其实是维度变化」（CSDN 手撕文原话概括）
- 高频考点提示：
  - 为什么多头：不同 head 在不同子空间学习不同关系（句法/语义/位置），增强表达能力
  - 手撕关键：Q/K/V 线性投影 → split 成 h 份（d_k=d_model/h）→ 各头独立 attention → concat → 输出线性层，维度变化要能白板写出
  - 五步法：算 QKV → 注意力分数 → 缩放 → Softmax → 加权求和
  - 参数量与单头的对比（总参数量基本不变，计算量相当）
  - 进阶追问：带 KV Cache 的 MHA、GQA/MQA 变体（见 a10）

## a4-positional-encoding 位置编码（正弦/可学习/RoPE）
- 星级：⭐4（校准理由：小林笔记/知乎/CSDN 均有专文且掘金 36 题收录，属高频题；但手撕与提问密度略低于 Self-Attention 本体，维持 4 星）
- 来源：
  - 小林笔记·大模型的位置编码是干什么用的？sin/cos、RoPE、ALiBi https://xiaolinnote.com/ai/llm/position_encoding.html
  - 知乎·大模型面试准备（四）：必会的位置编码 https://zhuanlan.zhihu.com/p/689205140
  - CSDN·大模型用到的位置编码汇总（面试） https://blog.csdn.net/qq_24211837/article/details/137800363
  - 掘金·大厂高频 LLM 面试36题 https://juejin.cn/post/7624738045101375538
- 面试问法：
  - 「大模型的位置编码是干什么用的？sin/cos、RoPE、ALiBi 有什么区别？」（小林笔记标题）
  - 「为什么需要位置编码？」（掘金 36 题收录，答案要点：Self-Attention 对输入顺序不敏感，本质是词袋）
- 高频考点提示：
  - 必答起点：Attention 打乱 token 顺序结果不变，必须显式注入位置信息
  - 正弦编码设计：第 1 对频率最快区分近距、第 d/2 对最慢区分远距；与可学习编码（BERT）的取舍
  - RoPE 核心：旋转矩阵作用于 Q/K，使内积只依赖相对位置；LLaMA/Qwen 均采用
  - 长度外推延伸：Position Interpolation、NTK-aware scaling（见新增清单）
  - 对比题：绝对 vs 相对位置编码、RoPE vs ALiBi

## a5-layer-vs-batch-norm LayerNorm vs BatchNorm
- 星级：⭐4（校准理由：CSDN 专门面试题系列（题33）+ 知乎多篇归一化总结 + RMSNorm 追问链，确认为高频且常带追问，维持 4 星）
- 来源：
  - CSDN·大模型面试题33：Transformer为什么用LayerNorm，而非BatchNorm？ https://blog.csdn.net/weixin_45264425/article/details/156534125
  - 知乎·大模型面经——大模型中用到的归一化方法总结 https://zhuanlan.zhihu.com/p/689516256
  - AI简历姬·RMSNorm相比LayerNorm去掉了什么操作 https://www.resumemakeroffer.com/blog/post/107618
- 面试问法：
  - 「Transformer 为什么用 LayerNorm，而非 BatchNorm？」（CSDN 面试题33 标题原文）
  - 「RMSNorm 相比 LayerNorm 去掉了什么操作？」（AI简历姬标题原文）
- 高频考点提示：
  - 归一化维度差异：BN 沿 batch 维跨样本统计，LN 在单样本特征维统计（可用「班级单科 vs 个人各科成绩」比喻）
  - BN 三大问题：依赖 batch size、变长序列 padding 污染统计、训练/推理不一致（滑动平均）
  - LN 逐样本归一化与 batch 无关，训练推理行为一致，适配 NLP
  - 追问链：RMSNorm 去掉均值中心化只留均方根缩放（LLaMA/Qwen 采用）；Pre-LN/Post-LN（见 a6）
  - 可能手撕 LayerNorm（含可学习缩放平移参数）

## a6-residual-norm 残差连接与 Pre-LN/Post-LN
- 星级：⭐3（校准理由：从候选 ⭐4 下调——检索证据显示它多作为 a5/LayerNorm 的「加分追问」出现（知乎归一化总结、CSDN 面试题33 均在延伸中提到 Pre-LN vs Post-LN 训练稳定性），独立成题频率略低；本点主体为内置知识）
- 来源：
  - 间接外部来源：知乎·大模型中用到的归一化方法总结 https://zhuanlan.zhihu.com/p/689516256（Pre-LN/Post-LN 作为归一化延伸考点出现）
  - 其余为：未经外部检索：内置知识
- 面试问法：
  - 「Pre-LN 和 Post-LN 有什么区别？为什么现代大模型（GPT/LLaMA）都用 Pre-LN？」（内置知识归纳，常见问法）
  - 「残差连接的作用是什么？为什么深层网络需要它？」（内置知识归纳）
- 高频考点提示：
  - 残差作用：梯度高速通路、缓解深层退化、让「恒等映射」成为容易学到的下界
  - Post-LN（原版 Transformer）：LN 在残差相加之后，深层训练不稳定、需要 warmup
  - Pre-LN（GPT/LLaMA 风格）：LN 在子层之前，梯度可直接回传、训练稳定、几乎不需 warmup；代价是最终输出前要加 Final LN
  - 公式对比能白板写：x+Sublayer(x) vs x+Sublayer(LN(x))
  - 变体加分项：DeepNorm、Sandwich-LN

## a7-ffn-activation FFN 与激活函数（GeLU/SwiGLU）
- 星级：⭐3（校准理由：维持 3 星——牛客手撕总结将 FFN 列为手撕四大件之一，说明结构本身必会；但「激活函数演进」类问答多为 LLaMA/GPT 结构对比时的追问，独立提问频率中等。SwiGLU 部分为内置知识）
- 来源：
  - 间接外部来源：牛客网·大模型算法面试手撕代码总结 https://www.nowcoder.com/feed/main/detail/5a43a5d03e5746e5b743bb488a5c00f9（手撕四大件：位置编码、注意力、归一化、FFN）
  - 其余为：未经外部检索：内置知识（该方向检索超时）
- 面试问法：
  - 「FFN 在 Transformer 里的作用是什么？为什么两层还要升维 4 倍？」（内置知识归纳）
  - 「LLaMA 为什么用 SwiGLU 替代 ReLU/GeLU？」（内置知识归纳）
- 高频考点提示：
  - FFN = 升维（4x）→ 非线性 → 降维，逐位置独立计算；参数量约占全模型 2/3
  - 「key-value memory」视角：FFN 存储事实性知识（内置知识）
  - 激活函数演进：ReLU → GeLU（BERT/GPT-2）→ SwiGLU 门控（LLaMA/Qwen，维度改 8/3·d 保持参数量不变）
  - 手撕 FFN 是四大件之一，代码量小但要含 dropout 与维度变化
  - 追问：为什么 SwiGLU 有效（门控提供更平滑的梯度/表达力，多为经验性解释）

## a8-tokenization-embedding 分词（BPE）与 Embedding
- 星级：⭐3（校准理由：维持 3 星——本轮针对 BPE 的检索超时，未获直接外部证据；结合内置知识判断其在中高频区间（LLM 应用岗常问 token/计费/词表），但独立成题频率低于架构类题目）
- 来源：未经外部检索：内置知识（专项检索超时）
- 面试问法：
  - 「大模型为什么都用 BPE/BBPE 分词？BPE 和 WordPiece 的区别？」（内置知识归纳）
  - 「Embedding 层和输出层为什么要权重共享（tie embeddings）？」（内置知识归纳）
- 高频考点提示：
  - BPE：从字符开始迭代合并最高频相邻对，平衡词表大小与 OOV；BBPE 字节级天然覆盖多语言/emoji
  - WordPiece（BERT）按互信息/似然增益选合并；SentencePiece 把空格当普通字符、语言无关
  - 主流词表量级：约 3 万～15 万；中文平均 1 字 ≈ 0.6～1 token（影响计费与上下文预算）
  - Embedding 矩阵 V×d 的显存占用与 tie embeddings 的省参逻辑
  - 应用岗延伸：token 数估算、max position 与上下文窗口的关系

## a9-model-family Encoder-only / Decoder-only / Encoder-Decoder 架构对比
- 星级：⭐5（校准理由：从候选 ⭐4 上调——牛客 100 道题第 2 题即「BERT 和 GPT 的核心区别是什么？」，且牛客设有专门讨论帖回答「为什么现在的大模型几乎都是 Decoder-only」，属几乎必问）
- 来源：
  - 牛客网·大模型常考面试题100道 https://www.nowcoder.com/discuss/865888054261706752
  - 牛客网·面试官问「为什么现在的大模型几乎都是 Decoder-only 架构」怎么回答 https://www.nowcoder.com/discuss/859194501846315008
  - 知乎·大模型面试必问知识：Transformer、BERT、GPT https://zhuanlan.zhihu.com/p/1909610528202006676
  - 掘金·LLM 为什么都是 decoder-only 架构 https://juejin.cn/post/7503474192764616704
- 面试问法：
  - 「BERT 和 GPT 的核心区别是什么？」（牛客 100 道题·第 2 题）
  - 「为什么现在的大模型几乎都是 Decoder-only 架构？」（牛客讨论帖标题原文）
- 高频考点提示：
  - 三类架构对照表：Encoder-only（BERT/RoBERTa，双向注意力，理解/检索/表征）、Decoder-only（GPT/LLaMA/Qwen，因果掩码，自回归生成）、Encoder-Decoder（T5/BART，翻译/摘要）
  - 为什么 Decoder-only 胜出的标准答案链：Scaling Law 下 zero/few-shot 泛化强、训练目标（预测下一词）与生成任务一致、每个 token 都有监督信号数据效率高、无 Encoder-Decoder 信息瓶颈、KV Cache 工程成熟、一套架构统一理解+生成
  - 反直觉点要先讲：BERT 时代双向注意力曾在 benchmark 碾压 GPT-1，规模放大后反转
  - Encoder-only 并未消亡：Embedding/检索/Rerank 场景仍是首选
  - 延伸追问：三者注意力掩码画法、为什么 BERT 不适合做生成

## a10-attention-optimization 注意力复杂度与优化方向
- 星级：⭐4（校准理由：从候选 ⭐3 上调——多来源将 KV Cache、GQA/MQA/MLA 列为进阶必考（知乎「手写 MHA 还得带 KV Cache」、GitHub 107 题含 MLA），推理相关岗位此点接近必问）
- 来源：
  - 知乎·被问懵了！手写 Multi-Head Attention 还得带 KV Cache https://zhuanlan.zhihu.com/p/1914362873347544443
  - GitHub·大模型基础必考题（107题，含 MLA/MoE） https://github.com/adongwanai/AgentGuide/blob/main/docs/04-interview/16-llm-fundamentals.md
  - 博客园·LLM 算法岗八股 + 手撕汇总 https://www.cnblogs.com/moonout/p/19722167
- 面试问法：
  - 「为什么 Self-Attention 的计算复杂度是 O(n²)？长文本怎么优化？」（内置知识归纳，O(n²) 为多个面经的公共前置考点）
  - 「手写 Multi-Head Attention 还得带 KV Cache」（知乎标题原文）
- 高频考点提示：
  - O(n²) 两个来源：QK^T 矩阵（n²·d）与分数加权 V（n²·d）；显存同样平方级
  - KV Cache：缓存历史 K/V 避免重复计算，代价是显存随序列长度线性增长（会估算 2·L·n·d·精度字节）
  - 注意力变体：MHA → MQA（共享 K/V）→ GQA（分组共享，LLaMA-3/Qwen 用）→ MLA（DeepSeek 低秩压缩 KV）
  - FlashAttention：分块 tiling + online softmax，减少 HBM 读写（精确注意力，非近似）（内置知识）
  - 其他方向：稀疏注意力、线性注意力、滑窗（Mistral）（内置知识）

## 建议新增知识点清单
- [MoE 混合专家（Router/Top-K/负载均衡）] ⭐4 ｜ 小林笔记·MoE 混合专家模型详解 https://xiaolinnote.com/ai/llm/moe.html；GitHub·大模型基础必考题107题 https://github.com/adongwanai/AgentGuide/blob/main/docs/04-interview/16-llm-fundamentals.md；LeetCode 讨论区·大模型算法面试题总结（MoE vs 集成学习） https://leetcode.cn/circle/discuss/fseEcI/ ｜ 一句话定义：每个 MoE 层由路由网络只为当前 token 激活 Top-K 个专家 FFN，实现「总参数大、激活参数小」的稀疏计算（DeepSeek V3/Qwen 采用），高频追问负载均衡与路由不稳定。
- [长度外推：Position Interpolation / NTK-aware / YaRN] ⭐3 ｜ CSDN·大模型用到的位置编码汇总（面试，重点讲外推性） https://blog.csdn.net/qq_24211837/article/details/137800363；B站·卢菁博士 RoPE 详解（含长度外推） https://www.bilibili.com/video/BV1Aw4m1i7Qh；知乎·必会的位置编码 https://zhuanlan.zhihu.com/p/689205140 ｜ 一句话定义：让按短序列训练的 RoPE 模型在超过训练长度的上下文上保持效果的插值/缩放技术族，是位置编码面试的高频延伸题。
- [Self-Attention vs Cross-Attention（交叉注意力）] ⭐3 ｜ CSDN·2026 字节大模型岗面经汇总（明确列出此考点） https://blog.csdn.net/qq_45717425/article/details/160315245；腾讯云·Transformer 专题面经（多模态） https://developer.cloud.tencent.com/article/2588982 ｜ 一句话定义：Cross-Attention 中 Q 来自解码端、K/V 来自另一序列（编码器或多模态分支），是 Encoder-Decoder 架构与多模态融合的核心模块。

---

### 检索覆盖度说明
- 经外部检索直接核实：a1、a2、a3、a4、a5、a9、a10（7/10）
- 间接证据支撑（来自相关主题检索的延伸提及）：a6、a7
- 未经外部检索（专项检索超时，纯内置知识）：a8
- 超时的 2 次检索：「小林coding 大模型面试题」总览、「大模型面试 BPE 分词」（其目标信息已部分由其他来源覆盖，唯 BPE 专项缺失）
