import { readData, writeData } from "../repo/load-data";

export async function addFavorite(coordinates) {
    try {
        const existingData = await readData()
        const newData = { ...existingData, coordinates }
        await writeData(newData)
        return 'Successfully added to favorites'
    } catch (error) {
        const err =  new Error(error.message)
        err.status = 500
        throw err
    }
}

export async function removeFavorite(coordinates) {
    try {
        const existingData = await readData()
        if (existingData.includes(coordinates)) {
            const newData = existingData.filter((city) => city != coordinates)
            await writeData(newData)
            return 'Successfully deleted from favorites'
        } else {
            const err =  new Error('The city are not favorites')
            err.status = 409
            throw err
        }
    } catch (error) {
        if (!error.status) {
            const err =  new Error(error.message)
            err.status = 500
            throw err
        } else {
            throw error
        }
    }
}
