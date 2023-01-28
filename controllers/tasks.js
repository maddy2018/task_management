import Task from '../models/Task.js'

/** CREATE */
export const createTask = async (req, res) => {
  try {
    const { name, stage, priority, deadline } = req.body

    const taskDetails = new Task({
      name,
      stage,
      priority,
      deadline,
      createdBy: req.user.id,
    })

    const savedTask = await taskDetails.save()
    res.status(201).json(savedTask)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

/** READ */
export const getTaskCounts = async (req, res) => {
  try {
    const tasks = await Task.find({
      $and: [{ createdBy: req.user.id }, { softDelete: 0 }],
    })
    if (tasks.length === 0) return res.status(200).json({ msg: 'No data' })

    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $and: [{ createdBy: req.user.id }, { softDelete: 0 }],
    })

    if (tasks.length === 0) return res.status(200).json({ msg: 'No data' })

    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

/** UPDATE */
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const { name, stage, priority, deadline } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { name, stage, priority, deadline, createdBy: req.user.id },
      { new: true }
    )

    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

/** DELETE */
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id

    const deletedTask = await Task.findByIdAndUpdate(
      taskId,
      { softDelete: 1 },
      { new: true }
    )

    res.status(200).json(deletedTask)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}
