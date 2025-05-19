
  import express from "express"
import helmet from "helmet"
import cors from 'cors'
import {errorMiddleware} from "./middlewares/error.js"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.routes.js"
import blogRoutes from "./routes/blog.routes.js"
import cookieParser from "cookie-parser"
  
  dotenv.config({path: './.env',});
  
  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = process.env.PORT || 3000;
  
const mongoURI = 'mongodb://localhost:27017/specialBlogApp';

connectDB(mongoURI);
  
  const app = express();
  
                                
  
  
app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 

}));app.use(morgan('dev'))
    
  
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
  
 
  app.use(errorMiddleware);
    
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));
  