const fs = require('fs')
const path = require('path')

let count = 0
let total = 0
const pathFile = path.join(__dirname, 'big.txt')

function readStream() {
  const stream = fs.createReadStream(pathFile, {
    encoding: 'utf-8',
    highWaterMark: 64 * 1024, // 64kb размер чанки по умолчанию
  })

  stream.on('data', (chunk) => {
    count += 1
    console.log('chunk' + count)
    total += chunk.length
  })

  stream.on('end', () => {
    console.log('Total length', total)
    console.log('chunk', count)
  })
}

module.exports = { readStream }
