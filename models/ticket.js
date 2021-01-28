// "use strict";
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      ticketTitle: DataTypes.STRING,
      ticketDesc: DataTypes.STRING,
      userId: DataTypes.UUID,
      projectId: DataTypes.UUID,
      assignedDev: DataTypes.STRING,
      submittedDev: DataTypes.STRING,
      ticketPriority: DataTypes.ENUM("High", "Moderate", "Low"),
      ticketStatus: DataTypes.ENUM("Open", "Closed"),
      ticketType: DataTypes.ENUM("Bug", "Error", "Feature request"),
    },
    {}
  );
  Ticket.associate = function (models) {
    Ticket.hasMany(models.Comment, {
      foreignKey: "ticketId",
      as: "comments",
      onDelete: "CASCADE",
    });
  };
  return Ticket;
};
