
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, Tag, User, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  // const config = {
  //   withCredentials: true,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/blog/getAllBlogs');
        
        
        if (response.data && response.data.published) {
          setBlogs(response.data.published);
        } else {
          setBlogs([]);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
        setLoading(false);
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

 
  const createExcerpt = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, content.lastIndexOf(' ', maxLength)) + '...';
  };

  const handleOnClick=(blogId)=>{
    navigate(`/blog/${blogId}`)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Loader className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-lg text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md w-full">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10">

      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No published blogs found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article 
                key={blog._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <User size={16} className="mr-1" />
                    <span>{blog.author.username}</span>
                    <span className="mx-2">•</span>
                    <Calendar size={16} className="mr-1" />
                    <span>{formatDate(blog.published_at)}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {blog.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {createExcerpt(blog.content)}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      <span>{formatDate(blog.updated_at)}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm "   onClick={()=>handleOnClick(blog._id)}>
                      Read more →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;