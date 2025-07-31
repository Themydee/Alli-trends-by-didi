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
  const [color, setColor] = useState("");

  const fetchProductData = async () => {
    const selectedProduct = products.find((item) => item._id === productId);

    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Helper function to get sizes - handles both string arrays and object arrays
  const getSizes = () => {
    if (!product.sizes || product.sizes.length === 0) return [];
    
    // If sizes is an array of objects with size property
    if (typeof product.sizes[0] === 'object' && product.sizes[0].size) {
      return product.sizes.map(sizeObj => sizeObj.size);
    }
    
    // If sizes is already an array of strings
    return product.sizes;
  };

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
                          } medium-14 h-8 w-10 rounded`}
                        >
                          {sizeValue} {/* Fixed: render string value, not object */}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* COLOR SELECTION */}
              {product.colors?.length > 0 && (
                <div className="flex gap-2 items-center">
                  <span className="medium-14">Color:</span>
                  <div className="flex gap-2">
                    {product.colors.map((c, index) => (
                      <button
                        key={`${c}-${index}`} // Fixed: unique key with index
                        onClick={() => setColor(c)}
                        title={c}
                        className={`w-8 h-8 rounded-full ring-2 transition-transform duration-200 ${
                          color === c
                            ? "ring-secondary scale-110"
                            : "ring-gray-300"
                        }`}
                        style={{ backgroundColor: c.toLowerCase() }}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-x-4">
              <button
                onClick={() => addToCart(product._id, size, color)}
                className="btn-secondary !rounded-lg w-1/2 flexCenter gap-x-2 capitalise"
              >
                Add To Cart <TbShoppingBagPlus />
              </button>
              <button className="btn-light !rounded-lg !py-3.5">
                <FaHeart />
              </button>
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