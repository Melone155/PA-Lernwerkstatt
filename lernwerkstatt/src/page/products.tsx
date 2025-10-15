import React, { useEffect, useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
const BackendIP = import.meta.env.BackendIP;

interface Product {
    _id: string;
    name: string;
    price?: number;
    originalPrice?: string;
    image: string;
    mainImage?: string;
    images?: string[];
    rating?: number;
    reviews?: number;
    description?: string;
    features?: string[];
    specs?: Record<string, string>;
    stock?: number;
    category?: string;
}

const ProductCard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { productType } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `http://${BackendIP}:5000/product/all`;

                const res = await fetch(url);
                if (!res.ok) throw new Error('Fehler beim Laden der Produkte');
                const data = await res.json();

                if (productType && productType !== 'all') {
                    const filteredProducts = data.filter((product: Product) =>
                        Array.isArray(product.category) &&
                        product.category.some(
                            (cat: string) => cat.toLowerCase() === productType.toLowerCase()
                        )
                    );
                    setProducts(filteredProducts);
                } else {
                    setProducts(data);
                }

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [productType]);

    if (loading) return <div className="py-12 text-center text-gray-500">Produkte werden geladen...</div>;
    if (error) return <div className="py-12 text-center text-red-500">{error}</div>;

    const handleClickTrack = async () => {
        try { await fetch(`http://${BackendIP}:5000/product/track/click`, { method: 'POST' }); } catch {}
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 py-12">
            {products.map((product) => (
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
                                        product.rating && i < Math.floor(product.rating)
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
    );
};

export default ProductCard;