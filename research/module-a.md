# 模块A 检索报告 v2（层级化）

> 检索时间：2026-09-03。v2 在 v1（2026-09-02，8 次检索）基础上补充 5 次检索（中文面经方向 3 次 + 英文架构趋势方向 2 次，另抓取 1 篇长面经全文核对）。
> 星级定义沿用 v1：5=几乎必问；4=高频；3=中频常作为追问或手撕项；2=偶尔；1=冷门。
> 层级定义：L1=零基础开场直觉题（校招/转行人群）；L4=扩展探讨题（3-10 年资深岗）。

## 继承考点（a1~a10 v1 结论）

星级、来源与面试问法全部沿用 v1（2026-09-02 核实），直接继承：

| id | 考点 | 星级 | 主要来源（摘自 v1） |
|---|---|---|---|
| a1 | Transformer 整体架构 | ⭐5 | 牛客·大模型常考面试题100道（第1题） https://www.nowcoder.com/discuss/865888054261706752 ；卡码笔记 https://notes.kamacoder.com/interview/llm/transformer_interview.html |
| a2 | Self-Attention 与 QKV（含 √d_k） | ⭐5 | 牛客100道（第3、4题） https://www.nowcoder.com/discuss/865888054261706752 ；掘金36题 https://juejin.cn/post/7624738045101375538 |
| a3 | Multi-Head Attention（概念+手撕） | ⭐5 | 牛客100道（第5题）；CSDN·手撕多头注意力 https://blog.csdn.net/weixin_44151034/article/details/161667240 ；知乎·LLM手撕合集 https://zhuanlan.zhihu.com/p/2022092403721479678 |
| a4 | 位置编码（正弦/RoPE/ALiBi） | ⭐4 | 小林笔记 https://xiaolinnote.com/ai/llm/position_encoding.html ；知乎·必会的位置编码 https://zhuanlan.zhihu.com/p/689205140 ；CSDN·位置编码汇总 https://blog.csdn.net/qq_24211837/article/details/137800363 |
| a5 | LayerNorm vs BatchNorm（+RMSNorm） | ⭐4 | CSDN面试题33 https://blog.csdn.net/weixin_45264425/article/details/156534125 ；知乎·归一化方法总结 https://zhuanlan.zhihu.com/p/689516256 |
| a6 | 残差连接与 Pre-LN/Post-LN | ⭐3 | 间接来源：知乎·归一化方法总结 https://zhuanlan.zhihu.com/p/689516256 ；其余未经外部检索（内置知识） |
| a7 | FFN 与激活函数（GeLU/SwiGLU） | ⭐3 | 间接来源：牛客·手撕代码总结（FFN 为手撕四大件之一） https://www.nowcoder.com/feed/main/detail/5a43a5d03e5746e5b743bb488a5c00f9 ；其余未经外部检索（内置知识） |
| a8 | 分词（BPE）与 Embedding | ⭐3 | 未经外部检索：内置知识（v1 专项检索超时） |
| a9 | Encoder-only/Decoder-only/Enc-Dec 对比 | ⭐5 | 牛客100道（第2题） https://www.nowcoder.com/discuss/865888054261706752 ；牛客·为什么几乎都是 Decoder-only https://www.nowcoder.com/discuss/859194501846315008 ；掘金 https://juejin.cn/post/7503474192764616704 |
| a10 | 注意力复杂度与优化（KV Cache/GQA/MLA） | ⭐4 | 知乎·手写 MHA 带 KV Cache https://zhuanlan.zhihu.com/p/1914362873347544443 ；GitHub 107题 https://github.com/adongwanai/AgentGuide/blob/main/docs/04-interview/16-llm-fundamentals.md ；博客园 https://www.cnblogs.com/moonout/p/19722167 |

v1「建议新增知识点清单」（MoE ⭐4、长度外推 ⭐3、Self- vs Cross-Attention ⭐3）仍然有效，本表不重复罗列。

## 层级化新增/调整建议

1. [模型是怎么学的：过拟合/欠拟合在大模型中的形态] ｜ 建议层级 L1（概念开场可讲，追问延伸至微调/训练场景） ｜ ⭐4 ｜ 来源：
   - 技术栈·【AI大模型春招面试题17】过拟合、欠拟合在大模型中的表现与解决策略（称「高频必考题，通常出现在二面或三面」，讲大模型特有形态） https://jishuzhan.net/article/2042773582061830145
   - 牛客·美团大模型算法岗完整面经（二面原题「微调阶段防止模型过拟合的常用方案与实操技巧」） https://www.nowcoder.com/feed/main/detail/b264abf14d4d4c44bc022c9ea1dce981
   - 面试大师·字节算法面经《如何判断模型是否过拟合？》（标注「算法岗真实面经题」） https://mianshidashi.cn/interview-questions/bytedance/algorithm-engineer/bytedance-algorithm-overfitting-diagnosis
   - 牛客·百度NLP算法岗秋招高频ML/DL八股（过拟合处理方法；「训练 Loss 不下降，从激活函数和初始化角度分析」） https://www.nowcoder.com/discuss/906250776782139392
   ｜ 一句话定义：经典「模型怎么学的」概念题在大模型岗的考法已从教科书定义升级为「大模型特有形态」——SFT/微调阶段过拟合（死记硬背、多样性崩塌）、数据去重比加正则更关键、LoRA 自带正则化、验证 Loss 与人类偏好不总是正相关。
