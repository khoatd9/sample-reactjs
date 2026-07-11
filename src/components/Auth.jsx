import { useState } from "react";
import { supabase } from "../supabaseClient";

function Auth() {
    const [mode, setMode] = useState("signin"); // "signin" | "signup"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const isSignup = mode === "signup";

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setMessage(null);

        const { data, error } = isSignup
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else if (isSignup && !data.session) {
            // Email confirmation is on — no session yet.
            setMessage({ type: "info", text: "Check your email to confirm your account! 📩" });
        }
        // On success with a session, App's onAuthStateChange swaps the screen.
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-6">
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-8">
                <div className="text-center mb-6">
                    <div className="text-5xl mb-2">🌈</div>
                    <h1 className="font-extrabold text-2xl text-gray-800">My Wishlist</h1>
                    <p className="text-gray-500">
                        {isSignup ? "Create your account to start wishing!" : "Welcome back! Sign in to see your wishes."}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="font-semibold text-gray-700 mb-1 block">Email 📧</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="rounded-2xl w-full border border-pink-100 bg-pink-50 placeholder-gray-400 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />

                    <label className="font-semibold text-gray-700 mb-1 block">Password 🔒</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        placeholder="At least 6 characters"
                        className="rounded-2xl w-full border border-pink-100 bg-pink-50 placeholder-gray-400 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />

                    {message && (
                        <p
                            className={`text-sm mb-4 ${
                                message.type === "error" ? "text-red-500" : "text-green-600"
                            }`}
                        >
                            {message.text}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-pink-400 hover:bg-pink-500 disabled:opacity-60 text-white font-bold py-3 shadow-md transition"
                    >
                        {loading ? "Please wait..." : isSignup ? "Sign up 🌟" : "Sign in ✨"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    {isSignup ? "Already have an account?" : "New here?"}{" "}
                    <button
                        onClick={() => {
                            setMode(isSignup ? "signin" : "signup");
                            setMessage(null);
                        }}
                        className="font-bold text-pink-500 hover:underline"
                    >
                        {isSignup ? "Sign in" : "Create one"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Auth;
