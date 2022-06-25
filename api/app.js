const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const imageRouter = require("./routes/imageRoute.js");
const cors = require('cors')
const app = express();

dotenv.config()
app.listen(process.env.PORT_NUMBER | 5000,()=>{console.log("server is running")})
app.use(cors()) 
app.use('/image', imageRouter);
