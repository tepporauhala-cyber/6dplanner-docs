"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type DocLink = {
  slug: string;
  title: string;
};

type Category = {
  name: string;
  docs: DocLink[];
};

type Props = {
  categories: Category[];
  locale: string;
};

export default function Sidebar({ categories, locale }: Props) {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 overflow-y-auto border-r border-brand-navy bg-brand-darker p-4">
      <Link
        href={`/${locale}`}
        className="mb-6 block text-lg font-bold text-white hover:text-brand-accent"
      >
        eGuide
      </Link>

      {categories.map((cat) => (
        <div key={cat.name} className="mb-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">
            {cat.name}
          </h3>
          <ul className="space-y-1">
            {cat.docs.map((doc) => {
              const href = `/${locale}/${doc.slug}`;
              const active = pathname === href || pathname === `${href}/`;
              return (
                <li key={doc.slug}>
                  <Link
                    href={href}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-brand-navy text-brand-accent font-medium"
                        : "text-brand-text hover:bg-brand-navy/50 hover:text-white"
                    }`}
                  >
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
