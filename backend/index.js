// // index.js or your main server file
// require("dotenv").config();
// const express = require("express");
// const sequelize = require("./config/database");
// const User = require("./models/User"); // Make sure this is the correct model import
// const cors = require("cors");

// const app = express();
// app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:3000', // Allow requests from this origin
//   methods: 'GET,POST', // Allow specific HTTP methods
//   allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
// }));

// // ✅ Create a new User
// app.post("/users", async (req, res) => {
//   try {
//     console.log("Received body:", req.body);
//     const { name, email, password, confirm_password } = req.body;
//     const confirmPassword = confirm_password;

//     // Check if user already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already in use" });
//     }

//     // Create user
//     const newUser = await User.create({ name, email, password, confirmPassword });

//     res.status(201).json({ message: "User created successfully", user: newUser });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Get all Users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Get a single User by ID
// app.get("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, async () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   await sequelize.sync(); // Ensure database is in sync
// });



require('dotenv').config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const nodemailer = require('nodemailer');
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const fs = require("fs");
const User = require("./models/User");
const Product = require("./models/Product");
const sequelize = require("./config/database");
const Cart =require("./models/Cart");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensure form data is parsed


// Enable CORS for frontend communication
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only image files are allowed!"), false);
  }
};

// Multer upload setup
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// ✅ Register User
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });

    res.status(201).json({
      message: "✅ User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Fetch all user details from the database (excluding password)
    const userDetails = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] }, // Exclude sensitive data
    });

    res.json({
      message: "✅ Login successful",
      user: userDetails, // Send all user details
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ Add Product (With Image Upload)
app.post("/admin", upload.single("image"), async (req, res) => {
  try {
    console.log("📦 Received Product Data:", req.body);
    console.log("🖼️ Uploaded Image:", req.file);

    const { title, price } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image upload failed" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;

    // Create product
    const newProduct = await Product.create({ title, price, image: imageUrl });
    res.status(201).json({ message: "✅ Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Fetch all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    const productsWithFullImageURL = products.map((product) => ({
      ...product.toJSON(),
      image: `http://localhost:5000${product.image}`,
    }));

    res.json(productsWithFullImageURL);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Fetch Single Product (With Image)
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ message: "❌ Product not found" });

    res.json({
      ...product.toJSON(),
      image: `http://localhost:5000${product.image}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET Image by Filename (New Method)
app.get("/uploads/:filename", (req, res) => {
  try {
    const filePath = path.join(__dirname, "uploads", req.params.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "❌ Image not found" });
    }

    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Product (With Optional Image Upload)
app.put("/products/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "❌ Product not found" });

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    product.title = title;
    product.price = price;
    await product.save();

    res.json({ message: "✅ Product updated successfully!", product });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ message: "❌ Product not found" });

    // Remove Image File
    const imagePath = path.join(__dirname, product.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await product.destroy();
    res.json({ message: "✅ Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS  // App Password
  }
});

// Contact Form Route
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your email
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});


// Add product to cart
// Add product to cart
app.post("/cart", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log(userId,productId,quantity);

    // Validate input
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Ensure user exists (Optional: If you have a User model)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the cart item already exists
    let cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
      // Update the quantity if item exists
      await cartItem.update({ quantity: cartItem.quantity + quantity });
    } else {
      // Create a new cart entry
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res.status(200).json({ message: "Product added to cart.", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Get cart items for a user
app.get("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: "Product", attributes: ["id", "title", "price", "image"] }],
    });

    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart items", details: error.message });
  }
});


// Remove an item from the cart
app.delete("/cart/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const deleted = await Cart.destroy({ where: { userId, productId } });

    if (deleted) {
      res.json({ message: "Product removed from cart" });
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ error: "Failed to remove product from cart", details: error.message });
  }
});

//order
app.post("/order", async (req, res) => {
  try {
    const { userId, cartItems, totalAmount } = req.body;

    if (!userId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const newOrder = await Order.create({ userId, totalAmount });

    for (const item of cartItems) {
      await OrderItem.create({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.Product?.price || 0,
      });
    }

    await Cart.destroy({ where: { userId } });

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

//get order
app.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get ordersitem
app.get("/order-items/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderItems = await OrderItem.findAll({ where: { orderId } });
    res.json(orderItems);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await sequelize.sync();
});
