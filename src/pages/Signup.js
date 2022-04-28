import React, { useContext, useState } from 'react'
import Footer from '../components/Footer'
import './Signup.css'
import { publicRequest } from '../api/apiHandle';
import { Context } from '../store';

function Signup() {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")


    const {dispatch,isFetching}=useContext(Context)


    const handleSubmit=async (e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res=await publicRequest.post("/auth/signup",{
                name,email,username,password
            })
            dispatch({type:"LOGIN_SUCCESS",payload:res.data && window.location.replace("/")})
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"})
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
                        <button className='signup_button' type='submit'>
                        {isFetching?<div className="signup_loader"></div>:<div>CREATE NEW ACCOUNT</div>}
                        </button>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
  )
}

export default Signup