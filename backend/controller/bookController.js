const bookModel = require("../models/bookModel");
const uploadFile = require("../utils/service");

const getBooks = async (req,res)=>{
    const books = await bookModel.find();
    res.json({books})
}

const getBookById = async (req,res)=>{
    const books = await bookModel.findById(req.params.id)
    res.json({books})
}

const createBook = async (req,res)=>{
    console.log(req.user)
   try{
     const {title , author , genre ,summary} = req.body;
     const coverImage = req.file;

     if(!title||!author ||!genre){
       return  res.status(400).json({message: "Required Field can't be empty"})
     }

     if(!coverImage){
        return res.status(400).json({message: "Cover Image is Required"});
     }
     
     const result = await uploadFile(coverImage.buffer.toString('base64'))
     const book = await bookModel.create({
        title,
        author,
        genre,
        summary,
        coverImage:result.url,
        createdBy: req.user.id
     })
     res.status(201).json({book , coverImage}) 

   }catch(err){
    console.log(err)
    res.status(500).json({
      message: err.message
    });
   }

    
}

const editBook = async (req,res)=>{
    try{
        const {title , author , genre ,summary} = req.body

    let book = await bookModel.findById(req.params.id)
    if(!book){
         return res.status(404).json({message : "book does not exist"});
    }

    book = await bookModel.findByIdAndUpdate(req.params.id , req.body , {new:true})
    res.status(200).json({book})
    }
    catch(err){
        console.log(err)
        res.status(500).json({
        message: err.message
        });
   }

}

const deleteBook = async (req,res)=>{
    const book = req.params.id
    const deleteBook = await bookModel.findByIdAndDelete(req.params.id)
    if(!deleteBook){
        return res.status(400).json({message:"book not found"})
    }
    res.status(200).json({ message: "Book deleted successfully" })


}

module.exports = {getBooks,getBookById , createBook ,editBook,deleteBook};