'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Questions', [
     {title: 'How do I get out of this tall tree?', content: 'This tree is way to tall. What should I do?', userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {title: 'How do I get another cat to like me?', content: 'I have a cat crush and idk what to do. Pls halp.', userId: 2, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Questions', null, {});
  }
};
