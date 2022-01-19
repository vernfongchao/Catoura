'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question_Downvote = sequelize.define('Question_Downvote', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Question_Downvote.associate = function(models) {
    // associations can be defined here
  };
  return Question_Downvote;
};