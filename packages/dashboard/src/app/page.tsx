import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Mihoyo Copilot",
};

const HomePage = () => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Mihoyo Copilot <br className="hidden sm:inline" />
          <span className="text-2xl">基于深度学习的人工智能游戏助手</span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          原生整合 Gemeni Pro 的多模态学习能力
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          target="_self"
          rel="noreferrer"
          href="/bh3"
          className={buttonVariants({ variant: "outline" })}
        >
          崩坏3
        </Link>
        <Link
          target="_self"
          rel="noreferrer"
          href="/ys"
          className={buttonVariants({ variant: "outline" })}
        >
          原神
        </Link>
        <Link
          target="_self"
          rel="noreferrer"
          href="/sr"
          className={buttonVariants({ variant: "outline" })}
        >
          崩坏：星穹铁道
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
