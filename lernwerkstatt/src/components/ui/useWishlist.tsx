// src/components/ui/useWishlist.ts
import { useState, useEffect } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
            setWishlist(parsed);
        }
    } else {
        // Wenn kein Eintrag existiert, direkt anlegen
        localStorage.setItem("wishlist", JSON.stringify([]));
    }
}, []);


  /*useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
*/

const addToWishlist = (id: string) => {
  // Bestehende Daten aus dem Local Storage holen
  const saved = localStorage.getItem('wishlist');
  const IDs: string[] = saved ? JSON.parse(saved) : [];

  // Nur hinzufügen, wenn ID noch nicht existiert
  if (!IDs.includes(id)) {
    const updated = [...IDs, id];
    // In Local Storage speichern
    localStorage.setItem('wishlist', JSON.stringify(updated));
    // State updaten (optional, wenn du React nutzt)
    setWishlist(updated);
  }
};

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
    localStorage.setItem("wishlist", JSON.stringify(wishlist.filter((item) => item !== id)));
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist, setWishlist };
}



