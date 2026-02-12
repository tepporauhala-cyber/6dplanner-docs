import { remark } from "remark";
import html from "remark-html";

export async function markdownToHtml(markdown: string): Promise<string> {
  // Replace YouTube shortcodes: <youtube id="xxx" /> → iframe
  const withYoutube = markdown.replace(
    /<youtube\s+id="([^"]+)"\s*\/?>/gi,
    `<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
  );

  const result = await remark().use(html, { sanitize: false }).process(withYoutube);
  return result.toString();
}
