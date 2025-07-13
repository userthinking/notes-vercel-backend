import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './db/connectDB.js'

dotenv.config()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server connected to PORT ${PORT}`)
})

connectDB()
