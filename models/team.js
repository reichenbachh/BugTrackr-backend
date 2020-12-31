'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'Team',
    {
      userId: DataTypes.STRING,
      projectId: DataTypes.STRING,
      role: DataTypes.ENUM(
        'Project Lead',
        'Project Manager',
        'Developer',
        'Submitter'
      ),
    },
    {}
  );
  Team.associate = function (models) {};
  return Team;
};
