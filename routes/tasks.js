import express from 'express'
import {
  getTasks,
  getTaskCounts,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks.js'
import { verifyToken } from '../middleware/auth.js'
const router = express.Router()

router.get('/dashboard', verifyToken, getTaskCounts)
router.post('/tasks', verifyToken, createTask)
router.get('/tasks', verifyToken, getTasks)
router.patch('/tasks/:id', verifyToken, updateTask)
router.delete('/tasks/:id', verifyToken, deleteTask)

export default router
