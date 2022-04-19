// Dependencies
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");

// Relative Files

// DataBase Connect
mongoose.connect(process.env.mongo_url,{
    useNewUrlParser:true,
})
.then(()=>console.log("MongoDb Connected"))

// middlewares
app.use(express.json());
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(cookieParser());

// routes
app.use("/auth", require("./Routes/auth"));
app.use("/api/post", require("./Routes/post"));
// app.use("/api/private", require("./Routes/private"));

// Errorhandling
app.use(errorHandler);

// server


app.get("/",(req,res)=>{
    res.send("Hello Xoxopuxo")
})
// Connecting Server
app.listen(process.env.PORT||5000,()=>{
    console.log("server running at port: 5000")
})