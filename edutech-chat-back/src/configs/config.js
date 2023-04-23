import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

export const PORT = process.env.PORT

export const databaseConnection = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(`${process.env.DB_PORT || 5432}`, 10),
  databaseName: process.env.DB_NAME || 'test-educhat',
  username: process.env.DB_USER || 'test-educhat',
  password: process.env.DB_PASS || 'test-educhat'
}

export const jwtSecret = process.env.JWT_SECRET || 'test-educhat'
