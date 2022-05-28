import User from '../../models/User'
import * as service from './service'
import {omit} from 'lodash'
import { Request,Response,NextFunction } from 'express'
import { UserDocument} from '../../types/IUser'

export const create = async (req:Request<UserDocument>, res:Response, next:NextFunction) => {
  const { email, password, firstName, lastName } = req.body
  try{
    const user = await service.create({ email, password, firstName, lastName })
    res.send(omit(user.toJSON, 'password'))
  }catch(error){
    next(error)
  }
 
}

export const login = async (req:Request<UserDocument>, res:Response, next:NextFunction) => {
  const { email, password } = req.body
  try {
    const token = await service.login({ email, password })
    res.send({ token })
  } catch (error : any) {
    res.send(error.message)
  }
}

export const find = async (req:Request<UserDocument>, res:Response, next:NextFunction) => {
  const users = await User.find().lean()
  return res.send(users)
}

export const findById = async (req:Request<UserDocument>, res:Response, next:NextFunction) => {
  const user = await User.findOne({ _id: req.params.id }).lean()
  return res.send(user)
}

export const update = async (req:Request<UserDocument>, res:Response, next:NextFunction) => {
  res.send(req.body)
}


export const remove = async (req:Request<UserDocument>, res:Response, next:NextFunction) => {
  const user: UserDocument | null= await User.findById(req.params.id)
  if (!user) {
    throw new Error('user not found')
  }
  await user.delete()
  res.status(204).send()
}