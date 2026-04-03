const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require("cors");

const port = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");

app.use("/book", bookRoute);
app.use("/", userRoute);



app.listen(port ,()=>{
    connectDB()
    console.log("server is running")
})

