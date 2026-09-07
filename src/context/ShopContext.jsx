import { createContext, useContext, useState, useCallback } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem("jam35_cart");
    return raw ? JSON.parse(raw).map((i) => ({ ...i, qty: i.qty || 1 })) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const raw = localStorage.getItem("jam35_wishlist");
    return raw ? JSON.parse(raw) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const raw = localStorage.getItem("jam35_recently");
    return raw ? JSON.parse(raw) : [];
  });

  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  }, []);

  const saveCart = useCallback((newCart) => {
    setCart(newCart);
    localStorage.setItem("jam35_cart", JSON.stringify(newCart));
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

  const addToCart = useCallback(
    (product) => {
      let updated;
      const existing = cart.find((i) => i.id === product.id);
      if (existing) {
        updated = cart.map((i) =>
          i.id === product.id ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
        showToast(`${product.nama} ditambah! Masih ada ${existing.qty + 1}x di keranjang.`);
      } else {
        updated = [...cart, { ...product, qty: 1 }];
        showToast(`Jam ${product.nama} masuk keranjang!`);
      }
      saveCart(updated);
    },
    [cart, saveCart, showToast]
  );

  const changeQty = useCallback(
    (id, delta) => {
      const updated = cart
        .map((i) =>
          i.id === id ? { ...i, qty: (i.qty || 1) + delta } : i
        )
        .filter((i) => (i.qty || 1) > 0);
      saveCart(updated);
    },
    [cart, saveCart]
  );

  const removeFromCart = useCallback(
    (id) => {
      saveCart(cart.filter((i) => i.id !== id));
    },
    [cart, saveCart]
  );

  const toggleWishlist = useCallback(
    (product) => {
      const exists = wishlist.find((i) => i.id === product.id);
      let updated;
      if (exists) {
        updated = wishlist.filter((i) => i.id !== product.id);
        showToast("Dihapus dari Favorit");
      } else {
        updated = [...wishlist, product];
        showToast("Ditambahkan ke Favorit");
      }
      setWishlist(updated);
      localStorage.setItem("jam35_wishlist", JSON.stringify(updated));
    },
    [wishlist, showToast]
  );

  const isInWishlist = useCallback(
    (id) => wishlist.some((i) => i.id === id),
    [wishlist]
  );

  const addRecentlyViewed = useCallback(
    (product) => {
      const filtered = recentlyViewed.filter((i) => i.id !== product.id);
      const updated = [product, ...filtered].slice(0, 5);
      setRecentlyViewed(updated);
      localStorage.setItem("jam35_recently", JSON.stringify(updated));
    },
    [recentlyViewed]
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        changeQty,
        removeFromCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        addRecentlyViewed,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
