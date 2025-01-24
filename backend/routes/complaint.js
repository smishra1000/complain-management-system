const express = require("express")
const cmplntModel = require("../models/complaint")
const router = express.Router()
var ObjectId = require('mongodb').ObjectId;
const path = require("path")

router.get("/all", async function (req, res) {
    let complnts = await cmplntModel.find()
    res.send(complnts)
})
router.post("/create", async function (req, res) {
    let newComplnts = new cmplntModel(req.body)
    await newComplnts.save()
    res.send("complaint created successfully")
})
router.delete("/deleteCmplnt/:id", async function (req, res) {
    const deletedCmplnt = await cmplntModel.deleteOne({ "_id": new ObjectId(req.params.id) })
    res.send("cmplt deleted successfully")
})
router.get("/cmplntById/:id", async function (req, res) {
    let complaint = await cmplntModel.findOne({ "_id": new ObjectId(req.params.id) })
    res.send(complaint)
})

router.put("/edit/:id", async function (req, res) {
    const updatedCmplnt = await cmplntModel.findByIdAndUpdate({ "_id": new ObjectId(req.params.id) }, req.body, { upsert: true })
    res.send("complaint updated successfully")
})

router.get("/searchByTitle/:title", async function (req, res) {
    console.log(req.params.title)
    const cmplnts = await cmplntModel.find({ title: req.params.title })
    res.send(cmplnts)
})
router.get("/searchByCategory/:category", async function (req, res) {
    console.log(req.params.category)
    if (req.params.category.toLowerCase() === 'all') {
        const cmplnts = await cmplntModel.find({})
        res.send(cmplnts)
    } else {
        const cmplnts = await cmplntModel.find({ category: req.params.category.toLowerCase() })
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