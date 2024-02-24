import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';

const app=express();
dotenv.config()
const PORT=process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send('Hello World!!')
})
app.use(express.json())  // to parse the incoming request with JSON payloads(from req.body)
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)

app.use('/api/messages',messageRoutes)

app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`App is running on ${PORT}`)})