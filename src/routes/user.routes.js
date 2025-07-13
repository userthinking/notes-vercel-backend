import express from 'express'
import {
    getAllUsers,
    getUserByID,
    login,
    signup,
} from '../controllers/user.controllers.js'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.post('/signup', signup)
userRouter.post('/login', login)

userRouter.get('/:id', getUserByID)

export default userRouter
