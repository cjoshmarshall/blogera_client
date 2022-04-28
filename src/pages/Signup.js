import React, { useState } from 'react'
import Footer from '../components/Footer'
import './Signup.css'
import { publicRequest } from '../api/apiHandle';

function Signup() {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const [error,setError]=useState(false)


    const handleSubmit=async (e)=>{
        e.preventDefault()
        setError(false)
        try{
            const res=await publicRequest.post("/auth/signup",{
                name,email,username,password
            })
            res.data && window.location.replace("/")
        }catch(err){
            setError(true)
            alert("Something went wrong!")
        }
    }
  return (
    <div className='signup'>
            <h1 className='signup_title'>SIGNUP</h1>
            <form className='signup_container' autoComplete='off' onSubmit={handleSubmit}>
                <div className='signup_subcontainer'>
                    <label className='signup_label'>Name</label>
                    <input className='signup_input' name="name" type="text" onChange={e=>setName(e.target.value)} />
                    <label className='signup_label'>Email</label>
                    <input className='signup_input' name="email" type="email" onChange={e=>setEmail(e.target.value)} />
                    <label className='signup_label'>Username</label>
                    <input className='signup_input' name="username" type="text" onChange={e=>setUsername(e.target.value)} />
                    <label className='signup_label'>Password</label>
                    <input className='signup_input' name="password" type="password" onChange={e=>setPassword(e.target.value)} />
                    <div className='signup_buttonContainer'>
                        <button className='signup_button' type='submit'>CREATE NEW ACCOUNT</button>                    
                    </div>
                </div>
            </form>
            <Footer />
        </div>
  )
}

export default Signup