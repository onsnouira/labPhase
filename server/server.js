const express = require("express")
const app = express()
app.use(express.json())
require('dotenv').config()
const cors = require("cors")


app.use(cors())
//configuration of routes
app.use("/api", require("./routes/userRoutes"))
app.use("/api/task", require("./routes/taskRoutes"))
//database connection
const connectDb= require("./config/connectDb")
connectDb()

//port configuration
const port = process.env.PORT || 8081
app.listen(port , ()=> console.log("my server is running on port:",port))