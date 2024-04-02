const jwt = require("jsonwebtoken")

module.exports.authMiddleware= async(req,res,next)=>{
    try{
        const token = req.headers.token
        if(!token) res.status(401).json.authMiddleware({msg:"you are not authorized"})
        else{
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
            req.personeId = verifyToken.id
            next()
        }
    }

    catch(error){

        res.status(500).json({msg:"something went wrong!", error:error.message})
    }
}