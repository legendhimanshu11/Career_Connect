import express from 'express';
import upload from '../middleware/upload.js';
import {
  registerUser,
  getUserData,
  applyForJob,
  getUserJobApplications,
  updateUserResume,
  submitApplication
} from '../controllers/userController.js';
import { protectUser } from '../middleware/authMiddleware.js';
import resumeUpload from '../middleware/resumeUpload.js';

const router = express.Router();

// 👇 Upload both image & resume
router.post(
  '/register',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]),
  registerUser
);

router.get('/user', protectUser, getUserData);
router.post('/apply', protectUser, applyForJob);
router.get('/applications', protectUser, getUserJobApplications);
router.post('/update-resume', protectUser, resumeUpload.single('resume'), updateUserResume);
router.post('/manual-apply', resumeUpload.single('resume'), submitApplication);

export default router;