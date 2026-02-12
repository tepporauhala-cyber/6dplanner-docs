import Link from "next/link";
import { getAllDocs, getCategories, getLocales } from "@/lib/docs";

export function generateStaticParams() {
  return getLocales().map((locale) => ({ locale }));
}

export default async function LocaleIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const docs = getAllDocs(locale);
  const categories = getCategories(docs);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold text-white">eGuide</h1>
        <p className="text-lg text-brand-muted">
          {locale === "fi"
            ? "Ohjeet kaikkiin 6DPlannerin työkaluihin"
            : "Guides for all 6DPlanner tools"}
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat.name} className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-brand-accent">
            {cat.name}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cat.docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/${locale}/${doc.slug}`}
                className="group rounded-lg border border-brand-navy bg-brand-darker p-5 transition-colors hover:border-brand-accent"
              >
                <h3 className="mb-1 text-lg font-semibold text-white group-hover:text-brand-accent">
                  {doc.title}
                </h3>
                <p className="text-sm text-brand-muted">{doc.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
