const BaseError = require('../errors/base.error')
const tokenService = require('../services/token.service')

module.exports = function (req, res, next) {
  try {
    const authtorization = req.headers.authtorization
    if (!authtorization) {
      return next(BaseError.UnAuthorized('Bad authtorization'))
    }
    const accessToken = authtorization.split(' ')[1]
    if (!accessToken) {
      return next(BaseError.UnAuthorized('Bad authtorization'))
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(BaseError.UnAuthorized('Bad authtorization'))
    }
    req.user = userData
    next()
  } catch (error) {
    return next(BaseError.UnAuthorized(error.message))
  }
}
