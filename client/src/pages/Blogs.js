import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard.js";
import UpdateBlogForm from "../components/UpdateBlogForm.js";
import DeleteBlogForm from "../components/DeleteBlogForm.js";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/blog/all-blogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Update the blog list after a successful update
  const handleUpdateBlog = () => {
    fetchBlogs(); // Refresh the list of blogs after updating
    setSelectedBlog(null); // Close modal after update
  };

  // Handle blog deletion
  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove deleted blog from the list
    setShowDeleteModal(false); // Close the delete modal after deletion
  };

  // Close modal
  const closeModal = () => {
    setSelectedBlog(null); // Close the modal by resetting selectedBlog
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="col">
              <BlogCard
                blog={blog}
                onDelete={() => {
                  setSelectedBlog(blog); // Set the blog to be deleted
                  setShowDeleteModal(true); // Show the delete confirmation modal
                }}
                setSelectedBlog={setSelectedBlog} // Set the selected blog for editing
              />
            </div>
          ))}
        </div>
      )}

      {/* Render UpdateBlogForm if a blog is selected */}
      {selectedBlog && (
        <UpdateBlogForm
          blogId={selectedBlog._id}
          currentBlogData={selectedBlog}
          onUpdateBlog={handleUpdateBlog}
          onClose={closeModal} // Close the modal
        />
      )}

      {/* Render DeleteBlogForm if delete modal is open */}
      {showDeleteModal && selectedBlog && (
        <DeleteBlogForm
          blog={selectedBlog}
          onDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)} // Close the delete modal
        />
      )}
    </div>
  );
};

export default Blogs;
