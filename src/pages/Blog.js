import React from 'react'
import './Blog.css'
import SinglePost from '../components/SinglePost'
import Footer from '../components/Footer'

function Blog() {
  return (
    <div className='blog'>
        <SinglePost />
        <Footer />
    </div>
  )
}

export default Blog