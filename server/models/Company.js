import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
    },
    email: {
      type: String,
      required: [true, "Company email is required"],
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "Company logo/image is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;