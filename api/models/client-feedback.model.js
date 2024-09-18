import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './user.model.js';
import ClientQuestions from './client-questions.model.js';
import Order from './order.model.js';

const ClientFeedback = db.define('client_feedbacks', {
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
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
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
ClientFeedback.belongsTo(Order, { foreignKey: 'orderId' });
ClientFeedback.belongsTo(ClientQuestions, { foreignKey: 'questionId' });

export default ClientFeedback;
