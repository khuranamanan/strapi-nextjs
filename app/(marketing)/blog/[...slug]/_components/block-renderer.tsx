import ImageSlider from "./image-slider";
import Media from "./media";
import Quote from "./quote";
import RichText from "./rich-text";
import VideoEmbed from "./video-embed";

import { Block } from "@/types/blog";

export function BlockRenderer({ section }: { section: Block }) {
  switch (section.__component) {
    case "shared.rich-text":
      return <RichText key={section.id} data={section} />;
    case "shared.slider":
      return <ImageSlider key={section.id} data={section} />;
    case "shared.quote":
      return <Quote key={section.id} data={section} />;
    case "shared.media":
      return <Media key={section.id} data={section} />;
    case "shared.video-embed":
      return <VideoEmbed key={section.id} data={section} />;
    default:
      return null;
  }
}
