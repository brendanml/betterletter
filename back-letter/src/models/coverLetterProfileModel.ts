import mongoose from "mongoose";

const converLetterProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: props => `${props.value} is not a valid email!`,
    }
  },
  jobs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Job",
  },
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Project",
  },
  technologies: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  education: {
    type: [String],
  },
  certifications: {
    type: [String],
  }
});

const CoverLetterProfile = mongoose.model("CoverLetterProfile", converLetterProfileSchema);
export default CoverLetterProfile;