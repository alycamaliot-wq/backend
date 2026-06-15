const authService = require('../services/auth.service')
const BaseError = require('../errors/base.error')
const { validationResult } = require('express-validator')
class AuthController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(
          BaseError.BadRequest('Error with validation', errors.array())
        )
      }
      const user = await authService.register(req.body)
      res.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
  async activation(req, res, next) {
    try {
      const { id } = req.params
      const user = await authService.activation(id)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(
          BaseError.BadRequest('Error with validation', errors.array())
        )
      }
      const data = await authService.login(req.body)
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      return res.json(data)
    } catch (error) {
      next(error.message)
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (error) {
      next(error)
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await authService.refersh(refreshToken)
    } catch (error) {
      next(error)
    }
  }
  async getUser(req, res, next) {
    try {
      const data = await authService.getUsers()
      return res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController()
