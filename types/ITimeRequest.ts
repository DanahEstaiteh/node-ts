import { Request} from 'express'
import { ObjectId } from 'mongoose';
export interface ITimeRequest extends Request {
userId : ObjectId
}