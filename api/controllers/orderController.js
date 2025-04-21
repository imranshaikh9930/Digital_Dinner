const {User,Order} = require("../utils/sequelize");

const createOrder = async (req, res) => {
  try {
    const { phone, name, email, items, totalAmount } = req.body;

    if (!phone || !name || !email || !items || !totalAmount) {
      return res.status(400).json({
        error:
          "All fields (phone, name, email, items, totalAmount) are required",
      });
    }

    // console.log(req.body);

    let user = await User.findOne({ where: { phone } });

    if (!user) {
      user = await User.create({ phone, name, email });
    //   console.log("Created new user:", user);
    } else {
      console.log("Found existing user:", user);
    }

    const newOrder = await Order.create({
      items,
      totalAmount,
      UserId: user.id,
    });

    // console.log("Created new order:", newOrder);

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error:", err);

    if (err.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: err.errors.map((e) => e.message).join(", ") });
    }

    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const phone = req.query.phone;

    if (!phone)
      return res.status(400).json({ error: "Phone number is required" });

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    const user = await User.findOne({ where: { phone } });

    if (!user) return res.status(404).json({ message: "User not found" });

    
    const orders = await Order.findAll({ where: { UserId: user.id } });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error:
          "An error occurred while fetching orders. Please try again later.",
      });
  }
};

module.exports = { createOrder, getUserOrders };
