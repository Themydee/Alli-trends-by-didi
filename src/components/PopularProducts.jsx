import React, { useState, useContext, useEffect} from 'react'
import TItle from './Title'
import {ShopContext} from '../contexts/ShopContext'
import Item from './Item'

const PopularProducts = () => {

  const {products} = useContext(ShopContext)
  const [popularProducts, setPopularProducts] = useState([])

useEffect(() => {
  const data = products.filter(item => item.popular)
  setPopularProducts(data.slice(0, 5))
}, [products])
  return (
    <section className='bg-[#8dd7e436] py-16 max-padd-container'>
      <TItle title1={'Popular '} title2={'Products'} titleStyles={'pb-3'} />

      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8'>
        {popularProducts.map(product => (
          <div key={product._id}>
            <Item product={product}/>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularProducts