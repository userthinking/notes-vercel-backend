import mongoose from 'mongoose'
import notesDB from '../constants.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${notesDB}`
        )
        console.log('connected to Database', connectionInstance.connection.name)
    } catch (error) {
        console.error('MongoDB connection failed: ', error)
        process.exit(1)
    }
}

export default connectDB
