// "use strict";
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      projectName: DataTypes.STRING,
      projectLead: DataTypes.STRING,
    },
    {}
  );
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsToMany(models.User, {
      through: models.Team,
      as: 'users',
      foreignKey: 'projectId',
    });
    Project.hasMany(models.Ticket, { as: 'tickets' });
  };
  return Project;
};
