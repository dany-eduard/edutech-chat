import { DataTypes } from 'sequelize'
import database from '../db/database.js'

const Message = database.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER
  }
})

export default Message
