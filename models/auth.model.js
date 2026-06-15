const { Schema, model } = require('mongoose')

const authSchema = new Schema({
  author: { type: Schema.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
})

module.exports = model('Auth', authSchema)
