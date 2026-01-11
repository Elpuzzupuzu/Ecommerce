import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dlazgwewg",
  api_key: "511367683712392",
  api_secret: "BfIZhT-P7mITDACWrIGYrT-fOvY"
});

export default async function uploadImageToCloudinary(file) {
  const result = await cloudinary.uploader.upload(file, { resource_type: 'auto' });
  return result.secure_url;
}
