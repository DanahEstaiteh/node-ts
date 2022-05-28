import { ObjectId ,Document} from 'mongoose';

export  enum Methods  {
GET = 'GET',
POST ='POST',
PUT= 'PUT',
DELETE = 'DELETE'
}

export interface Ilog   {
    Who?: ObjectId,
    What: string,
    Method: Methods,
    How: number, 
    When: Date,
    ResponseTime: number 
 
}

export interface LogDocument extends Ilog ,Document {}