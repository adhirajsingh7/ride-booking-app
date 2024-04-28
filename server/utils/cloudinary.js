const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_on_cloudinary = async (local_file_path) => {
  try {
    if (!local_file_path) return null;
    const response = await cloudinary.uploader.upload(local_file_path, {
      resource_type: "auto",
    });
    console.log("File uploaded on cloudinary", response);
    //https://res.cloudinary.com/dsvl6xwog/image/upload/v1709411588/mqhxc4vmhxvmrom2crmc.jpg
    fs.unlinkSync(local_file_path);
    return response;
  } catch (error) {
    fs.unlinkSync(local_file_path);
    return null;
  }
};

const delete_on_cloudinary = async (file_public_id) => {
  try {
    if (!file_public_id) return null;
    const response = await cloudinary.uploader.destroy(file_public_id);
    return response;
  } catch (error) {
    return null;
  }
};

module.exports = {
  upload_on_cloudinary,
  delete_on_cloudinary,
};
