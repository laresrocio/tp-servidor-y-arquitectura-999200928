import { User } from '../models/userModel.js'
import { config } from 'dotenv'

config()

const registerUser = async (req, res) => {
  try {
    const { body } = req
    const { username, email, password } = body


    const newUser = await User.create({
      username,
      email,
      password
    })
    await newUser.save()

    const publicDataUser = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    }

    res.status(201).json({ success: true, message: 'User registered successfully', data: publicDataUser })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user', error: error.message })
  }
}

export { registerUser }
