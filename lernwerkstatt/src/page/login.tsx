import { useState } from "react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100/60 to-cyan-100/40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Login</h1>
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">E-Mail</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Deine E-Mail-Adresse"
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">Passwort</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-10"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Dein Passwort"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-purple-500-500"
                                onClick={() => setShowPassword(v => !v)}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.216.41 4.563 1.125M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .512-.122.995-.34 1.418M6.53 6.53A9.956 9.956 0 002 12c0 3 4 7 10 7 1.61 0 3.13-.314 4.47-.88M17.47 17.47A9.956 9.956 0 0022 12c0-1.61-.314-3.13-.88-4.47" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-colors"
                    >
                        Einloggen
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    Noch keinen Account? <a href="/register" className="text-purple-500 hover:underline font-medium">Registrieren</a>
                </div>
            </div>
        </div>
    )
}