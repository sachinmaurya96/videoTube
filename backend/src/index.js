import { app } from "./app/index.js";
import { connectDb } from "./db/index.js";
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
const port = process.env.PORT || 5000
connectDb()
.then(()=>{
    app.get("/",(req,res)=>{
        res.json("welcome")
    })
    app.listen(port,()=>{
        console.log(`server is running on port localhost ${port}`)
    })
})
.catch((err)=>{
    console.log("mongodb connection failed"+err)
})