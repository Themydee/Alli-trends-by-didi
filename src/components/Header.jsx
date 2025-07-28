import React, { useState } from 'react'
import logo from '../assets/didi.png'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { FaBarsStaggered, FaRegCircleUser } from "react-icons/fa6";
import {FaSearch} from 'react-icons/fa';
import { TbBasket, TbUserCircle } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'


const Header = () => {
  const {token} = useContext(ShopContext)
  const [menuOpened, setMenuOpened ] = useState(false)

  const toggleMenu = () => setMenuOpened((prev) => !prev)
  return (
   <header className='max-padd-container w-full z-50'>
      <div className='flexBetween py-3'>
        <Link to={'/'} className='flex flex-1 '>
          <div>
            <img src={logo} className="w-24 h-24 oject-contain rounded-md bold-32" />
          </div>
          
        </Link>

        <div className='flex-1 '>
          <Navbar containerStyles={`${menuOpened ? 
            "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white rounded-xl shadow-md w-52 ring-1 ring-slate-900/5 z-50" : "hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 ring-1 ring-slate-900/5 rounded-full p-1"}`}/>
        </div>

        <div className='flex flex-1 items-center justify-end gap-x-2 xs:gap-x-8 '>
          {/** Menu toggle */}
          <FaBarsStaggered onClick={toggleMenu} className='xl:hidden cursor-pointer text-xl'/>

          {/** Search bar */}
          <FaSearch className='text-lg cursor-pointer' />

          {/**Cart */}
          <Link to={''} className='flex relative'>
            <TbBasket className='text-[27px]' />
            <span className='bg-secondary text-white text-[12px] font-semibold left-1.5 -top-3.5 flexCenter w-4 h-4 rounded-full shadow-md'>0</span>
          </Link>

          {/** User profile */}
          <div className='group relative'>
            <div>
              {token ? (
              <div className='text-[29px] cursor-pointer'>
                <TbUserCircle />
              </div>
            ): (
            <button className='btn-light flexCenter gpa-x-2'>
              Login <RiUserLine  className='text-xl'/>
            </button>
          )}
            </div>
          </div>
        </div>


      </div>
   </header>
  )
}

export default Header
