import { useState } from 'react';
import { Link } from "react-router-dom"
import { Search, ShoppingCart, User, Menu, X, Gamepad2 } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Gamepad2 className="h-8 w-8 text-purple-400" />
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GameZone
            </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="hover:text-purple-400 transition-colors duration-200">Home</Link>
                        <Link to="/product/konsolen" className="hover:text-purple-400 transition-colors duration-200">Konsolen</Link>
                        <Link to="/product/pc" className="hover:text-purple-400 transition-colors duration-200">PC Gaming</Link>
                        <Link to="/product/zubehör" className="hover:text-purple-400 transition-colors duration-200">Zubehör</Link>
                    </div>

                    {/* Search Bar */}
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
                        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200">
                            <User className="h-5 w-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 bg-purple-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
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
                            <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-200">
                                <User className="h-5 w-5" />
                                <span>Anmelden</span>
                            </button>
                            <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-200">
                                <ShoppingCart className="h-5 w-5" />
                                <span>Warenkorb (3)</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;