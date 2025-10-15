import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"

import Statistics from "./Dashborad/statistics.tsx"
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";


const BackendIP = import.meta.env.BackendIP;

function App() {
    useEffect(() => {
        const key = 'lastVisitAt';
        const last = localStorage.getItem(key);
        const now = Date.now();
        const THIRTY_MIN = 30 * 60 * 1000;
        let shouldTrack = true;
        if (last) {
            const lastMs = parseInt(last, 10);
            if (!Number.isNaN(lastMs) && now - lastMs < THIRTY_MIN) {
                shouldTrack = false;
            }
        }
        if (shouldTrack) {
            fetch(`http://${BackendIP}:5000/product/track/visit`, { method: 'POST' }).catch(() => {})
            localStorage.setItem(key, String(now));
        }
    }, [])

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Statistics onBack={() => window.history.back()} />} />
                <Route path="/statistics" element={<Statistics onBack={() => window.history.back()} />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App