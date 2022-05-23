const fs = require('fs/promises');
const path = require('path');

const dir_from = path.join(__dirname, 'files')
const dir_to = path.join(__dirname, 'files-copy')

const copyDir = async (from, to) => {

    await fs.rm(to, { force: true, recursive: true })
    await fs.mkdir(to, { recursive: true })

    const files = await fs.readdir(from, { withFileTypes: true })

    for (let e of files) {
        if (e.isFile()) {
            await fs.copyFile(path.join(dir_from, e.name), path.join(dir_to, e.name));
            
        } else {
            await fs.mkdir(dir_to, { recursive: true });
            await copyDir(dir_from, dir_to); 
        }
    }
}

copyDir(dir_from, dir_to)
