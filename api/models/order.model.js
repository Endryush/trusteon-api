import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './user.model.js';
import Product from './product.model.js';
import ServiceStatus from './service-status.model.js';

const Order = db.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
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
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  serviceId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
    allowNull: false
  },
  orderStatus: {
    type: DataTypes.INTEGER,
    references: {
      model: ServiceStatus,
      key: 'id'
    },
    allowNull: true
  },
}, { timestamps: true, underscored: true });

Order.belongsTo(User, { foreignKey: 'authorId'});
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'serviceId' });
Order.belongsTo(ServiceStatus, { foreignKey: 'orderStatus' });

export default Order;
