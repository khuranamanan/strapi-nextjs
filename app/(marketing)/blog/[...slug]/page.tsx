import { notFound } from "next/navigation";
// import { allAuthors, allPosts } from "contentlayer/generated";

import { Mdx } from "@/components/mdx-components";

// import "@/styles/mdx.css";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// import { env } from "@/env.mjs";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
// import { Icons } from "@/components/icons";
import { ChevronLeft } from "lucide-react";
import { allPosts } from "@/content/Post";
import { getStrapiMedia, getStrapiURL } from "@/lib/strapi/api-helpers";
import QueryString from "qs";
import { Block, BlogItemType } from "@/types/blog";
import { BlockRenderer } from "./_components/block-renderer";

interface PostPageProps {
  params: { slug: string };
}

async function getPostBySlug(slug: string): Promise<BlogItemType> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  try {
    const response = await fetch(
      `${getStrapiURL()}/api/articles?${QueryString.stringify(
        {
          filters: { slug },
          populate: {
            cover: { fields: ["url"] },
            authorsBio: { populate: "*" },
            category: { fields: ["name"] },
            blocks: { populate: "*" },
          },
        },
        { encode: false }
      )}`,
      {
        headers: {
          cache: "force-cache",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return notFound();
  }
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  try {
    const response = await fetch(
      `${getStrapiURL()}/api/articles?${QueryString.stringify(
        {
          filters: { slug },
          populate: {
            seo: { populate: "*" },
          },
        },
        { encode: false }
      )}`,
      {
        headers: {
          cache: "force-cache",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return;
  }
}

export async function generateMetadata({
  params: { slug },
}: PostPageProps): Promise<Metadata> {
  const meta = await getMetaData(slug);
  const metadata = meta.data[0].attributes.seo;

  if (!meta) {
    return {};
  }

  return {
    title: metadata?.metaTitle,
    description: metadata?.metaDescription,
  };
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {post.data[0].attributes.createdAt && (
          <time
            dateTime={post.data[0].attributes.createdAt}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.data[0].attributes.createdAt)}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {post.data[0].attributes.title}
        </h1>
        {/* {authors?.length ? ( */}
        <div className="mt-4 flex space-x-4">
          {/* {authors.map((author) =>
              author ? ( */}
          <Link
            key={"M"}
            href={`https://twitter.com/MananKhurrana`}
            className="flex items-center space-x-2 text-sm"
          >
            {/* <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  /> */}
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{"author.title"}</p>
              <p className="text-[12px] text-muted-foreground">
                @{"author.twitter"}
              </p>
            </div>
          </Link>
          {/* ) : null
            )} */}
        </div>
        {/* ) : null} */}
      </div>
      {post.data[0].attributes.cover && (
        <Image
          src={
            getStrapiMedia(post.data[0].attributes.cover.data.attributes.url) ||
            ""
          }
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}
      <div className="space-y-4">
        {post.data[0].attributes.blocks.map((block: Block) => (
          <BlockRenderer key={block.id} section={block} />
        ))}
      </div>
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
}
