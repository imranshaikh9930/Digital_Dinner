const MenuItem = require("../models/MenuItem");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const fs = require("fs");
const getAllItems = async (req, res) => {
  try {
    const getAllItems = await MenuItem.find();
    res.status(200).json(getAllItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const singleMenu = async (req, res) => {
  console.log(req.params.id);
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid menu item ID" });
    }

    
    const singleMenu = await MenuItem.findById(req.params.id);


    if (!singleMenu) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(singleMenu);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

const addMenuItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const { name, category, price, description, options } = req.body;
    if (!name || !category || !price || !description || !options) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ error: "Invalid price" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "menuItems",
    });

    fs.unlinkSync(req.file.path);

    const parsedOptions = JSON.parse(options);

    const newItem = new MenuItem({
      name,
      category,
      price: parseFloat(price),
      description,
      image: result.secure_url,
      options: parsedOptions,
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: err.message || "Something went wrong. Please try again.",
      });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid Menu Item ID format" });
    }

    const { name, category, price, description, options } = req.body;
    if (!name || !category || !price || !description || !options) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ error: "Invalid price" });
    }

    const updateItems = await MenuItem.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price: parseFloat(price),
        description,
        options: JSON.parse(options),
      },
      { new: true }
    );

    if (!updateItems) {
      return res.status(404).json({ message: "Menu Item not found" });
    }

    res.status(200).json(updateItems);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: err.message || "Something went wrong. Please try again.",
      });
  }
};

module.exports = { getAllItems, singleMenu, addMenuItem, updateMenuItem };
