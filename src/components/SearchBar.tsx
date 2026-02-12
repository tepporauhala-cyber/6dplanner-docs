"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { getTranslation } from "@/lib/translations";

type SearchDoc = {
    slug: string;
    title: string;
    description: string;
    category: string;
    content: string;
};

type SearchResult = {
    slug: string;
    title: string;
    description: string;
    category: string;
};

export default function SearchBar({ locale }: { locale: string }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [docs, setDocs] = useState<SearchDoc[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const t = getTranslation(locale);

    // Load index on mount
    useEffect(() => {
        fetch(`/search-index/${locale}.json`)
            .then((res) => res.json())
            .then((data: SearchDoc[]) => setDocs(data))
            .catch(() => setDocs([]));
    }, [locale]);

    // Keyboard shortcut: Ctrl+K or Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 50);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
                setQuery("");
                setResults([]);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Search logic
    const search = useCallback(
        (q: string) => {
            if (!q.trim()) {
                setResults([]);
                return;
            }
            const lower = q.toLowerCase();
            const terms = lower.split(/\s+/).filter(Boolean);

            const scored = docs
                .map((doc) => {
                    let score = 0;
                    const titleLower = doc.title.toLowerCase();
                    const descLower = doc.description.toLowerCase();
                    const contentLower = doc.content.toLowerCase();

                    for (const term of terms) {
                        // Title match: highest weight
                        if (titleLower.includes(term)) score += 10;
                        // Description match
                        if (descLower.includes(term)) score += 5;
                        // Content match
                        if (contentLower.includes(term)) score += 1;
                    }

                    return { doc, score };
                })
                .filter((r) => r.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 8)
                .map((r) => ({
                    slug: r.doc.slug,
                    title: r.doc.title,
                    description: r.doc.description,
                    category: r.doc.category,
                }));

            setResults(scored);
            setSelectedIndex(0);
        },
        [docs]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        search(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && results[selectedIndex]) {
            setIsOpen(false);
            setQuery("");
            setResults([]);
            window.location.href = `/${locale}/${results[selectedIndex].slug}`;
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handleResultClick = () => {
        setIsOpen(false);
        setQuery("");
        setResults([]);
    };

    return (
        <>
            {/* Trigger button */}
            <button
                onClick={handleOpen}
                className="flex items-center gap-2 rounded-md border border-brand-navy bg-brand-dark px-3 py-1.5 text-sm text-brand-muted transition-colors hover:border-brand-accent hover:text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden rounded border border-brand-navy bg-brand-darker px-1.5 py-0.5 text-xs text-brand-muted sm:inline">
                    ⌘K
                </kbd>
            </button>

            {/* Modal overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[15vh]">
                    <div
                        ref={containerRef}
                        className="w-full max-w-lg overflow-hidden rounded-xl border border-brand-navy bg-brand-darker shadow-2xl"
                    >
                        {/* Search input */}
                        <div className="flex items-center gap-3 border-b border-brand-navy px-4 py-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 shrink-0 text-brand-muted"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder={t.searchPlaceholder}
                                className="w-full bg-transparent text-white placeholder:text-brand-muted focus:outline-none"
                            />
                            <kbd
                                className="shrink-0 cursor-pointer rounded border border-brand-navy px-1.5 py-0.5 text-xs text-brand-muted hover:text-white"
                                onClick={() => {
                                    setIsOpen(false);
                                    setQuery("");
                                    setResults([]);
                                }}
                            >
                                ESC
                            </kbd>
                        </div>

                        {/* Results */}
                        {query.trim() && (
                            <div className="max-h-80 overflow-y-auto p-2">
                                {results.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-sm text-brand-muted">
                                        {t.noResults} &quot;{query}&quot;
                                    </div>
                                ) : (
                                    <ul>
                                        {results.map((result, index) => (
                                            <li key={result.slug}>
                                                <Link
                                                    href={`/${locale}/${result.slug}`}
                                                    onClick={handleResultClick}
                                                    className={`block rounded-lg px-4 py-3 transition-colors ${index === selectedIndex
                                                        ? "bg-brand-accent/15 text-white"
                                                        : "text-brand-text hover:bg-brand-navy/50"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium">
                                                            {result.title}
                                                        </span>
                                                        <span className="rounded bg-brand-navy px-1.5 py-0.5 text-xs text-brand-muted">
                                                            {result.category}
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 line-clamp-1 text-xs text-brand-muted">
                                                        {result.description}
                                                    </p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Empty state hint */}
                        {!query.trim() && (
                            <div className="px-4 py-8 text-center text-sm text-brand-muted">
                                {t.typeToSearch}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
