import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../assets/data'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '₦'
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(true)
    const [token, setToken] = useState('')
    const [cartItem, setCartItem] = useState([])

    const addToCart = async (itemId, size) => {
      if(!size){
        toast.error('Please select a size')
        return
      }

      let cartData = structuredClone(cartItem)

      if(cartData[itemId]){
        if(cartData[itemId][size]){
          cartData[itemId][size] += 1
        }else{
          cartData[itemId][size] = 1
        }
      }else{
        cartData[itemId] = {}
        cartData[itemId][size] = 1
      }

      setCartItem(cartData)
    }


    const getCartCount = () => {
  let totalCount = 0;
  for (const items in cartItem) {
    for (const item in cartItem[items]) {
      try {
        if (cartItem[items][item]) {
          totalCount += cartItem[items][item];
        }
      } catch (error) {}
    }
  }

  return totalCount; 
};


    useEffect(() => {
   
    }, [cartItem])

    const value = {currency, products, navigate, token, setToken, search, setSearch, showSearch, cartItem, setCartItem, setShowSearch, addToCart, getCartCount}
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
