const Person = require("../models/userSchema")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")




const register = async(req,res)=>{
    try{
        const {email,name,password} = req.body
        const newUser = await Person.findOne({email})
        if(newUser) res.status(400).json({msg:"user already exist , try to connect"})
        else{
            const hashpwd= await bycrpt.hash(password,10)
            const createUser= await Person.create({email,name,password:hashpwd})
            const token= jwt.sign({id:createUser._id}, process.env.JWT_SECRET,{expiresIn:"7d"})
            res.status(201).json({msg:"user created", token:token, person:createUser})
                }
    }
    catch(error){
        res.status(500).json({msg:" something went wrong", error:error.message})

    }
}


const login = async(req,res)=>{
    try{
        const {email,password}= req.body
        const existUser= await Person.findOne({email})
        if (!existUser) res.status(400).json({msg:"user does not exist, try to register"})
        else{
            const checkPw = await bycrpt.compare(password, existUser.password)
            if (!checkPw) res.status(400).json({msg:"password does not math pls try again "})
            const token= jwt.sign({id: existUser._id},process.env.JWT_SECRET,{expiresIn:"7d"})
            res.status(201).json({msg:"login success",token:token, person:existUser})

        }
    }
    catch(error){
        res.status(500).json({msg:" something went wrong", error:error.message})
    }
}

const getUser = async(req,res)=>{
    try{
        const user = await Person.findOne({_id:req.personeId})
        if (!user) res.status(400).json({msg:"user does not exist, try to register"})
        res.status(200).json({msg:"user info success", person: user})
    }
    catch(error){
        res.status(500).json({msg:" something went wrong", error:error.message})
    }
}


module.exports={register,login,getUser}