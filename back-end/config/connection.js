
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

//database connection
const db = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log("database error=>",err)
    })
}

export default db