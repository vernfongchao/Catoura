'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question_Topic = sequelize.define('Question_Topic', {
    questionId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER
  }, {});
  Question_Topic.associate = function(models) {
    // associations can be defined here
    Question_Topic.belongsTo(models.Question, {foreignKey: 'questionId'})
  };
  return Question_Topic;
};