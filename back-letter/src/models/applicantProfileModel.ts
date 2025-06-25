import mongoose from "mongoose";

const applicantProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
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
        trim: true,
      },
      technologies: {
        type: [String],
      },
      classification: {
        type: String,
      }
    }]
  ,
  skills: [{
    name: {
      type: String,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
    },
    classification: {
      type: String,
      enum: ['Programming Language', 'Framework', 'Library', 'Tool', 'Soft Skill', 'Other'],
    },
  }],
  education: [{
    institution: {
      type: String,
      trim: true,
    },
    degree: {
      type: String,
      trim: true,
    },
    courseWork: {
      type: String,
      trim: true,
    },
    graduationYear: {
      type: Number,
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
      "classification": "'Programming Language' OR 'Framework' OR 'Library' OR 'Tool' OR 'Soft Skill' OR 'Other'"
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