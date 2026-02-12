import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchBar from "./SearchBar";

type Props = {
  locale: string;
  locales: string[];
  localeNames: Record<string, string>;
};

export default function Header({ locale, locales, localeNames }: Props) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-brand-navy bg-brand-darker px-6">
      <div className="flex items-center gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image src="/logo.png" alt="6DPlanner" width={180} height={40} className="h-9 w-auto" priority />
        </Link>
        <span className="text-sm text-brand-muted">eGuide</span>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar locale={locale} />
        <LanguageSwitcher
          locales={locales}
          currentLocale={locale}
          localeNames={localeNames}
        />
        <a
          href="https://www.6dplanner.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-brand-accent px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent-hover"
        >
          6DPlanner.com
        </a>
      </div>
    </header>
  );
}
