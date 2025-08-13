import React, { useState } from 'react';
import {
    Package,
    Plus,
    Minus,
    AlertTriangle,
    CheckCircle,
    ArrowLeft,
    Search,
    Filter
} from 'lucide-react';

interface Product {
    id: number;
    name: string;
    stock: number;
    minStock: number;
    price: number;
    category: string;
    sku: string;
}

const Inventory: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'PlayStation 5', stock: 15, minStock: 5, price: 499.99, category: 'Konsolen', sku: 'PS5-001' },
        { id: 2, name: 'Xbox Series X', stock: 8, minStock: 10, price: 449.99, category: 'Konsolen', sku: 'XSX-001' },
        { id: 3, name: 'Nintendo Switch', stock: 25, minStock: 15, price: 299.99, category: 'Konsolen', sku: 'NSW-001' },
        { id: 4, name: 'Steam Deck', stock: 3, minStock: 8, price: 399.99, category: 'Konsolen', sku: 'SD-001' },
        { id: 5, name: 'PlayStation 5 Controller', stock: 45, minStock: 20, price: 69.99, category: 'Zubehör', sku: 'PS5C-001' },
        { id: 6, name: 'Xbox Wireless Controller', stock: 0, minStock: 15, price: 59.99, category: 'Zubehör', sku: 'XWC-001' },
        { id: 7, name: 'Nintendo Pro Controller', stock: 12, minStock: 10, price: 69.99, category: 'Zubehör', sku: 'NPC-001' },
        { id: 8, name: 'Gaming Headset', stock: 28, minStock: 12, price: 89.99, category: 'Zubehör', sku: 'GH-001' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('Alle');

    const updateStock = (productId: number, change: number) => {
        setProducts(prev => prev.map(product =>
            product.id === productId
                ? { ...product, stock: Math.max(0, product.stock + change) }
                : product
        ));
    };

    const getStockStatus = (stock: number, minStock: number) => {
        if (stock === 0) return { status: 'out', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', icon: AlertTriangle };
        if (stock <= minStock) return { status: 'low', color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertTriangle };
        return { status: 'good', color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle };
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'Alle' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['Alle', ...Array.from(new Set(products.map(p => p.category)))];

    const stockSummary = {
        total: products.length,
        outOfStock: products.filter(p => p.stock === 0).length,
        lowStock: products.filter(p => p.stock > 0 && p.stock <= p.minStock).length,
        inStock: products.filter(p => p.stock > p.minStock).length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Zurück zum Shop
                            </button>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Lagerverwaltung</h1>
                                <p className="text-gray-600 mt-1">Bestandsübersicht und Verwaltung</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Gesamt Produkte</p>
                                <p className="text-3xl font-bold text-gray-900">{stockSummary.total}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Package className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Auf Lager</p>
                                <p className="text-3xl font-bold text-green-600">{stockSummary.inStock}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Niedriger Bestand</p>
                                <p className="text-3xl font-bold text-yellow-600">{stockSummary.lowStock}</p>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Ausverkauft</p>
                                <p className="text-3xl font-bold text-red-600">{stockSummary.outOfStock}</p>
                            </div>
                            <div className="bg-red-100 p-3 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Produkt suchen (Name oder SKU)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => {
                        const stockInfo = getStockStatus(product.stock, product.minStock);
                        const StockIcon = stockInfo.icon;

                        return (
                            <div key={product.id} className={`bg-white rounded-xl p-6 shadow-lg border-2 ${stockInfo.border} transition-all duration-200 hover:shadow-xl`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mb-1">SKU: {product.sku}</p>
                                        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                                        <p className="text-blue-600 font-semibold">€{product.price.toFixed(2)}</p>
                                    </div>
                                    <div className={`p-2 rounded-full ${stockInfo.bg}`}>
                                        <StockIcon className={`w-5 h-5 ${stockInfo.color}`} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Aktueller Bestand:</span>
                                        <span className={`font-bold text-xl ${stockInfo.color}`}>
                      {product.stock} Stück
                    </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Mindestbestand:</span>
                                        <span className="font-medium text-gray-900">{product.minStock} Stück</span>
                                    </div>

                                    {/* Stock Level Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${
                                                product.stock === 0 ? 'bg-red-500' :
                                                    product.stock <= product.minStock ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                            style={{
                                                width: `${Math.min((product.stock / (product.minStock * 2)) * 100, 100)}%`
                                            }}
                                        ></div>
                                    </div>

                                    {product.stock <= product.minStock && (
                                        <div className={`${stockInfo.bg} border ${stockInfo.border} rounded-lg p-3`}>
                                            <p className={`${stockInfo.color} text-sm font-medium`}>
                                                {product.stock === 0 ? 'Ausverkauft!' : 'Niedriger Bestand!'}
                                            </p>
                                            <p className="text-gray-700 text-xs mt-1">
                                                Empfehlung: {Math.max(product.minStock - product.stock + 10, 10)} Stück nachbestellen
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                const amount = prompt('Anzahl zum Reduzieren:');
                                                if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
                                                    updateStock(product.id, -Number(amount));
                                                }
                                            }}
                                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                                        >
                                            <Minus className="w-4 h-4" />
                                            Reduzieren
                                        </button>
                                        <button
                                            onClick={() => {
                                                const amount = prompt('Anzahl zum Aufstocken:');
                                                if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
                                                    updateStock(product.id, Number(amount));
                                                }
                                            }}
                                            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Aufstocken
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Produkte gefunden</h3>
                        <p className="text-gray-600">Versuchen Sie einen anderen Suchbegriff oder Filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;