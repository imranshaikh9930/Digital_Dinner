const express = require("express");
const MenuItem = require("../models/MenuItem");
const upload = require("../middleware/multer");
const router = express.Router();

const {
  getAllItems,
  singleMenu,
  addMenuItem,
  updateMenuItem,
} = require("../controllers/menuController");

router.get("/", getAllItems);

router.get("/:id", singleMenu);

router.post("/", upload.single("image"), addMenuItem);

router.put("/:id", updateMenuItem);

module.exports = router;
