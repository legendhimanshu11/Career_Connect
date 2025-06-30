import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false  // Optional for guest users
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },

  // Optional fields for guest users
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  resumeUrl: { type: String },
  portfolio:{type:String },
  skills: [String],

  date: {
    type: Date,
    default: Date.now
  }
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

export default JobApplication;