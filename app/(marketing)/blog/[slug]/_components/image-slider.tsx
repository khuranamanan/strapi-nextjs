"use client";

import { Fade } from "react-slideshow-image";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi/api-helpers";
import { Block } from "@/types/blog";
import "react-slideshow-image/dist/styles.css";

interface ImageType {
  id: number;
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
}

export default function ImageSlider({ data }: { data: Block }) {
  if (!data.files) return null;

  return (
    <div className="slide-container [&_button]:p-2 [&_button]:m-2">
      <Fade>
        {data.files.data.map((fadeImage: ImageType, index) => {
          const imageUrl = getStrapiMedia(fadeImage.attributes.url);
          return (
            <div key={index}>
              {imageUrl && (
                <Image
                  className="w-full h-96 object-cover rounded-lg"
                  height={400}
                  width={600}
                  alt="alt text"
                  src={imageUrl}
                />
              )}
            </div>
          );
        })}
      </Fade>
    </div>
  );
}
