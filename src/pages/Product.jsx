import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { FaStar, FaStarHalfStroke, FaTruckFast } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const selectedProduct = products.find((item) => item._id === productId);

    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image[0]);
      console.log(selectedProduct);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <div>
          <div className="flex flex-1 gap-x-2 xl:flex-1">
            <div className="flexCenter flex-col gap-[7px] flex-wrap">
            {product.image.map((item, index) => (
              <img onClick={() => setImage(item)} key={index} src={item} alt={`Product image ${index}`}  className="max-h-[89px] rounded-lg"/>
            ))}
          </div>
          <div className="max-h-[377px] w-auto flex ">
            <img src={image} alt="productImg" className="rounded-xl bg-gray-10" />
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Product;
