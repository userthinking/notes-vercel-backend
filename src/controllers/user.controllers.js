import User from '../models/user.model.js'
import createToken from '../utils/createToken.js'
import sendError from '../utils/sendError.util.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const getAllUsers = async (req, res) => {
    try {
        // Check if database is connected
        if (mongoose.connection.readyState !== 1) {
            return sendError(res, 503, 'Database not connected')
        }

        const users = await User.find({})
        if (users.length === 0)
            return res.status(200).json({
                success: true,
                message: 'No entries of users in the database',
            })
        res.status(200).json({
            success: true,
            message: 'users fetched successfully',
            data: users,
        })
    } catch (error) {
        console.error(error)
        return sendError(res, 500, error.message)
    }
}

const getUserByID = async (req, res) => {
    try {
        // Check if database is connected
        if (mongoose.connection.readyState !== 1) {
            return sendError(res, 503, 'Database not connected')
        }

        const { id } = req.params

        const user = await User.findById(id)

        if (!user) return sendError(res, 404, 'User Not Found')

        res.status(200).json({
            success: true,
            message: 'user fetched successfully',
            data: user,
        })
    } catch (error) {
        console.error(error)
        return sendError(res, 500, error.message)
    }
}

const signup = async (req, res) => {
    try {
        // Check if database is connected
        if (mongoose.connection.readyState !== 1) {
            return sendError(res, 503, 'Database not connected')
        }

        const { username, password } = req.body

        if (!username || !password)
            return sendError(res, 401, 'username and password required')

        const userExists = await User.findOne({ username })

        if (userExists) return sendError(res, 409, 'user already exists')

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({ username, password: hashedPassword })
        const token = createToken(user._id)
        res.status(201).json({
            success: true,
            message: 'user registered successfully',
            data: user,
            token,
        })
    } catch (error) {
        console.error(error)
        return sendError(res, 500, error.message)
    }
}

const login = async (req, res) => {
    try {
        // Check if database is connected
        if (mongoose.connection.readyState !== 1) {
            return sendError(res, 503, 'Database not connected')
        }

        const { username, password } = req.body

        if (!username || !password)
            return sendError(res, 401, 'username and password required')

        const user = await User.findOne({ username })

        if (!user) return sendError(res, 404, 'user not found')

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch)
            return sendError(res, 500, 'password does not match')

        const token = createToken(user._id)

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: user,
            token,
        })
    } catch (error) {
        console.error(error)
        return sendError(res, 500, error.message)
    }
}

export { getAllUsers, getUserByID, signup, login }
