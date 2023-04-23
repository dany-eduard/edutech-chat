import bcrypt from 'bcrypt'
import User from '../models/user.js'

async function createUser({ userName, password, name, lastname }) {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
    userName,
    password: hashedPassword,
    name,
    lastname
  })

  return user
}

async function findUserByEmail(userName) {
  const user = await User.findOne({
    where: { userName }
  })

  return user
}

export { createUser, findUserByEmail }
