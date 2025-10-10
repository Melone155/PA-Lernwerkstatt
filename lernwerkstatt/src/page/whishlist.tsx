import React, { use, useEffect, useState } from "react";
import { useWishlist } from "../components/ui/useWishlist";

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
  const { wishlist, removeFromWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const BackendIP = import.meta.env.BackendIP;


  useEffect(() => {
    if (wishlist.length !== 0) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(
            `http://${BackendIP}:5000/wishlist`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: wishlist }), // Beispielhaft nur das erste Produkt laden
            }
          );
          if (!res.ok) throw new Error("Produkt nicht gefunden");
          const data = await res.json();
          setProducts(data);

          
          // Setze das Hauptbild als ausgewähltes Bild
          setSelectedImage(data.mainImage || data.image || "");
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [wishlist]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Meine Merkliste</h1>

      {wishlist.length === 0 ? (
        <p>Keine Produkte auf der Merkliste.</p>
      ) : (
        <ul className="space-y-2">
          {wishlist.map((id) => (
            <li
              key={id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>Produkt-ID: {id}</span>
              <button
                onClick={() => removeFromWishlist(id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
