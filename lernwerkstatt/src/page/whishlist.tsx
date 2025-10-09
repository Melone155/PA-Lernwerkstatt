import React from "react";
import { useWishlist } from "../components/ui/useWishlist";

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

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
