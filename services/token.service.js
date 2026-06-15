const jwt = require('jsonwebtoken')
const tokenSchema = require('../models/token.model')
const BaseError = require('../errors/base.error')
class tokenService {
  genereateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: '15m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWS_REFRESH_KEY, {
      expiresIn: '30d',
    })

    return { accessToken, refreshToken }
  }
  async saveToken(userId, refreshToken) {
    const existJWT = await tokenSchema.findOne({ userId })
    if (existJWT) {
      existJWT.refreshToken = refreshToken
      return existJWT.save()
    }
    const token = await tokenSchema.create({ user: userId, refreshToken })
    return token
  }
  async removeToken(refreshToken) {
    return await tokenSchema.findOneAndDelete({ refreshToken })
  }
  async findOne(refreshToken) {
    await tokenSchema.findOne({ refreshToken })
  }
  async validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY)
    } catch (error) {
      throw BaseError.NotFound(error.message)
    }
  }
  async validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY)
    } catch (error) {
      throw BaseError.NotFound(error.message)
    }
  }
}

module.exports = new tokenService()
