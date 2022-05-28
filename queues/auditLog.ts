import Queue from 'bull'
import Auditlog from '../middlewares/auditLog'
import { connection } from '../core/redis'


const auditQueue = new Queue('AuditLog Queue' ,connection)

auditQueue.process(async (job,done)=>{
    console.log(job)
const {Who, What, Method, How,When,ResponseTime} = job.data
await Auditlog({Who, What, Method, How,When,ResponseTime})
    done()
})

export default auditQueue