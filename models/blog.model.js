const { Schema, model } = require('mongoose')

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    pic: { type: String, required: false },
  },
  { timestamps: true }
)

module.exports = model('Blog', blogSchema)
