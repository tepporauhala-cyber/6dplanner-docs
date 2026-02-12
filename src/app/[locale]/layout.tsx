import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { getAllDocs, getCategories, getLocales, localeNames } from "@/lib/docs";

export function generateStaticParams() {
  return getLocales().map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const docs = getAllDocs(locale);
  const categories = getCategories(docs);
  const locales = getLocales();

  return (
    <div className="flex h-screen flex-col">
      <Header locale={locale} locales={locales} localeNames={localeNames} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar categories={categories} locale={locale} />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
