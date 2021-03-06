'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Questions', [
     {title: 'How do I get out of this tall tree?', content: 'This tree is way too tall. What should I do?', userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {title: 'Where to hunt?', content: 'I am hungry', userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {title: 'Where to Sleep?', content: 'I am sleepy', userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {title: 'Where are the dogs?', content: 'I want to fight them all', userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {title: 'How do I get another cat to like me?', content: 'I have a cat crush and idk what to do. Pls halp.', userId: 3, createdAt: new Date(), updatedAt: new Date()},
     {title: 'What is a good workout?', content: 'I need to prep for an upcoming fight with a stray cat. Any tips?', userId: 2, createdAt: new Date(), updatedAt: new Date()},
     {title: 'Too be, or not to be?', content: 'That is the question.', userId: 6, createdAt: new Date(), updatedAt: new Date()},
     {title: 'New poop spot?', content: 'Old man Jenkins replaced his sandlot with rocks, and I need a good spot. Where you poop, fam?', userId: 8, createdAt: new Date(), updatedAt: new Date()},
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
