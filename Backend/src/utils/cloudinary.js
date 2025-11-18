import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

//config colodinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// upload on cloudinary from local folder
const uploadOnCloudinary = async (localFilePath) => {

    // if local file not exist
    if (!localFilePath) return null;

    try {
        // upload on cloud
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "raw" })


        //if file exists in local folder then delete from local folder
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return response;
    } catch (error) {
        // console.log(error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export default uploadOnCloudinary;