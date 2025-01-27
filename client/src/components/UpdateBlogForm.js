import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBlogForm = ({ blogId, currentBlogData, onUpdateBlog, onClose }) => {
  const [formData, setFormData] = useState({
    title: currentBlogData.title,
    description: currentBlogData.description,
    image: null, // To hold the selected image file
  });

  useEffect(() => {
    // Reset form data if currentBlogData changes
    setFormData({
      title: currentBlogData.title,
      description: currentBlogData.description,
      image: null, // Reset the image input
    });
  }, [currentBlogData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Store the image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Create a new FormData object to append the data
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image); // Append the image file if it is selected
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the server knows this is a file upload
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:8080/api/v1/blog/update/${blogId}`,
        data,
        config
      );

      if (response.data.success) {
        console.log("Blog updated successfully");
        onUpdateBlog(); // Trigger blog list refresh
      } else {
        console.error("Failed to update blog:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Blog</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose} // Close modal using parent's method
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {formData.image && (
                  <div className="mt-2">
                    <p>Selected file: {formData.image.name}</p>
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Update Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogForm;
