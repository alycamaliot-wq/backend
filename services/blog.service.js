const blogSchema = require('../models/blog.model')
const { BaseError } = require('../errors/base.error')
const fileService = require('./file.service')
class BlogService {
  async getAllBlogs() {
    const blog = await blogSchema.find()
    return blog
  }
  async createBlog(blog, pic, author) {
    const picFile = fileService.save(pic)
    const create = await blogSchema.create({ ...blog, pic: picFile, author })
    return create
  }
  async edit(blog, id) {
    const edit = await blogSchema.findByIdAndUpdate(id, blog, { new: true })
    if (!id) {
      throw new BaseError.NotFound('Item is not found')
      return
    }
    if (!blog) {
      throw new BaseError.BadRequest('Item is not found')
      return
    }
    return edit
  }
  async delete(id) {
    const deleteBlog = await blogSchema.findByIdAndDelete(id)
    if (!id) {
      throw new BaseError.NotFound('Item is not found')
      return
    }
    return deleteBlog
  }
  async getOne(id) {
    const getOne = await blogSchema.findById(id)
    if (!id) {
      throw new BaseError.NotFound('Item is not found')
    }
    return getOne
  }
}

module.exports = new BlogService()
