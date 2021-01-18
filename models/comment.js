'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      text: DataTypes.STRING,
      ticketID: DataTypes.UUID,
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.Ticket, {
      foreignKey: 'ticketID',
      as: 'ticket',
    });
    // associations can be defined here
  };
  return Comment;
};
