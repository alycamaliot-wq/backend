const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { fileURLToPath } = require('url')
const { BaseError } = require('../errors/base.error')
class FilerService {
  save(file) {
    try {
      const fileName = uuidv4() + '.jpg' // its saving the file w id n adding ({ '.jpg }) to the end so it gets the pic state
      const currentDir = __dirname // its getting the direction of the where the file lives
      const staticDir = path.join(currentDir, '..', 'static') // its the path way of the file currentDir - > ../ ( which means one way out ) - > static ( the file we need)
      const filePath = path.join(staticDir, fileName) // its pointing out that gettng file should join the static file n staticDir is showing the direction
      if (!fs.existsSync(staticDir)) {
        // here is how we are checking whether the staticDir exist or nor
        fs.mkdirSync(staticDir, { recursive: true }) // if no the nwe are creating it w our own hand n giving the persmision to create w recursive: true
      }
      file.mv(filePath) // as the fileName is a document to fill out the file will work w it, n file. mv means telling the file to move in the give path
      return fileName // returning the value of gotten file
    } catch (error) {
      throw BaseError.NotFound(`Item is not found: ${error.message}`)
    }
  }
}

module.exports = new FilerService()
