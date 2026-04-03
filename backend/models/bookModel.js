const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
         type:String,
         required:true     
    },
    genre:{
        type:String,
        required:true 
    },
    summary:{
        type:String,
    },
    coverImage: String,
  
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    

},{timestamps: true })

const bookModel = mongoose.model("book" , bookSchema)
module.exports = bookModel