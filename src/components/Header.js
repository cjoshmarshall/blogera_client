import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import logo from "../assets/logo.png"
import avatar from '../assets/avatar.jpg'
import { Link } from 'react-router-dom'
import { Context } from '../store';
import { publicRequest } from '../api/apiHandle';

function Header() {
  
  const [dp,setDp]=useState("")

  const {user}=useContext(Context)

  useEffect(()=>{
    const getUser=async ()=>{
        const res=await publicRequest.get("/users/"+user._id)   
        setDp(res.data.dp)
    }
    getUser()
},[])


  const handleDropdown=()=>{
    const dropdown=document.getElementById("header_menu2")
    dropdown.classList.toggle("show");
  }
  
 
  window.onclick=(event)=>{
    if(!event.target.matches('.header_image')){
      var dropdowns=document.getElementsByClassName("header_menu2");
      for (var i=0; i<dropdowns.length; i++) {
        var openDropdown=dropdowns[i];
        if(openDropdown.classList.contains('show')){
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  const logout=()=>{
    localStorage.clear();
    window.location.reload();
}




  return (
    <div className='header'>
        <div className='header_left'>
          <div className='header_logoContainer'>
            <Link to='/'><img src={logo} alt=" " className='header_logo' /></Link>
          </div>
        </div>
        <div className='header_middle'>
          <div className='header_searchContainer'>
            <SearchIcon className='header_searchIcon'/>
            <input className='header_searchInput' type='text' placeholder='Search'></input>
          </div>
        </div>
        <div className='header_right'>
            <ul className='header_menu1'>
                <li className='header_option1'>
                  <Link to='/create'><div><b>WRITE</b></div></Link>
                </li>
                <li className='header_imageContainer'>
                  {user.dp?
                    <img src={dp} alt=" "  className='header_image' onClick={handleDropdown} />
                    :<img src={avatar} alt=" "  className='header_image' onClick={handleDropdown} />
                  }
                </li>
                  <div id="header_menu2" className='header_menu2 dropdown-content'>
                    <div className='header_option2'>
                      <Link to='/settings'>Settings</Link></div>
                    <div className='header_option2' onClick={logout}>
                      <Link to='/'>Logout</Link>
                    </div>
                  </div>
            </ul>
        </div>
    </div>
  )
}

export default Header