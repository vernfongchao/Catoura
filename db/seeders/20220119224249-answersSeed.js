'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Answers', [
    {content: 'Just jump lol. We got 9 lives.', userId: 3, questionId: 1, createdAt: new Date(), updatedAt: new Date()},
    {content: 'At the restaurant', userId: 5, questionId: 3, createdAt: new Date(), updatedAt: new Date()},
    {content: 'They chasing their own tails at the church', userId: 4, questionId: 4, createdAt: new Date(), updatedAt: new Date()},
    {content: 'At the dog park', userId: 1, questionId: 5, createdAt: new Date(), updatedAt: new Date()},
    {content: 'Bring them food. Lots of it.', userId: 2, questionId: 2, createdAt: new Date(), updatedAt: new Date()},
    {content: 'Cat curls bro', userId: 5, questionId: 6, createdAt: new Date(), updatedAt: new Date()},
    {content: 'Sneak into the dog park LOL', userId: 1, questionId: 8, createdAt: new Date(), updatedAt: new Date()},
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
