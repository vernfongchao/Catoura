'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [{
    firstName: 'Demo', lastName: 'Cat', userName: 'DemoCat', email: 'demo@demo.com', hashedPassword: 'password', favFood: 'Chicken', createdAt: new Date(), updatedAt: new Date(),
    firstName: 'a', lastName: 'a', userName: 'a', email: 'a@a.com', hashedPassword: 'password', favFood: 'Chicken', createdAt: new Date(), updatedAt: new Date(),
    firstName: 'b', lastName: 'b', userName: 'b', email: 'b@b.com', hashedPassword: 'password', favFood: 'Chicken', createdAt: new Date(), updatedAt: new Date(),
    }], {});
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
