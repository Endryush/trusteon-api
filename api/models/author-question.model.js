import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const AuthorQuestions = db.define('author_questions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: true, underscored: true });


export default AuthorQuestions;
