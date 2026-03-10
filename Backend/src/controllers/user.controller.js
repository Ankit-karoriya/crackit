import { User } from "../models/user.model.js";
import { Paper } from "../models/paper.model.js";
import { Otp } from "../models/otp.model.js";
import { generateAccessToken } from "../utils/jwt.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

const sendOtp = async (req, res) => {
    try {
        const { email, fullname, password } = req.body;

        if (!email || !fullname || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        await Otp.findOneAndUpdate(
            { email },
            { email, fullname, password, otp },
            { upsert: true, new: true }
        );

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"CrackIt Support" <${process.env.EMAIL}>`,
            to: email,
            subject: "CrackIt Email Verification OTP",
            html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
    
    <div style="max-width:500px; margin:auto; background:white; border-radius:10px; padding:30px; text-align:center; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
      
      <h2 style="color:#1e293b; margin-bottom:10px;">
        CrackIt Email Verification
      </h2>

      <p style="color:#555; font-size:15px;">
        Thank you for signing up on <strong>CrackIt</strong>.
      </p>

      <p style="color:#555; font-size:15px;">
        Please use the following One-Time Password (OTP) to complete your registration:
      </p>

      <div style="font-size:32px; font-weight:bold; letter-spacing:6px; color:#334155; margin:20px 0;">
        ${otp}
      </div>

      <p style="color:#777; font-size:14px;">
        This OTP will expire in <strong>5 minutes</strong>.
      </p>

      <p style="color:#777; font-size:14px;">
        If you did not request this email, you can safely ignore it.
      </p>

      <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:12px; color:#999;">
        © ${new Date().getFullYear()} CrackIt. All rights reserved.
      </p>

    </div>

  </div>
  `
        });

        res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error sending OTP" });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });
        if (!otpRecord) {
            return res.status(400).json({ message: "OTP expired" });
        }

        if (otpRecord.otp != otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const userCreated = await User.create({
            email: otpRecord.email,
            fullname: otpRecord.fullname,
            password: otpRecord.password
        });

        const accessToken = generateAccessToken({
            email: userCreated.email,
            fullname: userCreated.fullname
        });

        await Otp.deleteOne({ email });

        res
            .status(201)
            .cookie("AccessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            })
            .json({
                message: "User registered successfully",
                user: userCreated
            });
    } catch (error) {
        res.status(500).json({ message: "OTP verification failed" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid user credentials" });
        }

        const loginuser = await User.findById(user._id).select("-password");
        const accessToken = generateAccessToken(loginuser);

        return res
            .status(200)
            .cookie("AccessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict' })
            .json({ message: "User loggedin successfully", loginuser });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong in login controller" });
    }
}

const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .clearCookie("AccessToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict' })
            .clearCookie("adminToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict' })
            .json({ message: "User Logout Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in logout controller" });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "please enter password, password is required" });
        }

        if (!(password == process.env.ADMIN_PASSWORD)) {
            return res.status(500).json({ message: "password is incorrect" });
        }

        res.cookie("adminToken", "admin-verified", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: "User become admin" });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}

const checkAdmin = (req, res) => {
    const token = req.cookies.adminToken;

    if (token === "admin-verified") {
        return res.status(200).json({ isAdmin: true });
    }

    return res.status(401).json({ isAdmin: false });
};

const me = async (req, res) => {
    try {
        const user = req.user.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        const foundUser = await User.findOne({ email: user.email });

        const uploadedPapers = foundUser?.uploadedPapers || [];
        const downloads = foundUser?.downloads || [];

        if (uploadedPapers.length === 0) {
            return res.status(200).json({
                user: {
                    fullname: foundUser?.fullname || null,
                    email: foundUser?.email || null,
                    university: foundUser?.university || null,
                    totalUploadedPapers: 0,
                    approvedPapers: 0,
                    rejectedPapers: 0,
                    pendingPapers: 0,
                    totalDownloadedPapers: downloads?.length || 0
                },
                uploadedPapers: uploadedPapers,
                downloadedPapers: downloads
            });
        }

        const uploadedPaperIds = uploadedPapers.map(id => new mongoose.Types.ObjectId(id));

        const statusStats = await Paper.aggregate([
            {
                $match: {
                    _id: { $in: uploadedPaperIds }
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        let approved = 0;
        let rejected = 0;
        let pending = 0;

        statusStats.forEach(stat => {
            if (stat._id === "Approved") approved = stat.count;
            if (stat._id === "Rejected") rejected = stat.count;
            if (stat._id === "Pending") pending = stat.count;
        });

        return res.status(200).json({
            user: {
                fullname: foundUser.fullname,
                email: foundUser.email,
                university: foundUser.university || null,
                totalUploadedPapers: uploadedPapers.length,
                approvedPapers: approved,
                rejectedPapers: rejected,
                pendingPapers: pending,
                totalDownloadedPapers: downloads?.length || 0
            },
            uploadedPapers: uploadedPapers,
            downloadedPapers: downloads
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "error while featching user details"
        });
    }
}

const editProfile = async (req, res) => {
    try {
        const authUser = req.user.user;

        if (!authUser) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        const { fullname, university } = req.body;

        const updateFields = {};
        if (fullname !== undefined) {
            updateFields.fullname = fullname.trim();
        }

        if (university !== undefined) {
            updateFields.university = university.trim();
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(200).json({
                data: {
                    fullname: authUser.fullname,
                    university: authUser.university
                }
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            authUser._id,
            { $set: updateFields },
            { new: true }
        ).select("-password");

        const accessToken = generateAccessToken(updatedUser);

        return res
            .status(200)
            .cookie("AccessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict' })
            .json({
                message: "Profile updated successfully",
                data: {
                    fullname: updatedUser.fullname,
                    university: updatedUser.university
                }
            })

    } catch (error) {
        return res.status(500).json({
            message: "Error while updating profile"
        });
    }
}

const userUploadedPaperDetails = async (req, res) => {
    try {
        const user = req.user.user.email;

        const foundUser = await User.findOne({ email: user });
        const papers = foundUser.uploadedPapers || [];

        if (papers.length === 0) {
            return res.status(200).json({ papers: [] });
        }

        const paperDetails = await Paper.find({ _id: { $in: papers } });

        return res.status(200).json({ papers: paperDetails });
    } catch (error) {
        return res.status(500).json({ message: "Error while fetching uploaded paper details" });
    }
}

const userDownloadedPaperDetails = async (req, res) => {
    try {
        const user = req.user.user.email;
        const foundUser = await User.findOne({ email: user });
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const papers = foundUser.downloads || [];

        if (papers.length === 0) {
            return res.status(200).json({ papers: [] });
        }

        const paperDetails = await Paper.find({ _id: { $in: papers } });

        return res.status(200).json({ papers: paperDetails });
    } catch (error) {
        return res.status(500).json({ message: "Error while fetching downloaded paper details" });
    }
}

export { login, logout, adminLogin, checkAdmin, me, editProfile, userUploadedPaperDetails, userDownloadedPaperDetails, sendOtp, verifyOtp };