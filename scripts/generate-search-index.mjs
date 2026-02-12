/**
 * Build-time script: generates a search index JSON per locale.
 * Run with: node scripts/generate-search-index.mjs
 * Output:   public/search-index/<locale>.json
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");
const outDir = path.join(process.cwd(), "public", "search-index");

// Ensure output dir exists
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const locales = fs
    .readdirSync(contentDir)
    .filter((f) => fs.statSync(path.join(contentDir, f)).isDirectory());

for (const locale of locales) {
    const localeDir = path.join(contentDir, locale);
    const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".md"));

    const docs = files.map((file) => {
        const raw = fs.readFileSync(path.join(localeDir, file), "utf-8");
        const { data, content } = matter(raw);
        // Strip markdown syntax for cleaner search
        const plainContent = content
            .replace(/^#{1,6}\s+/gm, "")    // headings
            .replace(/\*\*(.*?)\*\*/g, "$1") // bold
            .replace(/\*(.*?)\*/g, "$1")     // italic
            .replace(/`{1,3}[^`]*`{1,3}/g, "") // code
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
            .replace(/[-*+]\s+/g, "")        // list markers
            .replace(/\n{2,}/g, "\n")        // extra newlines
            .trim();

        return {
            slug: file.replace(/\.md$/, ""),
            title: data.title || file.replace(/\.md$/, ""),
            description: data.description || "",
            category: data.category || "",
            content: plainContent,
        };
    });

    const outPath = path.join(outDir, `${locale}.json`);
    fs.writeFileSync(outPath, JSON.stringify(docs, null, 0));
    console.log(`✅ ${locale}: ${docs.length} docs → ${outPath}`);
}

console.log(`\nDone! Generated search indices for ${locales.length} locales.`);
