import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './user.model.js';
import AuthorQuestions from './author-question.model.js';
import Order from './order.model.js';

const AuthorFeedback = db.define('author_feedbacks', {
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
      model: AuthorQuestions,
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

AuthorFeedback.belongsTo(User, { foreignKey: 'userId' });
AuthorFeedback.belongsTo(Order, { foreignKey: 'orderId' });
AuthorFeedback.belongsTo(AuthorQuestions, { foreignKey: 'questionId' });

export default AuthorFeedback;
