// "use strict";
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    'Ticket',
    {
      ticketDescription: DataTypes.STRING,
      ticketTitle: DataTypes.STRING,
      userId: DataTypes.UUID,
      projectID: DataTypes.UUID,
      severity: DataTypes.ENUM('Low', 'Meduim', 'High'),
    },
    {}
  );
  Ticket.associate = function (models) {
    // associations can be defined here
    Ticket.belongsTo(models.Project, {
      foreignKey: 'projectID',
      onDelete: 'CASCADE',
    });
    Ticket.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Ticket;
};