2. [Decoder-only 之后：混合架构（Mamba/线性注意力）与 Encoder-Decoder 复兴（2025-2026）] ｜ 建议层级 L4 ｜ ⭐3 ｜ 来源（均为英文技术博客共识，未在中文面经核实到独立提问，故星级取 3 不更高）：
   - GonzoML·The Transformer Zoo Revisited（2025-11-29：RedLLM（现代化 Enc-Dec）vs DecLLM 在 150M~8B 的系统对比——DecLLM 预训练 compute-optimal 占优（同困惑度省约一半 FLOPs），但 RedLLM 微调后效果反超且推理吞吐/质量 Pareto 占优、长上下文外推更平滑；T5Gemma 系列体现 Enc-Dec 复兴） https://gonzoml.substack.com/p/the-transformer-zoo-revisited
   - The Post-Transformer Era（2026-02-10：Jamba 1:8、IBM Granite 4.0 约 1:10 的注意力/SSM 混合配比成生产共识；2025 消融显示纯 SSM 移除注意力层后检索准确率降为 0） https://blog.serendeep.tech/blog/the-post-transformer-era
   - When the model isn't a transformer（2026-06-13：Qwen3.6-35B 主体用 Gated DeltaNet、Nemotron-3-Nano 用 Mamba2，非注意力架构进入生产模型） https://rfriedmann.de/blog/when-the-model-is-not-a-transformer/
   - Nick Gustafson·Decoder-Only vs. Encoder-Decoder（Why decoder-only won 的标准论证：简单性可扩展、Scaling Law 在 decoder-only 上建立、in-context learning、KV Cache 单栈；并澄清「causal 不能理解上下文」是误区） https://thegustafson.com/blog/decoder-vs-encoder-decoder
   ｜ 一句话定义：a9 的「Decoder-only 为何胜出」在 2025-2026 有了新续章——胜出结论仍是生产主流，但 L4 岗位需要知道线性注意力/SSM 混合架构（Jamba、Granite、Nemotron、Kimi K3 用 KDA）已落地，且有研究（T5Gemma/RedLLM）显示现代 Enc-Dec 在微调后质量与推理效率上可反超。

## 面试问法补充

新增考点 1（模型怎么学的/过拟合）：
- 「微调阶段防止模型过拟合的常用方案与实操技巧？」（美团二面原题，牛客面经）
- 「过拟合、欠拟合在大模型中的表现与解决策略？」（技术栈题17标题原话；其答题框架：过拟合=模型「死记硬背」/车轱辘话/指令遵循退化，欠拟合=Loss 居高不下/逻辑混乱，解法先讲数据去重再讲训练策略）
- 「你的网络训练时 Loss 不下降，可能是什么原因？从激活函数和初始化角度分析。」（牛客·百度 NLP 秋招八股收录）

新增考点 2（Decoder-only 之后的变局）：
- 「为什么现在的大模型几乎都是 Decoder-only 架构？」（v1 已核实，牛客讨论帖标题原文，仍是标准问法）
- 「Decoder-only 是唯一答案吗？Jamba/Granite 这类 Mamba 混合架构是怎么回事，什么场景该用？」（推断问法：由上述 2025-2026 英文博客内容归纳，供 L4 扩展探讨用；未在中文面经原文中见到该问法）

## 未找到/未核实事项

- 「什么是大模型」「为什么大模型能对话」这类零基础直觉题：本轮 3 次中文检索（面经、题库、通俗问答方向）均未在真实面经原文中发现此类问法——真实面试的「简单题」直接是技术版（如「讲一下 Transformer 架构」=a1、「BERT 和 GPT 的核心区别」=a9）。结论（推断）：L1 直觉题适合作为学习站的教学入口设计，但不应标注「真实面经出现」；51CTO《字节面试官：不用看复杂公式，能把大模型训练原理讲清楚吗？》 https://www.51cto.com/article/846646.html 显示「不用公式通俗讲清训练原理」是一种内容化问法形态，但该文属题库/科普文而非面经，仅作线索不作结论。
- 智源社区·《我的大模型岗位面试总结：共24家，9个offer》 https://hub.baai.ac.cn/view/31151 （2023-09，24 家真实面经复盘）的高频考点排序佐证了继承结论：多头注意力「频率太高，coding 轮概念轮都考」、各种 Norm 频率不低、BERT/GPT 细节+自回归、训练问题（loss spike/loss 炸了如何解决）、BPE/tokenization/数据配比——与 a1/a2/a3/a5/a8/a10 的星级判断一致；a8（BPE/tokenization）因此获得间接证据支持，v1 的 ⭐3 可信。
- v1 中 a6/a7/a8 标注「未经外部检索」的部分，本轮未做专项补检，标注继续有效。
