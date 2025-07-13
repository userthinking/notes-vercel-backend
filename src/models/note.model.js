import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        bgColor: {
            type: String,
            default: '#FFFFFF',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
)

const Note = mongoose.model('Note', noteSchema)

export default Note
