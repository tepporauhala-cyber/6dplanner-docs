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

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    // Replace locale segment in path
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      segments[0] = newLocale;
    }
    router.push("/" + segments.join("/"));
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
