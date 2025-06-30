import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default:"",
    },
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    resume: {
      type: String, // Cloudinary URL
      default: "",
    },
    image: {
      type: String,
      default:'',
    },
  },
  {
    timestamps: true, // Adds createdAt, updatedAt
    _id: false,        // Use your own _id from Clerk or another service
  }
);

const User = mongoose.model("User", userSchema);

export default User;