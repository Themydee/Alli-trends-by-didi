import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../contexts/ShopContext';
import Footer from '../components/Footer';
import axios from 'axios'

const Orders = () => {
  const { currency, token, server_url } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(server_url + '/api/orders/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderData(res.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [server_url, token]);

  return (
    <div>
      <div className="bg-primary mb-16">
        <div className="max-padd-container py-10">
          <Title title1={'Order '} title2={'List'} />

          {orderData.length === 0 ? (
            <p className="text-white">No orders found.</p>
          ) : (
            orderData.map((order, i) => (
              <div key={order._id || i} className="bg-white p-2 mt-3 rounded-lg">
                <div className="text-gray-700 flex flex-col gap-4">
                  <h4 className="font-semibold text-lg text-primary">
                    Order #{order._id?.slice(-6).toUpperCase()}
                  </h4>

                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-x-3 w-full border-t pt-3 mt-2">
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
                               <div className="flexCenter gap-x-2 text-blaxk-500">
                                <h5 className="medium-14">Color:</h5>
                                <p>{item.colors}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-x-2 mt-2">
                              <h5>Date:</h5>
                              <p>{new Date(order.createdAt).toDateString()}</p>
                            </div>
                            <div className="flex items-center gap-x-2 mt-1">
                              <h5>Payment:</h5>
                              <p>Bank Transfer</p>
                            </div>
                          </div>
                          <div className="flex gap-3 items-center mt-2 sm:mt-0">
                            <div className="flex items-center gap-2">
                              <span className={`min-w-2 h-2 rounded-full ${
                                order.status === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'
                              } block`} />
                              <p className="capitalize">{order.status || 'Processing'}</p>
                            </div>
                            <button onClick={fetchOrders} className="btn-secondary !p-1 !py-1 !text-xs">
                              Track Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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