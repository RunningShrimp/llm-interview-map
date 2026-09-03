# LLM 应用开发面试学习地图

面向零基础同学的 **大模型（LLM）应用开发四级晋升游戏化学习站**：L1 筑基 → L2 应用 → L3 原理 → L4 专家，7 大模块 74 个高频考点，每个考点包含
小白定义、生活类比、动画/交互演示、即时判题例题、费曼复述、知识联系与面试真题视角。

## 在线访问

**https://runningshrimp.github.io/llm-interview-map/**

仓库：https://github.com/RunningShrimp/llm-interview-map

## 本地运行

纯静态站点，任意静态服务器即可：

```bash
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

> 注意：内容通过 fetch 加载 JSON，请使用 HTTP 服务访问（不要直接双击 index.html）。

## 功能

- 🗺️ 技能树：层级为关卡、知识点为节点，未解锁层级显示解锁条件
- ⚔️ Boss 战：每层级末尾 10 道真题模拟面试，计时判题，≥80% 解锁下一级
- ⭐ XP 与头衔：阅读/答题/Boss 战获得经验值，四大头衔晋升带庆祝动画
- 📖 错题本与遗忘曲线：答错自动收录，1/3/7 天间隔重复提醒
- 🎓 L4 出题考别人：费曼终极检验，能出题才算真掌握
- 📈 战绩面板：XP/头衔/点亮进度/错题存量，localStorage 持久化

## 目录结构

```
├── index.html          # 入口（hash 路由 SPA）
├── css/styles.css      # 全站样式与动画
├── js/app.js           # 路由 / 渲染 / 进度 / 交互
├── js/judge.js         # 判题引擎（纯函数）
├── data/syllabus.js    # 最终大纲（56 点）
├── data/content/*.json # 每个知识点一个数据文件
├── data/quizzes/*.json # 模块回顾测验
├── research/*.md       # 检索研究底稿（含来源）
├── syllabus.md         # 最终大纲文档
└── tools/validate.js   # 内容完整性校验器
```

## 内容来源

知识点选自牛客网面经、小林coding 大模型面试题、《AI Agent 面试 Top50 必刷题》等公开面试资料，
每个页面标注星级与来源；技术表述以官方文档与论文为准，内容仅供学习参考。
