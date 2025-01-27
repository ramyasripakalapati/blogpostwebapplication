import React, { useState } from "react";

const BlogCard = ({ blog, onDelete, setSelectedBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = () => {
    setSelectedBlog(blog); // Set selected blog for update
  };

  const handleDelete = () => {
    onDelete(blog); // Call the onDelete function passed down from the parent
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  const words = blog.description.split(" ");
  const truncatedDescription = words.slice(0, 10).join(" "); // Get first 10 words
  const fullDescription = blog.description; // Full description

  const showReadMore = words.length > 10; // Only show "Read more" if there are more than 10 words

  return (
    <div className="card d-flex flex-column">
      <img
        src={`http://localhost:8080/uploads/${blog.image}`}
        className="card-img-top img-fluid" // Make image responsive
        alt={blog.title}
        style={{ objectFit: "cover", height: "200px" }} // Adjust image size
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">
          {isExpanded ? fullDescription : `${truncatedDescription}...`}{" "}
          {showReadMore && (
            <button className="btn btn-link p-0" onClick={toggleDescription}>
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>
        <div className="mt-auto"> {/* Ensures buttons stay at the bottom of the card */}
          <button
            className="btn btn-primary me-2"
            onClick={handleEdit} // Only trigger edit on clicking Edit
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete} // Only trigger delete on clicking Delete
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
