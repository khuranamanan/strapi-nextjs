import { getStrapiURL } from "@/lib/strapi/api-helpers";
import { BlogListType } from "@/types/blog";
import QueryString from "qs";

export async function getAllPosts(): Promise<BlogListType> {
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
