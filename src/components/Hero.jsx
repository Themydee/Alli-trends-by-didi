import React, { useState } from 'react'
import heroImg from '../assets/hero.png'
import { BsFire } from 'react-icons/bs'
import { FaArrowRight, FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [playVideo, setPlayVideo] = useState(false)

  const videoId = 'X_FfHxMkkos'
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`

  return (
    <section className='p-6 bg-hero bg-cover bg-center bg-no-repeat h-[667px] w-full mb-10 relative'>
      <div className='bg-white p-3 rounded-2xl max-w-[233px] relative top-3 xl:top-6'>
        <div className='relative'>

          {playVideo ? (
            <iframe
              width="211"
              height="211"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className='rounded-3xl mb-3'
            ></iframe>
          ) : (
            <>
              <img
                src={heroImg}
                alt="hero"
                height={211}
                width={211}
                className='rounded-3xl mb-3'
              />
              <span
                onClick={() => setPlayVideo(true)}
                className='absolute top-1/2 left-1/2 flexCenter -translate-y-1/2 -translate-x-1/2 h-8 w-8 bg-secondary rounded-full cursor-pointer'
              >
                <span className='absolute h-full w-full rounded-full bg-white opacity-50 animate-ping'></span>
                <FaPlay className='text-sm relative left-[1px] text-white' />
              </span>
            </>
          )}
        </div>

        <p className='text-[13px]'>
          <b className='uppercase'>To get started </b> watch the video
        </p>
      </div>

      <div className='mt-12 sm:mt-20 xl:mt-40 max-w-[777px]'>
        <h5 className='flex items-baseline gap-x-2 uppercase text-red-500 medium-18'>
          Modern Collection <BsFire />
        </h5>
        <h1 className='text-black-700 h1 font-[500] capitalize max-w-[722px]'>
          Shop till your satisfaction is no more!
        </h1>
        <div className='flex'>
          <Link className='bg-white text-xs font-medium capitalize pl-5 rounded-full flexCenter gap-x-2 group'>
            Check out our collection
            <FaArrowRight className='bg-secondary text-white rounded-full h-11 w-11 p-3 m-[3px] border border-white group-hover:-rotate-[200deg] transition-all duration-500' />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
