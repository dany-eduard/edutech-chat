import http from 'http'
import jwt from 'jsonwebtoken'
import { Server } from 'socket.io'
import { jwtSecret } from './configs/config.js'
import { findUserByUserName } from './services/userService.js'

const setUpWebSocketServer = ({ app }) => {
  const server = http.createServer(app)
  const io = new Server(server, { cors: { origin: '**' } })

  io.use((socket, next) => {
    const token = socket.handshake.query.token
    try {
      const decoded = jwt.verify(`${token}`, jwtSecret)
      socket.userId = decoded.id
      next()
    } catch (error) {
      console.log(error)
      socket.disconnect()
    }
  })

  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.userId)

    socket.on('message', async ({ recipient, content }) => {
      try {
        const recipientUser = await findUserByUserName(recipient)
        if (!recipientUser) throw new Error('user not found')
        io.to(recipientUser._id.toString()).emit('message', { sender: socket.userId, content })
      } catch (error) {
        console.log(error)
        socket.emit('error', { message: 'Could not send message' })
      }
    })

    socket.on('disconnect', () => {
      console.log('Logged out user:', socket.userId)
    })
  })

  app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  })
}

export default setUpWebSocketServer
