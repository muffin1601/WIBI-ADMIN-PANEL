// controllers/upload.controller.js
import cloudinary from "../config/cloudinary.js";

export const uploadFile = async (req, res) => {
  const { file, folder, type } = req.body;

  const result = await cloudinary.uploader.upload(file, {
    folder: `wibi/${folder}`,
    resource_type: type || "image",
  });

  res.json(result.secure_url);
};
