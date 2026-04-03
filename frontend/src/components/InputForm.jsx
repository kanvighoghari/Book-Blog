import React from 'react'
import { useState } from 'react';
import api from '../api/axios'
import { useNavigate } from "react-router-dom"

const InputForm = ({setIsOpen,setIsLogin}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    

    const handleSubmit = async (e)=>{
        e.preventDefault()
        let endpoint = (isSignUp)? "signup" : "login"
         await api.post(`/${endpoint}`,{username,email,password})
        .then(res =>{
            localStorage.setItem("user" ,JSON.stringify(res.data.user))
            setIsLogin(true);  
            navigate("/")     
            setIsOpen();
        })
        .catch(error =>{setError(error.response?.data?.message || "Something went wrong")})

    }
    
    
  return (
        <form  className='form' onSubmit={handleSubmit} >
            <div className='form-control'>
                <label >Username</label>
                <input type="text" className='input' required onChange = {(e) =>{setUsername(e.target.value)}} />
            </div>
            <div className='form-control'>
                <label >Email</label>
                <input type="text" className='input' required  onChange = {(e) =>{setEmail(e.target.value)}} />
            </div>
            <div className='form-control'>
                <label >Password</label>
                <input type="password" className='input' required  onChange = {(e) =>{setPassword(e.target.value)}} />
            </div>
            <button type='submit' >{isSignUp? "Sign Up" : "Login"}</button><br></br>
            {(error != "" )&& <h6 className='error' >{error}</h6>}
            <p onClick={()=>{setIsSignUp(prev=>!prev)}}>{(isSignUp)? "Alraedy have an account" :"Create new account"} </p>
        </form>
  )
}

export default InputForm
