
import cloudinary from '../utils/cloudinary.js';
import User from '../models/User.js';



// get User Data
export const getUserData = async (req, res) => {
  try {
    const data = await User.find({})
    res.status(200).json({ success: true,message:"fetched all user data", data })
  } catch (error) {
    res.status(400).json({ success: false,message:"failed to fetched all user data", error })
  }
}

// Add User Data
export const addUserData = async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.status(201).json({ success: true, data: newUser })
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}
// Delete User Data
export const delete_UserData = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


// Update User Data

export const update_UserData = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, linkedin, portfolio, instagram, github, bio } = req.body;
  try {
    let updateFields = {
      name,
      email,
      phone,
      linkedin,
      portfolio,
      instagram,
      github,
      bio
    };

    // If image is provided, upload to Cloudinary
    if (req.file) {
      // Find user to get old image public_id if exists
      const user = await User.findById(id);
      // Upload new image
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'user-profiles',
          resource_type: 'image',
        },
        async (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ message: 'Image upload failed', error });
          }

          // If user had an old image, destroy it
          if (user && user.public_id) {
            try {
              await cloudinary.uploader.destroy(user.public_id);
            } catch (err) {
              console.warn('Cloudinary destroy warning:', err.message);
            }
          }

          updateFields.avatar = result.secure_url;
          updateFields.public_id = result.public_id;

          const updatedUser = await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
          return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
          });
        }
      );
      uploadStream.end(req.file.buffer);
    } else {
      // No image, just update fields
      const updatedUser = await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user: updatedUser
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

