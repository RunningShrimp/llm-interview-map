# 模块F 检索报告（推理部署与 MLOps）

（检索时间：2026-09-02；外部检索共 8 次；星级含义：5=几乎必问，1=罕见）

## f1-inference-basics 自回归解码与采样策略
- 星级：⭐4（维持。多部面试题库以独立条目收录 temperature/top_p/top_k 专问，且有面试对话体专文；在推理/工程岗属常规题，应用岗多结合参数调优与「复读机」问题出现，未达几乎必问）
- 来源：
  - 知乎《大模型面试题200问——part2》 https://zhuanlan.zhihu.com/p/1906012520134706394
  - CSDN《面试官："大模型参数，温度值、Top-P、Top-K 分别是什么？"》 https://blog.csdn.net/m0_59235945/article/details/163481854
  - 小林面试笔记《大模型生成文本时的解码策略有哪些？》 https://xiaolinnote.com/ai/llm/decoding_strategies.html
  - 牛客网《AI-Agent 面试题汇总-大模型篇》（LLM 复读机问题归因于温度/top-p 设置） https://www.nowcoder.com/discuss/860538803759386624
- 面试问法：
  - 「大模型参数，温度值、Top-P、Top-K 分别是什么？」
  - 「提高 temperature 同时降低 top_p，这两个参数是配合还是冲突？」（CSDN 文中追问，据检索摘要转述）
- 高频考点提示：
  - 自回归解码流程：逐 token 生成、因果 Mask 保证只依赖已生成内容
  - greedy / beam search 与采样式解码的取舍（确定性 vs 多样性）
  - temperature、top-k、top-p 各自作用机制与联合调参
  - 生产常用组合：top-p + repetition penalty（约1.1）+ no-repeat-ngram
  - 「复读机」问题成因与采样参数的关系（高频应用向追问）

## f2-kv-cache-pagedattention KV Cache 与 PagedAttention
- 星级：⭐5（上调。真实面经证实几乎必问：阿里云 Agent 算法一面原题直问 KV Cache；牛客有大厂推理类面试题总结专章；知乎专文明确标注考察频次，是推理方向第一高频概念）
- 来源：
  - 牛客网《阿里云Agent算法一面》（真实面经原题） https://www.nowcoder.com/discuss/924431631111159808
  - 牛客网《大厂大模型算法岗推理类面试题总结》 https://www.nowcoder.com/feed/main/detail/68262da0086c49dfad1848931306b17d
  - 牛客网《大模型常考面试题100 道（第76～100 道）》（预填充 vs 解码阶段） https://www.nowcoder.com/discuss/866256552519290880
  - 知乎专栏《大模型面试：KV Cache 的原理》（标注考察频次） https://zhuanlan.zhihu.com/p/1896128191459996017
  - CSDN《大模型面试题39：KV Cache 完全指南》 https://blog.csdn.net/weixin_45264425/article/details/156580442
- 面试问法：
  - 「KV Cache 是什么？为什么能加速大模型推理？」（阿里云一面原题）
  - 「预填充阶段和解码阶段有什么区别？」（牛客 100 道考点，据检索摘要转述归纳）
- 高频考点提示：
  - KV Cache 显存占用公式：层数 × KV头数 × head_dim × seq_len × batch × dtype 字节
  - PagedAttention 如何借鉴操作系统分页解决显存碎片、提升吞吐
  - 预填充（prefill）与解码（decode）两阶段的计算/访存特征差异
  - FlashAttention 与 PagedAttention 的区别（计算优化 vs 显存管理优化）
  - MQA/GQA 对 KV Cache 的压缩作用（高频追问，见新增建议）

## f3-quantization 模型量化（INT8/INT4、GPTQ/AWQ）
- 星级：⭐4（维持。有专章收录：小林面试笔记独立条目、知乎「面试118题」第九部分整章讲量化与部署；推理部署岗接近必问，应用岗常以「怎么选型」形式出现）
- 来源：
  - 小林面试笔记《大模型量化是什么？INT8/INT4/AWQ/GPTQ 怎么选？》 https://xiaolinnote.com/ai/llm/quantization.html
  - 知乎专栏《大模型面试118题（九）：模型量化与部署》 https://zhuanlan.zhihu.com/p/2057146652046235476
  - Datawhale base-llm《模型量化实战》 https://github.com/datawhalechina/base-llm/blob/main/docs/chapter13/01_quantization.md
  - PaddleNLP 官方文档《大模型量化教程》（GPTQ/AWQ 为主流 4bit 权重量化算法） https://paddlenlp.readthedocs.io/zh/latest/llm/docs/quantization.html
