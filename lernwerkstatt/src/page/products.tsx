import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: string;
    originalPrice: string;
    image: string;
    rating: number;
}

const ProductCard: React.FC = () => {
    const products: Product[] = [
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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 py-12">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group w-full max-w-[300px] mx-auto"
                >
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
                                    className={`h-5 w-5 ${
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
            ))}
        </div>
    );
};

export default ProductCard;