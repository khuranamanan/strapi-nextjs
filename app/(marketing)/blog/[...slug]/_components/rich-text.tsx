"use client";
import { Block } from "@/types/blog";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface RichTextProps {
  data: Block;
}

export default function RichText({ data }: RichTextProps) {
  if (!data?.content) return null;

  return (
    <section className="prose  [&_*]:text-foreground [&_pre>code]:!text-muted">
      <BlocksRenderer content={data.content} />
    </section>
  );
}
