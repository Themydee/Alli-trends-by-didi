import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../contexts/ShopContext';
import Footer from '../components/Footer';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const data = products.slice(0, 5); // simulate orders
    setOrderData(data);
  }, [products]);

  return (
    <div>
      <div className="bg-primary mb-16">
        <div className="max-padd-container py-10">
          <Title title1={'Order '} title2={'List'} />

          {orderData.length === 0 ? (
            <p className="text-white">No orders found.</p>
          ) : (
            orderData.map((item, i) => (
              <div key={item.id || i} className="bg-white p-2 mt-3 rounded-lg">
                <div className="text-gray-700 flex flex-col gap-4">
                  <div className="flex gap-x-3 w-full">
                    <div className="flex gap-6">
                      <img
                        src={item.image?.[0]}
                        alt={item.name}
                        className="sm:w-[77px] rounded-lg"
                      />
                    </div>

                    <div className="block w-full">
                      <h5 className="h5 capitalize line-clamp-1">{item.name}</h5>
                      <div className="flexBetween flex-wrap">
                        <div>
                          <div className="flex items-center gap-x-2 sm:gap-x-3 flex-wrap">
                            <div className="flexCenter gap-x-2">
                              <h5 className="medium-14">Price:</h5>
                              <p>{currency}{item.price}</p>
                            </div>

                            <div className="flexCenter gap-x-2">
                              <h5 className="medium-14">Quantity:</h5>
                              <p>{item.quantity}</p>
                            </div>

                            <div className="flexCenter gap-x-2">
                              <h5 className="medium-14">Size:</h5>
                              <p>{item.size}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-x-2 mt-2">
                            <h5>Date:</h5>
                            <p>{item.date ? new Date(item.date).toDateString() : 'N/A'}</p>
                          </div>

                          <div className="flex items-center gap-x-2 mt-1">
                            <h5>Payment:</h5>
                            <p>{'pon'}</p>
                          </div>
                        </div>

                        <div className="flex gap-3 items-center mt-2 sm:mt-0">
                          <div className="flex items-center gap-2">
                            <span className="min-w-2 h-2 rounded-full bg-green-500 block" />
                            <p>{item.status || 'Processing'}</p>
                          </div>

                          <button className="btn-secondary !p-1 !py-1 !text-xs">
                            Track Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
