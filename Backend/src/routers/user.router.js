import express from 'express';
import { adminLogin, checkAdmin, login, logout, me, editProfile, userUploadedPaperDetails, userDownloadedPaperDetails, sendOtp, verifyOtp } from '../controllers/user.controller.js';
import verifyJWT from '../utils/jwtVerify.js';

const router = express.Router();

// router.route('/register').post(register);
router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);
router.route('/login').post(login);
router.route('/logout').post(logout);

router.get('/check-auth', verifyJWT, (req, res) => {
    res.status(200).json({ loggedIn: true, user: { email: req.user.user.email, fullname: req.user.user.fullname } });
})

router.post("/admin-login", adminLogin);
router.get("/check-admin", checkAdmin);
router.get("/me", verifyJWT, me);
router.put("/edit-profile", verifyJWT, editProfile);
router.get("/uploaded-papers", verifyJWT, userUploadedPaperDetails);
router.get("/downloaded-papers", verifyJWT, userDownloadedPaperDetails);

export default router;