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
    // associations can be defined here
  };
  return User;
};