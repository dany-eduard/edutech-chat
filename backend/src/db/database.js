import { Sequelize } from 'sequelize'
import { databaseConnection } from '../configs/config.js'

const { databaseName, username, password, host, port } = databaseConnection

const database = new Sequelize(databaseName, username, password, {
  host,
  port,
  dialect: 'postgres'
})

try {
  await database.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default database
