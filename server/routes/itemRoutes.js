const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* CREATE ITEM */
router.post("/items", upload.single("image"), async (req, res) => {
  try {

    const newItem = new Item({
      ...req.body,
      image: req.file ? req.file.filename : null
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
});

/* GET ALL ITEMS */
router.get("/items", async (req, res) => {
  try {

    const items = await Item.find().sort({ createdAt: -1 });

    res.json(items);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
});

/* GET ITEM BY ID */
router.get("/items/:id", async (req, res) => {
  try {

    const item = await Item.findById(req.params.id);

    res.json(item);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
});

/* DELETE ITEM */
router.delete("/items/:id", async (req, res) => {
  try {

    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: "Item deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
});

module.exports = router;