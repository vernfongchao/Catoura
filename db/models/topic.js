'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Topic.associate = function (models) {
    Topic.belongsTo(models.User, { foreignKey: 'userId' });
    Topic.hasMany(models.Question_Topic,{onDelete: 'cascade', hooks:true, foreignKey: 'topicId'})
    Topic.belongsToMany(models.Question, {
      through: 'Question_Topic',
      foreignKey: 'topicId',
      otherKey: 'questionId'
    });
  };
  return Topic;
};