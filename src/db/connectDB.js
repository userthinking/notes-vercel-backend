import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        // Check if MONGODB_URI is available
        if (!process.env.MONGODB_URI) {
            console.warn('MONGODB_URI not found in environment variables')
            return
        }

        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to Database', connectionInstance.connection.name)
    } catch (error) {
        console.error('MongoDB connection failed: ', error)
        // Don't exit the process, just log the error
        console.log('Server will continue without database connection')
    }
}

export default connectDB
