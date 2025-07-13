import express from 'express'
import cors from 'cors'
import noteRouter from './routes/note.routes.js'
import userRouter from './routes/user.routes.js'

const app = express()

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://notes-vercel-frontend.vercel.app',
        process.env.CLIENT_URL
    ].filter(Boolean), // Remove undefined values
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json())

// Test endpoint that doesn't require database
app.get('/api/test', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running and responding',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    })
})

// Routes
app.use('/api/notes', noteRouter)
app.use('/api/users', userRouter)

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    })
})

export default app
