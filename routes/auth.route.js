const express = require('express')
const AuthController = require('../controllers/auth.controller')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')
const route = express.Router()

// = = = = = > AUTH FILES ROUTES < = = = = = //

route.post(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 20 }),
  AuthController.register
)
route.get('/authotification/:id', AuthController.activation)
route.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 20 }),
  AuthController.login
)
route.post('/logout', AuthController.logout)
route.get('/refresh', AuthController.refresh)
route.get('/get-users', authMiddleware, AuthController.getUser)
module.exports = route
