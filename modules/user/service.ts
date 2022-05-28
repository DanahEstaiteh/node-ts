import User from '../../models/User'
import path from 'path'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { UserInput } from '../../types/IUser'
import { ApiError } from '../../errors/ApiError'


export const create = async ({ email, password, firstName, lastName } : UserInput) => {
    const isUserExists = await User.findOne({ email })
    if(isUserExists){
    throw ApiError.duplicate('user email already taken')
}
    const user = await User.create({ email, password, firstName, lastName })
    return user
}

export const login = async ({ email, password } : {
    email:string,
    password: string
}) => {
    const user = await findByEmail(email)
    if (!user) return Promise.reject('incorrect email or password')

    const isValid = await user.comparePassword(password);
    if (!isValid) return Promise.reject('incorrect email or password')
    const __dirname = path.resolve()
    const secret = fs.readFileSync(__dirname + '/modules/user/privateKey')
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, secret, { algorithm: 'RS256' });

    return token
}

export const findByEmail = async (email: string) => {
    return await User.findOne({ email })
}