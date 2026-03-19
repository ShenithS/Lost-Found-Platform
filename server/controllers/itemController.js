const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItemById
} = require("../controllers/itemController");

const Item = require("../models/Item");

router.post("/items", createItem);

router.get("/items", getItems);

router.get("/items/:id", getItemById);

exports.createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createItem = async (req, res) => {
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
};

module.exports = router;