import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import { Heart } from "lucide-react";
import { useWishlist } from "../components/ui/useWishlist";
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
  const { productid } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://${BackendIP}:5000/product/getproduct`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: productid }),
        });
        if (!res.ok) throw new Error("Produkt nicht gefunden");
        const data = await res.json();
        setProduct(data);
        // Setze das Hauptbild als ausgewähltes Bild
        setSelectedImage(data.mainImage || data.image || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (productid) fetchProduct();
  }, [productid]);

  const handleAddToCart = () => {
    if (product) {
      const savedCart = localStorage.getItem("cart");
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
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
    }
  };

  if (loading)
    return (
      <div className="py-12 text-center text-gray-500">
        Produkt wird geladen...
      </div>
    );
  if (error || !product)
    return (
      <div className="py-12 text-center text-red-500">
        {error || "Produkt nicht gefunden"}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100/60 to-cyan-100/40">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="hover:text-purple-600">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/products" className="hover:text-purple-600">
                Produkte
              </a>
            </li>
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
                    onClick={() =>
                      setSelectedImage(product.mainImage || product.image || "")
                    }
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === (product.mainImage || product.image)
                        ? "border-purple-500"
                        : "border-gray-200 hover:border-purple-300"
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
                        ? "border-purple-500"
                        : "border-gray-200 hover:border-purple-300"
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        product.rating && i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.rating ?? "-"})
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviews ?? 0} Bewertungen
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">
                {product.price
                  ? `€${product.price.toFixed(2)}`
                  : product.originalPrice}
              </div>
              {product.originalPrice && product.price && (
                <div className="text-lg text-gray-500 line-through">
                  {product.originalPrice}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Features:</h3>
                <ul className="space-y-1">
                  {product.features && product.features.length > 0 ? (
                    product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400">
                      Keine Features hinterlegt
                    </li>
                  )}
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
              <button
                onClick={() =>
                  product &&
                  (isInWishlist(product._id)
                    ? removeFromWishlist(product._id)
                    : addToWishlist(product._id))
                }
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 border ${
                  isInWishlist(product._id)
                    ? "bg-red-500 text-white hover:bg-red-600 border-red-600"
                    : "bg-white text-purple-600 border-purple-400 hover:bg-purple-50"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlist(product._id)
                      ? "fill-current text-white"
                      : "text-purple-600"
                  }`}
                />
                <span>
                  {isInWishlist(product._id)
                    ? "Von Merkliste entfernen"
                    : "Zur Merkliste hinzufügen"}
                </span>
              </button>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Verfügbar:</span>{" "}
                {product.stock ?? 0} Stück auf Lager
              </div>
            </div>

            {/* Service-Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-600">
                  Kostenloser Versand
                </span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Technische Spezifikationen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.specs && Object.entries(product.specs).length > 0 ? (
              Object.entries(product.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b border-gray-100"
                >
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400">
                Keine Spezifikationen hinterlegt
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
