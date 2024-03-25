import mongoose from "mongoose";
import { DB_NAME } from "../constants/index.js";

export const connectDb = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("mongoose connected")
    } catch (error) {
        console.log("something went wrong while connecting database"+error)
        process.exit()
    }
}