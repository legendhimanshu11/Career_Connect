import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  // Unique readable job ID (for frontend usage)
  id: { type: String, required: true, unique: true },

  // Core fields
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true }, // e.g. Full-time, Internship
  category: { type: String, required: true }, // IT, Marketing, etc.
  level: { type: String }, // Optional (Junior, Mid, Senior)
  salary: { type: Number },

  // Company info
  company: { type: String, required: true },
  logo: { type: String }, // Company logo URL
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },

  // Job extras
  tags: [String],
  visible: { type: Boolean, default: true },
  views:{type: Number,default: 0},
  date: { type: Number, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model("Job", jobSchema);

export default Job;