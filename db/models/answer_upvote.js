'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer_Upvote = sequelize.define('Answer_Upvote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Answer_Upvote.associate = function (models) {
    // associations can be defined here
    Answer_Upvote.belongsTo(models.Answer, { foreignKey: 'answerId' })
  };
  return Answer_Upvote;
};
