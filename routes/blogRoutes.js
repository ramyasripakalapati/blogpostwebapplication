const express = require('express');
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require('../controllers/blogController');
const authenticateUser = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.post('/create-blog', authenticateUser, upload.single('image'), createBlog);
router.get('/all-blogs', getAllBlogs); // Verify this function exists
router.put('/update/:id', authenticateUser, upload.single('image'), updateBlog);
router.delete('/delete/:id', authenticateUser, deleteBlog);

module.exports = router;
