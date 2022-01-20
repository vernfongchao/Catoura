'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  Reply.associate = function (models) {
    Reply.belongsTo(models.User, { foreignKey: 'userId' });
    Reply.belongsTo(models.Comment, { foreignKey: 'commentId' });
  };
  return Reply;
};
