export function checkValidBody(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({error: 'Body required'})
    } else if (!req.body.longitude || !req.body.latitude) {
        return res.status(400).json({error: 'Invalid body - Fields longitude and latitude are required'})
    } else if (isNaN(Number(req.body.longitude)) || isNaN(Number(req.body.latitude))) {
        return res.status(400).json({error: 'Invalid body - Fields longitude and latitude need be numbers'})
    } next()
}

export function logger(req, res, next) {
    res.on('finish', () => console.log(`Date: ${new Date()} - Url: ${req.url} - Method: ${req.method} - Status: ${res.statusCode}`))
    next()
}