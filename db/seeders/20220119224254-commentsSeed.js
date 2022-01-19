'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
    {content: 'That sounds really risky. Idk about that.', userId: 3, answerId: 1, createdAt: new Date(), updatedAt: new Date()},
    {content: 'Sounds like a great idea. I would never turn food down.', userId: 3, answerId: 2, createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
