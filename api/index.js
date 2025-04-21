const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");
const { connectPostgres } = require("./utils/sequelize");
require("dotenv").config();
const menuRoutes = require("./routes/MenuRoutes");
const orderRoutes = require("./routes/Order");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST'],
  // allowedHeaders: ['Content-Type'],
  credentials: true
}));

 


app.use(express.urlencoded({ extended: true }));



app.use(express.json());
app.use("/api/menu",menuRoutes);
app.use("/api/order", orderRoutes)

app.listen(PORT,()=>{
    console.log(`Server is Running on Post ${PORT}`);
    connectDb();
    connectPostgres()
})