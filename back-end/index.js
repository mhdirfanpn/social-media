import express from 'express'

import morgan from 'morgan'
import helmet from 'helmet'
import db from './config/connection.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'


const app = express()
db()

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))


app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)


app.listen(5000,()=>{
    console.log("server running at port 5000")
})