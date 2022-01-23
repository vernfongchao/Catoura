'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
    {firstName: 'Demo', lastName: 'Cat', userName: 'DemoCat', email: 'demo@demo.com', hashedPassword: 'password', favFood: 'Chicken', createdAt: new Date(), updatedAt: new Date()},
    {firstName: 'Kitty', lastName: 'McGregor', userName: 'MMAcat', email: 'kitty@kitty.com', hashedPassword: 'password', favFood: 'Chicken', createdAt: new Date(), updatedAt: new Date()},
    {firstName: 'Niel', lastName: 'Catrickharris', userName: 'NeilCatrickHarris', email: 'aa@aa.com', hashedPassword: 'password', favFood: 'Chicken', createdAt: new Date(), updatedAt: new Date()},
    {firstName: 'Nicolaus', lastName: 'Catpurnicus', userName: 'Catpurnicus', email: 'bb@bb.com', hashedPassword: 'password', favFood: 'Fish', createdAt: new Date(), updatedAt: new Date()},
    {firstName: 'Philocatar', lastName: 'Cleocatra', userName: 'Cleocatra', email: 'cc@cc.com', hashedPassword: 'password', favFood: 'Reeds', createdAt: new Date(), updatedAt: new Date()},
    {firstName: 'William', lastName: 'Shakespaw', userName: '2B', email: 'dd@dd.com', hashedPassword: 'password', favFood: 'Meowmis', createdAt: new Date(), updatedAt: new Date()},
    {firstName: 'Kitty', lastName: 'Purry', userName: 'KPurr', email: 'ee@ee.com', hashedPassword: 'password', favFood: 'Fish', createdAt: new Date(), updatedAt: new Date()},
    {firstName: 'Luke', lastName: 'Skywalkpurr', userName: 'Skywalkpurr', email: 'ff@ff.com', hashedPassword: 'password', favFood: 'Ramen', createdAt: new Date(), updatedAt: new Date()},





    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }



};
