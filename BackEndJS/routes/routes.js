import express from 'express'
import { getCoordinatesByName, getWeatherByCoordinates } from '../services/load-service.js'
import { checkValidBody } from '../middleware/middleware.js'
import { readData } from '../repo/load-data.js'
import { addFavorite, removeFavorite } from '../services/json-service.js'

export const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message: 'Server connected'})
})

router.get('/coordinates/:name', async (req, res) => {
    try {
        return res.status(200).json(await getCoordinatesByName(req.params.name))
    } catch (error) {
        return res.status(error.status).json(error.message)
    }
})

router.get('/weather', checkValidBody , async (req, res) => {
    try {
        return res.status(200).json(await getWeatherByCoordinates(req.body))
    } catch (error) {
        return res.status(error.status).json(error.message)
    }
})

router.get('/favorites', async (req, res) => {
    try {
        return res.status(200).json(JSON.parse(await readData()))
    } catch (error) {
        return res.status(error.status).json(error.message)
    }
})

router.post('/favorites', checkValidBody, async (req, res) => {
    try {
        return res.status(201).json({message: await addFavorite(JSON.stringify(req.body))})
    } catch (error) {
        return res.status(error.status).json(error.message)
    }
})

router.delete('/favorites', async (req, res) => {
    try {
        return res.status(201).json({message: await removeFavorite(req.body)})
    } catch (error) {
        return res.status(error.status).json(error.message)
    }
})