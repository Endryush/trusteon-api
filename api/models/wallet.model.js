import { DataTypes } from 'sequelize';
import db from '../config/db.js'
import Order from './order.model.js';
import User from './user.model.js';

const Wallet = db.define('wallet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id'
    },
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
}, { timestamps: true, underscored: true, tableName: 'wallet' })

Wallet.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
Wallet.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

export default Wallet