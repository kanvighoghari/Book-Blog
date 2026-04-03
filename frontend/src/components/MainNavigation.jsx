import React from 'react'
import Navbar from "../components/Navbar"
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useState } from 'react'

const MainNavigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
  return (
    <div className="layout">
    <Navbar isOpen={isOpen} setIsOpen ={setIsOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="main-content">
        <Outlet context={{ isOpen, setIsOpen, searchTerm }} />
      </div>
    <Footer/>
  
    </div>
  )
}

export default MainNavigation
