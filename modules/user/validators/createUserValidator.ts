import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware'
const rules = [
    body('firstName')
        .isLength({ min: 4, max: 20 }),
    body('lastName')
        .isLength({ min: 4, max: 20 }),
    body('email')
        .isEmail().withMessage('invalid email').bail()
        .normalizeEmail(),
    body('password')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage('password should be at least 8 characters, 1 lowercase, 1 uppercase, 1 symbols, 1 numbers')
]

export default validate(rules)