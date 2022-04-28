import React from 'react'
import './Topbar.css'
import logo from "../assets/logo.png"


function Topbar() {
  return (
    <div className='topbar'>
        <img src={logo} alt=" " className='topbar_logo' />
    </div>
  )
}

export default Topbar