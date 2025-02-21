require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db"); // Import the MongoDB connection
const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Library Management System Backend is Running!");
});

// API Routes
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
