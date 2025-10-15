import { useState, useEffect, createContext, useContext } from 'react';
import { Link } from "react-router-dom"
import { Search, ShoppingCart, User, Menu, X, Gamepad2 } from 'lucide-react';

// Cart Context
interface CartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            }
            return [...prevCart, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prevCart => prevCart.filter(item => item._id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    // Load cart count from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
            setCartCount(count);
        }
    }, []);

    // Listen for cart changes
    useEffect(() => {
        const handleStorageChange = () => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const cart = JSON.parse(savedCart);
                const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
                setCartCount(count);
            } else {
                setCartCount(0);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Gamepad2 className="h-8 w-8 text-purple-400" />
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NextlvlHardware
            </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="hover:text-purple-400 transition-colors duration-200">Home</Link>
                        <Link to="/product/all" className="hover:text-purple-400 transition-colors duration-200">Alle Produkte</Link>
                        <Link to="/Whishlist" className="hover:text-purple-400 transition-colors duration-200">Whishlist</Link>
                    </div>

                    <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Spiele, Konsolen, Zubehör..."
                                className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-400 transition-colors duration-200"
                            />
                            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                    </div>

                    {/* Right Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login" className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200">
                            <User className="h-5 w-5" />
                        </Link>
                        <Link to="/cart" className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 relative">
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-purple-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Suchen..."
                                className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-400"
                            />
                            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                        <div className="flex flex-col space-y-3">
                            <a href="#" className="hover:text-purple-400 transition-colors duration-200 py-2">Home</a>
                            <a href="#" className="hover:text-purple-400 transition-colors duration-200 py-2">Konsolen</a>
                            <a href="#" className="hover:text-purple-400 transition-colors duration-200 py-2">PC Gaming</a>
                            <a href="#" className="hover:text-purple-400 transition-colors duration-200 py-2">Zubehör</a>
                            <a href="#" className="hover:text-purple-400 transition-colors duration-200 py-2">Sale</a>
                        </div>
                        <div className="flex space-x-4 pt-4 border-t border-gray-700">
                            <Link to="/login" className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-200">
                                <User className="h-5 w-5" />
                            </Link>
                            <Link to="/cart" className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-200">
                                <ShoppingCart className="h-5 w-5" />
                                <span>Warenkorb ({cartCount})</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;