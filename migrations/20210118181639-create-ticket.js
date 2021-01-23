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
          ticketTitle: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          ticketDesc: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          userID: {
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
          assignedDev: {
            type: Sequelize.STRING,
            references: {
              model: 'Users',
              key: 'email',
              as: 'assignedDeveloper',
            },
            validate: {
              isEmail: true,
            },
          },
          submittedDev: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'email',
              as: 'Submitter',
            },
            validate: {
              isEmail: true,
            },
          },
          ticketPriority: {
            type: Sequelize.ENUM('Low', 'Meduim', 'High'),
            allowNull: false,
          },
          ticketStatus: {
            type: Sequelize.ENUM('Open', 'Closed'),
            allowNull: false,
          },
          ticketType: {
            type: Sequelize.ENUM('Bug', 'Error', 'Feature request'),
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
