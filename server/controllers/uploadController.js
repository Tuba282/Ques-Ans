
// export const uploadImage = (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ success: false, message: "No file uploaded" });
//   }

//   const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

//   res.status(200).json({
//     success: true,
//     message: "Image uploaded successfully",
//     fileName: req.file.filename,
//     imageUrl,
//   });
//   return imageUrl
// };
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } = process.env;

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
  });

const unique_id = () => {
  return new Date().getTime().toString();
};

export const upload_image_contoller = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const file = req.files.file;
    const file_format = file.name.split(".").pop();
    const file_type = file.mimetype.split("/")[0];

    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${unique_id()}-${file.name.split('.')[0]}`,
      resource_type: "auto",
    });

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: uploadResult.secure_url,
      file_type,
      file_format,
      name: file.name,
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    return res.status(500).json({ success: false, message: "Upload failed", error });
  }
};
