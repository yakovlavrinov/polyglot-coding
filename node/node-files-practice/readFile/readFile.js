const { readFile } = require('fs/promises')
const path = require('path')

async function readWholeFile() {
  const filePath = path.join(__dirname, 'big.txt')
  const data = await readFile(filePath, 'utf-8')

  console.log('Length: ', data.length, data)
}

module.exports = { readWholeFile }
