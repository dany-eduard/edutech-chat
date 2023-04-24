import bcrypt from 'bcrypt'
import User from '../models/user.js'
import UserTypes from '../models/userTypes.js'

async function createUser({ userName, password, name, lastname, typeId }) {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
    userName,
    password: hashedPassword,
    name,
    lastname,
    typeId
  })

  return user
}

async function findUserByUserName(userName) {
  const user = await User.findOne({
    where: { userName }
  })
  return user
}

async function findUserById(id) {
  const user = await User.findOne({
    where: { id },
    include: UserTypes
  })

  return user
}

export { createUser, findUserByUserName, findUserById }
