import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/utils";
import QueryString from "qs";
import { BlogListType } from "@/types/blog";
import { getStrapiMedia, getStrapiURL } from "@/lib/strapi/api-helpers";

export const metadata = {
  title: "Blog",
};

async function getAllPosts(): Promise<BlogListType> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  try {
    const response = await fetch(
      `${getStrapiURL()}/api/articles?${QueryString.stringify(
        {
          sort: { createdAt: "desc" },
          populate: {
            cover: { fields: ["formats"] },
            category: { fields: ["name", "slug"] },
          },
        },
        { encode: false }
      )}`,
      {
        cache: "force-cache",
        headers: {
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
    return {} as BlogListType;
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A blog built using Contentlayer. Posts are written in MDX.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts.data?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.data.map((post, index) => (
            <article
              key={post.id}
              className="group relative flex flex-col space-y-2"
            >
              {post.attributes.cover.data.attributes && (
                <Image
                  src={`${getStrapiMedia(
                    post.attributes.cover.data.attributes.formats.thumbnail.url
                  )}`}
                  alt={post.attributes.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">
                {post.attributes.title}
              </h2>
              {post.attributes.description && (
                <p className="text-muted-foreground">
                  {post.attributes.description}
                </p>
              )}
              {post.attributes.createdAt && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.attributes.createdAt)}
                </p>
              )}
              <Link
                href={`/blog/${post.attributes.slug}`}
                className="absolute inset-0"
              >
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
