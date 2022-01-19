'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Answer_Downvotes', [
    { userId: 3, answerId: 1, createdAt: new Date(), updatedAt: new Date() },
    { userId: 3, answerId: 2, createdAt: new Date(), updatedAt: new Date() }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Answer_Downvotes', null, {});
  }
};
