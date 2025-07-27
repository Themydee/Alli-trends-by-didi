import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import banner from '../assets/banner.png'

const Banner = () => {
  return (
    <section className='mx-auto'>
      <div className="flexBetween bg-white">
         <div className="hidden lg:block flex-1 px-6 xl:px-12">
            <h2 className="h2 uppercase">Affordable Styles, Elegant Beauties</h2>
            <h3 className="h4 uppercase">Transform your style here with us</h3>
            <div className="flex mt-5">
              <Link to={'/collection'} className='btn-secondary !py-0 !pr-0 rounded-full flexCenter gap-x-2 group'> 
              Explore Collections
              <FaArrowRight className='bg-white text-tertiary rounded-full h-9 w-9 p-3 m-[3px] group-hover:-rotate-[20deg] transition-all duration-500'/>
              </Link>
            </div>
        </div>

        <div className="flex-1">
          <img src={banner} className=' rounded-tl-3xl rounded-bl-3xl' alt="" />
        </div>
      </div>
       
    </section>
  )
}

export default Banner