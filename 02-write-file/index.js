const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({input:process.stdin, output:process.stdout})

const filename = path.join(__dirname, '/text.txt')

const writeStream = fs.createWriteStream(filename, {encoding: 'utf-8'})

rl.write('Введите сообщение:\n')
rl.on('line', (input) => {
    if(input == 'exit') rl.close()
    writeStream.write(input + '\n')
})

rl.on('close', () => {
    console.log('Спасибо за проверку!')
})