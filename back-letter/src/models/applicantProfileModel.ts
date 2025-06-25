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
  desiredJob: {
    type: String,
    trim: true,
  },
  jobs: [{
    title: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    }
  }],
  projects:
    [{
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
      }
    }]
  ,
  skills: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
    },
    classification: {
      type: String,
      enum: ['Programming Language', 'Framework', 'Library', 'Tool', 'Soft Skill', 'Other'],
      required: true,
    },
  }],
  education: [{
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    courseWork: {
      type: String,
      trim: true,
    },
    graduationYear: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 4, // Allowing for future graduation
    },
    graduated: {
      type: Boolean,
      default: false,
    }
  }],
  certifications: {
    type: [String],
  }
});

export const jsonCandidateProfile = {
  "email": "",
  "phoneNumber": "",
  "desiredJob": "",
  "jobs": [
    {
      "title": "",
      "company": "",
      "description": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "technologies": [""],
      "classification": ""
    }
  ],
  "skills": [
    {
      "name": "",
      "yearsOfExperience": 0,
      "classification": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "courseWork": "",
      "graduationYear": 0,
      "graduated": false
    }
  ],
  "certifications": [""]
}


const ApplicantProfile = mongoose.model("ApplicantProfile", applicantProfileSchema);
export default ApplicantProfile;