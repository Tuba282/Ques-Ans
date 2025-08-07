import Blog from "../models/Blog.js";
import User from "../models/User.js";



export const getBlogs = async (req, res) => {
    
    try {
        const blogs = await Blog.find()
        res.status(200).json({
            success: true,
            message: "All blogs retrieved successfully",
            blogs,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const getBlogByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const blogs = await Blog.find({ author: userId }).populate('author', 'name email');
        res.status(200).json({
            success: true,
            message: "User's blogs retrieved successfully",
            blogs,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch user blogs", error: error.message });
    }
};


export const updateAnyBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update blog", error: error.message });
    }
};


export const deleteAnyBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete blog", error: error.message });
    }
};



// Merged controller: get all blog stats and per-user blog counts
export const getAllBlogStats = async (req, res) => {
    try {
        // General stats
        const totalBlogs = await Blog.countDocuments();
        const totalUsers = await User.countDocuments();
        const verifiedUsers = await User.countDocuments({ isVerified: true });
        const blogsByCategory = await Blog.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        // Per-user blog counts
        const blogCounts = await Blog.aggregate([
            {
                $group: {
                    _id: "$author",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 0,
                    userId: "$user._id",
                    name: "$user.name",
                    email: "$user.email",
                    blogCount: "$count"
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "All blog stats and per-user blog counts fetched successfully",
            stats: {
                totalBlogs,
                totalUsers,
                verifiedUsers,
                blogsByCategory,
                blogCountsPerUser: blogCounts
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to get all blog stats", error: error.message });
    }
};
