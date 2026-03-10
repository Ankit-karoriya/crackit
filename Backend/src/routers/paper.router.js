import express from 'express';
import { upload } from '../utils/multer.js';
import { approvePaper, downloadPaper, filterPapers, getAllUniversitiesSubjectsDownloads, mostDownloadedPApers, rejectPaper, uploadPaper, viewApprovedPapers, viewPendingPapers, viewRejectedPapers, deletePaper } from '../controllers/paper.controller.js';
import verifyJWT from '../utils/jwtVerify.js';

const router = express.Router();
router.post("/upload", verifyJWT, upload.single("paperfile"), uploadPaper);
router.get("/pending-papers", verifyJWT, viewPendingPapers);
router.get("/approved-papers", verifyJWT, viewApprovedPapers);
router.get("/rejected-papers", verifyJWT, viewRejectedPapers);
router.get("/most-downloaded-papers", verifyJWT, mostDownloadedPApers);
router.post("/download/:paperId", verifyJWT, downloadPaper);
router.post("/filter-papers", verifyJWT, filterPapers);
router.get("/papers-data", verifyJWT, getAllUniversitiesSubjectsDownloads);
router.post("/approve-paper/:paperId", verifyJWT, approvePaper);
router.post("/reject-paper/:paperId", verifyJWT, rejectPaper);
router.delete("/delete-paper/:paperId", verifyJWT, deletePaper);

export default router;