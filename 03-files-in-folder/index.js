const fs = require('fs/promises');
const path = require('path');

(async () => {
  const dirname = path.join(__dirname, 'secret-folder')
  const files = await fs.readdir(dirname, { withFileTypes: true })
  
  for (let e of files) {
      if(e.isFile()) {
        const name_arr = e.name.split('.')
        const name = name_arr.slice(0, -1).join('.')
        const ext = name_arr.pop()
        const weight = (await fs.stat(path.join(dirname, e.name))).size /  1024

        console.log(`${name} - ${ext} - ${weight}kb`)
      }
  }
})()