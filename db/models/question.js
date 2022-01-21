'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function (models) {
    Question.belongsTo(models.User, { foreignKey: 'userId' });
    Question.hasMany(models.Answer, { onDelete: 'cascade', hooks: true, foreignKey: 'questionId' });
    Question.hasMany(models.Question_Upvote,{onDelete: 'cascade', hooks: true, foreignKey:'questionId'});
    Question.hasMany(models.Question_Downvote,{onDelete: 'cascade', hooks: true, foreignKey:'questionId'});
    Question.hasMany(models.Question_Topic, {onDelete: 'cascade', hooks:true, foreignKey: 'questionId'});
    Question.belongsToMany(models.Topic, {
      through: 'Question_Topic',
      foreignKey: 'questionId',
      otherKey: 'topicId'
    });
    Question.belongsToMany(models.User, {
      through: 'Question_Upvote',
      foreignKey: 'questionId',
      otherKey: 'userId'
    });
    Question.belongsToMany(models.User, {
      through: 'Question_Downvote',
      foreignKey: 'questionId',
      otherKey: 'userId'
    });
  };
  return Question;
};