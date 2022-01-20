'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Comment.associate = function (models) {
    Comment.hasMany(models.Reply, { onDelete: 'cascade', hooks: true, foreignKey: 'commentId' });
    Comment.belongsTo(models.Answer, { foreignKey: 'answerId' })
  };
  return Comment;
};
