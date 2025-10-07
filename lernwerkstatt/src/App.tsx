import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Product from "./page/products.tsx"
import FAQ from "./page/faq.tsx"
import LoginPage from "./page/login.tsx"
import RegisterPage from "./page/register.tsx"
import ProductAdminPage from "./page/product-admin.tsx"
import Productdetails from "./page/productdetails.tsx";
import CartPage from "./page/cart.tsx"
import Statistics from "./Dashborad/statistics.tsx"
import Finanzen from "./Dashborad/finanzen.tsx";
import Depot from "./Dashborad/lager.tsx"
import Home from "./page/home"
import FavoritesPage from "./page/favorites.tsx"

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
                <Route path="/" element={<Home />} />
                <Route path="/product/:productType" element={<Product />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/product-admin" element={<ProductAdminPage />} />
                <Route path="/productdetails/:productid" element={<Productdetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/statistics" element={<Statistics onBack={() => window.history.back()} />} />
                <Route path="/finanzen" element={<Finanzen onBack={() => window.history.back()} />} />
                <Route path="/depot" element={<Depot onBack={() => window.history.back()} />} />
                <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App