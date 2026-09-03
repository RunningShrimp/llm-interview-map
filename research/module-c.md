# 模块C 检索报告 v2（层级化）

> 检索日期：2026-09-03｜检索工具：WebSearch（中文 web-search-prime ×5、英文 exa ×1，另 1 次批量抓取核实原文）
> 继承口径：星级沿用 v1（5=几乎必问，4=高频，3=常见，2=偶见，1=罕见）；v1 中 c1/c3/c4 为检索核实，c2 为旁证，c5/c6 为内置知识判断，均原样继承。
> v2 目标：核实三个层级化考点——①复杂 Prompt 体系设计/提示词工程化治理（L4）、②幻觉分层防御体系（资深追问链）、③L1 直觉类开场题（非算法岗形态）。三个方向均获得外部来源支撑。

## 继承考点（c1~c6 v1 结论）

| id | 标题 | 星级 | 来源（v1 结论） |
|---|---|---|---|
| c1 | Prompt 基础与结构化写法 | ⭐5 | 检索核实：牛客官方题单/面试鸭/力扣/知乎校招面经（见 v1 来源表） |
| c2 | 思维链 CoT 与推理增强（CoT/ToT/Self-Consistency） | ⭐5 | v1 内置知识判断；v2 获旁证：火山引擎《Agent 提示词工程相关要点（五）》15 题中涵盖 Chain-of-Thought（https://developer.volcengine.com/articles/7582491099638267930 ），星级维持 |
| c3 | 幻觉成因与缓解 | ⭐5 | 检索核实：小林面试笔记/牛客/知乎（见 v1 来源表）；v2 进一步核实其资深岗追问链形态（见新增建议②） |
| c4 | LLM API 实务（参数/流式/限流重试/成本） | ⭐4 | 检索核实：小林 coding/知乎/前端&AI 工程化面试指南/JavaGuide（见 v1 来源表） |
| c5 | 结构化输出与 JSON Mode | ⭐3 | 未经外部检索（v1 内置知识判断），维持 |
| c6 | 长上下文与 lost in the middle | ⭐3 | 未经外部检索（v1 内置知识判断），维持 |
| n1（v1 新增） | Function Calling 与工具调用（Tool Use） | ⭐4 | 检索核实：牛客 AI-Agent 面试题汇总/面试鸭（见 v1 来源表） |
| n2（v1 新增） | 多轮对话管理与记忆（Memory/上下文管理） | ⭐3 | 检索核实：面试鸭/牛客（见 v1 来源表） |

## 层级化新增/调整建议

