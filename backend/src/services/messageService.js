import Message from '../models/messages.js'
import User from '../models/user.js'

async function saveMessage({ message, userId }) {
  const msg = await Message.create({ message, userId })
  return msg
}

async function getAllMessages() {
  const msgs = await Message.findAll({ include: User, nest: true, raw: true })
  return msgs
}

export { saveMessage, getAllMessages }