- 面试问法：
  - 「来讲讲什么是大模型量化？INT8、INT4、AWQ、GPTQ 这些方案怎么选？」
  - 「量化和蒸馏有什么区别？」（知乎 118 题考点）
- 高频考点提示：
  - PTQ vs QAT：GPTQ/AWQ/LLM.int8() 属训练后量化，QAT 需重训练
  - GPTQ：基于近似二阶信息（Hessian）逐层最优量化，精度略高；AWQ：激活感知、保护显著权重通道
  - INT8 更通用、精度损失小；INT4 压缩比高但可能掉点；离群值（outlier）问题
  - 量化 vs 蒸馏的区别（架构不变、降精度、无需重训练）
  - 结合 f5：量化后显存减半/减 3/4 的估算（7B FP16 约 14GB → INT4 约 3.5GB）

## f4-inference-frameworks 推理框架对比（vLLM/TensorRT-LLM/llama.cpp）
- 星级：⭐4（维持。多平台框架选型对比文密集产出，牛客「必知必会」系列收录 vLLM 专题并称其面试高频；工程/部署岗常问「生产环境你选哪个、为什么」）
- 来源：
  - 牛客网《LLM 大模型学习必知必会系列(十二)：VLLM 性能飞跃部署》 https://www.nowcoder.com/discuss/626190790787690496
  - 知乎专栏《一文梳理主流大模型推理部署框架：vLLM、SGLang、TensorRT-LLM》 https://zhuanlan.zhihu.com/p/1937266323156607848
  - CSDN《主流大模型加速推理框架对比表（vllm、tensorRT、llama.cpp）》 https://blog.csdn.net/weixin_52582710/article/details/146323699
  - 掘金《大模型工具对比：SGLang, Ollama, vLLM, LLaMA.cpp 如何选择？》 https://juejin.cn/post/7455138070298017811
- 面试问法：
  - 「vLLM 为什么比 HuggingFace Transformers 吞吐高 14-24 倍？」（牛客必知必会系列考点，据检索摘要转述归纳）
  - 「SGLang、Ollama、vLLM、llama.cpp 如何选择？」
- 高频考点提示：
  - vLLM：PagedAttention + 连续批处理（continuous batching），GPU 高吞吐生产服务首选
  - TensorRT-LLM：NVIDIA 内核级优化 + INT4/FP8 量化，极致性能但绑定生态
  - llama.cpp：GGUF 量化、CPU/边缘设备部署；Ollama 面向本地易用性
  - 框架选型答法：按硬件、吞吐/延迟要求、量化需求、运维成本四维展开

## f5-gpu-capacity-planning 显存估算与 GPU 选型
- 星级：⭐4（偏高。知乎专文标题直接标注「频次很高」，51CTO 福报厂面经收录，且有专文指出「只算权重忘算 KV Cache」是常见失分点；在算法/工程岗接近必问的计算题，应用岗略低于 KV Cache 故不给 5）
- 来源：
  - 知乎专栏《给一个大模型，如何估算训练和推理需要的显存？（频次很高）》 https://zhuanlan.zhihu.com/p/1891052810688242927
  - 51CTO《【AI大模型福报厂面经】大模型显存如何估算？》 https://blog.51cto.com/u_16163442/13410438
  - AI简历姬《大模型面试题：推理时除了权重还要考虑哪些显存开销》 https://www.resumemakeroffer.com/blog/post/107655
  - 阿里云官方文档《估算大模型所需显存》 https://help.aliyun.com/zh/pai/product-overview/estimation-of-the-required-video-memory-for-the-model
  - 牛客网《2024 大模型算法工程师面试题汇总》 https://www.nowcoder.com/feed/main/detail/5af881e158b6430f96d0b984d8dde0ce
- 面试问法：
  - 「给一个大模型，如何估算训练和推理需要的显存？」（知乎标题原句）
  - 「推理时除了权重还要考虑哪些显存开销？」；「为什么推理时显存涨那么多还一直占着？」（牛客 2024 汇总）
