import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₦";
  const navigate = useNavigate();
  const server_url = import.meta.env.VITE_SERVER_URL;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(true);
  const [token, setToken] = useState("");
  const [cartItem, setCartItem] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);

  const shippingLocations = [
    {
      group: "Lagos Mainland 1 (Agege, Ogba)",
      price: 2000,
      locations: [
        "Abule Egba",
        "Omojoo",
        "Orile Agege",
        "Alakuko",
        "Iyana Ipaja",
        "Egbeda",
        "Dopemu",
        "Magodo",
        "Iju Ishaga",
        "Maryland",
      ],
    },
    {
      group: "Lagos Mainland 2 (Mushin, Festac, etc.)",
      price: 3000,
      locations: [
        "Mile 2",
        "Ikotun",
        "Isheri",
        "Oshodi",
        "Ketu",
        "Yaba",
        "Surulere",
        "Shomolu",
      ],
    },
    {
      group: "Lagos Mainland 3 (Ojo, Ikorodu)",
      price: 5000,
      locations: ["Ojo", "Okoko", "Iyana Iba", "Ikorodu"],
    },
    {
      group: "Lagos Island 1 (VI, CMS, Obalende, etc.)",
      price: 6000,
      locations: ["VI", "Lekki", "Obalende", "CMS", "Ikoyi", "Ajah"],
    },
    {
      group: "Lagos Island 2 (Ajah, Sangotedo)",
      price: 2500,
      locations: ["Ajah", "Sangotedo"],
    },
  ];

  const getTotalWithShipping = () => {
    const shipping = selectedLocation?.price || 0;
    return getCartAmount() + shipping;
  };

  const addToCart = async (itemId, size = null) => {
  const product = products.find((p) => p._id === itemId);

  if (!product) {
    toast.error("Product not found");
    return;
  }

  const cartData = structuredClone(cartItem);

  if (!cartData[itemId]) {
    cartData[itemId] = {};
  }

  // Wholesale product - no size required
  if (product.isWholesale) {
    const variantKey = "wholesale";

    if (cartData[itemId][variantKey]) {
      cartData[itemId][variantKey] += 1;
    } else {
      cartData[itemId][variantKey] = 1;
    }

    setCartItem(cartData);
    toast.success("Wholesale product added to cart");

    // Save to backend
    if (token) {
      try {
        await axios.post(
          server_url + "/api/cart/add",
          { itemId, wholesale: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        toast.error("Failed to save to cart");
      }
    }

    return;
  }

  // Retail product with sizes
  if (!size) {
    toast.error("Please select a size");
    return;
  }

  const sizeObj = product?.sizes.find((s) => s.size === size);
  if (!sizeObj || sizeObj.quantity === 0) {
    toast.error(`${size} is out of stock`);
    return;
  }

  const variantKey = `${size}`;
  if (cartData[itemId][variantKey]) {
    cartData[itemId][variantKey] += 1;
  } else {
    cartData[itemId][variantKey] = 1;
  }

  setCartItem(cartData);
  toast.success("Product added to cart successfully");

  if (token) {
    try {
      await axios.post(
        server_url + "/api/cart/add",
        { itemId, size },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  }
};


  const updateQuantity = async (itemId, size, quantity) => {
  const variantKey = `${size}`; // removed color
  let cartData = structuredClone(cartItem);

  if (!cartData[itemId] || !cartData[itemId][variantKey]) return;

  cartData[itemId][variantKey] = quantity;
  setCartItem(cartData);

  if (token) {
    try {
      await axios.post(
        server_url + "/api/cart/update",
        { itemId, size, quantity }, // removed color
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Could not update cart.");
    }
  }
};

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        server_url + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const productId in cartItem) {
      const productExists = products.find((p) => p._id === productId);
      if (!productExists) continue; // Skip if product no longer exists

      for (const variantKey in cartItem[productId]) {
        const quantity = cartItem[productId][variantKey];
        if (quantity > 0) {
          totalCount += quantity;
        }
      }
    }

    return totalCount;
  };

  const removeFromCart = async (productId, size) => {
  try {
    await axios.delete(server_url + "/api/cart/remove", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        itemId: productId,
        size,
      },
    });

    // ✅ Local update if backend succeeds
    const updatedCart = { ...cartItem };
    if (updatedCart[productId] && updatedCart[productId][size]) {
      delete updatedCart[productId][size];

      if (Object.keys(updatedCart[productId]).length === 0) {
        delete updatedCart[productId];
      }
    }

    setCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  } catch (error) {
    console.error("Remove from cart failed:", error);
    toast.error("Failed to remove item from cart.");
  }
};

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(server_url + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
    getProductsData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const value = {
    currency,
    products,
    navigate,
    token,
    setToken,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    removeFromCart,
    getCartAmount,
    shippingLocations,
    selectedLocation,
    setSelectedLocation,
    getTotalWithShipping,
    server_url,
    updateQuantity,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
