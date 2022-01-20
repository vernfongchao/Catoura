'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question_Upvote = sequelize.define('Question_Upvote', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Question_Upvote.associate = function(models) {
    // associations can be defined here
  };
  return Question_Upvote;
};