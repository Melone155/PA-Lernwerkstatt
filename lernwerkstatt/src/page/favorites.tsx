import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Star, Heart } from "lucide-react"

const BackendIP = import.meta.env.BackendIP;

interface Product {
    _id: string;
    name: string;
    price?: number;
    originalPrice?: string;
    image: string;
    mainImage?: string;
    rating?: number;
    reviews?: number;
    description?: string;
    stock?: number;
}

export default function FavoritesPage() {
    const navigate = useNavigate()
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [favoriteIds, setFavoriteIds] = useState<string[]>([])

    useEffect(() => {
        loadFavorites()
    }, [])

    const handleClickTrack = async () => {
        try { await fetch(`http://${BackendIP}:5000/product/track/click`, { method: 'POST' }); } catch {}
    }

    const loadFavorites = async () => {
        setLoading(true)
        try {
            const savedFavorites = localStorage.getItem('favorites')
            const ids: string[] = savedFavorites ? JSON.parse(savedFavorites) : []
            console.log(ids)
            setFavoriteIds(ids)

            if (ids.length === 0) {
                setFavoriteProducts([])
                setLoading(false)
                return
            }

            const products: Product[] = []
            for (const id of ids) {
                try {
                    const res = await fetch(`http://${BackendIP}:5000/product/getproduct`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    })
                    if (res.ok) {
                        const product = await res.json()
                        products.push(product)
                    }
                } catch (err) {
                    console.error(`Fehler beim Laden des Produkts ${id}:`, err)
                }
            }
            setFavoriteProducts(products)
        } catch (err) {
            console.error('Fehler beim Laden der Favoriten:', err)
        } finally {
            setLoading(false)
        }
    }

    const removeFavorite = (productId: string) => {
        const updatedIds = favoriteIds.filter(id => id !== productId)
        localStorage.setItem('favorites', JSON.stringify(updatedIds))
        setFavoriteIds(updatedIds)
        setFavoriteProducts(favoriteProducts.filter(p => p._id !== productId))
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12 text-gray-500">Favoriten werden geladen...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-3xl font-bold text-gray-900">Meine Favoriten</h1>
                        <span className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                            {favoriteProducts.length}
                        </span>
                    </div>
                </div>

                {favoriteProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Keine Favoriten</h2>
                        <p className="text-gray-600 mb-6">Sie haben noch keine Produkte zu Ihren Favoriten hinzugefügt.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-purple-600 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            Produkte entdecken
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favoriteProducts.map((product) => (
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <div className="relative overflow-hidden rounded-t-2xl h-48 bg-gray-100">
                                    {(product.mainImage || product.image) ? (
                                        <img
                                            src={product.mainImage || product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-300"
                                        />
                                    ) : null}
                                    <button
                                        onClick={() => removeFavorite(product._id)}
                                        className="absolute top-3 right-3 bg-purple-500 hover:bg-purple-600 p-2 rounded-full transition-colors"
                                    >
                                        <Heart className="h-4 w-4 text-white fill-current" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-bold text-gray-900 text-lg mb-3">
                                        <button
                                            className="hover:underline hover:text-gray-700 transition-colors text-left"
                                            onClick={() => navigate(`/productdetails/${product._id}`)}
                                        >
                                            {product.name}
                                        </button>
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
                )}
            </div>
        </div>
    )
}
