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
  userImage: {
    type: DataTypes.STRING
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
  userReputation: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  authorReputation: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  }
}, { timestamps: true, underscored: true })

export default User