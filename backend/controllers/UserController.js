import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user

const loginUser=async(req,res)=>
{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user)
            {
                return res.json({success:false,message:"user doesn't exist"})
            }
            const isMatch=await bcrypt.compare(password,user.password)

            if(!isMatch)
                {
                    return res.json({success:false,message:"Invaild credebtails"})
                }
                const token=createToken(user._id)
                res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
    
}

const createToken=(id) =>{
    return jwt.sign({id},process.env.jwt_SECRET)
}
const registerUser=async(req,res)=>
{
    const{name,password,email}=req.body;
    try {
        //checking is user exist or not
        const exists= await UserModel.findOne({email})
        if(exists)
            {
                return res.json({success:false,message:"User already exist"})
            }
            if(!validator.isEmail(email))
                {
                    return res.json({success:false,message:"Please enter a valid email"})
                }
            if(password.length<8)
                {
                    return res.json({success:false,message:"Please enter a strong password"})
                }

                //hashing password
                const saal=await bcrypt.genSalt(10)
                const hashedPassword=await bcrypt.hash(password,saal)

                const newUser = new UserModel({
                    name:name,
                    email:email,
                    password:hashedPassword
                })

                const user = await newUser.save()
                const token = createToken(user._id)
                res.json({success:true,token})
    } 
catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
            
}
export {loginUser,registerUser}