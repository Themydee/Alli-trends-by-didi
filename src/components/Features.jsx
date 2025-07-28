import React from 'react'
import f1 from '../assets/features/bg.jpg'
import f2 from '../assets/features/bg.jpg'

const Features = () => {
  return (
    <section className='max-padd-container pt-14 pb-20'>
        {/** container */}

        <div className='grid grid-cols-1 xl:grid-cols-[1.5fr_2fr] gap-6 gap-y-12 rounded-xl'> 
          <div className='flexCenter gap-x-10'>
            <div>
              <img src={f1} alt="featureImg" height={77} width={222} className='rounded-full'/>
            </div>

            <div>
              <img src={f2} alt="featureImg" height={77} width={222} className='rounded-full'/>
            </div>
          </div>

          <div className='flexCenter flex-wrap sm:flex-nowrap gap-x-5 '>
            <div>
              <h4 className='capitalize h4'>Quality Products</h4>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta aliquam, libero iusto asperiores repellendus pariatur.</p>
            </div>

             <div>
              <h4 className='capitalize h4'>Fast delivery</h4>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta aliquam, libero iusto asperiores repellendus pariatur.</p>
            </div>

             <div>
              <h4 className='capitalize h4'>Secure payments</h4>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta aliquam, libero iusto asperiores repellendus pariatur.</p>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Features