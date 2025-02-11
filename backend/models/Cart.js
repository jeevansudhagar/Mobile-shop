const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./Product"); // Import Product model

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

// Define associations
Cart.belongsTo(Product, { foreignKey: "productId", as: "Product" }); // Fix association

module.exports = Cart;
