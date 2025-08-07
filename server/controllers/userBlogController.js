
import Blog from "../models/Blog.js";
import User from "../models/User.js";

// new blog create
export const createBlog = async (req, res) => {
  try {
    console.log("Token user: ", req.user); // agar middleware user attach kar raha hai
    console.log("Blog body: ", req.body);

    const { title, content, author, category, tags, image } = req.body;

    // Check if user exists
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const blog = new Blog({
      title,
      content,
      tags,
      category,
      author,
      image,
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Blog creation error =>", error); // ye line se exact problem pata chalegi
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// get my blogs
export const getMyBlogs = async (req, res) => {

  try {

    const userId = req.user._id; // Assuming req.user is set by middlewareToProtect
    const blogs = await Blog.find({ author: userId }).populate('author', 'name email');

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ success: false, message: "No blogs found for this user" });
    }

    res.status(200).json({
      success: true,
      message: "Blogs retrieved successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });

  }
}

// get current user blog
export const getSingleBlog = async (req, res) => {

  const _id = req.params.id;


  try {

    const findBlog = await Blog.findById({ _id })

    if (!findBlog) {
      return res.status(404).json({ success: false, message: "No blog found for this id" });
    }

    res.status(200).json({
      success: true,
      message: "Blog found successfully",
      findBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });

  }
}

// update current user blog
export const updateMyBlog = async (req, res) => {
  const _id = req.params.id;
  const { title, content, category, tags } = req.body;
  try {
    const updateBlog = await Blog.findByIdAndUpdate({ _id }, {
      $set: {
        title,
        content,
        category,
        tags
      }
    })

    if (!updateBlog) {
      return res.status(404).json({ success: false, message: "No such Blog Found to update" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });

  }

}

// delete current user blog
export const deleteMyBlog = async (req, res) => {
  
  try {

     const _id = req.params.id;
    
    const findBlog = await Blog.findByIdAndDelete({_id})

    if (!findBlog) {
      return res.status(404).json({ success: false, message: "No blog found" });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      findBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });

  }
}

