const { readWholeFile } = require('./readFile/readFile')
const { readStream } = require('./createReadStream/createReadStream')
const { copyUsePipe } = require('./copyForPipe/copyUsePipe')

readWholeFile()
readStream()
copyUsePipe()
