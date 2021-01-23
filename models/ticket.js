// "use strict";
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    'Ticket',
    {
      ticketTitle: DataTypes.STRING,
      ticketDesc: DataTypes.STRING,
      userID: DataTypes.UUID,
      projectID: DataTypes.UUID,
      assignedDev: DataTypes.STRING,
      submittedDev: DataTypes.STRING,
      ticketPriority: DataTypes.ENUM('Low', 'Medium', 'High'),
      ticketStatus: DataTypes.ENUM('Open', 'Closed'),
      ticketType: DataTypes.ENUM('Bug', 'Error', 'Feature request'),
    },
    {}
  );
  Ticket.associate = function (models) {
    // associations can be defined here
    Ticket.belongsTo(models.Project, {
      foreignKey: 'projectID',
      onDelete: 'CASCADE',
    });
    Ticket.belongsToMany(models.User, {
      foreignKey: 'email',
      onDelete: 'CASCADE',
    });
  };
  return Ticket;
};
