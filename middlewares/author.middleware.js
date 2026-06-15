const BaseError = require('../errors/base.error')
const blogModel = require('../models/blog.model')

module.exports = async function (req, res, next) {
  try {
    const blog = await blogModel.findById(req.params.id)
    const authorId = req.user.id
    if (blog.author !== authorId) {
      return next(BaseError.BadRequest('Only author can edit this post'))
    }
    next()
  } catch (error) {
    return next(BaseError.BadRequest('Only author can edit this post'))
  }
}
