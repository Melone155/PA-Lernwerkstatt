import React, { useEffect, useState } from "react";
import { useWishlist } from "../components/ui/useWishlist";
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

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

const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const BackendIP = import.meta.env.BackendIP;
  const navigate = useNavigate();

   const handleClickTrack = async () => {
        try { await fetch(`http://${BackendIP}:5000/product/track/click`, { method: 'POST' }); } catch {}
    }


  useEffect(() => {
    if (wishlist.length !== 0) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`http://${BackendIP}:5000/wishlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: wishlist }),
          });
          if (!res.ok) throw new Error("Produkt nicht gefunden");
          const data = await res.json();
          setProducts(data);
        } catch (err: any) {
          console.error('Fehler beim Laden der Produkte:', err.message);
        }
      };
      fetchProduct();
    } else {
      setProducts([]);
    }
  }, [wishlist]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Meine Merkliste</h1>

      {wishlist.length === 0 ? (
        <p>Keine Produkte auf der Merkliste.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 py-12">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group w-full max-w-[300px] mx-auto"
            >
              <div className="relative overflow-hidden rounded-t-2xl h-48 bg-gray-100">
                {product.mainImage || product.image ? (
                  <img
                    src={product.mainImage || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : null}
                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                  <ShoppingCart className="h-4 w-4 text-gray-700" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  {product._id ? (
                    <button
                      className="hover:underline hover:text-purple-700 transition-colors"
                      onClick={async () => {
                        await handleClickTrack();
                        navigate(`/productdetails/${product._id}`);
                      }}
                    >
                      {product.name}
                    </button>
                  ) : (
                    product.name
                  )}
                </h3>

                <div className="flex items-center mb-4">
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

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-2xl font-extrabold text-purple-600">
                      {product.price} €
                    </div>
                  </div>
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105"
                    onClick={async () => {
                      if (product._id) {
                        await handleClickTrack();
                        navigate(`/productdetails/${product._id}`);
                      }
                    }}
                    disabled={!product._id}
                  >
                    Kaufen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
