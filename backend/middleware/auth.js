const express = require("express")
const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: "Token missing" });
    }
   try{
    const decoded = jwt.verify(token ,process.env.JWT_SECRET)
     req.user = decoded;
     next();
    }
    catch(err){
        console.log(err)
        return res.status(401).json({ message: "Invalid token" });
    }
   
}

module.exports = auth