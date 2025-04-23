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
  origin: "https://digital-dinner-frontend-02.onrender.com",  
  methods: ['GET', 'POST'],
  credentials: true
}));

 



app.use(express.json());
app.use("/api/menu",menuRoutes);
app.use("/api/order", orderRoutes)

app.listen(PORT,()=>{
    console.log(`Server is Running on Post ${PORT}`);
    connectDb();
    connectPostgres()
})