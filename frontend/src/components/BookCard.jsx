import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useState , useEffect } from 'react';
import { FaFilePen } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import api from "../api/axios";
import { FaTags } from "react-icons/fa";


const BookCard = ({books}) => {

  const location = useLocation();
  const path = location.pathname.includes("mybook")
  const isFavPage = location.pathname.toLowerCase().includes("favbook")
  const [book, setbook] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))
  const userId  = user?._id



  const [favItem, setFavItem] = useState(
    JSON.parse(localStorage.getItem(`fav_${userId}`)) || []
  )

  useEffect(()=>{
    if(location.state?.newbook){
      setbook(prev=>[...prev , location.state.newbook])
    }

  } , [location.state])


 useEffect(() => {
  if (isFavPage) {
    const fav = JSON.parse(localStorage.getItem(`fav_${userId}`) || "[]");
    setbook(fav);
  } else {
    setbook(books || []);
  }
}, [isFavPage ,  books]);

  const favBook = (items)=>{
    const exists = favItem.some(res=> String(res._id) === String(items._id))
    let updateFav;
    if(exists){
      updateFav = favItem.filter(res=>  String(res._id) !== String(items._id))
    }
    else{
      updateFav = [...favItem , items]
    }
    
    setFavItem(updateFav)
    localStorage.setItem(`fav_${userId}` , JSON.stringify(updateFav))

    if(isFavPage){
      setbook(updateFav)
    }
  }

  const onDelete = async (items)=>{
     const confirmDelete = window.confirm("Delete this Book?");
        if (!confirmDelete) return;


        await api.delete(`/book/${items._id}`);
        setbook(prev =>
            prev.filter(book => book._id !== items._id)
        );


        const updatedFav = favItem.filter(item => item._id !== items._id);
        setFavItem(updatedFav);
        localStorage.setItem("fav", JSON.stringify(updatedFav));
    }
   
  return (
    <>
    <div className="card-container">
      {
        Array.isArray(book) && book.map((items , index)=>{
          return (
            <div key={index} className="card" >
              <Link to={`/book/${items._id}`}><img src={items.coverImage}  alt="" ></img></Link>
              <div className='card-body'>
                <div className='title'> {items.title}</div>
                <div className='icons'>
                  <div className='author'> <FaFilePen />{items.author}</div>
                  <div className='genre'><FaTags /> {items.genre}</div>
                  {(!path)? <FaHeart   onClick={()=> {favBook(items)}}
                     style={{
                          color: favItem.some(res => String(res._id) === String(items._id))
                            ? "red"
                            : "grey",
                        }}
                    /> : 
                    <div className="action">
                       <Link to={`/editBook/${items._id}`} className="editIcon" ><FaEdit /></Link>
                       <MdDelete onClick={()=>{onDelete(items)}} className="deleteIcon" />
                    </div>
                   }
                </div>
              </div>
            </div>
          )
        }) 
      }
    </div>
      
    </>
  )
}

export default BookCard
