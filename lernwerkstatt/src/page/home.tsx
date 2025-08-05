import {
    ShoppingCart,
    Star,
    Zap,
    Monitor,
    Gamepad,
    Headphones,
    Keyboard,
    Mouse,
    Smartphone,
} from 'lucide-react';

function App() {

    const products = [
        {
            id: 1,
            name: "PlayStation 5",
            price: "€499.99",
            originalPrice: "€549.99",
            image: "https://images.pexels.com/photos/8260341/pexels-photo-8260341.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.8,
        },
        {
            id: 2,
            name: "Xbox Series X",
            price: "€479.99",
            originalPrice: "€499.99",
            image: "https://images.pexels.com/photos/8260341/pexels-photo-8260341.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.7,
        },
        {
            id: 3,
            name: "Gaming Headset Pro",
            price: "€89.99",
            originalPrice: "€129.99",
            image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.6,
        },
        {
            id: 4,
            name: "Mechanical Gaming Keyboard",
            price: "€159.99",
            originalPrice: "€199.99",
            image: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.9,
        }
    ];

    const categories = [
        {
            icon: Monitor,
            name: "PC Gaming",
            description: "High-End Gaming PCs & Komponenten",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Gamepad,
            name: "Konsolen",
            description: "PlayStation, Xbox, Nintendo Switch",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Headphones,
            name: "Audio",
            description: "Gaming Headsets & Lautsprecher",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Keyboard,
            name: "Peripherie",
            description: "Tastaturen, Mäuse & Controller",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: Mouse,
            name: "Zubehör",
            description: "Gaming-Stühle, Mauspads & mehr",
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: Smartphone,
            name: "Mobile Gaming",
            description: "Smartphone Gaming & Zubehör",
            color: "from-pink-500 to-rose-500"
        }
    ];

    return (
        <div className="min-h-screen">
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-2 text-purple-600 mb-4">
                            <Zap className="h-5 w-5" />
                            <span className="text-sm font-medium uppercase tracking-wide">Featured Products</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Die beliebtesten Gaming Produkte
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Entdecke unsere handverlesenen Top-Produkte mit den besten Bewertungen und Preisen
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <div className="relative overflow-hidden rounded-t-xl">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                                        <ShoppingCart className="h-4 w-4 text-gray-700" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center space-x-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${
                                                    i < Math.floor(product.rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="text-2xl font-bold text-purple-600">{product.price}</div>
                                            {product.originalPrice && (
                                                <div className="text-sm text-gray-500 line-through">{product.originalPrice}</div>
                                            )}
                                        </div>
                                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 transform hover:scale-105">
                                            Kaufen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                            Alle Produkte anzeigen
                        </button>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Gaming Kategorien
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Finde genau das, was du für dein ultimatives Gaming-Setup brauchst
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <div key={index} className="group cursor-pointer">
                                    <div className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                                            {category.name}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            {category.description}
                                        </p>

                                        <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors duration-200">
                                            <span>Kategorie entdecken</span>
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;