import React, { useContext, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { ShopContext } from "../contexts/ShopContext";
import Shipping from "../components/Shipping";
import TransferDetails from "../components/TransferDetails";
import UploadPaymentProof from "../components/UploadPaymentProof";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    token,
    cartItem,
    setCartItem,
    getCartAmount,
    products,
    selectedLocation,
    server_url
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const [paymentProof, setPaymentProof] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleImageUpload = async () => {
    if (!paymentProof) return null;

    try {
      setUploading(true);
      const form = new FormData();
      form.append("image", paymentProof);

      // Replace this with your actual upload endpoint (e.g., Cloudinary, local backend)
      const { data } = await axios.post(
        server_url + '/api/upload',
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploading(false);
      return data.url; // or data.filename
    } catch (error) {
      setUploading(false);
      toast.error("Upload failed");
      return null;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!selectedLocation) {
      toast.error("Please select a shipping location");
      return;
    }

    const uploadedUrl = await handleImageUpload();
    if (!uploadedUrl) return;

    // Prepare orderItems array
    const orderItems = [];
    for (const productId in cartItem) {
      for (const variantKey in cartItem[productId]) {
        const quantity = cartItem[productId][variantKey];
        if (quantity > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            orderItems.push({
              prductId: product._id,
              title: product.title,
              image: product.image,
              price: product.price,
              size: variantKey,
              quantity,
            });
          }
        }
      }
    }

    // Prepare payload
    const payload = {
      user: formData,
      items: orderItems,
      shipping: selectedLocation,
      paymentProof: uploadedUrl,
      totalAmount: getCartAmount() + selectedLocation.price,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/orders`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItem({});
      toast.success("Order placed successfully");
      navigate("/thanks");
    } catch (error) {
      console.error("Order Error:", error);
      toast.error(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <div>
      <div className="bg-primary mb-16">
        <form onSubmit={onSubmitHandler} className="max-padd-container py-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            <div className="xl:col-span-8 space-y-6">
              <Title title1={"Delivery "} title2={"Information"} />
              {/* Delivery Info */}
              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.firstName}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.lastName}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.email}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.phone}
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.address}
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.city}
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.state}
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.country}
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
              </div>

              {/* Shipping Details */}
              <TransferDetails />

              {/* UploadPaymentProof component must pass image to setPaymentProof */}
              <UploadPaymentProof onUpload={setPaymentProof} />
            </div>

            <div className="xl:col-span-4 space-y-8">
              <div>
                <h3 className="bold-20 mb-3">
                  Select <span className="text-secondary">Shipping</span>{" "}
                  Location
                </h3>
                <Shipping />
              </div>
              <CartTotal showShipping={true} />
              <div>
                <button
                  type="submit"
                  className="btn-secondary w-full"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default PlaceOrder;
