import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Product from "./page/products.tsx"
import FAQ from "./page/faq.tsx"

import Home from "./page/home"

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:productType" element={<Product />} />
                <Route path="/faq" element={<FAQ />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App

