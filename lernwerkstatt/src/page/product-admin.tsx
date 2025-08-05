import { useState } from "react"
import { Star, ShoppingCart } from "lucide-react"

export default function ProductAdminPage() {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        originalPrice: "",
        image: "",
        rating: 0,
    })

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-100/60 to-cyan-100/40">
            {/* Eingabeformular */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Produkt bearbeiten</h2>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={product.name}
                                onChange={e => setProduct(p => ({ ...p, name: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Preis</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={product.price}
                                onChange={e => setProduct(p => ({ ...p, price: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Originalpreis</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={product.originalPrice}
                                onChange={e => setProduct(p => ({ ...p, originalPrice: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Bild-URL</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={product.image}
                                onChange={e => setProduct(p => ({ ...p, image: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Bewertung (1-5)</label>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                step={0.1}
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={product.rating}
                                onChange={e => setProduct(p => ({ ...p, rating: parseFloat(e.target.value) }))}
                            />
                        </div>
                    </form>
                </div>
            </div>
            {/* Shop-Vorschau */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-transparent">
                <div className="w-full max-w-xs">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full">
                        <div className="relative overflow-hidden rounded-t-2xl h-48 bg-gray-100">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                                <ShoppingCart className="h-4 w-4 text-gray-700" />
                            </button>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-gray-900 text-lg mb-3">{product.name}</h3>
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="text-2xl font-extrabold text-purple-600">{product.price}</div>
                                    {product.originalPrice && (
                                        <div className="text-sm text-gray-500 line-through">{product.originalPrice}</div>
                                    )}
                                </div>
                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105">
                                    Kaufen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}