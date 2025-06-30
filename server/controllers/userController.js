import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';

// ✅ 1. Register New User
export const registerUser = async (req, res) => {
  try {
    const {
      name, email, password, phone, workStatus,
      qualification, specialization, college, city, skills
    } = req.body;

    if (!name || !email || !password || !phone || !workStatus) {
      return res.status(400).json({ success: false, message: "Required fields missing." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists." });
    }

    let imageUrl = null;
    let resumeUrl = null;

    if (req.files?.image?.[0]) {
      const uploadRes = await cloudinary.uploader.upload(req.files.image[0].path, {
        resource_type: 'image',
        folder: 'user_images'
      });
      imageUrl = uploadRes.secure_url;
    }

    if (req.files?.resume?.[0]) {
      const uploadRes = await cloudinary.uploader.upload(req.files.resume[0].path, {
        resource_type: 'auto',
        folder: 'user_resumes'
      });
      resumeUrl = uploadRes.secure_url;
    }

    const newUser = new User({
      name,
      email,
      password,
      phone,
      workStatus,
      qualification,
      specialization,
      college,
      city,
      skills: JSON.parse(skills || '[]'),
      resume: resumeUrl,
      image: imageUrl
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 2. Get Authenticated User Data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 3. Apply For Job (Authenticated)
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });
    if (isAlreadyApplied) {
      return res.status(400).json({ success: false, message: 'Already applied to this job.' });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now()
    });

    res.json({ success: true, message: 'Applied successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 4. Get All Jobs a User Has Applied To
export const getUserJobApplications = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const applications = await JobApplication.find({ userId })
      .populate('companyId', 'name email image')
      .populate('jobId', 'title description location category level salary');

    if (!applications || applications.length === 0) {
      return res.status(404).json({ success: false, message: 'No applications found.' });
    }

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 5. Update Resume (Authenticated User)
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ success: false, message: 'No resume file uploaded.' });
    }

    const uploadResult = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "auto"
    });

    const user = await User.findById(userId);
    user.resume = uploadResult.secure_url;
    await user.save();

    res.json({ success: true, message: 'Resume updated successfully.', resume: uploadResult.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 6. Public Application Submission (Unauthenticated Users)
export const submitApplication = async (req, res) => {
  try {
    const { name, email, phone, address, jobId } = req.body;
    const resumeFile = req.file;

    if (!name || !email || !phone || !address || !jobId || !resumeFile) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const uploadResult = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "auto"
    });

    const newApp = await JobApplication.create({
      name,
      email,
      phone,
      address,
      jobId,
      resume: uploadResult.secure_url,
      date: Date.now()
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully.',
      application: newApp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};