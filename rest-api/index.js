if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const Post = require("./models/Post")
const User = require("./models/User")
const cors = require("cors")
const multer = require("multer")
const {storage} =  require("./cloudinary")

const app = express()

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.DB_URL);
//   console.log("MongoDB Atlas Database connected")
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }
const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log('MongoDB Atlas Database connected')
})


//middleware part
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

const upload = multer({ storage })

// app.post("/api/upload", upload.single("file"), (req,res)=>{
//      console.log()
//   try{
     
//      console.log(req.file.path)
//      return res.status(200).json("file uploaded successfully")
//     // return res.send(req.body, req.file)
//   }catch(err){
//     console.log(err)
//   }
// })

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
      const fileUrl = req.file.path; // Assuming this is the URL to the file
      return res.status(200).json({ fileUrl });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "File upload failed" });
  }
});

app.use("/api/user" , userRoute)
app.use("/api/auth" , authRoute)
app.use("/api/post", postRoute)


app.get("/",(req,res)=>{
  res.send("Server is running!")
})

app.listen(3000, ()=>{
  console.log("Connected to port 3000")
})
