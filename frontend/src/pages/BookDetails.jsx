import React from 'react'
import { useLoaderData, useNavigate } from "react-router-dom";

const BookDetails = () => {
    
    const book = useLoaderData();
    const navigate = useNavigate();
  return (
       <div className="book-details">

      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <img
        src={book.coverImage}
        alt={book.title}
        className="details-img"
      />

      <h1>{book.title}</h1>

      <p><b>author:</b> {book.author}</p>

      <p><b>genre:</b> {book.genre}</p>
      

      <h4>Summary:<br></br></h4>
      <p>{book.summary}</p>

    </div>
  )
}

export default BookDetails
