import mongoose from 'mongoose';
const educationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
    required: true,
    min: 1900, // Assuming no one graduates before 1900
    max: new Date().getFullYear() + 4, // Allowing for future graduation
  },
});

const Education = mongoose.model('Education', educationSchema);
export default Education;