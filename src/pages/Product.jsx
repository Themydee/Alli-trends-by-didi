import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { FaStar, FaStarHalfStroke, FaTruckFast } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import RelatedProducts from "../components/RelatedProducts";
import Footer from "../components/Footer";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [variantQty, setVariantQty] = useState(null);

  const [color, setColor] = useState("");
  
  const fetchProductData = async () => {
    const selectedProduct = products.find((item) => item._id === productId);

    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  };

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
    const selectedSizeObj = product.sizes.find(
      (s) => s.size.toLowerCase() === selectedSize.toLowerCase()
    );
    setVariantQty(selectedSizeObj ? selectedSizeObj.quantity : 0);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    if (!size || !product?.variants) return;

    const matchedVariant = product.variants.find((v) => v.size === size);

    if (!matchedVariant) {
      setStockStatus("Variant not available");
      setVariantQty(0);
    } else if (matchedVariant.quantity === 0) {
      setStockStatus("Size out of stock");
      setVariantQty(0);
    } else {
      setStockStatus("");
      setVariantQty(matchedVariant.quantity);
    }
  }, [size, product]); // ✅ Remove `color` from dependencies too

  if (!product) {
    return <div>Loading...</div>;
  }

  // Helper function to get sizes - handles both string arrays and object arrays
  const getSizes = () => {
    if (!product.sizes || product.sizes.length === 0) return [];

    // If sizes is an array of objects with size property
    if (typeof product.sizes[0] === "object" && product.sizes[0].size) {
      return product.sizes.map((sizeObj) => sizeObj.size);
    }

    // If sizes is already an array of strings
    return product.sizes;
  };

  const isProductOutOfStock = product?.sizes?.every((s) => s.quantity === 0);

  const availableSizes = getSizes();

  return (
    <div>
      <div className="max-padd-container mt-3">
        <div className="flex gap-12 flex-col xl:flex-row bg-white pb-16 rounded-2xl pt-3">
          <div className="flex flex-1 gap-x-6 items-start xl:flex-1">
            <div className="flexCenter flex-col gap-[7px] flex-wrap">
              {product.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  key={index}
                  src={item}
                  alt={`Product image ${index}`}
                  className="max-h-[89px] rounded-lg"
                />
              ))}
            </div>
            <div className="max-h-[377px] w-auto flex ">
              <img
                src={image}
                alt="productImg"
                className="rounded-xl bg-gray-10"
              />
            </div>
          </div>
          <div className="flex-[1.5] rounded-2xl xl:px-7">
            <h3 className="h3 leading-none">{product.name}</h3>

            <div className="flex items-baseline gap-x-5 ">
              <div className="flex items-center gap-x-2 text-secondary">
                <div className="flex gap-x-2 text-secondary">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfStroke />
                </div>
                <span className="medium-14">{122}</span>
              </div>
            </div>

            <h4 className="h4 my-2">
              {currency}
              {product.price}
            </h4>
            <p className="max-w-[600px]">{product.description}</p>

            {/* SIZE SELECTION - FIXED */}
            <div className="flex flex-col gap-4 my-4 mb-5">
              {availableSizes.length > 0 && (
                <div className="flex gap-2 items-center">
                  <span className="medium-14">Size:</span>
                  <div className="flex gap-2">
                    {[...availableSizes]
                      .sort((a, b) => {
                        const order = ["S", "M", "L", "XL", "XXL"];
                        return order.indexOf(a) - order.indexOf(b);
                      })
                      .map((sizeValue, index) => (
                        <button
                          key={`${sizeValue}-${index}`} // Fixed: unique key
                          onClick={() => setSize(sizeValue)}
                          className={`${
                            sizeValue === size
                              ? "ring-2 ring-secondary bg-secondary/10"
                              : "ring-1 ring-slate-900/5"
                          } medium-14 h-8 w-20 rounded`}
                        >
                          {sizeValue}{" "}
                          {/* Fixed: render string value, not object */}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {product.colors && product.colors.length > 0 && (
  <div className="flex gap-2 items-center mb-4">
    <span className="medium-14">Color:</span>
    <div className="flex gap-2">
      {product.colors.map((colorValue, idx) => (
        <button
          key={colorValue + idx}
          onClick={() => setColor(colorValue)}
          className={`h-8 w-8 rounded-full border-2 ${
            color === colorValue ? "ring-2 ring-secondary" : ""
          }`}
          style={{ backgroundColor: colorValue.toLowerCase() }}
          title={colorValue}
        />
      ))}
    </div>
    {color && <span className="ml-2">{color}</span>}
  </div>
)}

            <div className="flex items-center gap-x-4">
              {isProductOutOfStock ? (
                <p className="text-red-600 font-semibold">
                  Product is out of stock
                </p>
              ) : stockStatus === "Size out of stock" ? (
                <p className="text-yellow-500">Selected size is out of stock</p>
              ) : null}

              <div className="flex items-center gap-x-4">
               <button
  onClick={() => addToCart(product._id, size, color)}
  disabled={!size || !color || variantQty === 0}
  className={`btn-secondary !rounded-lg flexCenter gap-x-2 capitalize ${
    !size || !color || variantQty === 0
      ? "opacity-50 cursor-not-allowed"
      : ""
  }`}
>
  Add To Cart <TbShoppingBagPlus />
</button>

                <button className="btn-light !rounded-lg !py-3.5">
                  <FaHeart />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-x-2 mt-3 ">
              <FaTruckFast className="text-lg" />
              <span className="medium-14">
                Delivery charges apply to each goods. More details soon
              </span>
            </div>

            <hr className="my-3 w-2/3" />
            <div className="mt-2 flex flex-col gap-1 text-gray-30 text-xs">
              <div>Authenticity you can trust</div>
              <div>Enjoy deliveries worldwide 7 continents</div>
            </div>
          </div>
        </div>

        <ProductDescription />
        <ProductFeatures />
        <RelatedProducts
          category={product.category}
          subCategory={product.subCategory}
        />
      </div>

      <hr className="my-3 w-3/3" />
      <Footer />
    </div>
  );
};

export default Product;
