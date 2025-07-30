import React, { useState, useEffect, useContext}  from 'react'
import Title from './Title'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper/modules'
import Item from './Item'
import { ShopContext } from '../contexts/ShopContext'

const NewArrivals = () => {

  const {products} = useContext(ShopContext)
  const [newArrivals, setNewArrivals] = useState([])

  useEffect(() => {
    const data = products.slice(0, 10)
    setNewArrivals(data)
  }, [products])
  return (
    <section className='max-padd-container pt-16 pb-10 bg-[#8dd7e436]'>
      <Title title1={'New'} title2={'Arrivals'} title1Styles={'pb-3'} paraStyles={'!block'}/>
      <Swiper
        autoplay={{
          display: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          700: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },


          1200: {
            slidesPerView: 5,
            spaceBetween: 30,
          }
        }}
        modules={[Autoplay, Pagination]}
        className='h-[555px] sm:h-[411px] md:h-[488px]'
      >
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8'>
          {newArrivals.map((product) => ( 
          <SwiperSlide key={product._id}><Item product={product}/></SwiperSlide>
        ))}
        </div>
        
        
      </Swiper>
    </section>
  )
}

export default NewArrivals