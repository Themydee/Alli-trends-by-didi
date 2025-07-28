import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import Product from "./pages/Product.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Cart from "./pages/Cart.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);
  if (isLoading) return <Loading />;
  return (
    <main className="overflow-hidden text-[#404040]">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </main>
  );
};

export default App;
