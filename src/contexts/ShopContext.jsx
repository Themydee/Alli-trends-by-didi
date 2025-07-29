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
  { location: "Sango Toll Gate", price: 5000 },
  { location: "Ojota Bus Stop", price: 2000 },
  { location: "Lekki Phase 1", price: 4000, note: "Bigger packages attract additional fee" },
  { location: "Ikorodu Garage", price: 2500 },
  { location: "Ojuelegba", price: 1800 },
  { location: "Uromi", price: 4500, note: "Bigger packages attract additional fee" },
  { location: "Yaba Tech Gate", price: 1500 },
  { location: "Ikeja Computer Village", price: 2200 },
  { location: "Onitsha Main Market", price: 6000 },
  { location: "Benin Ring Road", price: 5500, note: "Bigger items attract extra fee" },
  { location: "Kano Sabon Gari", price: 7000 },
  { location: "Enugu GRA", price: 5000 },
  { location: "Jos Terminus", price: 6500 },
  { location: "Ibadan Challenge", price: 3000 },
  { location: "Abeokuta Panseke", price: 2800 },
  { location: "Ogbomosho Town Hall", price: 3200 },
  { location: "Calabar Marina", price: 7500 },
  { location: "Zaria Ahmadu Bello Way", price: 8000 },
  { location: "Owerri Control Post", price: 6000, note: "Bigger packages attract additional fee" },
  { location: "Ilorin Post Office", price: 3500, note: "Pay to driver" },
];

  const getTotalWithShipping = () => {
    const shipping = selectedLocation?.price || 0;
    return getCartAmount() + shipping;
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);
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

  const removeFromCart = (itemId, size) => {
    const cartData = { ...cartItem };

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

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
