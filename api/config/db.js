import Sequelize from 'sequelize'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const dbUrl = process.env.DB_URL
const caCertificate = process.env.CA_CERTIFICATE
const sequelize = new Sequelize(
  dbUrl,
  {
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: caCertificate
      }
    }
  }
)

export default sequelize