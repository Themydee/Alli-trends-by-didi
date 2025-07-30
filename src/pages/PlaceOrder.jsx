import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { ShopContext } from "../contexts/ShopContext";
import Shipping from "../components/Shipping";

const PlaceOrder = () => {
  const { navigate, token, cartItems, setCartItems, getCartAmount, products } =
    useContext(ShopContext);
  const [method, setMethod] = useState("pon");

  return (
    <div>
      <div className="bg-primary mb-16">
        <form className="max-padd-container py-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* LEFT SIDE: DELIVERY INFORMATION (8 columns out of 12) */}
            <div className="xl:col-span-8 space-y-6">
              <Title title1={"Delivery "} title2={"Information"} />

              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-1/2 p-4 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
              </div>
            </div>

            {/* RIGHT SIDE: SHIPPING + TOTAL + PAYMENT (4 columns out of 12) */}
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
                <h3 className="bold-20 mb-3">
                  Payment <span className="text-secondary">Method</span>
                </h3>
                <div className="flex gap-3">
                  <div
                    onClick={() => setMethod("pon")}
                    className={`${
                      method === "pon" ? "btn-dark" : "btn-white"
                    } !py-1 text-xs cursor-pointer`}
                  >
                    Pay via Card
                  </div>
                  <div
                    onClick={() => setMethod("pbt")}
                    className={`${
                      method === "pbt" ? "btn-dark" : "btn-white"
                    } !py-1 text-xs cursor-pointer`}
                  >
                    Pay with Bank Transfer
                  </div>
                </div>
              </div>

              <div>
                <button type="submit" className="btn-secondary w-full">
                  Place Order
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
