import express from 'express';
import { upload } from '../utils/multer.js';
import { uploadPaper } from '../controllers/paper.controller.js';
import verifyJWT from '../utils/jwtVerify.js';

const router = express.Router();
router.post("/upload", verifyJWT, upload.single("paperfile"), uploadPaper);

export default router;