
import jwt from "jsonwebtoken";


export const JWT_SECRET=process.env.JWT_SECRET||"superkey";

export const generateToken=(user)=>{
    return jwt.sign({
        id:user._id
    },JWT_SECRET,{
        expiresIn:'4h'
    })
}

export const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  };

  export const sendToken=(res,code,tokenData,token,message)=>{

    return res.status(code).cookie("access_token",token,cookieOptions).json({
        success:true,
        tokenData,
        message
    })
  };