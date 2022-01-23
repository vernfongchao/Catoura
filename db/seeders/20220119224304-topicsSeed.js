'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Topics', [
     {title: 'Toys', userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {title: 'Food', userId: 2, createdAt: new Date(), updatedAt: new Date()},
     {title: 'Owners', userId: 2, createdAt: new Date(), updatedAt: new Date()},
     {title: 'Cat Politics', userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {title: 'Trees', userId: 3, createdAt: new Date(), updatedAt: new Date()},
     {title: 'Poop Spots', userId: 4, createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Topics', null, {});
  }
};
