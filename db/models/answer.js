'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.User, {foreignKey: 'userId'});
    Answer.belongsTo(models.Question, {foreignKey: 'questionId'});
    Answer.belongsToMany(models.User, {
      through: 'Answer_Upvote',
      foreignKey: 'userId',
      otherKey: 'answerId'});
    Answer.belongsToMany(models.User, {
      through: 'Answer_Downvote',
      foreignKey: 'userId',
      otherKey: 'answerId'});
  };
  return Answer;
};