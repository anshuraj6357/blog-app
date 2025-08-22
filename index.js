const express=require('express');
const cors=require('cors')
const blog=require('./routes/blog')
const cookieParser = require('cookie-parser');

const app=express();
app.use(cors({
  origin: "http://localhost:4000",  
  credentials: true               
}));
app.use(express.json());
app.use(cookieParser());

 require('dotenv').config();


const dbConnect = require('./config/database');
dbConnect();





const PORT = process.env.PORT || 5000;


app.use('/api/v1',blog)



app.listen(PORT,async(req,res)=>{
  console.log(`server is running`)
})



app.get('/',async(req,res)=>{
  res.send("server is running on this page")
})