- 高频考点提示：
  - 推理显存 ≈ 权重（参数量 × 精度字节） + KV Cache + 激活/框架开销
  - 常用速算：7B FP16 权重约 14GB，INT8 约 7GB，INT4 约 3.5GB
  - KV Cache 随 batch 与序列长度线性增长，是长上下文显存主因（失分高发点）
  - 训练显存：权重+梯度+优化器状态（Adam 约 4 倍权重），7B 全量微调 BF16 约 56GB+
  - 由估算推导选型：单卡放不放得下、是否需张量并行/量化

## f6-prompt-injection-defense Prompt 注入与越狱防护
- 星级：⭐4（维持。来源明确指出该题「在面试中出现的频率越来越高」，且有多个独立面试题专页收录（阿里二面真题、Agent 安全面试题、防御 11 法）；LLM 应用/Agent 岗接近必问，但题面在传统算法岗出现率仍低于 f2/f5，故不升 5）
- 来源：
  - 知乎专栏《阿里大模型二面：Prompt 注入是什么？有哪些攻击方式？如何防护？》 https://zhuanlan.zhihu.com/p/2028965357902213891
  - golangstar《LLM 面试系列：Prompt 注入详解》 https://golangstar.cn/backend_series/llm_interview/prompt_injection.html
  - 知乎专栏《Agent 安全防护面试题：Prompt Injection 如何防御？》 https://zhuanlan.zhihu.com/p/2041312025226246078
  - CSDN《如何防御大模型中的 Prompt 攻击？》 https://blog.csdn.net/weixin_43160662/article/details/146437051
  - topcoder.cloud《LLM 防 Prompt 注入的 11 大方法（阿里面试）》 https://topcoder.cloud/info/3675
- 面试问法：
  - 「Prompt 注入是什么？有哪些攻击方式？如何防护？」（阿里大模型二面原题）
  - 「如何防御大模型中的 Prompt 攻击？」；Agent 追问：「工具调用场景下 Prompt Injection 如何防御？」
- 高频考点提示：
  - 本质：LLM 天然分不清「指令」与「数据」（对比 SQL 注入的异同）
  - 攻击分类：直接注入（DAN 越狱、角色扮演）、间接注入（RAG 文档/网页投毒）
  - 混淆手段：编码混淆、Unicode/不可见控制字符、低资源语言
  - 防御体系：输入过滤、指令分层（system/user 隔离）、输出检测、权限最小化、人工兜底
  - 安全性与可用性权衡：拒绝过多导致可用性差

## f7-llm-app-observability LLM 应用可观测性与线上评估
- 星级：⭐3（维持。主要出现在高阶/架构向题集（千题集第 19 部分将「全链路可观测性」列为架构师考核内容）与 Agent 开发面试宝典；一线应用岗常以「上线后怎么评估效果/排查 badcase」的开放题出现，未达高频独立考点）
- 来源：
  - CSDN《1000道算法工程师面试题（大模型）第19部分》（架构演进、成本控制、全链路可观测性） https://blog.csdn.net/qq_38334677/article/details/155107246
  - 博客园《大模型面试题》（涉及 LangSmith 全链路追踪、热点缓存设计） https://www.cnblogs.com/wusier/p/19084900
  - 阿里云开发者社区《AI Agent 全栈开发面试宝典（65题）》（生产级容错、可观测性考察） https://developer.aliyun.com/article/1739618
  - observability.cn《LLM 应用可观测性：从 Trace 视角展开的探索与实践》 https://observability.cn/article/gu6z473zsok13ywm/
- 面试问法：
  - 「LLM 应用上线后怎么做全链路追踪与效果评估（如 LangSmith）？」（据博客园面试题汇总归纳，非原文）
  - 「线上出现 badcase 如何定位是检索、模型还是编排层的问题？」（内置知识典型问法，未经外部检索原句）
- 高频考点提示：
  - Trace/_span 全链路追踪：网关→检索→LLM→后处理各环节打点
  - 线上评估：抽样人评 + LLM-as-judge + 回归评测集 + 业务指标
  - 关键监控指标：延迟分布（TTFT/TPOT）、token 消耗、错误率、幻觉率
  - 从成本与效果两个维度评估线上实际表现

