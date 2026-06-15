const authSchema = require('../models/auth.model')
const BaseError = require('../errors/base.error')
const tokenService = require('../services/token.service')
const { UserDto } = require('../dto/user.dto')
const MailService = require('../services/mail.service')
const bcrypt = require('bcrypt')
class authService {
  async register(data, id) {
    const { name, age, email, password } = data
    const existUser = await authSchema.findOne({ email })

    if (existUser) {
      throw BaseError.ExistUser('User is exist')
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await authSchema.create({
      name,
      age,
      email,
      password: hashPassword,
    })

    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/authotification/${user._id}`
    )

    const userDto = new UserDto(user)
    const token = tokenService.genereateToken({ ...userDto })

    await tokenService.saveToken(userDto.id, token.refreshToken)
    return { user: userDto, token }
  }
  async activation(id) {
    const user = await authSchema.findById(id)
    if (!user) {
      throw BaseError.NotFound('User is not found')
    }
    console.log(user)
    user.isActivated = true
    return user.save()
  }
  async login(data) {
    const { email, password } = data

    console.log('email', email, `password`, password)
    const user = await authSchema.findOne({ email })
    console.log(user)
    if (!user) {
      throw BaseError.NotFound('User is not found')
    }
    const userPassword = await bcrypt.compare(password, user.password)
    if (!userPassword) {
      throw BaseError.BadRequest('Password is wrong')
    }
    const userDto = new UserDto(user)
    const token = await tokenService.genereateToken({ userDto })

    await tokenService.saveToken(userDto.id, token.refreshToken)

    return { user: userDto, ...token }
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseError.UnAuthorized('Bad authritation')
    }
    const payload = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findOne(refreshToken)

    if (!payload || !tokenFromDb) {
      throw BaseError.UnAuthorized('Bad authtorization')
    }
    const user = await authSchema.findById(payload.id)
    const userDto = new UserDto(user)
    const token = await tokenService.genereateToken({ userDto })

    await tokenService.saveToken(userDto.id, token.refreshToken)

    return { user: userDto, ...token }
  }
  async getUsers() {
    return await authSchema.find()
  }
}
module.exports = new authService()
