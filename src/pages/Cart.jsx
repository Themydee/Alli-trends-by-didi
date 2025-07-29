import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { FaRegWindowClose } from 'react-icons/fa';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import Footer from '../components/Footer';

const Cart = () => {
  const { products, cartItem, currency, getCartCount, navigate, removeFromCart } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      const initialQuantities = {};
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item],
            });
            initialQuantities[`${items}-${item}`] = cartItem[items][item];
          }
        }
      }
      setCartData(tempData);
      setQuantities(initialQuantities);
    }
  }, [cartItem, products]);

  const updateQuantity = (id, size, value) => {
    const updated = { ...cartItem };
    if (updated[id]) {
      updated[id][size] = value;
    }
    setQuantities((prev) => ({ ...prev, [`${id}-${size}`]: value }));
  };

  const increment = (id, size) => {
    const key = `${id}-${size}`;
    const newValue = quantities[key] + 1;
    setQuantities((prev) => ({ ...prev, [key]: newValue }));
    updateQuantity(id, size, newValue);
  };

  const decrement = (id, size) => {
    const key = `${id}-${size}`;
    if (quantities[key] > 1) {
      const newValue = quantities[key] - 1;
      setQuantities((prev) => ({ ...prev, [key]: newValue }));
      updateQuantity(id, size, newValue);
    }
  };

  return (
    <div>
      <div className='bg-primary mb-16'>
        <div className='max-padd-container py-10'>
          <div className='flexStart gap-x-4'>
            <Title title1={'Cart '} title2={'List'} title1Styles={'h3'} />
            <h5 className='medium-15 text-gray-30 relative bottom-1.5'>
              ({getCartCount()} Items)
            </h5>
          </div>
        </div>

        <div className='mt-6 max-padd-container'>
          {cartData.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          {cartData.map((item) => {
            const productData = products.find((product) => product._id === item._id);
            const key = `${item._id}-${item.size}`;

            return (
              <div key={key} className='rounded-lg bg-white p-4 mb-4 shadow-sm'>
                <div className='flex items-center gap-x-4'>
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className='w-20 h-20 rounded object-cover'
                  />

                  <div className='flex flex-col w-full'>
                    <div className='flexBetween'>
                      <h5 className='h5 !my-0 line-clamp-1'>{productData.name}</h5>
                      <FaRegWindowClose onClick={() => removeFromCart(item._id, item.size, 0)}className='cursor-pointer text-secondary' />
                    </div>

                    <p className='bold-14 mt-1 text-sm text-gray-30'>Size: {item.size}</p>

                    <div className='flex items-center justify-between w-full mt-2'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => decrement(item._id, item.size)}
                          className='p-1.5 bg-white text-secondary rounded-full shadow-md'
                        >
                          <FaMinus className='text-xs' />
                        </button>
                        <p>{quantities[key]}</p>
                        <button
                          onClick={() => increment(item._id, item.size)}
                          className='p-1.5 bg-white text-secondary rounded-full shadow-md'
                        >
                          <FaPlus className='text-xs' />
                        </button>
                      </div>
                      <h1 className='text-sm font-bold'>
                        {currency}
                        {productData.price}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className='flex my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <button onClick={() => navigate('/place-order')} className='btn-secondary'>Proceed to Checkout</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>

  );
};

export default Cart;
