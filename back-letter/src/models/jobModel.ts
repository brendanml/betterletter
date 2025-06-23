import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
});

const Job = mongoose.model('Job', jobSchema);

export default Job;