// frontend/src/components/DeleteBlogForm.js
import React from "react";
import axios from "axios";

const DeleteBlogForm = ({ blog, onDelete, onClose }) => {
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // API call to delete the blog
      await axios.delete(
        `http://localhost:8080/api/v1/blog/delete/${blog._id}`,
        config
      );

      // Trigger the parent state update and close the modal
      onDelete(blog._id);
      onClose();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose} // Trigger the close function
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete the blog titled "{blog.title}"?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleConfirmDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogForm;
