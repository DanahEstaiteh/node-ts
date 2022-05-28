// import * as service from './service'

// export const create = async (req:Request, res:Response) => {//add next 
//     const { bookName, ISBN, author_id, book_cover_image } = req.body
//     const book = await service.create({ bookName, ISBN, author_id, book_cover_image })
//     res.send(book)
// }


// export const findById = async (req:Request, res:Response) => {
//     const book = await service.findById(req.params.id)
//     res.send(book)
// }

// export const find = async (req:Request, res:Response) => {
//     const { name, ISBN, author, page, limit } = req.query;
//     const books = await service.find({ name, ISBN, author, page, limit })
//     res.send(books)
// }