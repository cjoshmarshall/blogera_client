import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './SinglePost.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Context } from '../store';
import { publicRequest } from '../api/apiHandle';


function SinglePost() {

    const location=useLocation()
    const path=location.pathname.split("/")[2]

    const [post,setPost]=useState({})

    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[update,setUpdate]=useState(false)

    const {user}=useContext(Context)

    useEffect(()=>{
        const getPost=async ()=>{
            const res=await publicRequest.get("/blogs/"+path)
            setPost(res.data);            
            setTitle(res.data.title);
            setDescription(res.data.description);
        }
        getPost()
    },[path])
    

    const handleDelete=async ()=>{
        try{
            await publicRequest.delete("/blogs/"+path,{
                data:{username:user.username}
            })
            window.location.replace("/")
        }catch(err){}
    }

    const handleUpdate=async ()=>{
        try{
            await publicRequest.put("/blogs/"+path,{
                username:user.username,title,description
            })
            window.location.reload("/")
        }catch(err){}
    }
    
  return (
    <div className='singlepost'>
        <div className='singlepost_container'>
            {post.image && (
                <img src={post.image} alt=' ' className='singlepost_image' />
            )}
            <div className='singlepost_subcontainer'>
            {
                update?<input className='singlepost_titleUpdate' type='text' value={title} autoFocus onChange={(e)=>setTitle(e.target.value)}/>:(
                    <h1 className='singlepost_title'>
                        {post.title}
                        {post.username===user?.username && (
                            <div className='singlepost_iconContainer'>
                                <div><EditOutlinedIcon className='singlepost_icon' onClick={()=>setUpdate(true)} /></div>
                                <div><DeleteOutlinedIcon className='singlepost_icon' onClick={handleDelete} /></div>
                            </div>
                        )}
                    </h1>
                )
            }
        
            <div className='singlepost_infoContainer'>
                <span className='singlepost_author'>
                    Author:
                    <Link to={`/?user=${post.username}`}><b> {post.username}</b></Link>
                </span>
                <span className='singlepost_date'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            {
                update?(<textarea className='singlepost_descriptionUpdate' value={description} autoFocus onChange={(e)=>setDescription(e.target.value)}/>):(
                    <p className='singlepost_description'>
                        {post.description}
                    </p>
                )
            }
            </div>
            
            {
                update?(
                    <div className='singlepost_buttonContainer'>
                        <button className='singlepost_button' onClick={handleUpdate}>Save Changes</button>
                    </div>
                ):(<></>)               
            }
        </div>
    </div>
  )
}

export default SinglePost