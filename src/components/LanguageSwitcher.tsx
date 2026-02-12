"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  locales: string[];
  currentLocale: string;
  localeNames: Record<string, string>;
};

export default function LanguageSwitcher({
  locales,
  currentLocale,
  localeNames,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    const segments = pathname.split("/").filter(Boolean);

    // If on a doc page (has slug), try to find localized slug
    if (segments.length >= 2) {
      const currentSlug = segments[1];

      try {
        const res = await fetch("/slug-map.json");
        if (res.ok) {
          const map: Record<string, string>[] = await res.json();
          const entry = map.find((m) => m[currentLocale] === currentSlug);
          if (entry && entry[newLocale]) {
            // Found target slug!
            const targetSlug = entry[newLocale];
            window.location.href = `/${newLocale}/${targetSlug}`;
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load slug map", err);
      }
    }

    // Fallback: redirects to root of new locale
    window.location.href = `/${newLocale}`;
  }

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="rounded-md border border-brand-navy bg-brand-darker px-3 py-1.5 text-sm text-brand-text focus:border-brand-accent focus:outline-none"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc] || loc}
        </option>
      ))}
    </select>
  );
}
