import React, { useContext } from 'react';
import Title from './Title';
import { ShopContext } from '../contexts/ShopContext';

const CartTotal = ({ showShipping = false }) => {
  const {
    currency,
    getCartAmount,
    shippingLocations,
    selectedLocation,
    setSelectedLocation,
    getTotalWithShipping
  } = useContext(ShopContext);

  const handleChange = (e) => {
    const location = shippingLocations.find(loc => loc.location === e.target.value);
    setSelectedLocation(location);
  };

  return (
    <section className='max-padd-container w-full'>
      <Title title1={'Cart '} title2={'Total'} title1Styles={'h3'} />

      <div className='flexBetween pt-3'>
        <h5 className='h5'>Subtotal:</h5>
        <p className='h5'>{currency} {getCartAmount()}</p>
      </div>

      {showShipping && (
        <>
          <div className='flexBetween pt-3'>
            <h5 className='h5'>Shipping:</h5>
            <select
              onChange={handleChange}
              value={selectedLocation?.location}
              className='ring-1 ring-slate-300 p-1 rounded text-sm'
            >
              {shippingLocations.map((loc) => (
                <option key={loc.location} value={loc.location}>
                  {loc.location} ({currency}{loc.price})
                </option>
              ))}
            </select>
          </div>

          <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-2' />
        </>
      )}

      <div className='flexBetween pt-3'>
        <h5 className='h5'>Total:</h5>
        <p className='h5'>
          {currency} {showShipping ? getTotalWithShipping() : getCartAmount()}
        </p>
      </div>
    </section>
  );
};

export default CartTotal;
