const express = require("express")
const fileUpload = require("express-fileupload") 

const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const complaintRoutes = require("./routes/complaint")
const authRoutes = require("./routes/Auth")

mongoose.connect("mongodb://127.0.0.1:27017/complaint-register-system")

app.use(cors())
app.use(express.json())
app.use(fileUpload())

app.use("/uploads",express.static('uploads'))
app.use("/complaints",complaintRoutes)
app.use("/auth",authRoutes)

app.listen(8000,function(){
   console.log("server is running on port 8000")
})