import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dlazgwewg",
  api_key: "511367683712392",
  api_secret: "BfIZhT-P7mITDACWrIGYrT-fOvY",
});

export default async function uploadImageToCloudinary(file) {
  try {
    const result = await cloudinary.uploader.upload(file, { resource_type: 'auto' });
    console.log("✅ Cloudinary upload success:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);
    throw new Error("Error subiendo imagen a Cloudinary");
  }
}
