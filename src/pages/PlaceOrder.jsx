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
          <div className="flex flex-col xl:flex-row gap-20 xl:gap-20">
            <div className="flex flex-1 flex-col gap-3 text-[95%]">
              <Title title1={"Delivery "} title2={"Information"} />
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                  placeholder="First Name"
                  required="true"
                />

                <input
                  type="text"
                  name="lastName"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                  placeholder="Last Name"
                  required="true"
                />
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  name="email"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                  placeholder="Email Address"
                  required="true"
                />

                <input
                  type="text"
                  name="phone"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                  placeholder="Phone Numbeer"
                  required="true"
                />
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  name="address"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                  placeholder="Address"
                  required="true"
                />

                <input
                  type="text"
                  name="city"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                  placeholder="City"
                  required="true"
                />

                <input
                  type="text"
                  name="state"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                  placeholder="State"
                  required="true"
                />

                <input
                  type="text"
                  name="country"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                  placeholder="Country"
                  required="true"
                />
              </div>
            </div>

            <div className="my-6">
              <h3 className="bold-20 mb-3">
                Select <span className="text-secondary">Shipping</span> Location
              </h3>
              <Shipping />
            </div>

            <div className="flex flex-col flex-1">
              <CartTotal showShipping={true} />

              <div className="my-6">
                <h3 className="bold-20 mb-5">
                  Payment <span className="text-secondary">Method</span>
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
                </h3>
              </div>

              <div>
                <button type="submit" className="btn-secondary">
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
