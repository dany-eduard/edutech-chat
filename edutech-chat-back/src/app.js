import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import database from './db/database.js'
import { PORT } from './configs/config.js'
import { router } from './routes/index.js'

const app = express()

app.set('port', PORT ?? 3000)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(helmet())

app.get('/api/check', (_req, res) => {
  return res.status(200).json({ message: 'OK' })
})

app.use('/api', router)

database.sync().then(() => {
  console.log('Database connected and synced')
  // app.listen(3000, () => {
  //   console.log('Server started on port 3000')
  // })
})

export default app
