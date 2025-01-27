const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Serve static files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Use routes for blog and user
app.use("/api/v1/blog", blogRoutes); 
app.use("/api/v1/user", userRoutes); 

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
