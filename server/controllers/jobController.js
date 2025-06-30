import Job from '../models/Job.js';
import { v4 as uuidv4 } from 'uuid';

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single job by MongoDB _id
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Post a new job (Recruiter posts a job)
export const postNewJob = async (req, res) => {
  try {
    const {
      title,
      company,
      logo,
      location,
      type,
      category,
      tags,
      description,
    } = req.body;

    // Generate unique frontend-friendly ID
    const job = new Job({
      id: uuidv4(),
      title,
      company,
      logo,
      location,
      type,
      category,
      tags,
      description,
      createdAt: Date.now(),
    });

    await job.save();

    res.status(201).json({ success: true, message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Increment job views
export const incrementJobViews = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({ id: jobId }); // NOTE: using 'id' not '_id'

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    job.views += 1;
    await job.save();

    res.json({ success: true, views: job.views });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};