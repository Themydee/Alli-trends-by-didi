import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";

const Shipping = () => {
  const { shippingLocations, selectedLocation, setSelectedLocation, currency } =
    useContext(ShopContext);

  return (
    <section className="space-y-6">
      <h3 className="bold-16 mb-2">Select Delivery Area</h3>

      {shippingLocations.map((group, index) => (
        <div
          key={index}
          onClick={() => setSelectedLocation(group)}
          className={`rounded-xl border p-4 shadow-sm cursor-pointer transition-all duration-200 ${
            selectedLocation?.group === group.group
              ? "border-secondary bg-secondary/10 ring-2 ring-secondary"
              : "border-gray-200 bg-white hover:shadow-md"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-sm text-gray-800 uppercase">
              {group.group}
            </h4>
            <span className="text-sm font-bold text-gray-700">
              {currency}{group.price.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-gray-600 italic">
            {group.locations.join(" | ")}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Shipping;
