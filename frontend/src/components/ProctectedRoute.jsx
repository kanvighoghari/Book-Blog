import React, { useEffect } from 'react'
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useState } from 'react'
import api from "../api/axios";

const ProctectedRoute = () => {
    const [isAuth, setIsAuth] = useState(null)
    const {setIsOpen ,  searchTerm } = useOutletContext();
  

    useEffect(()=>{
        const checkAuth = async ()=>{
            try{
             const res =  await api.get("/me")
             setIsAuth(res.data.authenticated);
            }catch(err){
                setIsAuth(false)
            }
        }

        checkAuth();
    } , [])

    if(isAuth ===null) return null;
    if (!isAuth) {
    setIsOpen(true);
    return <Navigate to = "/"></Navigate>;
  }
  return <Outlet context={{ setIsOpen, searchTerm }} />
}

export default ProctectedRoute
