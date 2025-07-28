import React from 'react'
import { RiSecurePaymentLine, Ri24HoursLine } from 'react-icons/ri'
import { TbArrowBackUp, TbTruckDelivery } from 'react-icons/tb'

const ProductFeatures = () => {
  return (
   <section className='bg-[#8dd7e436] rounded-xl mt-6'>
    <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12 rounded-3xl'>
      <div className='flexCenter gap-x-4 p-2 rounded-3xl '>
        <div className='text-3xl'><TbArrowBackUp className='mb-3 text-yellow-500'/></div>
        <div>
          <h4 className='h4 capitalise'>1 week return policy</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laboriosam dolorem id aliquam eveniet ipsa quam voluptas ipsum accusamus obcaecati.</p>
        </div>
      </div>

       <div className='flexCenter gap-x-4 p-2 rounded-3xl '>
        <div className='text-3xl'><TbTruckDelivery className='mb-3 text-gray-500'/></div>
        <div>
          <h4 className='h4 capitalise'>Fast Delivery Service</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laboriosam dolorem id aliquam eveniet ipsa quam voluptas ipsum accusamus obcaecati.</p>
        </div>
      </div>

       <div className='flexCenter gap-x-4 p-2 rounded-3xl '>
        <div className='text-3xl'><RiSecurePaymentLine className='mb-3 text-green-500'/></div>
        <div>
          <h4 className='h4 capitalise'>Secured Payment</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laboriosam dolorem id aliquam eveniet ipsa quam voluptas ipsum accusamus obcaecati.</p>
        </div>
      </div>

       <div className='flexCenter gap-x-4 p-2 rounded-3xl '>
        <div className='text-3xl'><Ri24HoursLine className='mb-3 text-black-500'/></div>
        <div>
          <h4 className='h4 capitalise'>Available 24/7</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laboriosam dolorem id aliquam eveniet ipsa quam voluptas ipsum accusamus obcaecati.</p>
        </div>
      </div>
    </div>
   </section>
  )
}

export default ProductFeatures