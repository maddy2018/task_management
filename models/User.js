import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    username: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    phone: {
      type: Number,
    },
    imagePath: {
      type: String,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
export default User
