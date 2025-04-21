##  Database Design Decisions

This application uses **two databases** — **MongoDB** and **PostgreSQL** — based on the nature of the data and how it is accessed.

---

### MongoDB – For Menu Items

**Why MongoDB?**  
MongoDB is a NoSQL, document-based database which is ideal for flexible and nested data structures. Here's why we chose it for storing **menu items**:

- **Flexible Schema**: Menu items can vary — some might have options (like size, spice level), others may not. MongoDB allows for this flexibility without the need to alter schema definitions.
- **Nested Objects**: Each menu item may include nested data such as `options`, `ingredients`, or `nutrition`. MongoDB handles nested documents naturally.
- **Faster Reads for Content**: Menu data is often read-heavy (e.g., browsing the menu), and MongoDB is optimized for such use cases.

#### Schema Example (Mongoose)
```js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  description: String,
  image: String,
  options: [
    {
      label: String,
      values: [String],
    },
  ],
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
```

---

###  PostgreSQL – For Users & Orders

**Why PostgreSQL?**  
PostgreSQL is a relational database and ideal for structured data with strict relationships. We use it for **Users and Orders** because:

- **Structured & Relational Data**: Users place many orders, and each order is associated with one user — this requires foreign key constraints and JOIN operations, which PostgreSQL handles excellently.
- **Data Integrity**: PostgreSQL provides strong ACID compliance, ensuring that user and order data is always consistent.
- **Complex Queries**: Reporting, filtering, and joining user and order data is more efficient in a relational model.
- **ORM Tool**: We use **Sequelize** to interact with PostgreSQL in a structured and efficient way.

####  User Model (PostgreSQL/Sequelize)
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: DataTypes.STRING,
});

module.exports = User;
```

####  Order Model (PostgreSQL/Sequelize)
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Order = sequelize.define('Order', {
  items: DataTypes.JSONB, // stores item IDs and quantity
  totalAmount: DataTypes.FLOAT,
});

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
```

---

### Summary

| Data Type     | Database   | Reason |
|---------------|------------|--------|
| Menu Items    | MongoDB    | Flexible, nested data (NoSQL) |
| Users & Orders| PostgreSQL | Relational, structured, and consistent (SQL) |

---

This separation of concerns allows each database to do what it does best, resulting in a highly scalable and efficient architecture.

![project-1](https://github.com/user-attachments/assets/24c95a49-8827-4838-b0f8-cf24d9018d25)

![project-2](https://github.com/user-attachments/assets/8753dde0-7a0c-4d3f-b6aa-e832b14f105c)
![project-3](https://github.com/user-attachments/assets/c0885c57-f3bf-40e3-9a6d-61e9d795b58a)
![project-4](https://github.com/user-attachments/assets/1f9848d0-e8b0-485d-977e-a191dc962543)
![project-5](https://github.com/user-attachments/assets/1f368381-f7be-436a-a5f9-83a727c993ef)
