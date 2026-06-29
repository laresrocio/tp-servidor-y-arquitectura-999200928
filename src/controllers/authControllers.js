import { User } from '../models/userModel.js'
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const registerUser = async (req, res) => {
  try {
    const { body } = req
    const { username, email, password } = body

    //validate if the required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    //validate if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' })
    }

    //validate if the password is strong enough
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-]).{8,}$/
    if (!regex.test(password)) {
      return res.status(400).json({ success: false, error: "Invalid password. It must contain at least 8 characters, one uppercase letter, one number, and one special charSacter." })
    }

    //hash the password before saving it to the database
    const hashedPassword = await hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    //validate if the required fields are present
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Unauthorized' })
    }

    //validate if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    //validate if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    //generate a token for the user
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const key = process.env.SECRET_KEY
    const token = jwt.sign(payload, key, { expiresIn: '1h' })

    res.status(200).json({ success: true, message: 'Login successful', data: { token } })


  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in user', error: error.message })
  }
}

export { registerUser, loginUser }
