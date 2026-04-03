import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';
import api from "../api/axios"
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    const {id} = useParams()
    const [coverImage, setCoverImage] = useState(null);
    const navigate = useNavigate();

     const [bookData, setBookData] = useState({
            title: "",
            author: "",
            genre: "" ,
            summary: "",
        });


 useEffect(() => {
  const getData = async () => {
    try {
      const response = await api.get(`/book/${id}`);
      const book = response.data.books

      setBookData({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        summary: book.summary || ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  getData();
}, [id]);

   
    const handleChange = (e)=>{
        let val = e.target.value
        setBookData(pre=>({...pre,[e.target.name]:val}))
  }
   const handleImageChange = (e)=>{
    setCoverImage(e.target.files[0])
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));

        const formData = new FormData()

            formData.append("title", bookData.title);
            formData.append("author", bookData.author);
            formData.append("genre", bookData.genre);
            formData.append("summary", bookData.summary);
            if (coverImage) {
                formData.append("coverImage", coverImage);
            }

            try {
                const response = await api.put(`/book/${id}`, formData);    
                navigate("/" , { state: { newBook: response.data }});
                
            } catch (error) {
                console.error(error);
            }
  }


  return (
    <>
   <div className='container'>
       <form className="form" onSubmit={handleSubmit} >
         <div className="form-control">
            <label >Title</label>
            <input type="text"  className='input' name='title' onChange={handleChange} value={bookData.title} />
        </div>

        <div className="form-control">
            <label >Author</label>
            <input type="text"  className='input' name='author' onChange={handleChange} value={bookData.author}  />
        </div>

         <div className="form-control">
            <label >Genre</label>
            <input type="text"  className='input' name='genre' onChange={handleChange} value={bookData.genre} />
        </div>

        <div className="form-control">
            <label >Summary</label>
            <textarea type="text"  className='input-textarea' name='summary' rows ="5" onChange={handleChange} value={bookData.summary}  />
        </div>

        

        <div className='form-control'>
            <label>Cover Image</label>
            <input type="file" className='input' name="coverImage" onChange={handleImageChange} ></input>
        </div>
        <button type="submit" >Edit Book</button>

       </form>
      </div>
    </>
  )
}

export default Edit
