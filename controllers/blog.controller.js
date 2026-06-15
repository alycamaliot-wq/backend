const blogService = require('../services/blog.service')
class BlogController {
  async getAllBlogs(req, res, next) {
    try {
      const blog = await blogService.getAllBlogs()
      res.status(200).json(blog)
    } catch (error) {
      next(error)
    }
  }
  async createBlog(req, res, next) {
    try {
      const { pic } = req.files
      const { body } = req
      const createBlog = await blogService.createBlog(body, pic, req.user.id)
      res.status(201).json(createBlog)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      const { id } = req.params
      const { body } = req
      const editBlog = await blogService.edit(body, id)
      res.status(200).json(editBlog)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params
      const deleteBlog = await blogService.delete(id)
      res.status(200).json(deleteBlog)
    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const blog = await blogService.getOne(id)
      res.status(200).json(blog)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new BlogController()
