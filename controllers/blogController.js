const Blog = require('../models/blogModel');
const fs = require('fs');
const path = require('path');

exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Ensure `req.user` contains the required `id`
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "User authentication failed" });
    }

    const newBlog = new Blog({
      title,
      description,
      image: req.file.filename,
      user: req.user.id, // Use the authenticated user's ID
    });

    await newBlog.save();
    res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Error in createBlog:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Error creating blog", error: error.message });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('user', 'username').exec();
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching blogs" });
  }
};


// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, image: req.file?.filename },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating blog" });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Delete image file
    fs.unlink(path.join(__dirname, '../uploads', blog.image), (err) => {
      if (err) console.error("Error deleting image file:", err);
    });

    await blog.deleteOne();
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting blog" });
  }
};
