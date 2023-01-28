import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async (req, res) => {
  try {
    const { name, username, email, password, phone, imagePath } = req.body
    // const imagePath = req.file.destination + '/' + req.file.originalname

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const userDetails = new User({
      name,
      username,
      email,
      password: passwordHash,
      phone,
      imagePath,
    })

    const savedUser = await userDetails.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

export const login = async (req, res) => {
  try {
    const { userId, password } = req.body

    const user = await User.findOne({
      $or: [{ username: userId }, { email: userId }],
    })

    if (!user) return res.status(404).json({ msg: 'User does not exist' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(404).json({ msg: 'Wrong credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({ token, user })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}
