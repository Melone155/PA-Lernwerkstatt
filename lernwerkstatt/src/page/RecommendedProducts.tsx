import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Passende Alternativen</h3>

            {(!current || recommendations.length === 0) && (
                <div className="text-sm text-gray-500">Keine passenden Alternativen gefunden.</div>
            )}

            {current && recommendations.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendations.map((prod) => (
                        <div
                            key={prod._id}
                            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer"
                            onClick={() => navigate(`/productdetails/${prod._id}`)}
                        >
                            <div className="rounded-xl overflow-hidden h-40 bg-gray-100 mb-3">
                                {(prod.mainImage || prod.image) && (
                                    <img
                                        src={prod.mainImage || prod.image}
                                        alt={prod.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="font-semibold text-gray-900 leading-snug h-12 overflow-hidden">
                                {prod.name}
                            </div>

                            <div className="mt-1 text-purple-600 font-bold">
                                {typeof prod.price === "number" ? `${prod.price} €` : `${prod.price ?? "-" } €`}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default RecommendedProducts;
