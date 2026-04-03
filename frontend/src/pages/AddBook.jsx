import React from 'react'
import { useState  } from 'react'
import {useNavigate} from 'react-router-dom'
import api from "../api/axios"

const AddBook = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [bookData, setBookData] = useState({
    title : "",
    author : "",
    genre :"",
    summary: "",

  })

  const [coverImage, setcoverImage] = useState(null);
  const handleChange = (e)=>{
    let val = e.target.value
    setBookData(pre=>({...pre,[e.target.name]:val}))
  }
  const handleImageChange = (e)=>{
    setcoverImage(e.target.files[0])
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setIsLoading(true)
    const user = JSON.parse(localStorage.getItem("user"))

    const formData  = new FormData()
     formData.append("title", bookData.title);
     formData.append("author",bookData.author)
     formData.append("genre" , bookData.genre)
     formData.append("summary" , bookData.summary)
     formData.append("coverImage" ,coverImage)
  

     try{
      const response = await api.post("/book" , formData )

       navigate("/" , { state: { newBook: response.data }});
     }catch(err){
      console.log(err)
     }finally{
      setIsLoading(false)
     }
  }

  return (
   <>
   <div className='container'>
       <form className="form" onSubmit={handleSubmit} >
         <div className="form-control">
            <label >Title</label>
            <input type="text"  className='input' name='title' onChange={handleChange}  />
        </div>

        <div className="form-control">
            <label >Author</label>
            <input type="text"  className='input' name='author'  onChange={handleChange} />
        </div>

         <div className="form-control">
            <label >Genre</label>
            <input type="text"  className='input' name='genre' onChange={handleChange} />
        </div>

        <div className="form-control">
            <label >Summary</label>
            <textarea type="text"  className='input-textarea' name='summary' rows ="5" onChange={handleChange} />
        </div>

        

        <div className='form-control'>
            <label>Cover Image</label>
            <input type="file" className='input' name="coverImage" onChange={handleImageChange} ></input>
        </div>
        <button type="submit" disabled={isLoading}> {isLoading ? "Loading..." : "Add Book"} </button>

       </form>
      </div>
    </>
  
  )
}

export default AddBook
