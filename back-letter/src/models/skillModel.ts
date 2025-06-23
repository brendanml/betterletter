import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
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
    enum: ['Programming Language', 'Framework', 'Library', 'Tool', 'Other'],
    required: true,
  },
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;