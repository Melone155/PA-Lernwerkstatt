import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {ShoppingCart, Star} from "lucide-react";

// Backend-IP
const BackendIP = import.meta.env.BackendIP;

// Produkttyp (nur Felder, die wir hier brauchen)
interface Product {
    _id: string;
    name: string;
    price?: number | string;
    image?: string;
    mainImage?: string;
    rating?: number | string;
    reviews?: number | string;
    category?: string | string[]; // kann string ODER string[] sein
}

// Hilfsfunktion: category -> string[]
// akzeptiert string ("CPU, Intel") ODER string[] (["CPU","Intel"])
// macht alles klein & trimmt Leerzeichen damit der Vergleich robust ist
function toCats(cat?: string | string[]): string[] {
    if (!cat) return [];
    if (Array.isArray(cat)) return cat.map(c => String(c).toLowerCase().trim()).filter(Boolean);
    return String(cat)
        .split(/[,\|]/g) // trenne bei Komma oder |
        .map(c => c.toLowerCase().trim())
        .filter(Boolean);
}

const RecommendedProducts: React.FC = () => {
    // "productid" lesen
    const { productid } = useParams();
    const navigate = useNavigate();

    const [all, setAll] = useState<Product[]>([]);
    const [current, setCurrent] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // Daten laden: ALLE Produkte + das aktuelle Produkt
    useEffect(() => {
        let alive = true;

        async function load() {
            try {
                setLoading(true);
                setErr(null);

                // 1) alle Produkte
                const resAll = await fetch(`http://${BackendIP}:5000/product/all`);
                if (!resAll.ok) throw new Error("Fehler beim Laden aller Produkte");
                const dataAll = await resAll.json();

                // 2) aktuelles Produkt
                const resCur = await fetch(`http://${BackendIP}:5000/product/getproduct`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: productid }),
                });
                if (!resCur.ok) throw new Error("Aktuelles Produkt nicht gefunden");
                const dataCur = await resCur.json();

                if (!alive) return;
                setAll(Array.isArray(dataAll) ? dataAll : []);
                setCurrent(dataCur ?? null);
            } catch (e: any) {
                if (!alive) return;
                setErr(e?.message || "Unbekannter Fehler");
            } finally {
                if (alive) setLoading(false);
            }
        }

        if (productid) load();
        return () => { alive = false; };
    }, [productid]);

    const handleClickTrack = async () => {
        try { await fetch(`http://${BackendIP}:5000/product/track/click`, { method: 'POST' }); } catch {}
    }

    // EMPFEHLUNGEN
    // "zeige bis zu 4 andere Produkte, die mindestens EIN Kategorie-Schlagwort mit dem aktuellen teilen"
    const recommendations = useMemo(() => {
        if (!current || all.length === 0) return [];

        const curCats = toCats(current.category);
        if (curCats.length === 0) return [];

        return all
            .filter(p => p._id !== current._id)
            .filter(p => {
                const cats = toCats(p.category);
                return cats.some(c => curCats.includes(c));
            })
            .slice(0, 4);
    }, [all, current]);

    // Einfache Statusausgaben (hilft beim Testen)
    if (!productid) return <div className="text-sm text-gray-500">Keine Produkt-ID in der URL.</div>;
    if (loading)    return <div className="text-sm text-gray-500">Empfehlungen werden geladen…</div>;
    if (err)        return <div className="text-sm text-red-500">Fehler: {err}</div>;

    return (
        <section className="mt-12">
            {(!current || recommendations.length === 0) && (
                <div className="text-sm text-gray-500">Keine passenden Alternativen gefunden.</div>
            )}

            {current && recommendations.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendations.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group w-full max-w-[300px] mx-auto"
                        >
                            <div className="relative overflow-hidden rounded-t-2xl h-48 bg-gray-100">
                                {(product.mainImage || product.image) ? (
                                    <img
                                        src={product.mainImage || product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : null}
                                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                                    <ShoppingCart className="h-4 w-4 text-gray-700" />
                                </button>
                            </div>

                            <div className="p-6">
                                <h3 className="font-bold text-gray-900 text-lg mb-3">
                                    {product._id ? (
                                        <button
                                            className="hover:underline hover:text-purple-700 transition-colors"
                                            onClick={async () => { await handleClickTrack(); navigate(`/productdetails/${product._id}`) }}
                                        >
                                            {product.name}
                                        </button>
                                    ) : (
                                        product.name
                                    )}
                                </h3>

                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${
                                                Number(product.rating) && i < Math.floor(Number(product.rating))
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-2">({product.rating ?? '-'})</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="text-2xl font-extrabold text-purple-600">{product.price} €</div>
                                    </div>
                                    <button
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105"
                                        onClick={async () => { if (product._id) { await handleClickTrack(); navigate(`/productdetails/${product._id}`) } }}
                                        disabled={!product._id}
                                    >
                                        Kaufen
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default RecommendedProducts;
