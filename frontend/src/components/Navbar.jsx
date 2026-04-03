import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import api from "../api/axios.js"
import Modal from './Modal'
import InputForm from './InputForm'

const Navbar = ({isOpen , setIsOpen , searchTerm, setSearchTerm}) => {

 const [isLogin, setIsLogin] = useState(false)
 const navigate  = useNavigate()
 const loaction = useLocation()
 const isHomePage = loaction.pathname === "/"

 useEffect(() => {
    const checkLogin = async ()=>{
        try{
             await api.get("/me")
             setIsLogin(true)
        }catch(err){
            setIsLogin(false)
        }
    }
    checkLogin();
 }, [])

 const handleAuth = async ()=>{
    if(isLogin){
        try{
            await api.delete("/logout")
            setIsLogin(false)
            navigate("/")
        }catch (error) {
            console.error(error);
        }
    }else{
        setIsOpen(true) // open login modal
    }
}
 



  return (
    <>
    <header className='navbar'>
        <div className='logo-name'>
           <h1>Novelix</h1>
        </div>
        {isHomePage && (
          <input
            type="text"
            placeholder='Search by title or genre...'
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value)
            }}
            
            className='search-input'
          />
        )}
        <ul>
            <li> <NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/mybook">MyBooks</NavLink></li>
            <li><NavLink to="/favBook">FavBooks</NavLink></li>
            <li onClick={handleAuth}> {isLogin?"Logout":"Login"} </li>
        </ul>
    </header>

    {
        isOpen && (<Modal  onClose ={()=>{setIsOpen(false)}}>
            <InputForm setIsOpen = {()=>setIsOpen(false)} setIsLogin={setIsLogin}></InputForm>
        </Modal>)
    }
    
    </>
  )

 }


export default Navbar
