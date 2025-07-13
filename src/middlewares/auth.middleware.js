import sendError from '../utils/sendError.util.js'
import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization || !authorization.startsWith('Bearer '))
            return sendError(
                res,
                401,
                'Authorization token missing or malformed'
            )

        const token = authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.id

        next()
    } catch (error) {
        console.error(error)
        return sendError(res, 401, error.message)
    }
}

export default userAuth
