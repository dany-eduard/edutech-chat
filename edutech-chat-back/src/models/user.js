import { Sequelize, DataTypes } from 'sequelize'
import database from '../db/database.js'

const User = database.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  lastname: {
    type: DataTypes.STRING
  }
  // relationship with user type
})

export default User
