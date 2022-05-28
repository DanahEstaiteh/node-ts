import {  query } from 'express-validator'
import validate from '../../../core/errorMiddleware'


const rules = [
    query('name')
        .isLength({ min: 4 }),
        query('ISBIN').isISBN().withMessage('it must be International Standard Book Number'),
        query('author').isMongoId().withMessage('author id is not a valid mongo id'),
]

export default validate(rules)