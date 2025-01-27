import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!inputs.title || !inputs.description || !file) {
      toast.error("All fields are required.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("image", file);
  
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in. Please log in first.");
        return;
      }
  
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/blog/create-blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("API Response:", data);
  
      if (data.success) {
        toast.success("Blog created successfully!");
        setInputs({ title: "", description: "" });
        setFile(null);
      } else {
        toast.error(data.message || "Failed to create blog.");
      }
    } catch (error) {
      console.error("Error creating blog:", error.response?.data || error.message);
      toast.error("Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={inputs.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            name="description"
            id="description"
            value={inputs.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter blog description"
            rows="5"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            accept="image/*"
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
