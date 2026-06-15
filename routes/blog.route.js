const express = require('express')
const BlogController = require('../controllers/blog.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const authorMiddleware = require('../middlewares/author.middleware')

const route = express.Router()

// = = = = = > FILES ROUTES <  = = = = = //
route.get('/', BlogController.getAllBlogs)
route.post('/create', authMiddleware, BlogController.createBlog)
route.put('/:id', authMiddleware, authorMiddleware, BlogController.edit)
route.delete('/:id', authMiddleware, authorMiddleware, BlogController.delete)
route.get('/:id', BlogController.getOne)
module.exports = route
