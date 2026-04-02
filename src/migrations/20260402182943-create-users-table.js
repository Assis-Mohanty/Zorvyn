'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id:           { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true },
      name:         { 
        type: Sequelize.STRING, 
        allowNull: false },
      email:        { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true },
      passwordHash: { 
        type: Sequelize.STRING, 
        allowNull: false },
      role:         { 
        type: Sequelize.ENUM('admin','analyst','viewer'),
        allowNull: false, 
        defaultValue: 'viewer' },
      isActive:     { 
        type: Sequelize.BOOLEAN, defaultValue: true },
      deletedAt:    { 
        type: Sequelize.DATE, allowNull: true },
      createdAt:    { 
        type: Sequelize.DATE, allowNull: false },
      updatedAt:    { 
        type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};

