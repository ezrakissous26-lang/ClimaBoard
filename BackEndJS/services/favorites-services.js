import { readData, writeData } from "../repo/favorites-repository.js";

export async function addFavorite(coordinates) {
    try {
        const data = await readData()
        if (!isExisting(data, coordinates)) {
            data.push(coordinates)
            await writeData(data)
            return 'Successfully added to favorites'
        } else {
            const err = new Error('The city is already favorite')
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

export async function removeFavorite(coordinates) {
    try {
        const existingData = await readData()
        if (isExisting(existingData, coordinates)) {
            const newData = existingData.filter((city) => !(isExisting(city, coordinates)))
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


function isExisting(data, newCoordinates) {
    let isExist = false
    data.forEach(element => {
        if (element.longitude === newCoordinates.longitude && element.latitude === newCoordinates.latitude) {
            return isExist = true
        }
    })
    return isExist
}