import express from 'express';
const router = express.Router()
import createUserValidator from './validators/createUserValidator'
import * as controller from './controller'
// import authenticationMiddleware from '../../middlewares/authentication.js'

router.post('/signup',createUserValidator, controller.create)

router.post('/login', controller.login)

router.get('/', controller.find)

// router.use(authenticationMiddleware)

// router.get('/likes', controller.findUserLikes)

router.get('/:id', controller.findById)

// router.put('/:id',  controller.update)

router.delete('/:id', controller.remove)

export default router