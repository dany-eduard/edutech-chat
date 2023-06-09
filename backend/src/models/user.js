import { DataTypes } from 'sequelize'
import database from '../db/database.js'
import UserTypes from './userTypes.js'
import Message from './messages.js'

const User = database.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typeId: {
    type: DataTypes.INTEGER
  }
})

User.belongsTo(UserTypes, { foreignKey: 'typeId', as: 'userTypes' })
Message.belongsTo(User, { foreignKey: 'userId', as: 'user' })
User.hasMany(Message, { foreignKey: 'userId', as: 'messages' })

export default User
