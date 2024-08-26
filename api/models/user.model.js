import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reputation: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  }
}, { timestamps: true })

export default User