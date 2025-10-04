import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { Star, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
const BackendIP = import.meta.env.BackendIP;

interface Product {
    _id: string;
    name: string;
    price?: number;
    originalPrice?: string;
    image: string;
    mainImage?: string;
    images?: string[];
    rating?: number;
    reviews?: number;
    description?: string;
    features?: string[];
    specs?: Record<string, string>;
    stock?: number;
    category?: string;
}

export default function ProductDetailsPage() {
    const { productid } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<string>("")
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://${BackendIP}:5000/product/getproduct`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: productid })
                })
                if (!res.ok) throw new Error('Produkt nicht gefunden')
                const data = await res.json()
                setProduct(data)

                setSelectedImage(data.mainImage || data.image || "")
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (productid) fetchProduct()

        const testdata = async () => {
            let url = `http://${BackendIP}:5000/product/similar`;

            const res = await fetch(url);
            if (!res.ok) throw new Error('Fehler beim Laden der Produkte');
            const data = await res.json();

            setRelatedProducts(data.filter((p: Product) => p._id !== productid).slice(0, 10))
        }

        testdata()
    }, [productid])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            })
        }
    }

    const handleAddToCart = () => {
        if (product) {

            const savedCart = localStorage.getItem('cart');
            let cart = savedCart ? JSON.parse(savedCart) : [];

            const existingItem = cart.find((item: any) => item._id === product._id);

            if (existingItem) {
                // Update quantity
                cart = cart.map((item: any) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                cart.push({
                    _id: product._id,
                    name: product.name,
                    price: product.price || 0,
                    image: product.image,
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('storage'));
        }
    }

    if (loading) return <div className="py-12 text-center text-gray-500">Produkt wird geladen...</div>
    if (error || !product) return <div className="py-12 text-center text-red-500">{error || 'Produkt nicht gefunden'}</div>

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
                        {/* Hauptbild */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {selectedImage && (
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="w-full h-96 object-cover"
                                />
                            )}
                        </div>

                        {/* Bildergalerie Thumbnails */}
                        {product.images && product.images.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {/* Hauptbild Thumbnail */}
                                {(product.mainImage || product.image) && (
                                    <button
                                        onClick={() => setSelectedImage(product.mainImage || product.image || "")}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === (product.mainImage || product.image)
                                                ? 'border-purple-500'
                                                : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                    >
                                        <img
                                            src={product.mainImage || product.image}
                                            alt={`${product.name} - Hauptbild`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                )}

                                {/* Weitere Bilder */}
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === image
                                                ? 'border-purple-500'
                                                : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} - Bild ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
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
                                            className={`h-5 w-5 ${product.rating && i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-2">({product.rating ?? '-'})</span>
                                </div>
                                <span className="text-sm text-gray-600">{product.reviews ?? 0} Bewertungen</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-purple-600">
                                {product.price
                                    ? `€${Number(product.price).toFixed(2)}`
                                    : product.originalPrice}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">Features:</h3>
                                <ul className="space-y-1">
                                    {product.features && product.features.length > 0 ? product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm text-gray-600">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                            {feature}
                                        </li>
                                    )) : <li className="text-sm text-gray-400">Keine Features hinterlegt</li>}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>In den Warenkorb</span>
                                </button>
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">Verfügbar:</span> {product.stock ?? 0} Stück auf Lager
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
                        {product.specs && Object.entries(product.specs).length > 0 ? Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700">{key}</span>
                                <span className="text-gray-600">{value}</span>
                            </div>
                        )) : <div className="text-sm text-gray-400">Keine Spezifikationen hinterlegt</div>}
                    </div>
                </div>

                {/* Produktvorschläge */}
                {relatedProducts.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Das könnte Ihnen auch gefallen</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => scroll('left')}
                                    className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                    aria-label="Nach links scrollen"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                    aria-label="Nach rechts scrollen"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {relatedProducts.map((relatedProduct) => (
                                <div
                                    key={relatedProduct._id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex-shrink-0 w-[300px] snap-start"
                                >
                                    <div className="relative overflow-hidden rounded-t-2xl h-48 bg-gray-100">
                                        {(relatedProduct.mainImage || relatedProduct.image) ? (
                                            <img
                                                src={relatedProduct.mainImage || relatedProduct.image}
                                                alt={relatedProduct.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        ) : null}
                                        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                                            <ShoppingCart className="h-4 w-4 text-gray-700" />
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 text-lg mb-3">
                                            {relatedProduct._id ? (
                                                <button
                                                    className="hover:underline hover:text-gray-700 transition-colors text-left"
                                                    onClick={async () => { navigate(`/productdetails/${relatedProduct._id}`) }}
                                                >
                                                    {relatedProduct.name}
                                                </button>
                                            ) : (
                                                relatedProduct.name
                                            )}
                                        </h3>

                                        <div className="flex items-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-5 w-5 ${
                                                        relatedProduct.rating && i < Math.floor(relatedProduct.rating)
                                                            ? 'text-yellow-400 fill-current'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                            <span className="text-sm text-gray-600 ml-2">({relatedProduct.rating ?? '-'})</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className="text-2xl font-extrabold text-gray-900">
                                                    {relatedProduct.price
                                                        ? `€${Number(relatedProduct.price).toFixed(2)}`
                                                        : relatedProduct.originalPrice}
                                                </div>
                                            </div>
                                            <button
                                                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105"
                                                onClick={async () => { if (relatedProduct._id) {navigate(`/productdetails/${relatedProduct._id}`) } }}
                                                disabled={!relatedProduct._id}
                                            >
                                                Ansehen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}