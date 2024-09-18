import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Ratings = db.define('ratings', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true, underscored: true });


export default Ratings;
