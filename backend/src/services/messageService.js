import Message from '../models/messages.js'
import User from '../models/user.js'
import UserTypes from '../models/userTypes.js'

async function saveMessage({ message, userId }) {
  const msg = await Message.create({ message, userId })
  return msg
}

async function getAllMessages() {
  const msgs = await Message.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['userName', 'typeId'],
        include: [
          {
            model: UserTypes,
            as: 'userTypes',
            attributes: ['typeName']
          }
        ]
      }
    ],
    nest: true,
    raw: true
  })
  return msgs
}

export { saveMessage, getAllMessages }
