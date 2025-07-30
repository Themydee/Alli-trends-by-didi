import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/data";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₦";
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [token, setToken] = useState("");
  const [cartItem, setCartItem] = useState([]);
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

  const addToCart = async (itemId, size, color) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    if (!color) {
      toast.error("Please select a color");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    const variantKey = `${size}_${color}`;

    if (cartData[itemId][variantKey]) {
      cartData[itemId][variantKey] += 1;
    } else {
      cartData[itemId][variantKey] = 1;
    }

    setCartItem(cartData);
    toast.success("Product added to cart successfully");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item]) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const removeFromCart = (itemId, variantKey) => {
  const cartData = { ...cartItem };

  if (cartData[itemId] && cartData[itemId][variantKey]) {
    delete cartData[itemId][variantKey];

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  }

  setCartItem(cartData);
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

  useEffect(() => {
    // Just logging the cart updates
    console.log(cartItem);
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
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
