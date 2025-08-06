import { useState } from "react"
import { Star, ShoppingCart, Plus, X } from "lucide-react"

export default function ProductAdminPage() {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        originalPrice: "",
        image: "",
        rating: 0,
        reviews: 0,
        description: "",
        category: "",
        stock: 0,
        features: [""],
        specs: [{ key: "", value: "" }]
    })

    const addFeature = () => {
        setProduct(p => ({ ...p, features: [...p.features, ""] }))
    }

    const removeFeature = (index: number) => {
        setProduct(p => ({ ...p, features: p.features.filter((_, i) => i !== index) }))
    }

    const updateFeature = (index: number, value: string) => {
        setProduct(p => ({ ...p, features: p.features.map((f, i) => i === index ? value : f) }))
    }

    const addSpec = () => {
        setProduct(p => ({ ...p, specs: [...p.specs, { key: "", value: "" }] }))
    }

    const removeSpec = (index: number) => {
        setProduct(p => ({ ...p, specs: p.specs.filter((_, i) => i !== index) }))
    }

    const updateSpec = (index: number, field: "key" | "value", value: string) => {
        setProduct(p => ({ 
            ...p, 
            specs: p.specs.map((s, i) => i === index ? { ...s, [field]: value } : s) 
        }))
    }

    const handleSave = async () => {
        try {
            // Konvertiere specs Array zu Object
            const specsObject = product.specs.reduce((acc, spec) => {
                if (spec.key && spec.value) {
                    acc[spec.key] = spec.value
                }
                return acc
            }, {} as Record<string, string>)

            // Filtere leere Features
            const filteredFeatures = product.features.filter(feature => feature.trim() !== "")

            const productData = {
                ...product,
                specs: specsObject,
                features: filteredFeatures,
                price: parseFloat(product.price) || 0,
                rating: parseFloat(product.rating.toString()) || 0,
                reviews: parseInt(product.reviews.toString()) || 0,
                stock: parseInt(product.stock.toString()) || 0
            }

            const response = await fetch('http://localhost:5000/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            })

            if (response.ok) {
                alert('Produkt erfolgreich gespeichert!')
                // Optional: Formular zurücksetzen
                setProduct({
                    name: "",
                    price: "",
                    originalPrice: "",
                    image: "",
                    rating: 0,
                    reviews: 0,
                    description: "",
                    category: "",
                    stock: 0,
                    features: [""],
                    specs: [{ key: "", value: "" }]
                })
            } else {
                alert('Fehler beim Speichern des Produkts')
            }
        } catch (error) {
            console.error('Fehler beim Speichern:', error)
            alert('Fehler beim Speichern des Produkts')
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-100/60 to-cyan-100/40">
            {/* Eingabeformular */}
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-center">
                <div className="bg-white rounded-2xl shadow-xl p-12 w-full max-w-2xl">
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
                            <label className="block text-sm font-medium text-purple-700 mb-1">Bild-URL</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={product.image}
                                onChange={e => setProduct(p => ({ ...p, image: e.target.value }))}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
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
                            <div>
                                <label className="block text-sm font-medium text-purple-700 mb-1">Anzahl Bewertungen</label>
                                <input
                                    type="number"
                                    min={0}
                                    className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    value={product.reviews}
                                    onChange={e => setProduct(p => ({ ...p, reviews: parseInt(e.target.value) }))}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Lagerbestand</label>
                            <input
                                type="number"
                                min={0}
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={product.stock}
                                onChange={e => setProduct(p => ({ ...p, stock: parseInt(e.target.value) }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Beschreibung</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={product.description}
                                onChange={e => setProduct(p => ({ ...p, description: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Kategorie</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={product.category}
                                onChange={e => setProduct(p => ({ ...p, category: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Features</label>
                            <div className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                            value={feature}
                                            onChange={e => updateFeature(index, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="p-2 text-red-500 hover:text-red-700"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm"
                                >
                                    <Plus className="h-4 w-4" />
                                    Feature hinzufügen
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Spezifikationen</label>
                            <div className="space-y-2">
                                {product.specs.map((spec, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                            value={spec.key}
                                            onChange={e => updateSpec(index, "key", e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Wert"
                                            className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                            value={spec.value}
                                            onChange={e => updateSpec(index, "value", e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeSpec(index)}
                                            className="p-2 text-red-500 hover:text-red-700"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSpec}
                                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm"
                                >
                                    <Plus className="h-4 w-4" />
                                    Spezifikation hinzufügen
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-8 flex justify-center">
                        <button 
                            onClick={handleSave}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow transition-colors"
                        >
                            Produkt speichern
                        </button>
                    </div>
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
                                <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
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