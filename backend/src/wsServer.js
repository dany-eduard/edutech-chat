import http from 'http'
import jwt from 'jsonwebtoken'
import { Server } from 'socket.io'
import { jwtSecret } from './configs/config.js'
import { findUserById } from './services/userService.js'

const decodeToken = (token) => {
  return jwt.verify(`${token}`, jwtSecret)
}

function setUpWebSocketServer(app) {
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
      /* , credentials: true */
    }
  })

  io.use((socket, next) => {
    try {
      const token = socket.handshake.query.token
      const decoded = decodeToken(`${token}`)
      socket.userId = decoded.id
      next()
    } catch (error) {
      console.error(error)
    }
  })

  io.on('connection', (socket) => {
    console.log('logged in user:', socket.userId)

    socket.on('message', async (socket) => {
      try {
        const { token, message } = socket
        const decoded = decodeToken(`${token}`)

        const recipientUser = await findUserById(decoded.id)
        if (!recipientUser) throw new Error('user not found')

        const data = {
          userName: decoded.user,
          userType: recipientUser.UserType.typeName,
          message: message,
          createdAt: new Date()
        }

        io.emit('message', data)
      } catch (error) {
        console.error(error)
        socket.emit('error', { message: 'Could not send message' })
      }
    })

    socket.on('disconnect', () => {
      console.log('logged out user:', socket.userId)
    })
  })

  return server
}

export { setUpWebSocketServer }
