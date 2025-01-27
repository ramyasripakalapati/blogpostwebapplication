import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header.js";  // Add .js extension if necessary
import Register from "./pages/Register.js";  // Add .js extension if necessary

// Lazy-loaded components
const Blogs = React.lazy(() => import("./pages/Blogs.js"));  // Add .js extension if necessary
const Login = React.lazy(() => import("./pages/Login.js"));  // Add .js extension if necessary
const Dashboard = React.lazy(() => import("./pages/Dashboard.js"));  // Add .js extension if necessary
const CreateBlog = React.lazy(() => import("./pages/CreateBlog.js"));  // Add .js extension if necessary

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-blogs" element={<Blogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
