import {Ilog, LogDocument} from '../types/Ilog'
import AuditLog from '../models/AuditLog'

export default async  ({ Who, What, Method, How,When,ResponseTime } : Ilog) : Promise<LogDocument & {
    _id: any;
}> => {
    console.log(Who)
    return await AuditLog.create({ Who, What, Method, How,When,ResponseTime })
  
}