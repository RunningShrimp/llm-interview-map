# 模块G 检索报告 v2（层级化）

> 检索时间：2026-09-03。检索方式：中英文 Web 检索共 5 次（英文经 Exa、中文经 web-search-prime），全部成功。
> v1（2026-09-02）结论全部继承，星级无一下调；本轮围绕 3 个分层验证目标补充检索：①分步答题框架在 LLM 设计题中的通用性；②资深权衡表达考察点；③全案综合设计题的出现频率。
> 结论先行：①证实——多个独立来源宣称「一个框架适用所有 GenAI/LLM 设计题」，但步数无统一标准（4~8 步皆有，骨架一致：澄清→估算→架构→深挖→权衡→失效/演进）；②证实——「每个技术选择说清代价」有中英文多源面试官侧证据，属资深评分信号；「能出题考别人」仅有备考方法论来源、无面试官侧来源，建议只作自测机制不作考点；③证实——企业知识库/Agent 端到端全案题在 2025-2026 大厂 GenAI 设计轮高频复现（英文真题库收录 Amazon/Microsoft/OpenAI 真题，备考指南称 recurring prompt），中文侧仅有间接印证。

## 继承考点（g1~g5 v1 结论）

| id | 星级 | 来源（v1 已核实，URL 见文末 v1 存档列表） | v1 代表问法（保留） |
|---|---|---|---|
| g1-knowledge-qa-system 企业知识库问答系统设计 | ⭐5 维持 | 腾讯真题（知乎 p/1975313777063920370）、掘金 RAG 22 题、博客园 RAG 夺命 10 连问、卡码笔记 RAG 大厂汇总、CSDN 面试官问答篇 | 「如何设计 RAG 知识库的构建方案？」「RAG 解决了大模型的哪些痛点？」 |
| g2-agent-system-design Agent 应用系统设计 | ⭐4 维持 | 知乎 Agent 面试总结(三)、火山引擎 15 道高频题、牛客 AI-Agent 汇总、JavaGuide AI 面试指南、GitHub 题库 | 「ReAct / Plan-and-Execute、多 Agent 协作、记忆机制如何设计？长耗时工具如何异步处理？」 |
| g3-system-design-template 系统设计答题模板 | ⭐3 维持（v2 建议其 GenAI 适配版拆层上调，见下） | JavaGuide AI 系统设计面试题总结、超级简历四步框架、牛客回答要领、CSDN 10 个架构设计题、知乎大模型 200 问 part2 | 「大模型限流为什么同时看 RPM、TPM、并发数和租户预算？」「如何设计模型 fallback？」 |
| g4-star-project-narrative 项目深挖与 STAR 法表达 | ⭐4 维持 | CSDN STAR 法则×2、人人都是产品经理、知乎 STAR 面试法、腾讯云开发者社区 | 「为什么做这个项目？遇到什么困难如何解决？」（面试官按 STAR 逐层追问验证真实性） |
| g5-interview-strategy 高频追问、反问与临场策略 | ⭐3 维持 | GitHub reverse-interview-zh、牛客反问环节帖、CSDN 反问环节、CVMart 灵魂 50 问 | 「就这次面试，您觉得我还有哪些地方需要提升？」 |

- 附：v1 已建议新增的 g6-llm-app-evals（⭐4）、g7-llm-prod-governance（⭐3）沿用 v1 来源与结论，本轮未重复核实。
- v1 五个考点原始详情（高频考点提示、完整问法、来源清单）以 v1 报告为准，本轮未改动其结论；上表「来源」列为缩写，完整 URL 清单保留在本文件末尾「v1 来源存档」。

## 层级化新增/调整建议

