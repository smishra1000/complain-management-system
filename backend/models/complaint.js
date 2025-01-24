const mongoose = require("mongoose")
const complaintSchema = new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    image:String,
    category:String
})

module.exports = mongoose.model("complaint",complaintSchema,"complaint")