import React, { useContext, useRef, useState } from 'react'
import { Context } from '../store'
import { Link } from 'react-router-dom'
import './Login.css'
import Footer from '../components/Footer'
import { publicRequest } from '../api/apiHandle'

function Login() {

    const userRef=useRef()
    const passwordRef=useRef()
    const {dispatch,isFetching}=useContext(Context)
    


    const handleSubmit=async (e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res=await publicRequest.post("/auth/login",{
                username:userRef.current.value,
                password:passwordRef.current.value
            })
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            res.data && window.location.replace("/")
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"})
        }
    }
  return (
    <div className='login'>
            <h2 className='login_title'>LOG IN</h2>
            <form className='login_container' autoComplete='off' onSubmit={handleSubmit}>
                <div className='login_subcontainer'>
                    <label className='login_label'>Username</label>
                    <input className='login_input' name="username" type="text" ref={userRef} />
                    <label className='login_label'>Password</label>
                    <input className='login_input' name="password" type="password" ref={passwordRef} />
                    <div className='login_buttonContainer'>
                        <button className='login_button' type='submit' disabled={isFetching}>LOGIN</button>
                    </div>
                    <p><Link to='signup'>Signup for New Account</Link></p>
                </div>
            </form>
            <Footer />
        </div>
  )
}

export default Login