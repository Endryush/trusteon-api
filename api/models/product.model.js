import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './user.model.js';
import ServiceStatus from './service-status.model.js';

const Product = db.define('products', {
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
  productImages: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  totalAmount: {
    type: DataTypes.DOUBLE,
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
  serviceStatus: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { timestamps: true, underscored: true });

Product.belongsTo(User, { foreignKey: 'authorId' });

export default Product;
