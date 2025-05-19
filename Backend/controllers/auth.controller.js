import { TryCatch } from "../middlewares/error.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken, sendToken } from "../utils/helper.js";

export const signup = TryCatch(async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({
      error: "User already exists",
    });

  const salt =  bcrypt.genSaltSync( 10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = generateToken(newUser);
  sendToken(res, 200, newUser, token, "User created Successfully");
});

export const login = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const token = generateToken(user._id);
  sendToken(res, 200, user, token, "User logged in successfully");
});






// export const signOut=async (req,res)=>{

//     res.clearCo
// }
