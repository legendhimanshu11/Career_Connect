import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import { v4 as uuidv4 } from "uuid";
// Register a new company
export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "Missing Details" })
    }

    try {

        const companyExists = await Company.findOne({ email })

        if (companyExists) {
            return res.json({ success: false, message: 'Company already registered' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Login Company
// Login or Google Sign-in for Company
export const loginCompany = async (req, res) => {
  const { email, password, name, image } = req.body;

  try {
    const existingCompany = await Company.findOne({ email });

    // Google Sign-in (no password)
    if (!password && name && image) {
      if (existingCompany) {
        // Already registered → log in
        return res.json({
          success: true,
          company: {
            _id: existingCompany._id,
            name: existingCompany.name,
            email: existingCompany.email,
            image: existingCompany.image,
          },
          token: generateToken(existingCompany._id),
        });
      } else {
        // Auto-register new company from Google
        const dummyPassword = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(dummyPassword, salt);

        const newCompany = await Company.create({
          name,
          email,
          password: hashPassword,
          image,
        });

        return res.json({
          success: true,
          company: {
            _id: newCompany._id,
            name: newCompany.name,
            email: newCompany.email,
            image: newCompany.image,
          },
          token: generateToken(newCompany._id),
        });
      }
    }

    // Normal email/password login
    if (!existingCompany) {
      return res.json({ success: false, message: "Company not found" });
    }

    const passwordMatch = await bcrypt.compare(password, existingCompany.password);
    if (!passwordMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    res.json({
      success: true,
      company: {
        _id: existingCompany._id,
        name: existingCompany.name,
        email: existingCompany.email,
        image: existingCompany.image,
      },
      token: generateToken(existingCompany._id),
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Company Data
export const getCompanyData = async (req, res) => {

    try {

        const company = req.company

        res.json({ success: true, company })

    } catch (error) {
        res.json({
            success: false, message: error.message
        })
    }

}

// Post New Job
export const postJob = async (req, res) => {
  const {
    title,
    description,
    location,
    salary,
    level,
    category,
    tags,
    type,
  } = req.body;

  const company = req.company;

  // Validate required fields
  if (!title || !description || !location || !category || !type) {
    return res.json({ success: false, message: "Missing required fields" });
  }

  try {
    const newJob = new Job({
      id: uuidv4(),                  // Unique job ID
      title,
      description,
      location,
      salary,
      level,
      category,
      type,
      tags,                          // optional: array of skill tags
      company: company.name,         // recruiter name from token
      logo: company.image,           // recruiter logo
      companyId: company._id,        // reference to Company collection
      visible: true,
      date: Date.now(),
    });

    await newJob.save();

    return res.json({ success: true, newJob });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
// Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {
    try {

        const companyId = req.company._id

        // Find job applications for the user and populate related data
        const applications = await JobApplication.find({ companyId })
            .populate('userId', 'name image resume')
            .populate('jobId', 'title location category level salary')
            .exec()

        return res.json({ success: true, applications })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
    try {

        const companyId = req.company._id

        const jobs = await Job.find({ companyId })

        // Adding No. of applicants info in data
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id });
            return { ...job.toObject(), applicants: applicants.length }
        }))

        res.json({ success: true, jobsData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Change Job Application Status
export const ChangeJobApplicationsStatus = async (req, res) => {

    try {

        const { id, status } = req.body

        // Find Job application and update status
        await JobApplication.findOneAndUpdate({ _id: id }, { status })

        res.json({ success: true, message: 'Status Changed' })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}

// Change Job Visiblity
export const changeVisiblity = async (req, res) => {
    try {

        const { id } = req.body

        const companyId = req.company._id

        const job = await Job.findById(id)

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }

        await job.save()

        res.json({ success: true, job })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.companyId.toString() !== companyId.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await Job.findByIdAndDelete(id);
    res.json({ success: true, message: "Job deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @desc    Update application status (Accept / Reject)
// @route   PUT /api/company/update-status/:id
// @access  Private (Company)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({ success: true, message: `Application ${status}` });
  } catch (error) {
    console.error('Update status error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
