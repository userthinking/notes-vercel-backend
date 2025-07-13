import express from 'express'

import {
    deleteNote,
    getAllNotes,
    getNoteByID,
    postNoteData,
    updateNote,
} from '../controllers/note.controllers.js'
import userAuth from '../middlewares/auth.middleware.js'

const noteRouter = express.Router()

noteRouter.use(userAuth)

noteRouter.get('/', getAllNotes)
noteRouter.post('/', postNoteData)

noteRouter.get('/:id', getNoteByID)
noteRouter.delete('/:id', deleteNote)
noteRouter.put('/:id', updateNote)

export default noteRouter
