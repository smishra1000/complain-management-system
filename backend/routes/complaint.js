const express = require("express")
const cmplntModel = require("../models/complaint")
const router = express.Router()
var ObjectId = require('mongodb').ObjectId;
const path = require("path")
const Category = require('../models/Category');

router.get("/all", async function (req, res) {
    let complnts = await cmplntModel.find().populate('userId', 'name email') // Populate User details
    .populate('category', 'name description') // Populate Category details
    .exec();
    res.send(complnts)
})

// Get complaints by User ID (New API)
router.get("/user/:userId", async function (req, res) {
    try {
        const userId = req.params.userId;
        let userComplaints = await cmplntModel.find({ userId })
            .populate("userId", "name email") // Populate User details
            .populate("category", "name description") // Populate Category details
            .exec();

        if (!userComplaints.length) {
            return res.status(404).json({ message: "No complaints found for this user." });
        }

        res.json(userComplaints);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});

// Endpoint to fetch all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});
router.post("/create", async function (req, res) {
    let newComplnts = new cmplntModel(req.body)
    newComplnts.status="open"
    await newComplnts.save()
    res.send("complaint created successfully")
})
router.delete("/deleteCmplnt/:id", async function (req, res) {
    const deletedCmplnt = await cmplntModel.deleteOne({ "_id": new ObjectId(req.params.id) })
    res.send("cmplt deleted successfully")
})
router.get("/cmplntById/:id", async function (req, res) {
    let complaint = await cmplntModel.findOne({ "_id": new ObjectId(req.params.id) }).populate('userId', 'name email') // Populate User details
    .populate('category', 'name description') // Populate Category details
    .exec();
    res.send(complaint)
})

router.put("/edit/:id", async function (req, res) {
    const updatedCmplnt = await cmplntModel.findByIdAndUpdate({ "_id": new ObjectId(req.params.id) }, req.body, { upsert: true })
    res.send("complaint updated successfully")
})

router.put("/status/:id", async function (req, res) {
    const updatedCmplnt = await cmplntModel.findByIdAndUpdate({ "_id": new ObjectId(req.params.id) }, {status:req.body.status}, { upsert: true })
    res.send("complaint status solved updated")
})

router.get("/searchByTitle/:title", async function (req, res) {
    console.log(req.params.title)
    const cmplnts = await cmplntModel.find({ title: req.params.title }).populate('userId', 'name email') // Populate User details
    .populate('categoryId', 'name description') // Populate Category details
    .exec();
    res.send(cmplnts)
})
router.get("/searchByCategory/:category", async function (req, res) {
    console.log(req.params.category)
    if (req.params.category.toLowerCase() === 'all') {
        const cmplnts = await cmplntModel.find({})
        res.send(cmplnts)
    } else {
        const cmplnts = await cmplntModel.find({ category: req.params.category.toLowerCase() }).populate('userId', 'name email') // Populate User details
        .populate('categoryId', 'name description') // Populate Category details
        .exec();
        res.send(cmplnts)
    }

})

router.post("/imageupload", function (req, res) {
    console.log(req.files)
    const filename = Date.now() + req.files.cmplntimage.name;
    const fileData = req.files.cmplntimage;
    const uploadPath = path.join(__dirname, "../", "uploads")
    console.log(filename, fileData, uploadPath)
    fileData.mv(uploadPath + "/" + filename, function (err) {
        if (err)
            res.send("something went wrng")
        res.send({ image: filename })
    })
})


module.exports = router