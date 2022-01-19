'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Answers', [
    {content: 'Just jump lol. We got 9 lives.', userId: 1, questionId: 1, createdAt: new Date(), updatedAt: new Date()},
    {content: 'Bring them food. Lots of it.', userId: 2, questionId: 2, createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Answers', null, {});
  }
};
