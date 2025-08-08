import { useCart } from "../components/Navbar"
import { X } from "lucide-react"

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartCount } = useCart()

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (cartCount === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100/60 to-cyan-100/40">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold text-purple-700 mb-4">Warenkorb ist leer</h1>
                    <p className="text-gray-600 mb-6">Füge Produkte hinzu, um zu beginnen</p>
                    <a href="/products" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Produkte durchsuchen
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100/60 to-cyan-100/40 py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-3xl font-bold text-purple-700 mb-8">Warenkorb ({cartCount} Artikel)</h1>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2">Produkt</th>
                                <th className="py-2">Preis</th>
                                <th className="py-2">Menge</th>
                                <th className="py-2">Zwischensumme</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item._id} className="border-b last:border-b-0">
                                    <td className="py-4 flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                                        <span className="font-medium text-gray-900">{item.name}</span>
                                    </td>
                                    <td className="py-4 text-purple-700 font-bold">€{item.price.toFixed(2)}</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="px-2">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-4 font-semibold">€{(item.price * item.quantity).toFixed(2)}</td>
                                    <td className="py-4">
                                        <button 
                                            onClick={() => removeFromCart(item._id)} 
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-6">
                        <div className="text-xl font-bold text-purple-700">Gesamt: €{total.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors">
                            Zur Kasse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}