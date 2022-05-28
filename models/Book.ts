import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import mongoose_delete from 'mongoose-delete'
import mongoose from 'mongoose'
import {BookDocument} from "../types/IBook"


const bookSchema = new mongoose.Schema<BookDocument>({
    name: { type: String, required: true },
    ISBN: { type: String, required: true, unique: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author' },
    cover_image: { type: String, required: true }
}, {
    timestamps: true
})

bookSchema.index({ name: "text" });
bookSchema.plugin(aggregatePaginate)
bookSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
bookSchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })



export default mongoose.model<BookDocument>('Book', bookSchema)