import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");
const outPath = path.join(process.cwd(), "public", "slug-map.json");

const locales = fs
    .readdirSync(contentDir)
    .filter((f) => fs.statSync(path.join(contentDir, f)).isDirectory());

// Map: order -> { locale: slug }
const slugMap = {};

for (const locale of locales) {
    const localeDir = path.join(contentDir, locale);
    const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
        const raw = fs.readFileSync(path.join(localeDir, file), "utf-8");
        const { data } = matter(raw);

        // Use 'order' as unique ID. If missing, skip or log warning.
        if (data.order !== undefined) {
            const order = String(data.order);
            if (!slugMap[order]) {
                slugMap[order] = {};
            }
            const slug = file.replace(/\.md$/, "");
            slugMap[order][locale] = slug;
        }
    }
}

// Convert to array for easier client-side iteration (optional, but object is fine too)
// Let's us keep object for now, or array. Array is cleaner JSON.
const mapArray = Object.values(slugMap);

fs.writeFileSync(outPath, JSON.stringify(mapArray, null, 2));
console.log(`✅ Generated slug map with ${mapArray.length} entries -> ${outPath}`);
