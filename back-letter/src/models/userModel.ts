import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  consent: {
    type: Boolean,
    required: true,
    default: false,
  },
  googleId: {
    type: String,
    unique: true,
  },
  technologies: {
    type: [String],
  },
  
})

const User = mongoose.model('User', userSchema);
export default User;