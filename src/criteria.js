// Shared, kid-friendly criteria.
// `key` matches the values stored in the `criteria` jsonb column in Supabase,
// so existing rows keep working — only the display labels changed.
export const CRITERIA = [
    { key: "criteriaA", label: "How much I want it", emoji: "😍" },
    { key: "criteriaB", label: "Is it worth it", emoji: "💎" },
    { key: "criteriaC", label: "Will I use it a lot", emoji: "🎮" },
    { key: "criteriaD", label: "Is the price okay", emoji: "💰" },
    { key: "criteriaE", label: "Will it last a long time", emoji: "⏳" },
];

// Average score (1–5) across all criteria, used for the star badge.
export function averageScore(criteria) {
    if (!criteria) return 0;
    const values = CRITERIA.map((c) => Number(criteria[c.key]) || 0);
    const sum = values.reduce((a, b) => a + b, 0);
    return values.length ? sum / values.length : 0;
}
