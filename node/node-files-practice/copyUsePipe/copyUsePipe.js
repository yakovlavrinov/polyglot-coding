const fs = require('fs')
const path = require('path')

const pathReadFile = path.join(__dirname, 'readFile.txt')
const pathWriteFile = path.join(__dirname, 'writeFile.txt')

function copyUsePipe() {
  fs.createReadStream(pathReadFile).pipe(fs.createWriteStream(pathWriteFile))
}

module.exports = { copyUsePipe }
