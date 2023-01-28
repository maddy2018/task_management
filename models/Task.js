import mongoose, { mongo, Mongoose } from 'mongoose'

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 2,
    },
    stage: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3],
      default: 0,
    },
    priority: {
      type: Number,
      required: true,
      enum: [0, 1, 2],
      default: 0,
    },
    deadline: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongo.ObjectId,
    },
    softDelete: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)
export default Task
