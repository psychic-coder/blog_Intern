import React, { useState, useEffect } from "react";
import { Calendar, Clock, Tag, User, ArrowLeft } from "lucide-react";
import axios from "axios";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBlogIdFromUrl = () => {
    const pathParts = window.location.pathname.split("/");
    return pathParts[pathParts.length - 1];
  };

  const blogId = getBlogIdFromUrl();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/blog/getAllBlogs/${blogId}`
        );

        if (response.data) {
          console.log(response.data);
          setBlog(response.data.blog);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch blog. Please try again later.";
        setError(errorMessage);
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    } else {
      setError("Blog ID is missing");
      setLoading(false);
    }
  }, [blogId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const goBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-lg text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md w-full">
          <p className="font-bold">Error</p>
          <p>{error || "Blog not found"}</p>
          <button
            onClick={goBack}
            className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={16} className="mr-1" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
        <button
          onClick={goBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to blogs
        </button>
      </div>

      <main className="max-w-3xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center text-sm text-gray-500">
              <div className="flex items-center mr-6 mb-2">
                <User size={16} className="mr-1" />
                <span>{blog.author?.username || "Unknown Author"}</span>
              </div>

              <div className="flex items-center mr-6 mb-2">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(blog.published_at || blog.created_at)}</span>
              </div>

              <div className="flex items-center mb-2">
                <Clock size={16} className="mr-1" />
                <span>{formatTime(blog.published_at || blog.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {blog.content}
            </div>
          </div>

          <div className="px-6 py-6 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags &&
                blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
            </div>

            <div className="text-sm text-gray-500 italic">
              Last updated on {formatDate(blog.updated_at)} at{" "}
              {formatTime(blog.updated_at)}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Blog;
