const fs = require('fs');
const path = require('path');

const dir_from = path.join(__dirname, 'styles');
const path_to = path.join(__dirname, 'project-dist/bundle.css');

(async () => {

    const files = await fs.promises.readdir(dir_from, { withFileTypes: true })
    const writeStream = fs.createWriteStream(path_to, {encoding: 'utf-8'})

    for (let e of files) {
        if (e.isFile()) {
            const name_arr = e.name.split('.')
            const ext = name_arr.pop()
            const filename = path.join(dir_from, e.name)

            if(ext == "css") {
                const readStream = fs.createReadStream(filename, {encoding: 'utf-8'})
                readStream.on('readable', () => {
                    const data = readStream.read()
                    if (data != null) {
                        writeStream.write('\n' + data)
                    }
                })
            }
        }
    }
})()