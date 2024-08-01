import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

const app = express()

app.use(express.json())

app.listen(3000, () => {
    console.log('Listening on port 3000')
});


//api routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


//middleware to handle errors 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})