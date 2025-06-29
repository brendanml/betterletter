import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
    minlength: 2,
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
  firstName: {
    type: String,
    minlength: 2,
  },
  lastName: {
    type: String,
    minlength: 2,
  },
  applicantProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ApplicantProfile',
  },
  preferences: {
    introduction: {
      type: String,
    },
    signOff: {
      type: String,
    },
    tone: {
      type: String,
    },
    literacyLevel: {
      type: String,
    },
  },
})

import { HydratedDocument, InferSchemaType, model } from 'mongoose';
export type UserType = InferSchemaType<typeof userSchema>;
export type UserDoc = HydratedDocument<UserType>;
export default model<UserDoc>('User', userSchema);