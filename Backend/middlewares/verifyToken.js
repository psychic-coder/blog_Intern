
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../utils/helper.js";
import { TryCatch } from "./error.js";



export const verifyToken=TryCatch(async(req,res,next)=>{
    const token=req.cookies["access_token"];
    if(!token)
        return res.status(404).json({
    message:"User not loggedin"
    })

    const decodedData= jwt.verify(token,JWT_SECRET);

    console.log("",decodedData);
    req.user=decodedData;
    next();
}
);