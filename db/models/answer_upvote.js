'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer_Upvote = sequelize.define('Answer_Upvote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Answer_Upvote.associate = function(models) {
    // associations can be defined here
  };
  return Answer_Upvote;
};