import React from 'react'
import {createBrowserRouter , RouterProvider} from "react-router-dom";
import MainNavigation from './components/MainNavigation';
import Home from './pages/Home';
import "./App.css"
import AddBook from './pages/AddBook';
import api from './api/axios'
import ProctectedRoute from './components/ProctectedRoute';
import Edit from './pages/Edit';
import BookDetails from './pages/BookDetails';

const getAllBook = async ()=>{
 try{
   const res  = await api.get("/book");
   return res.data;
 }catch(err){
  console.log(err)
  return [];
 }
}

const getMyBook = async ()=>{
  try{
    const user = JSON.parse(localStorage.getItem("user"))
    if(!user || !user._id){
      console.log("cannot find user")
      return []
    }
    const res = await api.get("/book")
    const allBook = res.data.books;

    const mybook = allBook.filter(book => String(book.createdBy) === String(user._id))
    return { books: mybook }

  }catch (err) {
    console.error("getMyBook error:", err);
    return { books: [] };
  }
}

const getBookById = async ({params})=>{
  try{
    const res = await api.get(`/book/${params.id}`);
    return res.data.books;
  }catch(err){
    console.log(err)
    return null
  }

}



const router = createBrowserRouter([{
  path:"/",
  element: <MainNavigation/>,
  children:[
    {index:true , element:<Home/> , loader: getAllBook},
    {path: "/addbook" , element:<AddBook />},
    {path:"/editBook/:id" , element:<Edit/>},
    {path:"/book/:id" , element:<BookDetails/> , loader:getBookById},
    {
      element : <ProctectedRoute/>,
      children:[
        {path: 'mybook', element:<Home/>, loader:getMyBook} ,
        {path: "favbook" , element:<Home/>}
      ]
    }
  ]

}])

const App = () => {
  return (
    <div >
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  )
}

export default App
