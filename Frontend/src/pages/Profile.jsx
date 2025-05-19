import { useState, useEffect } from 'react';
import { Edit2, Eye, Trash2, FilePen, BookOpen, ArrowDown, ArrowUp, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate=useNavigate();
  const [blogs, setBlogs] = useState({ published: [], draft: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('statusFirst'); // 'statusFirst', 'newest', 'oldest'

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/blog/getAllBlogs');
      setBlogs({
        published: response.data.published || [],
        draft: response.data.draft || []
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToBlogUpdate = (blogId) => {
    window.location.href = `/blogUpdate/${blogId}`;
  };

  const getAllBlogs = () => {
    return [...blogs.published, ...blogs.draft];
  };

  const sortedBlogs = getAllBlogs().sort((a, b) => {
    if (sortOrder === 'statusFirst') {
     
      if (a.status === 'published' && b.status === 'draft') return -1;
      if (a.status === 'draft' && b.status === 'published') return 1;
     
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortOrder === 'newest') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return new Date(a.created_at) - new Date(b.created_at);
    }
  });

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Blog Posts</h1>
          <p className="text-gray-600">Manage all your published and draft blog posts</p>
        </div>
        <button 
          onClick={() => window.location.href = '/create-blog'}
          className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md flex items-center cursor-pointer"
        >
          <FilePen size={18} className="mr-2" />
          Create New Blog
        </button>
      </div>

     
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-4">Sort by:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleSortChange('statusFirst')}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center cursor-pointer ${
                sortOrder === 'statusFirst' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BookOpen size={14} className="mr-1.5" />
              Status (Published first)
            </button>
            <button
              onClick={() => handleSortChange('newest')}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center cursor-pointer ${
                sortOrder === 'newest' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowDown size={14} className="mr-1.5" />
              Newest first
            </button>
            <button
              onClick={() => handleSortChange('oldest')}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center cursor-pointer ${
                sortOrder === 'oldest' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowUp size={14} className="mr-1.5" />
              Oldest first
            </button>
          </div>
        </div>
      </div>

   
      {loading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading your blogs...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle size={20} className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Blog List */}
      {!loading && !error && sortedBlogs.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">You haven't created any blogs yet.</p>
          <button
            onClick={() => window.location.href = '/create-blog'}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Create Your First Blog
          </button>
        </div>
      )}

      {!loading && sortedBlogs.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {sortedBlogs.map((blog) => (
            <div 
              key={blog._id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center border-b border-gray-100">
                <div className="p-4 md:p-6 flex-grow">
                  <div className="flex items-center mb-2">
                    <span 
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-gray-500 ml-3">
                      {formatDate(blog.created_at)}
                    </span>
                    {blog.status === 'published' && (
                      <span className="text-xs text-gray-500 ml-3">
                        Published: {formatDate(blog.published_at)}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
                  <p className="text-gray-600 line-clamp-2 mb-3">
                    {blog.content.substring(0, 180)}
                    {blog.content.length > 180 ? '...' : ''}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags && blog.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex md:flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 p-4">
                  <button
                    onClick={() => navigateToBlogUpdate(blog._id)}
                    className="flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded cursor-pointer"
                  >
                    <Edit2 size={16} className="mr-1.5" />
                    Update
                  </button>
                  
                  <div className="flex space-x-2 mt-2">
                    <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded cursor-pointer">
                      <Eye size={16} onClick={()=>navigate(`/blog/${blog._id}`)} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}