- [g3a-genai-design-framework ｜ LLM/GenAI 系统设计分步答题框架（六步法及变体）] ｜ 调整：g3 的 GenAI 适配拆层版（原 g3 通用模板维持 ⭐3 不动） ｜ 建议层级 L3（记框架、走流程）→ L4（把传统维度替换为 TTFT/成本/评测等 GenAI 维度并做权衡收尾） ｜ ⭐4（较 g3 上调） ｜ 来源：KDnuggets（7 步通用框架，原文称 "one reusable framework that works across all of these prompts"，并转述 System Design Handbook 的 8 步版）https://www.kdnuggets.com/how-to-answer-ai-system-design-interview-questions ；SegmentFault「6 个步骤搞定系统设计面试」（中文六步法直接来源：澄清需求→定义成功标准→高层架构→数据层→扩展性与可靠性→收尾）https://segmentfault.com/a/1190000047553098 ；igotanoffer（GenAI 5 步框架：Problem framing→HLD→Deep dive→Tradeoffs→Conclusion）https://igotanoffer.com/en/advice/generative-ai-system-design-interview ；PracHub（50 分钟分段框架 0-7/7-12/12-22/22-37/37-45/45-50 分钟）https://prachub.com/resources/generative-ai-system-design-interviews-how-to-design-llm-applications-that-work-in-production ｜ 一句话定义：澄清需求→规模估算→高层架构→组件深挖→权衡表达→失效模式与演进的分步框架，被 5 个以上独立来源证实适用于任意 LLM/GenAI 设计题；注意步数无行业标准（4/5/6/7/8 步并存），学习站应教骨架而非锁死步数。
- [g8-senior-tradeoff-signals ｜ 资深权衡表达信号（每个技术选择说清代价）] ｜ 新增 ｜ 建议层级 L4（资深） ｜ ⭐4 ｜ 来源：myengineeringpath（原文："Explicit trade-off language. 'I chose X because…' … signals seniority. 'We will use Pinecone' without justification signals inexperience. Every significant component choice should come with a brief trade-off explanation."；并要求能答出「删掉每个组件会坏什么」）https://myengineeringpath.dev/genai-engineer/system-design/ ；PracHub GenAI 指南的 weak/senior 评分对照表（Trade-off leadership：senior = 主动摆出 precision vs latency、cost vs quality 等张力并捍卫选择）https://prachub.com/resources/genai-llm-system-design-interview-guide-2026 ；腾讯云开发者社区《架构师面试全解析》（以完整系统架构图考察用户端到数据层全链路思考与技术广度）https://developer.cloud.tencent.com/article/2595458 ；mianba.app（「别只背八股，要能讲清架构取舍」：面试官持续追问方案边界、技术取舍和真实落地经验）https://mianba.app/seo/java-architect-interview-questions ；GreatFrontEnd 评估轴（面试官按「期望行为信号」累计给出聘用与定级建议）https://www.greatfrontend.com/zh-CN/front-end-system-design-playbook/evaluation-axes ｜ 一句话定义：面试官把「主动说明每个选型的代价与替代方案、能推演失效路径、主动摆出张力」作为区分资深与初级的评分信号——无权衡解释的组件堆砌被视为背题。与 v1 g3 的「展现权衡比背模板更重要（牛客）」互为印证。
- [g9-full-case-capstone ｜ 全案综合设计题（企业知识库全案 / Agent 平台全案）] ｜ 新增（g1/g2 的「全案版」进阶层） ｜ 建议层级 L3（给出全链路架构）→ L4（在给定规模/延迟/成本约束下完成评测、安全、失效与权衡收尾） ｜ ⭐4 ｜ 来源：PracHub 真题库收录的独立全案题——Amazon「Design a RAG system end to end」（给定 5-10M 页语料、200 QPS 峰值、p95≤2.0s、15 分钟新鲜度，要求覆盖摄入/检索/编排/引用/隐私/评测/监控九项）https://prachub.com/interview-questions/design-a-rag-system-end-to-end ；Microsoft「Design a RAG system with agentic tools」（企业知识库 RAG + Agent 工具调用 + 文档增删 + 安全护栏）https://prachub.com/interview-questions/design-a-rag-system-with-agentic-tools ；OpenAI「Design enterprise RAG search system」（多租户、10-100M chunks、P95≤3s、ACL 与 prompt injection 防护）https://prachub.com/interview-questions/design-enterprise-rag-search-system ；systemdesign.academy（"Asked at OpenAI, Anthropic, Google, Microsoft, Meta, Databricks… It shows up as a standalone AI system design question and as the retrieval half of larger designs like an AI agent platform"）https://www.systemdesign.academy/interview/design-rag-system ；PracHub 2026 指南（"A recurring prompt in GenAI interview loops is some version of: 'Design a conversational AI agent for our enterprise knowledge base.'"）https://prachub.com/resources/genai-llm-system-design-interview-guide-2026 ｜ 一句话定义：以带具体规模/延迟/成本约束的端到端全案形式考察 RAG 知识库或 Agent 平台（架构+评测+安全+失效+权衡缺一不可），2025-2026 年在 OpenAI/Amazon/Microsoft 等公司的 GenAI 系统设计轮反复出现；中文侧仅由 v1 g1 的腾讯真题间接印证，未检索到「终极全案」措辞的中文一手真题——频率结论标注为「多来源共识，非中文一手统计」。

