import { useMemo, useState } from "react";

// Each criterion is phrased so that a HIGHER score always means
// "more reason to buy". weight = how much this criterion matters.
const STEPS = [
    {
        title: "Do you need it?",
        criteria: [
            {
                id: "need",
                label: "Need vs. want",
                help: "1 = just a want · 5 = genuine need",
                weight: 5,
            },
            {
                id: "owned",
                label: "Do you already own something similar?",
                help: "1 = yes, I do · 5 = nothing like it",
                weight: 3,
            },
        ],
    },
    {
        title: "Can you afford it?",
        criteria: [
            {
                id: "affordable",
                label: "Comfortably affordable?",
                help: "1 = would go into debt · 5 = easily",
                weight: 5,
            },
            {
                id: "costPerUse",
                label: "How often will you use it?",
                help: "1 = rarely · 5 = almost daily",
                weight: 4,
            },
        ],
    },
    {
        title: "Is it worth it?",
        criteria: [
            {
                id: "quality",
                label: "Quality & durability",
                help: "1 = disposable · 5 = lasts for years",
                weight: 3,
            },
            {
                id: "alternative",
                label: "Best option you found?",
                help: "1 = haven't compared · 5 = clearly the best value",
                weight: 2,
            },
            {
                id: "urgency",
                label: "Do you need it now?",
                help: "1 = can easily wait · 5 = need it today",
                weight: 3,
            },
        ],
    },
];

const ALL_CRITERIA = STEPS.flatMap((s) => s.criteria);

function initialScores() {
    // Start everything at a neutral 3.
    return Object.fromEntries(ALL_CRITERIA.map((c) => [c.id, 3]));
}

function getVerdict(percent) {
    if (percent >= 75) return { label: "Buy it", emoji: "✅", tone: "text-green-600" };
    if (percent >= 50) return { label: "Maybe — sleep on it", emoji: "🤔", tone: "text-yellow-600" };
    return { label: "Skip it", emoji: "❌", tone: "text-red-600" };
}

function ShouldIBuyModal({ item }) {
    const dialogId = `should_buy_${item?.id ?? "new"}`;
    const resultStep = STEPS.length; // last "virtual" step shows the result

    const [step, setStep] = useState(0);
    const [scores, setScores] = useState(initialScores);

    const { percent, weightedScore, maxScore } = useMemo(() => {
        const weighted = ALL_CRITERIA.reduce(
            (sum, c) => sum + c.weight * scores[c.id],
            0
        );
        const max = ALL_CRITERIA.reduce((sum, c) => sum + c.weight * 5, 0);
        return {
            weightedScore: weighted,
            maxScore: max,
            percent: Math.round((weighted / max) * 100),
        };
    }, [scores]);

    const verdict = getVerdict(percent);
    const isResult = step === resultStep;
    const current = STEPS[step];

    function setScore(id, value) {
        setScores((prev) => ({ ...prev, [id]: value }));
    }

    function reset() {
        setStep(0);
        setScores(initialScores());
    }

    // Weakest criteria — what dragged the score down.
    const weakest = [...ALL_CRITERIA]
        .sort((a, b) => a.weight * scores[a.id] - b.weight * scores[b.id])
        .slice(0, 2);

    return (
        <>
            <button
                onClick={() => document.getElementById(dialogId).showModal()}
                className="btn btn-sm bg-blue-600 text-white hover:bg-blue-500"
            >
                Should I buy?
            </button>

            <dialog id={dialogId} className="modal">
                <div className="modal-box max-h-3/4">
                    <div className="font-bold text-2xl mb-1">
                        Should I buy {item?.name ? `"${item.name}"` : "this"}?
                    </div>

                    {!isResult && (
                        <>
                            {/* Progress */}
                            <p className="text-sm text-gray-500 mb-4">
                                Step {step + 1} of {STEPS.length} · {current.title}
                            </p>
                            <progress
                                className="progress progress-primary w-full mb-6"
                                value={step + 1}
                                max={STEPS.length}
                            />

                            {current.criteria.map((c) => (
                                <div key={c.id} className="flex justify-between items-center my-5">
                                    <div className="pr-4">
                                        <p className="font-semibold">{c.label}</p>
                                        <p className="text-gray-500 text-sm">{c.help}</p>
                                    </div>
                                    <select
                                        className="select select-bordered"
                                        value={scores[c.id]}
                                        onChange={(e) => setScore(c.id, Number(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            <div className="modal-action justify-between">
                                <button
                                    className="btn"
                                    disabled={step === 0}
                                    onClick={() => setStep((s) => s - 1)}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setStep((s) => s + 1)}
                                >
                                    {step === STEPS.length - 1 ? "See result" : "Next"}
                                </button>
                            </div>
                        </>
                    )}

                    {isResult && (
                        <div className="text-center py-4">
                            <div className="text-6xl my-2">{verdict.emoji}</div>
                            <div className={`text-2xl font-bold ${verdict.tone}`}>
                                {verdict.label}
                            </div>
                            <div className="text-5xl font-bold my-3">{percent}%</div>
                            <p className="text-sm text-gray-500">
                                Weighted score {weightedScore} / {maxScore}
                            </p>

                            <div className="text-left mt-6">
                                <p className="font-semibold mb-1">What's holding it back:</p>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    {weakest.map((c) => (
                                        <li key={c.id}>
                                            {c.label} — you scored {scores[c.id]}/5
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-action justify-between">
                                <button className="btn" onClick={() => setStep(STEPS.length - 1)}>
                                    Back
                                </button>
                                <button className="btn btn-ghost" onClick={reset}>
                                    Start over
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Click-outside / Esc to close */}
                    <form method="dialog" className="modal-backdrop">
                        <button aria-label="Close">close</button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default ShouldIBuyModal;
export { STEPS, ALL_CRITERIA, getVerdict };