## f8-llm-security-compliance 内容安全与合规（输出过滤/红队）
- 星级：⭐3（维持。未经直接外部检索证实专门面试题页——本次 8 次检索未覆盖到「内容安全合规/红队面试」专题；仅获相邻来源（安全知识库与攻击检测文章）。结合监管环境（生成式 AI 管理办法）与大厂安全团队面试惯例推断为中等频率，属推断）
- 来源：未经外部检索（仅有相邻安全来源，供参考）：
  - 安全内参《提示词注入攻击的检测和数据集介绍》 https://www.secrss.com/articles/78754
  - 《大模型安全权威指南》（GitBook）直接提示注入技术章节 https://yeasy.gitbook.io/ai_security_guide/di-er-bu-fen-gong-ji-pian/04_prompt_injection/4.2_direct_injection
  - Prompt Engineering Guide 中文版《对抗性提示》 https://www.promptingguide.ai/zh/risks/adversarial
- 面试问法（未经外部检索：内置知识典型问法）：
  - 「如何对大模型的输入输出做内容安全过滤？」
  - 「你们怎么做大模型红队测试/安全评测？」
- 高频考点提示：
  - 分层过滤：输入侧敏感词/分类器 → 模型侧安全对齐 → 输出侧审核（moderation API）
  - 国内合规要点：《生成式人工智能服务管理暂行办法》、备案与内容标识要求
  - 红队测试：攻击用例库、越狱测试集、自动化红队 + 人工复核
  - 与 f6 的边界：f6 偏攻击与防御技术，f8 偏内容安全体系与合规落地

## f9-cost-optimization 成本优化（缓存/批处理/模型路由）
- 星级：⭐3（维持。真实题面存在于 Agent 面经 300 题（模型路由、语义缓存原题）与 JavaGuide 网关专页（路由/Fallback/Token 预算）；多作为系统设计或 Agent 岗的追问出现，独立成题频率中等）
- 来源：
  - 知乎专栏《Agent算法工程师面经（300题版）》（含「设计Agent的模型路由策略：大小模型协同」「如何实现Agent的语义缓存」） https://zhuanlan.zhihu.com/p/2013066841401099455
  - JavaGuide《大模型网关详解：多模型路由、Fallback、限流与成本控制》 https://javaguide.cn/ai/system-design/llm-gateway.html
  - CSDN《1000道算法工程师面试题（大模型）第19部分》（成本控制高阶题） https://blog.csdn.net/qq_38334677/article/details/155107246
- 面试问法：
  - 「设计 Agent 的模型路由策略：大小模型协同」（知乎 300 题原题）
  - 「如何实现 Agent 的语义缓存」（知乎 300 题原题）
- 高频考点提示：
  - 模型路由：简单请求走小模型/规则，复杂请求升级大模型，按置信度或分类器分流
  - 缓存三层：Prompt 前缀缓存（KV 复用）、语义缓存（相似问题命中）、结果缓存与失效策略
  - 批处理：连续批处理与离线批量任务错峰，摊薄单 token 成本
  - Token 预算与成本统计：网关层计量、配额、按调用方分摊

## 建议新增知识点清单
- [MQA/GQA/MLA：KV Cache 压缩与注意力结构优化] ⭐4 ｜ 来源：牛客网《LLM面试题：Transformer》（MQA 共享 K/V 降低显存，https://www.nowcoder.com/discuss/867917874684297216 ）；牛客网《美团北斗大模型面试》（真实面经考「Attention 显存优化策略」，https://www.nowcoder.com/discuss/914814345970782208 ）｜ 一句话定义：通过多个 Query 头共享（MQA）、分组共享（GQA）或低秩潜压缩（MLA）K/V，大幅降低 KV Cache 显存与带宽占用的模型结构侧优化，是 KV Cache 话题最高频的追问点（可与 f2 合并讲授，建议独立小节）。
- [FlashAttention 与 Attention 计算优化] ⭐4 ｜ 来源：牛客网《LLM面试题：Transformer》（Flash Attention 减少显存占用，同上链接）；小林 coding《2026最全AI大模型面试题》含「KV Cache 与 Flash Attention 推理优化」专题（https://www.xiaolincoding.com/project/xiaolinnote.html ）；牛客网《大厂大模型算法岗推理类面试题总结》（https://www.nowcoder.com/feed/main/detail/68262da0086c49dfad1848931306b17d ）｜ 一句话定义：IO 感知的精确注意力内核优化，通过分块计算与 online softmax 减少 HBM 读写；面试常考其与 PagedAttention 的区别（计算优化 vs 显存管理优化）。
