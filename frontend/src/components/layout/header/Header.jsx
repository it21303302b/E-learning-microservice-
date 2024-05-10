import React from 'react'
import './Header.css'

import Navbar from './Navbar'

const Header = ({ CartItem }) => {
  return (
    <div className="">
      <Navbar CartItem={CartItem} />
    </div>
  )
}

export default Header