- **[复杂 Prompt 体系设计与提示词工程化治理（多 Agent 提示体系/版本管理/Prompt-as-Code）]** ｜ 建议层级 L4 ｜ ⭐4 ｜ 来源：Interview Coder《Top 40 Prompt Engineer Interview Questions》(2026-05-26) https://www.interviewcoder.co/blog/prompt-engineer-interview-questions ；gitGood《AI System Design Interview Questions》(2026-08-14) https://gitgood.dev/blog/ai-system-design-interview-questions-2026 ；ClarityHire《How to Interview AI Engineers》(2026-06-09) https://clarity-hire.com/blog/how-to-interview-ai-engineers ；中文侧：JavaBetter《AI Agent 面试题第五弹：Prompt 分层架构、Skill 系统》 https://javabetter.cn/sidebar/itwanger/paicli/paicli-interview-prompt-skill.html ；GitHub 题库 ai-agents-from-zero（提示词模板化/灰度/评测条目） https://github.com/didilili/ai-agents-from-zero ；GitCode/CSDN《大模型与 Agent 智能体工程师面试指南》（Prompt-as-Code） https://gitcode.csdn.net/6a08858f662f9a54cb74f803.html ｜ 一句话定义：资深/架构师轮把提示词当作代码资产治理——system prompt 分层架构、git 版本管理与灰度发布（prompt 版本与模型版本一同 pin 住、变更回滚如同 deploy）、多 Agent 提示体系（orchestrator/子 agent 提示分工），硬编码提示词被视为 junior 反模式。
- **[幻觉分层防御体系（从单点缓解到体系化追问链）]** ｜ 建议层级 L4（追问链可作为 L3→L4 过渡素材）｜ ⭐4 ｜ 来源：博客园《大模型面试题》（围绕「SELF-RAG 报错自愈系统+五重幻觉防御」项目的高级工程师/算法专家岗 10 题全链） https://www.cnblogs.com/wusier/p/19084900 ；53AI《大模型面经——关于大模型幻觉问题的深化理解》(2024-07-20) https://www.53ai.com/news/RAG/2024072018365.html ；gitGood（同上，"hallucination rate is an SLO"） https://gitgood.dev/blog/ai-system-design-interview-questions-2026 ；GitHub AgentGuide 大厂 RAG 专项面经（项目题「阐述大模型的幻觉现象及抑制方法」） https://github.com/adongwanai/AgentGuide/blob/main/docs/04-interview/12-company-interview-cases.md ｜ 一句话定义：资深岗将 c3 从「幻觉是什么/怎么缓解」的单点八股升级为体系化追问链：量化指标（幻觉率/引用有效率/拒答率）→ 分层防御（检索反思与拒答、强约束提示词、后处理引用校验、用户反馈降权闭环、低温参数）→ 隐式幻觉的主动探测与自我纠正 → 幻觉率当作 SLO 运营而非一次性修复的 bug。
- **[评测驱动的 Prompt 迭代（golden set / LLM-as-judge / 灰度 A/B）]** ｜ 建议层级 L3（资深轮可追问至 L4 的「评测即架构」）｜ ⭐4 ｜ 来源：Interview Coder（面试 loop 中含 60 分钟 eval design 专轮；「Version in git. Re-run on every prompt change」） https://www.interviewcoder.co/blog/prompt-engineer-interview-questions ；ClarityHire（「the prompt is downstream of the eval」；staff/lead 轮系统设计权重 35%） https://clarity-hire.com/blog/how-to-interview-ai-engineers ；gitGood（「Output quality is probabilistic, so evaluation is architecture」；「eval sets are versioned artifacts」） https://gitgood.dev/blog/ai-system-design-interview-questions-2026 ；DataInterview《Top 32 Prompt Engineering Interview Questions》（Evaluation, Iteration & Testing 独立章节，golden set 50-200 条 + CI 门禁） https://www.datainterview.com/blog/prompt-engineering-interview-questions ；中文侧：牛客《大模型面试》话题（「七、Prompt 评估」：自动评估指标+人工评估+用户反馈） https://www.nowcoder.com/creation/subject/278ae3e75eca413fa6f96d70cd03ae57 ｜ 一句话定义：用 20~200 条版本化 golden set + LLM-as-judge + 灰度/AB 实验驱动提示词迭代，每次 prompt 变更必须跑评测并设回归门禁——有 shipped 经验与只做过 demo 的候选人在此题上区分度最大。
- **[L1 直觉类开场题：「怎么把 AI 用好」/大模型能力边界（非算法岗形态）]** ｜ 建议层级 L1 ｜ ⭐3（限非算法岗/泛技术岗口径；AI 岗不适用）｜ 来源：小林面试笔记首页（「连后端开发、前端开发、数据开发这些原本跟 AI 隔了一道墙的岗位，面试官也开始或多或少地问起 AI 题了」） https://xiaolinnote.com/ai/ ；牛客《关于面后端岗面试官问 AI》（后端面经中面试官问 langchain/transformer 及「AI 场景题」，社区求助帖，单一来源线索） https://www.nowcoder.com/feed/main/detail/abed2d2634dc4d2982b70b56c5db7b37 ；牛客《面试官会追问的 AI 产品八股》（章节从「大模型基础概念」开场，Agent 与提示工程为「最高阶、面试重点」） https://www.nowcoder.com/discuss/889870139196227584 ；牛客《AI 产品经理面经汇总》（「AI 产品经理岗考察：大模型能力边界+产品方案+数据分析+商业化理解」） https://www.nowcoder.com/discuss/891328632507932672 ｜ 一句话定义：非算法岗（后端/产品/测试等）以直觉类开场题和 AI 场景题切入——考察「大模型能力边界在哪、什么任务适合交给模型、你平时怎么用它提效」，答案分层在于能否给出可复用的个人工作流而非罗列工具名。
  - 注：未检索到「怎么把 AI 用好」逐字原题；上述问法为依据来源形态的概括与推断，已逐条标注。

