import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import SafariImg from "@/assets/images/SafariImg.png";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="space-y-12 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative">
      <div
        className="absolute inset-0 blur-xl -z-10"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(0, 182, 134, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>

      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Link
          href={siteConfig.links.twitter}
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
        >
          Follow along on Twitter
        </Link>
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          An example app built using Next.js 13 server components.
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          I&apos;m building a web app with Next.js 13 and open sourcing
          everything. Follow along as we figure this out together.
        </p>
        <div className="space-x-4">
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            GitHub
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4">
        <Image
          src={SafariImg}
          alt="SafariImg"
          className="w-full shadow-lg rounded-lg border"
          width={1200}
          height={800}
        />
      </div>
    </section>
  );
}

export default HeroSection;
