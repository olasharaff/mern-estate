import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
// By default you can't use environment variables (.env file) inside BACKEND so dotenv packages needs to be installed before using it.
import dotenv from 'dotenv';
dotenv.config();

const Uri =
  "mongodb+srv://AshrafDev:Rahman77@mern-estate.wf8u2rc.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate"
mongoose.connect(Uri)
.then(() => {console.log('Connected to MongoDB!!!')
}).catch((err) => console.log(err));



const app = express(); 
// By default we're not allowed send json to the server. So we need to use express.json() to allow json to be sent to the server.
app.use(express.json());
app.use(cookieParser());
 
app.listen(3000, () => {
  console.log("Server is running on port 3000!!!");
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


// create a middleware to handle errors

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,

    })
})