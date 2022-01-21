'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer_Downvote = sequelize.define('Answer_Downvote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Answer_Downvote.associate = function (models) {
    // associations can be defined here
    Answer_Downvote.belongsTo(models.Answer, { foreignKey: 'answerId' })
  };
  return Answer_Downvote;
};
