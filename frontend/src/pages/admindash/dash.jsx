import React from 'react'
import './index.css'

import Cardset from './Cardset'
import { Link } from 'react-router-dom'

export default function AdminDash() {
  return (
    <div>
      <Link to={'/login'}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
      </Link>
      <Cardset />
    </div>
  )
}
