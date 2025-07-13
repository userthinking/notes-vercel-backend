import Note from '../models/note.model.js'
import User from '../models/user.model.js'
import sendError from '../utils/sendError.util.js'

// GET /api/notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId }).sort({
            createdAt: -1,
        })
        res.status(200).json({
            success: true,
            message: 'Notes fetched successfully.',
            data: notes,
        })
    } catch (error) {
        console.error('Error fetching notes:', error)
        return sendError(res, 500, 'Server error while fetching notes.')
    }
}

// GET /api/notes/:id
const getNoteByID = async (req, res) => {
    try {
        const { id } = req.params

        const note = await Note.findById(id)
        if (!note) return sendError(res, 404, 'Note not found.')

        res.status(200).json({
            success: true,
            message: 'Note fetched successfully.',
            data: note,
        })
    } catch (error) {
        console.error('Error fetching note by ID:', error)
        return sendError(res, 500, 'Server error while fetching note.')
    }
}

// POST /api/notes
const postNoteData = async (req, res) => {
    try {
        const { title, body, bgColor } = req.body

        if (!title?.trim() || !body?.trim()) {
            return sendError(res, 400, 'Title and body are required.')
        }

        const note = await Note.create({
            title,
            body,
            bgColor,
            userId: req.userId,
        })

        await User.findByIdAndUpdate(req.userId, {
            $push: { notes: note._id },
        })

        res.status(201).json({
            success: true,
            message: 'Note created successfully.',
            data: note,
        })
    } catch (error) {
        console.error('Error creating note:', error)
        return sendError(res, 500, 'Server error while creating note.')
    }
}

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params

        const note = await Note.findOne({ _id: id, userId: req.userId })
        if (!note) return sendError(res, 404, 'Note not found.')

        await note.deleteOne()

        res.status(200).json({
            success: true,
            message: 'Note deleted successfully.',
        })
    } catch (error) {
        console.error('Error deleting note:', error)
        return sendError(res, 500, 'Server error while deleting note.')
    }
}

// PUT /api/notes/:id
const updateNote = async (req, res) => {
    try {
        const { id } = req.params
        const { title, body, bgColor } = req.body

        if (!title?.trim() && !body?.trim() && !bgColor) {
            return sendError(
                res,
                400,
                'At least one of title, body, or bgColor must be provided for update.'
            )
        }

        const note = await Note.findOne({ _id: id, userId: req.userId })

        if (!note) return sendError(res, 404, 'Note not found or unauthorized.')

        if (title) note.title = title
        if (body) note.body = body
        if (bgColor) note.bgColor = bgColor

        const updatedNote = await note.save()

        res.status(200).json({
            success: true,
            message: 'Note updated successfully.',
            data: updatedNote,
        })
    } catch (error) {
        console.error('Error updating note:', error)
        return sendError(res, 500, 'Server error while updating note.')
    }
}

export { getAllNotes, postNoteData, getNoteByID, deleteNote, updateNote }
