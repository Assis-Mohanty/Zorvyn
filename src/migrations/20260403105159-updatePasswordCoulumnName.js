'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // update column name from passwordHash to password
    await queryInterface.renameColumn('users', 'passwordHash', 'password');
  },

  async down (queryInterface, Sequelize) {
    // revert the change
    await queryInterface.renameColumn('users', 'password', 'passwordHash');
  }
};
