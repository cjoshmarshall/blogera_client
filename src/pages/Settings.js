import React, { useContext, useEffect, useState } from 'react'
import './Settings.css'
import avatar from '../assets/avatar.jpg'
import { Context } from '../store';
import Footer from '../components/Footer';
import { BASE_URL, publicRequest } from '../api/apiHandle';

function Settings() {

    const [file,setFile]=useState("")
    const [name,setName]=useState("")
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [bio,setBio]=useState("")
    const [dp,setDp]=useState("")


    const {user}=useContext(Context)

    useEffect(()=>{
        const getUser=async ()=>{
            const res=await publicRequest.get("/users/"+user._id)        
            setName(res.data.name);          
            setUsername(res.data.username);          
            setEmail(res.data.email);          
            setBio(res.data.bio);
            setFile(res.data.file);
            setDp(res.data.dp)
        }
        getUser()
    },[])


    const handleSubmit=async (e)=>{
        e.preventDefault()
        const updatedUser={
            userId:user._id,
            name,
            username,
            email,
            bio,
        }
        if(file){
            const data=new FormData()
            data.append("file",file)
            try{
                const uploadImage=await publicRequest.post("/images",data)
                const filename=BASE_URL+'/images/'+uploadImage.data.imagePath
                data.append("name",filename)
                updatedUser.dp=filename
            }catch(err){
                
            }
        }
        try{
            const res=await publicRequest.put("/users/"+user._id,updatedUser)
            alert("Updated Succesfully")
        }catch(err){
            alert("Something went Wrong")
        }
    }

    useEffect(()=>{
        window.scroll(0,0)
    })

  return (
    <div className='settings'>
        <h2 className='settings_title'>Update Profile</h2>
        <form className='settings_subcontainer'>
            <div className='settings_innercontainer1'>
                <div className='settings_imageContainer'>
                    {file && (
                    <img src={URL.createObjectURL(file)} alt=' ' className='settings_image' />
                    )}
                    {user.dp?
                        <img src={dp} alt=' ' className='settings_image2' />
                        :<img src={avatar} alt=' ' className='settings_image2' />
                    }
                </div>
                <div className='settings_usernameContainer'>
                    <p className='settings_username'>{user.username}</p>
                    <label className='settings_fileLabel' htmlFor='file'>Change Profile Picture</label>
                    <input className='settings_fileInput' type='file' id='file' onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
            </div>
            <div className='settings_innercontainer2'>
                <label className='settings_label'><b>Name</b></label>
                <input className='settings_input' type='text' value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className='settings_innercontainer2'>
                <label className='settings_label'><b>Username</b></label>
                <input className='settings_input' type='text' value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <div className='settings_innercontainer2'>
                <label className='settings_label'><b>Bio</b></label>
                <textarea className='settings_textarea' type='text' value={bio} onChange={(e)=>setBio(e.target.value)} />
            </div>
            <div className='settings_innercontainer2'>
                <label className='settings_label'><b>Email</b></label>
                <input className='settings_input' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>     
            <div className='settings_buttonContainer'>
                <button className='settings_button' type='submit' onClick={handleSubmit}>Submit</button>
            <div className='settings_deleteAccount'>Delete Account</div>
            </div>       
        </form>
        <Footer />
    </div>
  )
}

export default Settings