'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Teams', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          userId: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            references: {
              model: 'Users',
              key: 'id',
              as: 'userId',
            },
          },
          projectId: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            references: {
              model: 'Projects',
              key: 'id',
              as: 'projectId',
            },
          },
          role: {
            type: Sequelize.ENUM(
              'Project Lead',
              'Project Manager',
              'Developer',
              'Submitter'
            ),
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
    await queryInterface.dropTable('Teams');
  },
};
