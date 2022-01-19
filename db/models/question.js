'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function (models) {
    Questions.belongsTo(models.User, { foreignKey: 'userId' });
    Questions.hasMany(models.Answer, { foreignKey: 'questionId' });
    Questions.belongsToMany(models.Topic, {
      through: 'Question_Topic',
      foreignKey: 'questionId',
      otherKey: 'topicId'
    });
    Questions.belongsToMany(models.User, {
      through: 'Question_Upvote',
      foreignKey: 'questionId',
      otherKey: 'userId'
    });
    Questions.belongsToMany(models.User, {
      through: 'Question_Downvote',
      foreignKey: 'questionId',
      otherKey: 'userId'
    });
  };
  return Question;
};