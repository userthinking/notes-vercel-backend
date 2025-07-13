const sendError = (res, status, message) => {
    res.status(status).json({ success: false, message })
}

export default sendError
