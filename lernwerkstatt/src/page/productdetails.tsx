import { useParams } from "react-router-dom"
import { Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"

export default function ProductDetailsPage() {
    const { productid } = useParams()

    // Mock-Produktdaten (in einer echten App würden diese aus einer API kommen)
    const product = {
        id: productid,
        name: "Mechanical Gaming Keyboard",
        originalPrice: "€199.99",
        image: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.9,
        reviews: 127,
        description: "Professionelle Gaming-Tastatur mit mechanischen Switches für präzises Feedback und langlebige Haltbarkeit. Perfekt für Gaming und professionelle Nutzung.",
        features: [
            "RGB-Beleuchtung mit 16.8 Millionen Farben",
            "Mechanische Cherry MX Red Switches",
            "Anti-Ghosting Technologie",
            "USB-C Anschluss",
            "Handballenauflage inklusive"
        ],
        specs: {
            "Switch-Typ": "Cherry MX Red",
            "Beleuchtung": "RGB",
            "Anschluss": "USB-C",
            "Gewicht": "1.2 kg",
            "Abmessungen": "440 x 140 x 35 mm"
        },
        stock: 15,
        category: "Gaming"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100/60 to-cyan-100/40">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-600 mb-8">
                    <ol className="flex items-center space-x-2">
                        <li><a href="/" className="hover:text-purple-600">Home</a></li>
                        <li>/</li>
                        <li><a href="/products" className="hover:text-purple-600">Produkte</a></li>
                        <li>/</li>
                        <li className="text-purple-600">{product.name}</li>
                    </ol>
                </nav>

                {/* Hauptprodukt */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Produktbild */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    </div>

                    {/* Produktinfo */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                                </div>
                                <span className="text-sm text-gray-600">{product.reviews} Bewertungen</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-purple-600">{product.originalPrice}</div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">Features:</h3>
                                <ul className="space-y-1">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm text-gray-600">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>In den Warenkorb</span>
                                </button>
                            </div>
                            
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">Verfügbar:</span> {product.stock} Stück auf Lager
                            </div>
                        </div>

                        {/* Service-Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <Truck className="h-5 w-5 text-purple-600" />
                                <span className="text-sm text-gray-600">Kostenloser Versand</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Shield className="h-5 w-5 text-purple-600" />
                                <span className="text-sm text-gray-600">2 Jahre Garantie</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RotateCcw className="h-5 w-5 text-purple-600" />
                                <span className="text-sm text-gray-600">30 Tage Rückgabe</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spezifikationen */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Technische Spezifikationen</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700">{key}</span>
                                <span className="text-gray-600">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
