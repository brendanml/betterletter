import mongoose from "mongoose";

const applicantProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: props => `${props.value} is not a valid email!`,
    }
  },
  phoneNumber: {
    type: String,
    trim: true,
    validate: {
      validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v),
      message: props => `${props.value} is not a valid phone number!`,
    }
  },
  designation: {
    type: String,
    trim: true,
  },
  jobs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Job",
  },
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Project",
  },
  skills: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Skill",
  },
  education: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Education",
  },
  certifications: {
    type: [String],
  }
});

const ApplicantProfile = mongoose.model("ApplicantProfile", applicantProfileSchema);
export default ApplicantProfile;