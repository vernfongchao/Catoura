'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Replies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      userId: {
        onDelete: 'CASCADE',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      commentId: {
        onDelete: 'CASCADE',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Comments' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Replies');
  }
};
