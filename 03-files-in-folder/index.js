// const fs = require('fs/promises')
const fs = require('fs').promises
const path = require('path')

const dirname = path.join(__dirname, '/secret-folder')

const files = fs.readdir(path.join(__dirname, dirname), { withFileTypes: true })

for (let e of files) {
    if(e.isFile()) {
      const name = e.name.split('.').slice(0, -1).join('.')
      
    }
}