## 面试问法补充

**复杂 Prompt 体系设计与提示词工程化治理（L4）**
- 「How do you version a system prompt?」（Interview Coder Q38，原文；参考答案要点：像代码一样进 git、语义化版本、生产调用同时 pin prompt 版本与模型版本、每次变更跑评测、回滚如同 deploy）
- 「Prompt Engineering 中，如何系统优化提示词并把准确率做上去？」（GitHub 题库 ai-agents-from-zero，检索摘要原文；答案强调任务拆解、样例驱动而非堆概念）
- 「线上彻底杜绝硬编码字符串的 junior 做法，全面推行提示词即代码（Prompt-as-Code）的工程体系」（GitCode/CSDN 面试指南第一人称叙述，检索摘要原文，体现该考点以「治理叙事」出现）

**幻觉分层防御体系（L4 追问链）**
- 「你在项目中提到"五重幻觉防御"，请详细解释每一重的设计原理和实际效果。」（博客园高级岗面试题问题 2，原文；五重=反思拒答/强约束 Prompt/后处理引用校验/用户反馈降权/低温低 top-p）
- 「你如何评估"幻觉"的存在？有哪些量化指标？」「如果用户反馈"答案有帮助"，但其实引用的是错误工单（幻觉未被发现），系统如何自我纠正？」（博客园问题 4/问题 5，原文——体现「量化→体系→隐式幻觉」追问链）
- 追问链示例（53AI 文章目录，原文）：幻觉问题如何量化 → 如何缓解幻觉问题 → 大模型在哪些问题上最容易出现幻觉 → 幻觉一定有害吗？
- 英文侧高频形态：「How do you reduce hallucinations in a RAG pipeline?」（Interview Coder Q24 标题，原文）；面试官期待「hallucination rate is an SLO you measure and budget against, not a bug you fix once」（gitGood，原文）

**评测驱动的 Prompt 迭代（L3→L4）**
- 「How do you A/B test prompts in production?」（Interview Coder Q30 标题，原文）
- 「Walk me through the eval suite you built. How did it change over time?」（ClarityHire 建议的行为面问题，原文）
- 中文侧形态：「Prompt 评估需要全面和多维度的方法，结合自动评估指标、人工评估和用户反馈」（牛客《大模型面试》话题「七、Prompt 评估」，检索摘要）

**L1 直觉类开场题（非算法岗，L1）**
- 「平时怎么用 AI/大模型提效？什么任务你会交给模型、什么不会？」（推断：由小林笔记「非 AI 岗也开始问 AI 题」+ 牛客 AI 产品经理「考察大模型能力边界」综合概括，未经逐字原文核实）
- 「给出一个 AI 场景题」（形态描述来自牛客后端岗求助帖原文「甚至给出一些 AI 场景题」；具体题目未见公开样本，属单一来源线索）

## 参考来源汇总（v2 新增）

