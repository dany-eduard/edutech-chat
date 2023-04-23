import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import database from './db/database.js'
import setUpWebSocketServer from './wsServer.js'
import { PORT } from './configs/config.js'
import { router } from './routes/index.js'

const app = express()

app.set('port', PORT ?? 3000)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(helmet())

app.get('/api/check', (_req, res) => {
  return res.status(200).json({ message: 'OK' })
})

app.use('/api', router)
;(async () => {
  await database.sync()
  console.log('Database connected and synced')
})()

setUpWebSocketServer({ app })

export default app
