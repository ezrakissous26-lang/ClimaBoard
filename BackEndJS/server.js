import express from 'express'
import { router } from './routes/routes.js'
import { logger } from './middleware/middleware.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', logger)
app.use('/', router)

app.listen(3000, () => {
    console.log('Server running...')
})

