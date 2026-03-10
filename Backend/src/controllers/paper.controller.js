import uploadOnCloudinary from "../utils/cloudinary.js";
import { Paper } from "../models/paper.model.js";
import { User } from "../models/user.model.js";

const uploadPaper = async (req, res) => {
    try {
        const { papertitle, subject, university, examyear, examtype, professor, subjectcode, tags } = req.body;

        if (!papertitle || !subject || !university || !examyear || !examtype) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const paperLocalPath = req.file?.path;

        if (!paperLocalPath) {
            return res.status(400).json({ message: "Question paper file is required" });
        }

        const uploadedPaper = await uploadOnCloudinary(paperLocalPath);

        if (!uploadedPaper) {
            return res.status(400).json({ message: "Question paper file is not uploaded" });
        }

        let tagArray = [];
        if (tags) {
            tagArray = tags?.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
        }

        const user = await User.findOne({ email: req.user.user.email });

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
            uploader: user._id,
            paperfile: uploadedPaper.secure_url
        })

        await User.findByIdAndUpdate(user._id,
            { $push: { uploadedPapers: paperDetails._id } },
            { new: true }
        )

        res.status(200).json({ message: "Question paper is uploaded successfully", data: paperDetails })

    } catch (error) {
        res.status(500).json({ message: "something went wrong while uploading the question paper" })
    }
}

const viewPendingPapers = async (req, res) => {
    try {
        const papers = await Paper.find({ status: "Pending" }).populate("uploader", "email fullname");

        return res.status(200).json({ message: "All Pending Papers featched successfully", data: papers });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while featching Pending Papers" });
    }
}

const viewApprovedPapers = async (req, res) => {
    try {
        const papers = await Paper.find({ status: "Approved" });

        return res.status(200).json({ message: "All Approved Papers featched successfully", data: papers });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while featching Approved Papers" });
    }
}

const viewRejectedPapers = async (req, res) => {
    try {
        const papers = await Paper.find({ status: "Rejected" });

        return res.status(200).json({ message: "All Rejected Papers featched successfully", data: papers });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while featching Rejected Papers" });
    }
}

const downloadPaper = async (req, res) => {
    try {
        const paperId = req.params.paperId;
        const userId = req.user.user._id;

        if (!userId) {
            res.status(400).json({ message: "unauthorized access" });
        }

        const user = await User.findById(userId);

        const alreadyDownloaded = user.downloads.includes(paperId);

        let paper;
        if (!alreadyDownloaded) {
            paper = await Paper.findByIdAndUpdate(
                paperId,
                { $inc: { downloads: 1 } },
                { new: true }
            )
        }

        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { downloads: paperId } },
            { new: true }
        );

        return res.status(200).json({
            message: alreadyDownloaded
                ? "User has already downloaded this paper before."
                : "Download count increased.", firstTimeDownload: !alreadyDownloaded, paper
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong while downloading the paper" });
    }
}

const mostDownloadedPApers = async (req, res) => {
    try {
        const papers = await Paper.find({ status: "Approved" }).sort({ downloads: -1 }).limit(5);

        if (!papers) {
            res.stats(500).json({ message: "papers didn't featched" })
        }

        return res.status(200).json({ message: "Papers featched successfully", data: papers });
    } catch (error) {
        return res.stats(500).json({ message: "something went wrong while featching papers" });
    }
}

const getAllUniversitiesSubjectsDownloads = async (req, res) => {
    try {
        const response = await Paper.aggregate([
            {
                $match: { status: "Approved" }
            },
            {
                $group: {
                    _id: null,
                    universities: { $addToSet: "$university" },
                    subjects: { $addToSet: "$subject" },
                    downloads: { $sum: "$downloads" }
                }
            }
        ]);

        res.status(200).json({
            message: "universities, subjects, downloads fetched successfully",
            data: response[0] || {
                universities: [],
                subjects: [],
                downloads: 0
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while fetching the data"
        });
    }
};

const filterPapers = async (req, res) => {
    try {
        const { university, examType, examYear, subject } = req.body;

        if (!university?.trim() || !examType?.trim() || !subject?.trim() || !examYear) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const papers = await Paper.find({
            university,
            examyear: Number(examYear),
            examtype: examType,
            subject,
            status: "Approved"
        })

        if (papers.length === 0) {
            return res.status(200).json({ message: "No papers with the same fields found", data: papers });
        }

        return res.status(200).json({ message: "Filtered papers featched successfully", data: papers });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while fetching the filtered papers" });
    }
}

const approvePaper = async (req, res) => {
    try {
        const paperId = req.params?.paperId;
        if (!paperId) {
            res.status(400).json({ message: "Please selecte a paper to approve it" });
        }

        const paper = await Paper.findByIdAndUpdate(paperId, { status: "Approved" });

        if (!paper) {
            res.status(404).json({ message: "Paper not found" });
        }

        return res.status(200).json({ message: "Paper Approved Successfully" });
    } catch (error) {
        console.log(error);
    }
}

const rejectPaper = async (req, res) => {
    try {
        const paperId = req.params?.paperId;
        if (!paperId) {
            res.status(400).json({ message: "Please selecte a paper to reject it" });
        }

        const paper = await Paper.findByIdAndUpdate(paperId, { status: "Rejected" });

        if (!paper) {
            res.status(404).json({ message: "Paper not found" });
        }

        return res.status(200).json({ message: "Paper Rejected Successfully" });
    } catch (error) {
        console.log(error);
    }
}

const deletePaper = async (req, res) => {
    try {
        const paperId = req.params?.paperId;
        if (!paperId) {
            return res.status(400).json({ message: "Please selecte a paper to delete it" });
        }

        const paper = await Paper.findByIdAndDelete(paperId);

        if (!paper) {
            return res.status(404).json({ message: "Paper not found" });
        }

        await User.findByIdAndUpdate(paper.uploader, { $pull: { uploadedPapers: paperId } });

        return res.status(200).json({ message: "Paper Deleted Successfully" });
    } catch (error) {
        console.log(error);
    }
}

export { uploadPaper, viewPendingPapers, viewApprovedPapers, viewRejectedPapers, mostDownloadedPApers, downloadPaper, filterPapers, getAllUniversitiesSubjectsDownloads, approvePaper, rejectPaper, deletePaper };