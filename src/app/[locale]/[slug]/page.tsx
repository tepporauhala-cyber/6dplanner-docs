import { notFound } from "next/navigation";
import { getDoc, getDocSlugs, getLocales } from "@/lib/docs";
import { markdownToHtml } from "@/lib/markdown";
import Link from "next/link";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of getLocales()) {
    for (const slug of getDocSlugs(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const doc = getDoc(locale, slug);
  if (!doc) notFound();

  const htmlContent = await markdownToHtml(doc.content);

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={`/${locale}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-accent"
      >
        ← {locale === "fi" ? "Takaisin hakemistoon" : "Back to index"}
      </Link>

      <h1 className="mb-6 text-4xl font-bold text-white">{doc.title}</h1>

      {doc.youtube && (
        <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${doc.youtube}`}
            title={doc.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <article
        className="prose prose-invert max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-2xl prose-h2:text-brand-accent
          prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-xl
          prose-p:text-brand-text prose-p:leading-relaxed
          prose-a:text-brand-link prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white
          prose-li:text-brand-text
          prose-code:rounded prose-code:bg-brand-navy prose-code:px-1.5 prose-code:py-0.5 prose-code:text-brand-accent"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
