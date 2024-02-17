export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Mihoyo Copilot",
  description:
    "Mihoyo Copilot, 基于深度学习的人工智能游戏助手, 原生整合 Gemeni Pro 的多模态学习能力。",
  mainNav: [
    {
      title: "首页",
      href: "/",
    },
    {
      title: "崩坏3",
      href: "/bh3",
    },
    {
      title: "原神",
      href: "/ys",
    },
    {
      title: "崩坏：星穹铁道",
      href: "/sr",
    },
  ],
  links: {
    twitter: "https://twitter.com/joydragon_wang",
    github: "https://github.com/yc-w-cn/mihoyo-copilot",
    home: "https://yc-w-cn.github.io/mihoyo-copilot/",
  },
};
