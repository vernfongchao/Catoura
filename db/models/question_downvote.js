'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question_Downvote = sequelize.define('Question_Downvote', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Question_Downvote.associate = function(models) {
    Question_Downvote.belongsTo(models.Question,{foreignKey:'questionId'})
  };
  return Question_Downvote;
};