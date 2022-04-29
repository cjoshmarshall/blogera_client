import React, { useEffect, useState } from 'react'
import './Home.css'
import Posts from '../components/Posts'
import Profile from '../components/Profile';
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../api/apiHandle';

function Home() {

  const [posts,setPosts]=useState([])
  const {search}=useLocation()

  const user=useLocation().search.split("=")[1]

  const fetchPosts=async ()=>{    
      try{
          const res=await publicRequest.get("/blogs"+search)
          setPosts(res.data)
      }catch(err){
          alert("Something went wrong!")
      }
  }

  useEffect(()=>{
    fetchPosts()
  },[search])

  return (
    <div className='home'>
      <div className='home_container'>
        <Posts posts={posts} />
        {user && <Profile posts={posts} />}
      </div>
      <Footer />
    </div>
  )
}

export default Home