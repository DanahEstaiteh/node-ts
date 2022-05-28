
import mongoose from 'mongoose'
import {LogDocument} from '../types/Ilog'


const LogSchema = new mongoose.Schema<LogDocument>({
    Who: { type: mongoose.Schema.Types.ObjectId},
    What: { type: String, required: true },
    Method: { type: String, required: true },
    How: { type: Number, required: true },
    When: { type: Date, required: true },
    ResponseTime: { type: Number, required: true } 
}, {
    timestamps: true
})



export default mongoose.model<LogDocument>('AuditLog', LogSchema)