import express from 'express'
import cors from 'cors'
import noteRouter from './routes/note.routes.js'
import userRouter from './routes/user.routes.js'

const app = express()

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://your-frontend-domain.vercel.app', // Replace with your actual frontend domain
        process.env.CLIENT_URL
    ].filter(Boolean), // Remove undefined values
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json())

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
