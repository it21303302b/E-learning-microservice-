import React from 'react'
import './index.css'

import Cardset from './Cardset'
import NavbarAdmin from '../../components/layout/header/NavbarAdmin'

export default function AdminDash() {
  return (
    <div>
      <NavbarAdmin />
      <Cardset />
    </div>
  )
}
