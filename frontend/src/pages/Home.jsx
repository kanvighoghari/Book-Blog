import React from 'react'
import api from '../api/axios'
import {  useLoaderData, useNavigate , useOutletContext } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import { useState , useEffect } from 'react'
import BookCard from '../components/BookCard'
import coverPic from "../assets/cover.jpg"

const Home = () => {

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const loader = useLoaderData() || { books: [] }
  const allBooks = loader.books || []
  const { searchTerm } = useOutletContext()


  
  const addBook = async ()=>{
      console.log("button clicked");
    try{
      await api.get("/me")
      navigate("/addbook")
    }
    catch(error){
            if(error.response?.status===401){
                setIsOpen(true)
            }
        }
  }

  const filteredBooks = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  )



  return (
   <>
    {!searchTerm && (
      <div className='home'>
        <div className='left'>
          <h1>Novelix</h1>
          <h2>Discover stories that stay with you forever.</h2>
          <button onClick={addBook}>Share Your Book</button>
        </div>
        <div className='right'>
          <img
            src={coverPic}
            alt="Stack of books"
          />
        </div>
      </div>
    )}
   {
    isOpen && <Modal onClose={() => setIsOpen(false)}>
      <div style={{ textAlign: "center" , color : "red"}}>
                <h3>Please login first to share your Book </h3>
      </div>
      <InputForm setIsOpen = {()=>setIsOpen(false)}></InputForm>
    </Modal>
   }
   <div className='books'>
      <BookCard books={filteredBooks}></BookCard>
   </div>
   </>
  )
}

export default Home
