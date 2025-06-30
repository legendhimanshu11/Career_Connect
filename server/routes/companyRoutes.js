import express from 'express';
import {
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  ChangeJobApplicationsStatus,
  changeVisiblity,
  deleteJob,
  updateApplicationStatus,
} from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/company/register
 * @desc    Register a new company
 * @access  Public
 */
router.post('/register', upload.single('image'), registerCompany);

/**
 * @route   POST /api/company/login
 * @desc    Login a company
 * @access  Public
 */
router.post('/login', loginCompany);

/**
 * @route   GET /api/company/company
 * @desc    Get company profile
 * @access  Private (Company)
 */
router.get('/company', protectCompany, getCompanyData);

/**
 * @route   POST /api/company/post-job
 * @desc    Post a new job
 * @access  Private (Company)
 */
router.post('/post-job', protectCompany, postJob);

/**
 * @route   GET /api/company/applicants
 * @desc    Get job applicants for all jobs of this company
 * @access  Private (Company)
 */
router.get('/applicants', protectCompany, getCompanyJobApplicants);

/**
 * @route   GET /api/company/list-jobs
 * @desc    Get all jobs posted by the logged-in company
 * @access  Private (Company)
 */
router.get('/list-jobs', protectCompany, getCompanyPostedJobs);

/**
 * @route   POST /api/company/change-status
 * @desc    Change status of job applications (e.g., Accepted/Rejected)
 * @access  Private (Company)
 */
router.post('/change-status', protectCompany, ChangeJobApplicationsStatus);

/**
 * @route   POST /api/company/change-visiblity
 * @desc    Change job visibility (e.g., show/hide from public)
 * @access  Private (Company)
 */
router.post('/change-visiblity', protectCompany, changeVisiblity);

// ✅ DELETE Job Route
router.delete('/delete-job/:id', protectCompany, deleteJob);

router.put('/update-status/id:',protectCompany,updateApplicationStatus);

export default router;