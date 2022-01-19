'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type:DataTypes.STRING(25)
    },
    lastName: {
      allowNull: false,
      type:DataTypes.STRING(25)
    },
    userName: {
      allowNull: false,
      unique: true,
      type:DataTypes.STRING(25)
    },
    email: {
      allowNull: false,
      unique: true,
      type:DataTypes.STRING
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
    favFood: {
      type:DataTypes.STRING(25)
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question, {foreignKey: 'userId'});
    User.hasMany(models.Answers, {foreignKey: 'userId'});
    User.hasMany(models.Replies, {foreignKey: 'userId'});
    User.hasMany(models.Topic, {foreignKey: 'userId'});
    User.belongsToMany(models.Answer, {
      through: 'Answer_Upvote',
      foreignKey: 'userId',
      otherKey: 'answerId'});
    User.belongsToMany(models.Answer, {
      through: 'Answer_Downvote',
      foreignKey: 'userId',
      otherKey: 'answerId'});
    User.belongsToMany(models.Question, {
      through: 'Question_Upvote',
      foreignKey: 'userId',
      otherKey: 'questionId'});
    User.belongsToMany(models.Question, {
      through: 'Question_Downvote',
      foreignKey: 'userId',
      otherKey: 'questionId'});
  };
  return User;
};