| 来源 | 类型 | 日期 | URL |
|---|---|---|---|
| Interview Coder《Top 40 Prompt Engineer Interview Questions》 | 商业博客/题库 | 2026-05-26 | https://www.interviewcoder.co/blog/prompt-engineer-interview-questions |
| gitGood《AI System Design Interview Questions (2026)》 | 技术博客/面试指南 | 2026-08-14 | https://gitgood.dev/blog/ai-system-design-interview-questions-2026 |
| ClarityHire《How to Interview AI Engineers》 | 技术博客/面试官视角指南 | 2026-06-09 | https://clarity-hire.com/blog/how-to-interview-ai-engineers |
| AY Automate《40 AI Engineer Interview Questions》 | 技术博客/招聘方指南 | 2026-06-03 | https://www.ayautomate.com/blog/ai-engineer-interview-questions |
| DataInterview《Top 32 Prompt Engineering Interview Questions》 | 商业题库博客 | 未标注 | https://www.datainterview.com/blog/prompt-engineering-interview-questions |
| 火山引擎开发者社区《AI 大模型面试精选之 Agent 提示词工程相关要点（五）》 | 厂商开发者社区题库 | 未标注 | https://developer.volcengine.com/articles/7582491099638267930 |
| JavaBetter《AI Agent 面试题第五弹：Prompt 分层架构、Skill 系统》 | 技术博客/面试题 | 未标注 | https://javabetter.cn/sidebar/itwanger/paicli/paicli-interview-prompt-skill.html |
| GitCode/CSDN《大模型与 Agent 智能体工程师面试指南：Prompt Engineering 核心解析》 | 技术博客/面试题 | 未标注 | https://gitcode.csdn.net/6a08858f662f9a54cb74f803.html |
| GitHub ai-agents-from-zero《AI 智能体与大模型应用开发面试题库》 | 开源面试题库 | 未标注 | https://github.com/didilili/ai-agents-from-zero |
| GitHub AgentGuide《12-company-interview-cases》（大厂 RAG 专项面经） | 开源面经汇编 | 未标注 | https://github.com/adongwanai/AgentGuide/blob/main/docs/04-interview/12-company-interview-cases.md |
| 博客园 kopoo《大模型面试题》（SELF-RAG+五重幻觉防御 高级岗 10 题） | 博客/模拟面试题（含参考答案） | 未标注 | https://www.cnblogs.com/wusier/p/19084900 |
| 53AI《大模型面经——关于大模型幻觉问题的深化理解》 | 技术社区/面经深化 | 2024-07-20 | https://www.53ai.com/news/RAG/2024072018365.html |
| 牛客《大模型面试》话题（含 Prompt 评估章节） | 社区话题页 | 未标注 | https://www.nowcoder.com/creation/subject/278ae3e75eca413fa6f96d70cd03ae57 |
| 牛客《关于面后端岗面试官问 AI》 | 社区求助帖（单一来源线索） | 未标注 | https://www.nowcoder.com/feed/main/detail/abed2d2634dc4d2982b70b56c5db7b37 |
| 牛客《面试官会追问的 AI 产品八股》 | 社区面经 | 未标注 | https://www.nowcoder.com/discuss/889870139196227584 |
| 牛客《AI 产品经理面经汇总（含回答思路）》 | 社区面经汇总 | 未标注 | https://www.nowcoder.com/discuss/891328632507932672 |
| 小林面试笔记首页（岗位扩散趋势说明） | 技术博客/面试题站 | 未标注 | https://xiaolinnote.com/ai/ |
| 面灵AI《大模型与 AI Agent 面试题汇编：265 道大厂真题（2026 版）》 | 题库汇编站 | 2026 版 | https://www.mianlingai.com/topics/llm-agent-interview-questions-2026/ |

## 开放问题
- L1 直觉类开场题未获得逐字原题证据，现有问法为形态概括+推断；如需逐字题面，建议下次定向抓取牛客 AI 产品/后端岗面经正文。
- 「多 Agent 提示体系」多出现于英文资深 loop（orchestrator/subagent 提示分工，如 Anthropic multi-agent research 模式被 gitGood 引用）与国内 Agent 题库（牛客 AI-Agent 汇总、火山引擎第五辑），但「多 Agent 提示词如何设计」作为独立题面的公开样本仍偏少，⭐4 主要基于题库覆盖面推断。
- 博客园「五重幻觉防御」为模拟面试题（含参考答案），并非候选人真实面经回述；追问链真实性由 53AI（2024）与英文多源交叉印证，但单题字面不必当作真题引用。
- c5（JSON Mode）/c6（lost in the middle）连续两轮未做专项检索，星级仍为内置知识判断。
