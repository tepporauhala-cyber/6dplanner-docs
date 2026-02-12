export const uiTranslations: Record<
    string,
    {
        subtitle: string;
        backToIndex: string;
        searchPlaceholder: string;
        noResults: string;
        typeToSearch: string;
    }
> = {
    fi: {
        subtitle: "Ohjeet kaikkiin 6DPlannerin työkaluihin",
        backToIndex: "Takaisin hakemistoon",
        searchPlaceholder: "Etsi ohjeista...",
        noResults: "Ei tuloksia haulla",
        typeToSearch: "Kirjoita hakeaksesi ohjeista",
    },
    en: {
        subtitle: "Guides for all 6DPlanner tools",
        backToIndex: "Back to index",
        searchPlaceholder: "Search documentation...",
        noResults: "No results found for",
        typeToSearch: "Type to search across all documentation pages",
    },
    et: {
        subtitle: "Juhendid kõigile 6DPlanneri tööriistadele",
        backToIndex: "Tagasi indeksisse",
        searchPlaceholder: "Otsi dokumentatsioonist...",
        noResults: "Tulemusi ei leitud otsingule",
        typeToSearch: "Kirjuta, et otsida dokumentatsioonist",
    },
    ar: {
        subtitle: "أدلة لجميع أدوات 6DPlanner",
        backToIndex: "العودة إلى الفهرس",
        searchPlaceholder: "البحث في الوثائق...",
        noResults: "لم يتم العثور على نتائج لـ",
        typeToSearch: "اكتب للبحث في جميع صفحات الوثائق",
    },
    de: {
        subtitle: "Anleitungen für alle 6DPlanner-Werkzeuge",
        backToIndex: "Zurück zur Übersicht",
        searchPlaceholder: "Dokumentation durchsuchen...",
        noResults: "Keine Ergebnisse für",
        typeToSearch: "Tippen Sie, um in der Dokumentation zu suchen",
    },
    sv: {
        subtitle: "Guider för alla 6DPlanner-verktyg",
        backToIndex: "Tillbaka till översikten",
        searchPlaceholder: "Sök i dokumentationen...",
        noResults: "Inga resultat för",
        typeToSearch: "Skriv för att söka i dokumentationen",
    },
    pl: {
        subtitle: "Przewodniki dla wszystkich narzędzi 6DPlanner",
        backToIndex: "Powrót do indeksu",
        searchPlaceholder: "Szukaj w dokumentacji...",
        noResults: "Brak wyników dla",
        typeToSearch: "Wpisz, aby przeszukać dokumentację",
    },
    fr: {
        subtitle: "Guides pour tous les outils 6DPlanner",
        backToIndex: "Retour à l'index",
        searchPlaceholder: "Rechercher dans la documentation...",
        noResults: "Aucun résultat pour",
        typeToSearch: "Tapez pour rechercher dans la documentation",
    },
    es: {
        subtitle: "Guías para todas las herramientas de 6DPlanner",
        backToIndex: "Volver al índice",
        searchPlaceholder: "Buscar en la documentación...",
        noResults: "No se encontraron resultados para",
        typeToSearch: "Escribe para buscar en la documentación",
    },
};

export function getTranslation(locale: string) {
    return uiTranslations[locale] || uiTranslations["en"];
}
