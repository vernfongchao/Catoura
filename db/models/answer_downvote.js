'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer_Downvote = sequelize.define('Answer_Downvote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
};