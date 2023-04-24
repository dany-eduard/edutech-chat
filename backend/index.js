import app from './src/app.js'
import { PORT } from './src/configs/config.js'

const port = PORT ?? 3000
const server = app.listen(port, () => {
  console.log('Server is running at http://localhost:%d', `${port}`)
})

export default server
