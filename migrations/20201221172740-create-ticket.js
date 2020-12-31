'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Tickets', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          ticketDescription: {
            type: Sequelize.STRING,
          },
          ticketTitle: {
            type: Sequelize.STRING,
          },
          userId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
              as: 'userId',
            },
          },
          projectID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Projects',
              key: 'id',
              as: 'projectID',
            },
          },
          severity: {
            type: Sequelize.ENUM('Low', 'Meduim', 'High'),
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tickets');
  },
};
