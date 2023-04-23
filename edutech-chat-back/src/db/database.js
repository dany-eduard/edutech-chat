import { Sequelize } from 'sequelize'
import { databaseConnection } from '../configs/config.js'

const { databaseName, username, password, host, port } = databaseConnection

const database = new Sequelize(databaseName, username, password, {
  host,
  port,
  dialect: 'postgres'
})

export default database
