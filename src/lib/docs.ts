import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  icon?: string;
  youtube?: string;
};

export type Doc = DocMeta & {
  content: string;
};

export function getLocales(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => fs.statSync(path.join(contentDir, f)).isDirectory());
}

export function getDocSlugs(locale: string): string[] {
  const localeDir = path.join(contentDir, locale);
  if (!fs.existsSync(localeDir)) return [];
  return fs
    .readdirSync(localeDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getDoc(locale: string, slug: string): Doc | null {
  const filePath = path.join(contentDir, locale, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    category: data.category || "Muut",
    order: data.order ?? 99,
    icon: data.icon,
    youtube: data.youtube,
    content,
  };
}

export function getAllDocs(locale: string): DocMeta[] {
  const slugs = getDocSlugs(locale);
  return slugs
    .map((slug) => {
      const doc = getDoc(locale, slug);
      if (!doc) return null;
      const { content, ...meta } = doc;
      return meta;
    })
    .filter(Boolean)
    .sort((a, b) => (a!.order ?? 99) - (b!.order ?? 99)) as DocMeta[];
}

export function getCategories(
  docs: DocMeta[]
): { name: string; docs: DocMeta[] }[] {
  const catMap = new Map<string, DocMeta[]>();
  for (const doc of docs) {
    const cat = doc.category;
    if (!catMap.has(cat)) catMap.set(cat, []);
    catMap.get(cat)!.push(doc);
  }
  return Array.from(catMap.entries()).map(([name, docs]) => ({ name, docs }));
}

export const localeNames: Record<string, string> = {
  fi: "Suomi",
  en: "English",
  et: "Eesti",
  ar: "العربية",
  de: "Deutsch",
  sv: "Svenska",
  pl: "Polski",
  fr: "Français",
  es: "Español",
};
