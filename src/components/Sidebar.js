import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { publicRequest } from '../api/apiHandle'
import './Sidebar.css'

function Sidebar() {

  const [cate,setCate]=useState([])

  useEffect(()=>{
    const getCate=async ()=>{
      const res=await publicRequest.get("/categories")
      setCate(res.data)
    }
    getCate()
  },[])
  return (
    <div className='sidebar'>
      <div className='sidebar_title'>CATEGORIES</div>
      <ul className='sidebar_menu'>
        {cate.map(c=>(
          <li className='sidebar_option' key={c._id}>
            <Link to={`/?category=${c.name}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar