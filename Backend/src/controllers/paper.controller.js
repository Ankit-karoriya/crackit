import uploadOnCloudinary from "../utils/cloudinary.js";
import { Paper } from "../models/paper.model.js";
import { User } from "../models/user.model.js";

const uploadPaper = async (req, res) => {
    try {
        const {papertitle, subject, university, examyear, examtype, professor, subjectcode, tags} = req.body;

        if (!papertitle || !subject || !university || !examyear || !examtype) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        if(!req.file){
            return res.status(400).json({message: "No file uploaded"});
        }
        
        const paperLocalPath = req.file?.path;

        if(!paperLocalPath){
            return res.status(400).json({message: "Question paper file is required"});
        }

        const uploadedPaper = await uploadOnCloudinary(paperLocalPath);

        if(!uploadedPaper){
            return res.status(400).json({message: "Question paper file is not uploaded"});
        }

        let tagArray = [];
        if(tags){
            tagArray = tags?.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
        }

        const user = await User.findById(req.user.user._id);

        const paperDetails = await Paper.create({
            papertitle,
            subject,
            university,
            examyear: Number(examyear),
            examtype,
            professor,
            subjectcode,
            tags: tagArray,
            status: "Pending",
            uploader: user,
            paperfile: uploadedPaper.secure_url
        })

        res.status(200).json({message: "Question paper is uploaded successfully", data: paperDetails})
        
    } catch (error) {
        res.status(500).json({message: "something went wrong while uploading the question paper"})
    }
}

export {uploadPaper};