import { useState } from "react"
import { ShoppingCart, X } from "lucide-react"

// Beispielhafte Warenkorb-Daten (in einer echten App kämen diese aus Context oder Backend)
const initialCart = [
    {
        id: 1,
        name: "Mechanical Gaming Keyboard",
        price: 159.99,
        image: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400",
        quantity: 1,
    },
    {
        id: 2,
        name: "Gaming Mouse Pro",
        price: 89.99,
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
        quantity: 2,
    },
]

export default function CartPage() {
    const [cart, setCart] = useState(initialCart)

    const handleRemove = (id: number) => {
        setCart(cart.filter(item => item.id !== id))
    }

    const handleQuantity = (id: number, delta: number) => {
        setCart(cart => cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ))
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100/60 to-cyan-100/40 py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
                    <ShoppingCart className="h-8 w-8 text-cyan-500" />
                    Warenkorb
                </h1>
                {cart.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                        Dein Warenkorb ist leer.
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-6">
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
                                    <tr key={item.id} className="border-b last:border-b-0">
                                        <td className="py-4 flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                                            <span className="font-medium text-gray-900">{item.name}</span>
                                        </td>
                                        <td className="py-4 text-purple-700 font-bold">€{item.price.toFixed(2)}</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                                                <span className="px-2">{item.quantity}</span>
                                                <button onClick={() => handleQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                                            </div>
                                        </td>
                                        <td className="py-4 font-semibold">€{(item.price * item.quantity).toFixed(2)}</td>
                                        <td className="py-4">
                                            <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700">
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
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors">
                                Zur Kasse
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}