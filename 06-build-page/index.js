const fs = require('fs');
const readline = require('readline');
const path = require('path');

const dir_to = path.join(__dirname, 'project-dist');

const dir_from = path.join(__dirname, 'styles');
const path_to = path.join(dir_to, 'style.css');

const dir_copy_from = path.join(__dirname, 'assets');
const dir_copy_to = path.join(dir_to, 'assets');

(async () => {

    await fs.promises.rm(dir_to, { force: true, recursive: true })
    await fs.promises.mkdir(dir_to, { recursive: true })

    const pattern = RegExp('{{[a-z]+}}')

    const htmlWriteStream = fs.createWriteStream(path.join(dir_to, 'index.html'), {encoding: 'utf-8'})
    const readStream = fs.createReadStream(path.join(__dirname, 'template.html'), {encoding: 'utf-8'})
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
      })

    rl.on('line', (line) => {
        if (line != null) {
            let result = pattern.exec(line)
            if (result !== null) {
                result.forEach(r => {
                    const readStream = fs.createReadStream(path.join(__dirname, 'components', r.slice(2, -2) + '.html'), {encoding: 'utf-8'})

                    readStream.on('readable', () => {
                        const data = readStream.read()
                        if (data != null) htmlWriteStream .write(data + '\n')
                    })
                })
            }
            else {
                htmlWriteStream .write(line + '\n')
            }
        }
    })

    const files = await fs.promises.readdir(dir_from, { withFileTypes: true })
    const cssWriteStream = fs.createWriteStream(path_to, {encoding: 'utf-8'})

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
                        cssWriteStream.write('\n' + data)
                    }
                })
            }
        }
    }

    const copyDir = async (from, to) => {

        await fs.promises.mkdir(to, { recursive: true })
    
        const files = await fs.promises.readdir(from, { withFileTypes: true })
    
        for (let e of files) {
            if (e.isFile()) {
                await fs.promises.copyFile(path.join(from, e.name), path.join(to, e.name));
                
            } else {
                await fs.promises.mkdir(path.join(to, e.name), { recursive: true });
                await copyDir(path.join(from, e.name), path.join(to, e.name));
            }
        }
    }
    
    copyDir(dir_copy_from, dir_copy_to)
})()