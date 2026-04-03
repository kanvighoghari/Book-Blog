const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignUp =  async (req,res)=>{
   try{
     const user = req.body;

    if(!user.email||!user.username||!user.password){
       return res.status(400).json({message:"please fill all the input"})
    }

    const isAlreadyUser = await userModel.findOne({
        $or: [
           { email: user.email},
           {username: user.username}
        ]
    })

     if (isAlreadyUser) {

      if (isAlreadyUser.username === user.username) {
        return res.status(409).json({
          message: "username already exists"
        });
      }

      if (isAlreadyUser.email === user.email) {
        return res.status(409).json({
          message: "email already exists"
        });
      }
    }

    const hash = await bcrypt.hash(user.password,10)
    const newUser = await userModel.create({
        email:user.email,
        username:user.username,
        password:hash
    })

    const token = jwt.sign({id:newUser._id ,email:newUser.email},process.env.JWT_SECRET)
    res.cookie("token" ,token,{
       httpOnly:true,
      secure:true,
      sameSite:"none"
    })
    res.status(200).json({
        message : "user registered successfully",
            user : {
                    _id: newUser._id,   
                    username: newUser.username,
                    email: newUser.email
                }
    })
   }catch(err){
     return res.status(500).json({
      message: "Server error",
      err: err.message
    })
  }
}

const userLogin = async (req,res)=>{
    try{
        const {username , email , password} = req.body;

        if(!email||!username||!password){
           return res.status(400).json({message:"please fill all the input"})
        }

        const findUser = await userModel.findOne({
            $or: [
                    { email:email},
                    {username:username}
                ]
            })

            if(!findUser){
                return res.status(401).json({message : "user not found"})
            }

            const isValidPassword = await bcrypt.compare(password,findUser.password);
            if(!isValidPassword){
                return res.status(401).json({message : "invalid credentials"})
            }

            const token =  jwt.sign({id:findUser._id ,email:findUser.email},process.env.JWT_SECRET)
            res.cookie("token" ,token,{
              httpOnly:true,
              secure:true,
              sameSite:"none"
            })
            res.status(200).json({
            message : "user Logged in successfully",
               user : {
                  _id: findUser._id,   
                  username: findUser.username,
                email: findUser.email
              }
            })
    }catch(err){
         return res.status(500).json({
        message: "Server error",
        err: err.message
         })
    }
}

const getUser = async (req,res)=>{
     const user = await userModel.findById(req.params.id)
     res.json({email: user.email , id: user._id,})
}

const userLogout = async (req,res)=>{
     res.clearCookie("token" ,{
    httpOnly: true,
    secure: true,
    sameSite: "none"
  })
    res.status(200).send("user logged out successfullyy")
}

module.exports = {userLogin , userSignUp , userLogout, getUser};
