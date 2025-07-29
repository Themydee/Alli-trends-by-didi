import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";

const Shipping = () => {
  const {
    shippingLocations,
    selectedLocation,
    setSelectedLocation,
    currency,
  } = useContext(ShopContext);

  return (
    <section className="space-y-4">
      <h3 className="bold-16 mb-2">Select Delivery Location</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {shippingLocations.map((loc) => (
          <div
            key={loc.location}
            onClick={() => setSelectedLocation(loc)}
            className={`rounded-xl border p-4 shadow-sm cursor-pointer transition-all duration-200 ${
              selectedLocation?.location === loc.location
                ? "border-secondary bg-secondary/10 ring-2 ring-secondary"
                : "border-gray-200 bg-white hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-semibold text-sm text-gray-800 uppercase truncate">
                {loc.location}
              </h4>
              <span className="text-sm font-bold text-gray-700">
                {loc.price === 0
                  ? "FREE"
                  : `${currency}${loc.price.toLocaleString()}`}
              </span>
            </div>
            {loc.note && (
              <p className="text-xs text-gray-500 italic">{loc.note}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shipping;
