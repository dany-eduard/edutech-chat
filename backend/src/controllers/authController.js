import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findUserByUserName } from '../services/userService.js'
import { jwtSecret } from '../configs/config.js'

async function login(req, res) {
  try {
    const { user: userName, password } = req.body

    if (!userName || !password) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = await findUserByUserName(userName)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const accessToken = jwt.sign(
      { id: user.id, name: `${user.name + user.lastname}`, user: user.userName },
      jwtSecret,
      { expiresIn: '24h' }
    )

    return res.json({ accessToken })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'A server error occurred' })
  }
}

export { login }
