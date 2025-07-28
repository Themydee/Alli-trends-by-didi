import React, { useState, useContext, useEffect } from 'react'
import Title from './Title'
import {ShopContext} from '../contexts/ShopContext'
import Item from './Item'

const RelatedProducts = ({category, subCategory}) => {

  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if(products.length > 0){
        let filtered = products.slice()

        filtered - filtered.filter((item) => category === item.category)
        filtered - filtered.filter((item) => subCategory === item.subCategory)

        setRelated(filtered.slice(0, 5))

    }
  }, [products])
  return (

    <section className='py-16'>
      <Title title1={'Related'} title2={'Products'} title1Styles={'pb-4'} />
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 '>
        {related.map((product, item) =>(
          <Item key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts