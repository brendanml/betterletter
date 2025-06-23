import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  classification: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;