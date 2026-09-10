import fs from 'fs/promises'

export async function readData() {
    try {
        return await fs.readFile('./data/data.json', 'utf-8')
    } catch (error) {
        const err =  new Error(error.message)
        err.status = 500
        throw err
    }
}


export async function writeData(data) {
    try {
        await fs.writeFile('./data/data.json', JSON.stringify([data], null, 2), 'utf-8')
        console.log('file written succesfully')
    } catch (error) {
        const err =  new Error(error.message)
        err.status = 500
        throw err 
    }
}