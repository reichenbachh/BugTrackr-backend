'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Projects', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          projectName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          projectDesc: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          projectStage: {
            type: Sequelize.ENUM(
              'Pre-Alpha',
              'Alpha',
              'Beta',
              'Release',
              'Support'
            ),
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
    await queryInterface.dropTable('Projects');
  },
};
