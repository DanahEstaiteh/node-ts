import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { Request,Response,NextFunction } from 'express'
const validateToken = (token: string) => {
    const __dirname = path.resolve()
    const secret = fs.readFileSync(__dirname + '/modules/user/privateKey')
    return jwt.verify(token, secret, { algorithms: ['RS256'] })
}

export default async (req : Request, res : Response, next: NextFunction) => {
    const auth_header = req.headers['authorization']
    const token = auth_header && auth_header.split(' ')?.[1]
    if (!token) return res.status(401).json({
        message: 'missing token'
    })
    try {
        const payload = validateToken(token)
        if (payload) {
            // req.userId = payload._id
            // return next()
        }
    } catch (e) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }
    next()
}