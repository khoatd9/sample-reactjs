import { useEffect, useState } from "react";

import Modal from "../components/Modal"
import { Star, Trash2, LogOut } from 'lucide-react';
import { supabase } from "../supabaseClient";
import { CRITERIA, averageScore } from "../criteria";

// Little 1–5 star row used for each criterion.
function Stars({ score }) {
  const rounded = Math.round(score);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          fill="currentColor"
          className={n <= rounded ? "text-yellow-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

function HomePage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    let ignore = false;

    async function fetchWishlist() {
      setItems(null);
      const { data } = await supabase.from("wishlist").select();
      if (!ignore) setItems(data);
    }

    fetchWishlist();
    return () => {
      ignore = true;
    }
  }, []);

  async function updateItems(newItem) {
    // Insert and read the stored row back so we get the DB-generated id.
    const { data, error } = await supabase
      .from('wishlist')
      .insert(newItem)
      .select()
      .single()

    if (error) {
      console.error(error)
      alert(error.message)
      return
    }

    // Functional update avoids a stale `items` closure, and handles null.
    setItems((prev) => [...(prev ?? []), data])
  }

  async function deleteItem(id) {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      alert(error.message)
      return
    }

    setItems((prev) => (prev ?? []).filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-extrabold text-3xl text-gray-800">🌈 My Wishlist</h1>
            <p className="text-gray-500">Pick your favorite things and rate how much you want them!</p>
          </div>
          <div className="flex items-center gap-3">
            <Modal onSave={updateItems} />
            <button
              onClick={() => supabase.auth.signOut()}
              className="rounded-full bg-white hover:bg-gray-100 text-gray-600 font-semibold px-4 py-3 shadow-sm flex items-center gap-2 transition"
            >
              <LogOut size={16} /> Log out
            </button>
          </div>
        </div>

        {/* Loading */}
        {items === null && (
          <div className="text-center text-gray-400 py-20 text-lg">Loading your wishes... ✨</div>
        )}

        {/* Empty */}
        {items !== null && items.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎈</div>
            <p className="text-gray-500 text-lg">No wishes yet! Tap “Add a wish” to start.</p>
          </div>
        )}

        {/* Grid of wishes */}
        {items !== null && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition p-5"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">🎁</span>
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  </div>
                  <div className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 flex items-center gap-1 font-bold">
                    <Star size={16} fill="currentColor" className="text-yellow-500" />
                    {averageScore(item.criteria).toFixed(1)}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{item.description}</p>

                <div className="border-t border-dashed border-gray-200 my-4" />

                <div className="space-y-2 mb-4">
                  {CRITERIA.map((c) => (
                    <div
                      key={c.key}
                      className="flex justify-between items-center bg-gray-50 rounded-2xl px-3 py-2"
                    >
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <span>{c.emoji}</span> {c.label}
                      </span>
                      <Stars score={Number(item.criteria?.[c.key]) || 0} />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="w-full rounded-full bg-red-50 hover:bg-red-100 text-red-500 font-semibold py-2 flex items-center justify-center gap-2 transition"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
