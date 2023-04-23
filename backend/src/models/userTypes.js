import { DataTypes } from 'sequelize'
import database from '../db/database.js'

const UserTypes = database.define('UserTypes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  typeName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

export default UserTypes
