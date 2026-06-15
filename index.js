require('dotenv').config()
// = = = = => LIBRARIES < = = = = = //
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
// = = = = = > WORKING LIBRARIS <  = = = = = //
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser({}))
app.use(fileUpload({}))

// = = = = = > ROUTES <  = = = = = //
const blogRoute = require('./routes/blog.route')
const authRoute = require('./routes/auth.route')
const errorMiddleware = require('./middlewares/error.middleware')

// = = = = = > MIDDLEWARES <  = = = = = //
app.use(express.json({}))
app.use('/blog', blogRoute)
app.use('/auth', authRoute)

// = = = = = > ERROR HANDLING <  = = = = = //
app.use(errorMiddleware)

// = = = = = > SECRET CODES / APIS <  = = = = = //
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

if (!PORT || !DB_URL) {
  console.log('ERROR WITH APIS')
  return
}

const startup = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log('Connect to database')
    app.listen(PORT, () => {
      console.log(`Server is running on: http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startup()
