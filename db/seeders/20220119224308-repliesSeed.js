'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Replies', [
      { content: "Yea don't do it.", userId: 3, commentId: 1, createdAt: new Date(), updatedAt: new Date() },
      { content: "Me too. Food is da best.", userId: 3, commentId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Replies', null, {});
  }
};
