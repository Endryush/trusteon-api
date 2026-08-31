import { DataTypes } from 'sequelize';
import db from '../config/db.js'
import Order from './order.model.js';

const TrusteonComissioned = db.define('trusteon_comissioned', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.STRING,
    references: {
      model: Order,
      key: 'id'
    },
    allowNull: false,
    unique: true
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  commissionRate: {
    type: DataTypes.DECIMAL(5, 4),
    allowNull: false,
    defaultValue: 0.15
  },
}, { timestamps: true, underscored: true, tableName: 'trusteon_comissioned' })

export default TrusteonComissioned