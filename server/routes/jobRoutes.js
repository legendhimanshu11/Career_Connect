import express from 'express';
import {
  getJobById,
  getJobs,
  postNewJob // ✅ New job creation controller
} from '../controllers/jobController.js';
import { protectCompany } from '../middleware/authMiddleware.js';
import { incrementJobViews } from '../controllers/jobController.js';

const router = express.Router();

/**
 * @route   GET /api/job/
 * @desc    Fetch all jobs
 * @access  Public
 */
router.get('/', getJobs);

/**
 * @route   GET /api/job/:id
 * @desc    Fetch job by ID
 * @access  Public
 */
router.get('/:id', getJobById);

/**
 * @route   POST /api/job/add
 * @desc    Post new job (used by recruiters)
 * @access  Private (Company)
 */
router.post('/add', protectCompany, postNewJob); // ✅ Secured with middleware

router.post('/increment-views/:jobId',incrementJobViews);

export default router;