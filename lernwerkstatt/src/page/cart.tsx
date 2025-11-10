import { useState, useEffect } from "react"
import { X } from "lucide-react"

const BackendIP = import.meta.env.BackendIP;

interface CartStorageItem {
    _id: string;
    quantity: number;
}

interface CartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadCartWithProducts = async () => {
            try {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    const cartItems: CartStorageItem[] = JSON.parse(savedCart);
                    
                    // Lade Produktdaten für jede _id
                    const cartWithProducts = await Promise.all(
                        cartItems.map(async (item) => {
                            try {
                                const res = await fetch(`http://${BackendIP}:5000/product/getproduct`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ id: item._id }),
                                });
                                if (!res.ok) throw new Error("Produkt nicht gefunden");
                                const productData = await res.json();
                                return {
                                    _id: item._id,
                                    name: productData.name,
                                    price: productData.price || 0,
                                    image: productData.image || productData.mainImage,
                                    quantity: item.quantity
                                };
                            } catch (error) {
                                console.error(`Fehler beim Laden von Produkt ${item._id}:`, error);
                                return null;
                            }
                        })
                    );
                    
                    // Filtere null-Werte (fehlgeschlagene Requests)
                    setCart(cartWithProducts.filter((item): item is CartItem => item !== null));
                }
            } catch (error) {
                console.error("Fehler beim Laden des Warenkorbs:", error);
            } finally {
                setLoading(false);
            }
        };
        
        loadCartWithProducts();
    }, [])

    const removeFromCart = (id: string) => {
        const newCart = cart.filter(item => item._id !== id);
        setCart(newCart);
        // Speichere nur _id und quantity
        const storageCart = newCart.map(item => ({ _id: item._id, quantity: item.quantity }));
        localStorage.setItem('cart', JSON.stringify(storageCart));
        window.dispatchEvent(new Event('storage'));
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        const newCart = cart.map(item =>
            item._id === id ? { ...item, quantity } : item
        );
        setCart(newCart);
        // Speichere nur _id und quantity
        const storageCart = newCart.map(item => ({ _id: item._id, quantity: item.quantity }));
        localStorage.setItem('cart', JSON.stringify(storageCart));
        window.dispatchEvent(new Event('storage'));
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

    if (loading) return <div className="py-12 text-center text-gray-500">Warenkorb wird geladen...</div>

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
                                    <div className="text-2xl font-extrabold text-purple-600">{item.price} €</div>
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