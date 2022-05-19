const fs = require('fs')
const path = require('path')

const filename = path.join(__dirname, '/text.txt')

const readStream = fs.createReadStream(filename, {encoding: 'utf-8'})

readStream.on('readable', () => {
    const data = readStream.read()
    if (data != null) console.log(data)
})