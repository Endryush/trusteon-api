import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './user.model.js';
import ClientQuestions from './client-questions.model.js';

const ClientFeedback = db.define('user_feedbacks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  questionId: {
    type: DataTypes.INTEGER,
    references: {
      model: ClientQuestions,
      key: 'id'
    },
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: true, underscored: true });

ClientFeedback.belongsTo(User, { foreignKey: 'userId' });
ClientFeedback.belongsTo(ClientQuestions, { foreignKey: 'questionId' });

export default ClientFeedback;
