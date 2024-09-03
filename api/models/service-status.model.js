import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const ServiceStatus = db.define('services_status', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true, underscored: true });

export default ServiceStatus;
