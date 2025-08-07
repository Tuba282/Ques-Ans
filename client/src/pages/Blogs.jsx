import { FaSearch, FaFolder, FaClock, FaTag } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { User, MessageCircle, Tag, Plus, X, Calendar, } from 'lucide-react';
import { apiBlogHandle } from '../config/apiBlogHandle.js';
import apiUploadHandle  from '../config/apiUploadHandle.js';
import { getToken, getUser } from '../utils/auth.js';
import toast, { Toaster } from 'react-hot-toast';


const Blogs = () => {

  const currentUser = getUser();
  const [blogs, setBlogs] = useState([
  ]);

  useEffect(() => {
    fetchBlogs()
  }, [])
  
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiBlogHandle.get('/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data.blogs);
      console.log("Blogs fetched successfully:", response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error?.response?.data || error.message);
      toast.error("Failed to fetch blogs");
    }
  };




  const [showAddBlog, setShowAddBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Get unique categories
  const categories = [...new Set(blogs.map(blog => blog.category))];

  // Get all unique tags
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  // Get category counts
  const getCategoryCount = (category) => {
    return blogs.filter(blog => blog.category === category).length;
  };

  // Get tag counts
  const getTagCount = (tag) => {
    return blogs.filter(blog => blog.tags.includes(tag)).length;
  };

  // Get recent posts (latest 3)
  const recentPosts = blogs.slice(0, 3);

  // Get archives (unique months/years)
  const archives = [...new Set(blogs.map(blog => {
    const date = new Date(blog.date);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  }))];

  // Filter blogs based on search, category, and tag
  useEffect(() => {
    let filtered = blogs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(blog => blog.tags.includes(selectedTag));
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory, selectedTag]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
  };


  const handleReadMore = (blog) => {
    // Views count increase karta hai
    const updatedBlogs = blogs.map(b =>
      b.id === blog.id ? { ...b, views: b.views + 1 } : b
    );
    setBlogs(updatedBlogs);
    // Selected blog set karta hai
    setSelectedBlog(blog);
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
    setIsEditing(false);
  };

  const handleEditBlog = () => {
    setIsEditing(true);
  };

  const handleSaveBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map(blog =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(updatedBlogs);
    setSelectedBlog(updatedBlog);
    setIsEditing(false);
  };

  const canEditBlog = (blog) => {
    return currentUser && currentUser.id === blog.authorId;
  };

  const getAuthorName = async (authorId) => {
    const findAuthor = await apiBlogHandle.get(`/getAnyUser/${authorId}`);
    console.log("findAuthor", findAuthor);
    return findAuthor.data.author.name;
  }
  if (selectedBlog) {
    return 
      // <BlogDetailView
      //   blog={selectedBlog}
      //   currentUser={currentUser}
      //   canEdit={canEditBlog(selectedBlog)}
      //   isEditing={isEditing}
      //   onBack={handleBackToList}
      //   onEdit={handleEditBlog}
      //   onSave={handleSaveBlog}
      //   onCancelEdit={() => setIsEditing(false)}
      // />
    
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights, tips, and stories that inspire and inform
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded shadow-md p-6 sticky top-4">
              {/* Search */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaSearch className="mr-2 text-indigo-600" />
                  Search
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <FaSearch className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaFolder className="mr-2 text-indigo-600" />
                  Categories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === ''
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      All ({blogs.length})
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {category} ({getCategoryCount(category)})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaClock className="mr-2 text-indigo-600" />
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id + " "} className="flex space-x-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Archives */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="mr-2 text-indigo-600" />
                  Archives
                </h3>
                <ul className="space-y-2">
                  {archives.map((archive) => (
                    <li key={archive}>
                      <button className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                        {archive}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaTag className="mr-2 text-indigo-600" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${selectedTag === tag
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {tag} ({getTagCount(tag)})
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory || selectedTag) && (
                <button
                  onClick={clearAllFilters}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Add Blog Button */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-gray-600">
                  Showing {filteredBlogs.length} of {blogs.length} posts
                  {(searchTerm || selectedCategory || selectedTag) && (
                    <span className="ml-2 text-sm">
                      {searchTerm && `• Search: "${searchTerm}"`}
                      {selectedCategory && `• Category: ${selectedCategory}`}
                      {selectedTag && `• Tag: ${selectedTag}`}
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setShowAddBlog(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <Plus className="mr-2" />
                Add New Blog
              </button>
            </div>

            {/* Blog Grid */}
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No blogs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Blog Image */}
                    <div className="relative">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-md text-sm">
                          {blog.createdAt}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-indigo-600 text-white px-2 py-1 rounded-md text-xs">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      {/* Meta Information */}
                      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                        <div className="flex items-center">
                          <User className="mr-1 w-3 h-3" />
                          <span>by {}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="mr-1 w-3 h-3" />
                          <span>{blog.comments} Comments</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedTag(tag)}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
                          >
                            <Tag className="mr-1 text-xs w-3 h-3" />
                            {tag}
                          </button>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.content}
                      </p>

                      {/* Read More Button */}
                      <button
                        onClick={() => handleReadMore(blog)}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-200"
                      >
                        READ MORE
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Show Add Blog Modal */}
        {showAddBlog && (
          <AddBlog
            onClose={() => setShowAddBlog(false)}
            onAddBlog={(newBlog) => {
              setBlogs([...blogs, { ...newBlog, id: blogs.length + 1 }]);
              setShowAddBlog(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

// AddBlog Component
const AddBlog = ({ onClose, onAddBlog }) => {
  const token = getToken();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    category: '',
    image: '',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });

  const categories = ['Lifestyle', 'Plants', 'Fashion', 'Technology', 'Health', 'Travel'];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData(prev => ({
        ...prev,
        image: files[0] // store file object
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.excerpt || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const token = getToken();
    let imageUrl = '';
    // 1. getUser
    const user = getUser();
    console.log("user", user);

    // 2. Upload Image (if selected)
    if (formData.image && formData.image instanceof File) {
      try {
        const imageForm = new FormData();
        imageForm.append('file', formData.image); // key should match backend

        // Use correct endpoint for upload
        const uploadRes = await apiUploadHandle.post('/', imageForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = uploadRes?.data?.url || uploadRes?.data?.imageUrl;
        console.log('Image uploaded, got imageUrl:', imageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
        toast.error('Image upload failed');
        return;
      }
    }

    // 3. Submit Blog Data (as JSON)
    const newBlog = {
      title: formData.title,
      content: formData.excerpt,
      author: user.id,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      image: imageUrl || "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
    };
    console.log('Submitting blog:', newBlog, token);

    try {
      const res = await apiBlogHandle.post('/create', newBlog, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Blog created successfully', res.data);
      toast.success('Blog created successfully');
      onAddBlog(res.data.blog);
    } catch (err) {
      console.error('Blog creation failed', err);
      toast.error('Blog creation failed');
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="bg-white rounded max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Blog Post</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter blog title..."
              />
            </div>

            {/* Author field removed: author is set from logged-in user */}

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., lifestyle, plants, sustainability"
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (optional)
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Excerpt (description)*
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                rows={4}
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write a brief description of your blog post..."
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Add Blog Post
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blogs;