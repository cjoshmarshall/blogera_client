import React, { useState } from 'react'
import './Posts.css'
import { Link, useLocation } from 'react-router-dom'

function Posts({posts}) {

    const location=useLocation()
    const user=location.search.split("=")[1]

    const [quantity,setQuantity]=useState(3)

    const handleLoad=()=>{
        setQuantity(prevValue=>prevValue+3)
    }


  return (
  <>
    <div className='posts'>
    {user && <div className='posts_user'>Blogs by <b><i>{user}</i></b></div>}
        {posts.slice(0,quantity).sort((a,b)=>a.createdAt>b.createdAt).map(post=>(
            <div className='posts_container' key={post._id}>
                <div className='posts_subcontainer'>                
                <div className='posts_innercontainer'>
                    <Link to={`/blogs/${post._id}`}>
                        {post.image && 
                            <img src={post.image} alt=' ' className='posts_image' />
                        }
                    </Link>
                    <div className='posts_infoContainer'>
                        <div className='posts_title'>
                        <Link to={`/blogs/${post._id}`}>
                            {post.title}
                        </Link>
                        </div>
                        <div className='posts_date'>
                            by <Link to={`/?user=${post.username}`}><b> {post.username}</b></Link>
                        </div>
                        <div className='posts_date'>
                            {new Date(post.createdAt).toDateString()} {new Date(post.createdAt).toLocaleTimeString()} 
                        </div>
                        <p className='posts_description'>
                        <Link to={`/blogs/${post._id}`}>
                            {post.description}
                        </Link>
                        </p>
                    </div>
                </div>
            </div>
            <hr className='posts_break'/>
            </div>
        )).reverse()}
        {/* {quantity>posts.length?<></>:
        <div className='posts_buttonContainer'>
            <button className='posts_button' onClick={handleLoad}>Load more</button>
        </div>
        } */}
    </div>
    </>
  )
}

export default Posts