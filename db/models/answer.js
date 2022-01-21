'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.User, {foreignKey: 'userId'});
    Answer.belongsTo(models.Question, {foreignKey: 'questionId'});
    Answer.hasMany(models.Answer_Upvote,{onDelete: 'cascade', hooks: true, foreignKey:'answerId'})
    Answer.hasMany(models.Answer_Downvote,{onDelete: 'cascade', hooks: true, foreignKey:'answerId'})
    Answer.hasMany(models.Comment, {onDelete: 'cascade', hooks: true, foreignKey: 'answerId'});
    Answer.belongsToMany(models.User, {
      through: 'Answer_Upvote',
      foreignKey: 'answerId',
      otherKey: 'userId'
    });
    Answer.belongsToMany(models.User, {
      through: 'Answer_Downvote',
      foreignKey: 'answerId',
      otherKey: 'userId'
    });
  };
  return Answer;
};