### 备注：「能出题考别人」的处理
- 未找到「面试官以『能否出题考别人』考察资深候选人」的直接来源；仅有备考方法论侧证据：Data Vidhya Peer Mocks（"the candidate seat is not where most of the learning happens. The interviewer seat is… Building a probe ladder for someone else is the deepest possible rehearsal for facing one"）https://datavidhya.com/learn/de-interview-prep/mock-interview-system/peer-mocks/ ；Educative 创始人 Fahim ul Haq（设计面试是 communication-heavy，口头表达推理的能力与技术决策本身几乎同等重要，应尽早做 mock）https://engineeringenablement.substack.com/p/the-system-design-interview-practice 。
- 建议：不设独立考点，作为 g9 全案题的配套自测法写进学习站（「给同伴出 3 层追问、坐一次面试官席」），标注「未经外部检索证实为面试考察点」。
- 层级命名（L3/L4）为推断表述，落地时需按站内四级既有定义对齐。

## 面试问法补充

- g3a（分步答题框架）：
  - 「拿到『设计一个企业知识库/ChatGPT』这类题，你的前 5-10 分钟会做什么？」——KDnuggets 指出面试复盘中的第一大失败是「没澄清需求就开始画图」（jumping to a solution before clarifying requirements）。
  - 「GenAI 设计题和传统系统设计题的答题流程有什么不同？哪些维度必须替换？」——igotanoffer/PracHub 均以「GenAI 专步框架」独立成节，差异点是 TTFT、token 成本、评测与安全层。
- g8（资深权衡表达信号）：
  - 「你为什么选 X 而不是 Y？它的代价是什么？」——对应 myengineeringpath 的 "I chose X because…" 句式要求与 Reddit 架构师反问「为什么选择集成模式 X 而不是 Y」的考察直觉；mianba.app 的追问形式为「这个方案的边界在哪里？」。
  - 「如果把向量库退化为关键词检索/去掉重排层，系统会坏在哪？」——myengineeringpath 原文：列出组件却答不出「删掉它会怎样」，会被读作「背题而无真实理解」。
- g9（全案综合设计题）：
  - 「设计一个端到端企业 RAG 系统：500 万~1000 万页语料、峰值 200 QPS、p95 ≤ 2 秒、新内容 15 分钟内可检索，请覆盖摄入/检索/编排/引用/隐私/评测/监控。」（PracHub 收录的 Amazon 真题条件转写）
  - 「为我们企业知识库设计一个对话式 AI Agent，RAG 为主、必要时允许 Agent 工具调用，讨论记忆、评测、prompt injection 防护与并发隔离。」（PracHub：GenAI 面试循环反复出现的问法 + 收录的 Microsoft/Amazon 企业 Agent 全案变体）

## v1 来源存档（g1~g5 完整 URL，2026-09-02 核实）

- g1：https://zhuanlan.zhihu.com/p/1975313777063920370 ；https://juejin.cn/post/7634065319066550323 ；https://www.cnblogs.com/12lisu/p/19921242 ；https://notes.kamacoder.com/interview/llm/rag_interview.html ；https://blog.csdn.net/charles666666/article/details/147359748
- g2：https://zhuanlan.zhihu.com/p/2060785188943164764 ；https://developer.volcengine.com/articles/7582490980381950015 ；https://www.nowcoder.com/discuss/860538803759386624 ；https://javaguide.cn/ai/interview-questions/ai-interview-guide.html ；https://github.com/didilili/ai-agents-from-zero/blob/main/AI%E6%99%BA%E8%83%BD%E4%BD%93%E4%B8%8E%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91%E9%9D%A2%E8%AF%95%E9%A2%98%E5%BA%93.md
- g3：https://javaguide.cn/ai/interview-questions/ai-system-design-interview-questions.html ；https://www.wondercv.com/blog/TT61czIu.html ；https://www.nowcoder.com/discuss/743518189807505408 ；https://blog.csdn.net/musicml/article/details/150207822 ；https://zhuanlan.zhihu.com/p/1906012520134706394
- g4：https://blog.csdn.net/fegus/article/details/127296291 ；https://www.woshipm.com/pmd/5517853.html ；https://blog.csdn.net/weixin_42537413/article/details/106137902 ；https://zhuanlan.zhihu.com/p/1997427327630610921 ；https://cloud.tencent.com/developer/article/2130459
- g5：https://github.com/perkfly/reverse-interview-zh ；https://www.nowcoder.com/discuss/537284339151790080 ；https://blog.csdn.net/2501_94480392/article/details/161111418 ；https://www.cvmart.net/community/detail/1078

## 开放问题
- 「终极架构设计题」的中文一手频率数据缺失：未检索到阿里/腾讯/字节 2025-2026 面经中明确使用「全案/终极」措辞的统计，中文频率结论目前靠 v1 g1 腾讯真题 + 英文真题库类比支撑（标注为推断）。
- 六步法的「步数」无权威定式：4 步（Alex Xu 体系/超级简历）、5 步（igotanoffer/asadqi）、6 步（SegmentFault）、7 步（KDnuggets）、8 步（System Design Handbook）并存，学习站宜声明「骨架一致、步数为教学包装」。
