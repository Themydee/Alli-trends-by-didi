import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../assets/data'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '₦'
    const navigate = useNavigate()


    const value = {currency, products, navigate}
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider


