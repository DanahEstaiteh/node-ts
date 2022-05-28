// import Book from '../../models/Book'
// import { ApiError } from '../../errors/ApiError'

// export const findAutorById = async (author_id) => {
//   const isAuthorExist = await Author.findById(author_id)
//   return isAuthorExist
// }

// export const findById = async (book_id) => {
//   return await Book.findById(book_id)

// }

// export const create = async ({ bookName, ISBN, author_id, book_cover_image }) => {
//   if (!findAutorById(author_id)) {
//     throw ApiError.badRequest('author is not exist')
//   } else {
//     return await Book.create({ bookName, ISBN, author_id, book_cover_image })
//   }
// }

// export const find = async ({ name, ISBN, author, page = 1, limit = 10 }) => {
//   const options = {
//     page,
//     limit
//   };
//   let pipeline = []
//   let books
//   if (name) {
//     pipeline.push({ $match: { $text: { $search: name } } })
//   }
//   if (ISBN) {
//     pipeline.push({ $match: { 'ISBN': ISBN } })
//   }
//   if (author) {
//     pipeline.push({ $match: { 'author_id': author } })
//   }
//   if (pipeline.length) {
//     books = await Book.aggregate(pipeline)//just return aggregation
//   }

//   return Book.aggregatePaginate(books ?? [], options)//return data as docs 
// }

