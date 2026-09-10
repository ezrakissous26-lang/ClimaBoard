export function checkValidBody(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({error: 'Body required'})
    } else if (!('latitude' in req.body) || !('longitude' in req.body)) {
        return res.status(400).json({error: 'Invalid body - Fields longitude and latitude are required'})
    } else if (isNaN(Number(req.body.longitude)) || isNaN(Number(req.body.latitude))) {
        return res.status(400).json({error: 'Invalid body - Fields longitude and latitude need be numbers'})
    } else if ((Number(req.body.longitude) < -180 || Number(req.body.longitude) > 180) || (Number(req.body.latitude) < -90 || Number(req.body.latitude) > 90)) {
        return res.status(400).json({error: 'Invalid coordonates - Longitude: -180  180 Latitude: -90  90'})
    } else if (req.url === '/favorites' && !(req.body.explorerName)) {
        return res.status(400).json({error: 'Invalid body - Field ExplorerName missing'})
    }
    next()
}

export function logger(req, res, next) {
    res.on('finish', () => console.log(`Date: ${new Date()} - Url: ${req.url} - Method: ${req.method} - Status: ${res.statusCode}`))
    next()
}

export function checkValidQuery(req, res, next) {
    const { latitude, longitude } = req.query
    if (!latitude || !longitude) {
        return res.status(400).json({error: 'Query required - Fields longitude and latitude are required'})
    } else if (isNaN(Number(longitude)) || isNaN(Number(latitude))) {
        return res.status(400).json({error: 'Invalid query - Fields longitude and latitude need to be numbers'})
    } else if (Number(longitude) < -180 || Number(longitude) > 180 || Number(latitude) < -90 || Number(latitude) > 90) {
        return res.status(400).json({error: 'Invalid coordinates - Longitude: -180 to 180 Latitude: -90 to 90'})
    }

    next()
}