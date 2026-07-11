import React, { useState } from 'react';
import { CRITERIA } from '../criteria';

function initialScores() {
    return Object.fromEntries(CRITERIA.map((c) => [c.key, 3]));
}

function Modal({ onSave }) {
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [scores, setScores] = useState(initialScores);

    function handleSaveItem() {
        onSave({
            name: itemName,
            description: description,
            criteria: scores,
        });

        setItemName("");
        setDescription("");
        setScores(initialScores());
    }

    return (
        <>
            <button
                onClick={() => document.getElementById('item_id').showModal()}
                className="rounded-full bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-3 shadow-md transition"
            >
                ✨ Add a wish
            </button>

            <dialog id="item_id" className="modal">
                <div className="modal-box rounded-3xl max-h-3/4">
                    <div className="font-extrabold text-3xl mb-1">✨ Add a wish</div>
                    <p className="text-gray-500 mb-6">Tell us about the thing you want!</p>

                    <label className="font-semibold text-gray-700 mb-1 block">What is it? 🎁</label>
                    <input
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        type="text"
                        placeholder="e.g. LEGO castle"
                        className="rounded-2xl w-full border border-pink-100 bg-pink-50 placeholder-gray-400 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />

                    <label className="font-semibold text-gray-700 mb-1 block">Why do you want it? 💭</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us more..."
                        className="rounded-2xl w-full border border-pink-100 bg-pink-50 placeholder-gray-400 h-24 p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />

                    <p className="font-bold text-lg mb-1">How do you feel about it?</p>
                    <p className="text-sm text-gray-500 mb-4">Pick from 1 (meh) to 5 (love it!)</p>

                    {CRITERIA.map((c) => (
                        <div
                            key={c.key}
                            className="flex justify-between items-center bg-gray-50 rounded-2xl p-3 my-3"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{c.emoji}</span>
                                <span className="font-semibold text-gray-700">{c.label}</span>
                            </div>
                            <select
                                value={scores[c.key]}
                                onChange={(e) =>
                                    setScores((prev) => ({ ...prev, [c.key]: Number(e.target.value) }))
                                }
                                className="rounded-xl border border-gray-200 p-2 bg-white"
                            >
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <div className="modal-action">
                        <form method="dialog" className="flex gap-3 w-full">
                            <button
                                onClick={() => handleSaveItem()}
                                className="flex-1 rounded-full bg-green-400 hover:bg-green-500 text-white font-bold py-3"
                            >
                                Save my wish 🌟
                            </button>
                            <button className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-6">
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default Modal;
