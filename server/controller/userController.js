import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
  const {email,password} = req.body

  const user = await userModel.findOne({email})
  if(user && (await user.matchPasswords(password))){
   const token =  generateToken(res,user._id)
    res.status(201).json({
      token:token,
      _id:user._id,
      name:user.name,
      email:user.email,
      phone:user.phone,
    })
  }else{
    res.status(400)
    throw new Error("Invalid email or password")
  }
});


  const registerUser = asyncHandler(async (req, res) => {
     const {name,email,phone,password} = req.body

     const userExist = await userModel.findOne({email})
     if(userExist){
      res.status(400);
      throw new Error('user already exist')
     }

     const user = await userModel.create({
      name,
      email,
      phone,
      password
     })
     if(user){
      generateToken(res,user._id)
      res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
      })
     }else{
      res.status(400);
      throw new Error("Invalid user data")
     }
  });

const getUserProfile = asyncHandler((req,res)=>{
    const user = {
        _id: req.user._id,
        name:req.user.name,
        email:req.user.email,
        phone:req.user.phone
    }
    res.status(200).json(user)
});


const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if(req.body.password){
      user.password = req.body.password
    }
    const updateUser =  await user.save()

    res.status(200).json({
      _id:updateUser._id,
      email:updateUser.email,
      name:updateUser.name,
      phone:updateUser.phone,
    })
  }else{
    res.status(404);
    throw new Error("User not found")
  }
});



const logoutUser = asyncHandler((req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message:"user logged out"})
});
export {authUser, registerUser, getUserProfile,updateUser , logoutUser}