import React, { useContext, useEffect, useState } from 'react'
import './NewPost.css'
import AddIcon from '@mui/icons-material/Add';
import { Context } from '../store';
import Footer from '../components/Footer';
import { BASE_URL, publicRequest } from '../api/apiHandle';

function NewPost() {

    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [file,setFile]=useState(null)

    const {user}=useContext(Context)


    const handleSubmit=async (e)=>{
        e.preventDefault()

        const newPost={
            user:user._id,
            username:user.username,
            title,
            description
        }
        if(file){
            const data=new FormData()
            data.append("file",file)
            try{
                const uploadImage=await publicRequest.post("/images",data)
                const filename=BASE_URL+'/images/'+uploadImage.data.imagePath
                data.append("name",filename)
                newPost.image=filename
            }catch(err){
                alert("Something went Wrong")
            }
        }
        try{
            const res=await publicRequest.post("/blogs",newPost)
            window.location.replace("/blogs/"+res.data._id)
        }catch(err){
            alert("Something went Wrong")
        }
    }

    useEffect(()=>{
        window.scroll(0,0)
    })


    
  return (
    <div className='newpost'>
        <form className='newpost_container' onSubmit={handleSubmit}>
            <div className='newpost_imageContainer'>
                <div className='newpost_inputContainer'>
                    <label className='newpost_label' htmlFor='file'>Upload Image</label>
                    <label className='newpost_iconLabel' htmlFor='file'><AddIcon className='newpost_icon' fontSize='inherit'/></label>
                    <input className='newpost_fileInput' type='file' id='file' onChange={e=>setFile(e.target.files[0])}/>
                </div>
                {file && (
                <img src={URL.createObjectURL(file)} alt=' ' className='newpost_image' />
                )}
            </div>
            <div className='newpost_subcontainer'>
                <div className='newpost_inputContainer'>
                    <input className='newpost_titleInput' type='text' placeholder='Title' autoFocus={true} onChange={e=>setTitle(e.target.value)} />
                </div>
                <div className='newpost_textareaContainer'>
                    <textarea className='newpost_textarea' type='type' placeholder='Write your blog' onChange={e=>setDescription(e.target.value)}></textarea>
                </div>
                <div className='newpost_buttonContainer'>
                    <button className='newpost_button' type='submit'>Publish</button>
                </div>
            </div>
        </form>
        <Footer />
    </div>
  )
}

export default NewPost