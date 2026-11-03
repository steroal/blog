export type Cat = '聚合站' | '周报' | '框架' | 'Super-agent' | '技能生态';

export type Item = {
  name: string;
  url: string;
  desc: string;
  cat: Cat;
  /** 版本号、更新频率之类的补充说明 */
  note?: string;
  /** 首页默认展示的少数几个 */
  pick?: boolean;
};

export const categoryOrder: Cat[] = ['聚合站', '周报', '框架', 'Super-agent', '技能生态'];

export const items: Item[] = [
  /* ---------------- 聚合站 ---------------- */
  {
    name: 'Hacker News',
    url: 'https://news.ycombinator.com/',
    desc: '前端圈子里最快的一手讨论。新模型、新框架往往先在评论区里被拆一遍，比新闻稿有用。',
    cat: '聚合站',
    note: '每日',
    pick: true,
  },
  {
    name: 'GitHub 周榜（GitStock）',
    url: 'https://gitstock.org/trending/weekly',
    desc: '按周统计的 star 增量榜。看「这周大家在做什么」比看总 star 排名准得多。',
    cat: '聚合站',
    note: '每周一更新',
    pick: true,
  },
  {
    name: 'Hugging Face Daily Papers',
    url: 'https://huggingface.co/papers',
    desc: '每天挑几篇论文，附社区讨论。比直接刷 arXiv 省时间，适合跟方向而不是跟热点。',
    cat: '聚合站',
    note: '每日',
  },
  {
    name: 'arXiv cs.AI / cs.CL',
    url: 'https://arxiv.org/list/cs.AI/recent',
    desc: '原始论文列表。噪声大，但需要核对某个结论的出处时，最终还是要回到这里。',
    cat: '聚合站',
    note: '每日',
  },
  {
    name: 'Simon Willison 的博客',
    url: 'https://simonwillison.net/',
    desc: '少见的「自己跑一遍再写」的作者：贴出调用成本、失败情况、安全问题。学 agent 工程看他最省事。',
    cat: '聚合站',
    note: '几乎每日',
    pick: true,
  },

  /* ---------------- 周报 ---------------- */
  {
    name: 'Latent Space',
    url: 'https://www.latent.space/',
    desc: 'AI 工程向的深度访谈与拆解，偏「怎么把东西做出来」，不是产品发布稿。',
    cat: '周报',
    note: '每周 + 每日 AINews',
    pick: true,
  },
  {
    name: 'Import AI',
    url: 'https://importai.substack.com/',
    desc: 'Jack Clark 的周报，政策和能力并重。想理解「为什么这么管」而不是「又出了什么」，看这个。',
    cat: '周报',
    note: '每周',
  },
  {
    name: 'The Batch',
    url: 'https://www.deeplearning.ai/the-batch/',
    desc: '吴恩达团队的周报，每期开头一封短信，把当周最值得理解的一件事讲清楚。',
    cat: '周报',
    note: '每周',
  },
  {
    name: 'Ahead of AI',
    url: 'https://magazine.sebastianraschka.com/',
    desc: 'Sebastian Raschka 写的模型结构与训练细节，带代码。适合想搞明白内部机制的人。',
    cat: '周报',
    note: '不定期',
  },
  {
    name: 'Interconnects',
    url: 'https://www.interconnects.ai/',
    desc: 'Nathan Lambert 对训练、后训练和开源模型格局的分析，判断成分多，但都有依据。',
    cat: '周报',
    note: '每周数篇',
  },
  {
    name: 'Last Week in AI',
    url: 'https://lastweekinai.com/',
    desc: '带出处的一周综述，把发布、研究和政策串起来。想快速补课看这个。',
    cat: '周报',
    note: '每周',
  },
  {
    name: 'AlphaSignal',
    url: 'https://alphasignal.ai/',
    desc: '面向工程师的每日摘要：新模型、新仓库、值得读的论文各挑几条。',
    cat: '周报',
    note: '每周三次',
  },

  /* ---------------- 框架 ---------------- */
  {
    name: 'LangGraph',
    url: 'https://github.com/langchain-ai/langgraph',
    desc: '图式编排，状态持久化、断点续跑、人工介入都是一等公民。复杂流程和需要审计的场景基本绕不开它。',
    cat: '框架',
    note: '1.2.x · 双周更新',
    pick: true,
  },
  {
    name: 'OpenAI Agents SDK',
    url: 'https://github.com/openai/openai-agents-python',
    desc: '今年迭代最快的 SDK。沙箱里执行命令、MCP 原生支持，从原型到能用只差几步。',
    cat: '框架',
    note: '0.24.x · 仍在 0.x',
    pick: true,
  },
  {
    name: 'Microsoft Agent Framework',
    url: 'https://github.com/microsoft/agent-framework',
    desc: 'AutoGen 和 Semantic Kernel 合并后的产物，今年 4 月 GA。.NET / Azure 体系里做 agent 的正解。',
    cat: '框架',
    note: '1.24.x · 2026-04 GA',
  },
  {
    name: 'Google ADK',
    url: 'https://github.com/google/adk-python',
    desc: 'A2A 协议原生，和 Vertex AI Agent Engine 打通。在 GCP 上跑多 agent，默认选它。',
    cat: '框架',
    note: '2.13.x · 2.x 有破坏性变更',
  },
  {
    name: 'CrewAI',
    url: 'https://github.com/crewAIInc/crewAI',
    desc: '按角色拆分，几十行就能跑起一个多 agent 团队。适合原型，复杂流程会开始和框架打架。',
    cat: '框架',
    note: '1.15.x',
  },
  {
    name: 'Claude Agent SDK',
    url: 'https://github.com/anthropics/claude-agent-sdk-python',
    desc: '偏 OS 级操作：文件、命令、MCP 工具。重工具链的任务用它最顺，代价是绑在 Claude 上。',
    cat: '框架',
    note: '0.2.x · 单独计费',
  },
  {
    name: 'smolagents',
    url: 'https://github.com/huggingface/smolagents',
    desc: '一千行左右的极简实现，agent 直接写 Python 代码来行动。适合读懂 agent 循环本身。',
    cat: '框架',
    note: '1.26.x',
  },
  {
    name: 'Pydantic AI',
    url: 'https://github.com/pydantic/pydantic-ai',
    desc: 'FastAPI 式的开发体验：输入、工具签名、输出全都有类型。契约比编排更重要时选它。',
    cat: '框架',
    note: '类型安全',
  },

  /* ---------------- Super-agent ---------------- */
  {
    name: 'DeepSeek Harness：Super-agent 设计探索',
    url: 'https://www.deepseek.com/',
    desc: '把 agent 从「一次对话」拉到「同时管很多任务」：双层架构、事件驱动、存算分离，人只负责决策和验收。今年 11 月刚公开。',
    cat: 'Super-agent',
    note: '2026-11 发布',
    pick: true,
  },
  {
    name: 'Airtable Superagent → HyperAgent',
    url: 'https://superagent.com/',
    desc: '企业研究型多智能体：编排器拆任务、子 agent 并行查资料、最后产出可交互的报告。原产品已下线，能力并进 HyperAgent。',
    cat: 'Super-agent',
    note: '2026-01 上线，4 月下线',
  },
  {
    name: '讯飞 SuperAgent 平台',
    url: 'https://www.iflytek.com/',
    desc: '国内落地较早的一支：招采、营销这类长链路业务，强调自组织和可审计的执行引擎。',
    cat: 'Super-agent',
    note: '行业方案',
  },
  {
    name: '中国电信 星辰 TeleAgent',
    url: 'https://www.teleai.com.cn/',
    desc: '面向个人的「超级智能体」：自动规划、调用工具、交付结果，支持私有化部署到内网。',
    cat: 'Super-agent',
    note: '2026-07 发布',
  },

  /* ---------------- 技能生态 ---------------- */
  {
    name: 'anthropics/skills',
    url: 'https://github.com/anthropics/skills',
    desc: '官方技能仓库，事实标准。想看一个 skill 该怎么写，从这里抄结构最稳。',
    cat: '技能生态',
    note: '官方',
    pick: true,
  },
  {
    name: 'obra/superpowers',
    url: 'https://github.com/obra/superpowers',
    desc: '技能框架 + 一套开发方法论：先把模糊想法谈成规格，再动手写代码。长期挂在周榜前排。',
    cat: '技能生态',
    note: '周榜常客',
    pick: true,
  },
  {
    name: 'pbakaus/impeccable',
    url: 'https://github.com/pbakaus/impeccable',
    desc: '给编码 agent 一套设计词汇，专门治「一眼 AI 味」的界面。前端活多的可以试试。',
    cat: '技能生态',
    note: '本周高星',
  },
  {
    name: 'Leonxlnx/taste-skill',
    url: 'https://github.com/Leonxlnx/taste-skill',
    desc: '用指标和参考图约束 agent 的审美，而不是让它自由发挥。',
    cat: '技能生态',
    note: '本周高星',
  },
  {
    name: 'mattpocock/skills',
    url: 'https://github.com/mattpocock/skills',
    desc: '给真工程师用的技能包：TDD、调试、代码评审，都是能直接跑起来的流程。',
    cat: '技能生态',
    note: '周榜常客',
  },
  {
    name: 'thedotmack/claude-mem',
    url: 'https://github.com/thedotmack/claude-mem',
    desc: '跨会话记忆：把 agent 干过的事压缩后注回下一次会话。长期项目里比什么都实用。',
    cat: '技能生态',
    note: '本周高星',
  },
  {
    name: 'cloudflare/security-audit-skill',
    url: 'https://github.com/cloudflare/security-audit-skill',
    desc: '多阶段安全审计技能，产出可机器核验的结论。给 agent 加安全审查时可以直接用。',
    cat: '技能生态',
    note: '企业向',
  },
  {
    name: 'vercel-labs/agent-skills',
    url: 'https://github.com/vercel-labs/agent-skills',
    desc: 'React / Next.js 的官方性能与交互规范，让 agent 生成代码时自动遵守。',
    cat: '技能生态',
    note: '官方',
  },
  {
    name: 'Skillselion',
    url: 'https://skillselion.com/',
    desc: '技能与 MCP 的索引站：按安装量排序，六万多个技能、近万个 MCP server。找工具比翻 GitHub 快。',
    cat: '技能生态',
    note: '索引导航',
  },
  {
    name: 'MCP 官方 servers',
    url: 'https://github.com/modelcontextprotocol/servers',
    desc: 'Model Context Protocol 的参考实现集合。要接文件、数据库、浏览器，先看这里有没有现成的。',
    cat: '技能生态',
    note: '官方',
  },
];
