import express from 'express'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import multer from "multer"
import dotenv from 'dotenv';
dotenv.config();
const app = express();

// const corsOptions ={
    
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }));


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now()+ file.originalname)
    }
  })


  const upload = multer({storage})
  app.post('/api/upload', upload.single('file'), function (req,res) {
    const file = req.file;
    res.status(200).json(file.filename)
  })
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.listen(8800, ()=>{
 console.log('server started hello');
})

