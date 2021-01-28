"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      text: DataTypes.STRING,
      ticketId: DataTypes.UUID,
    },
    {}
  );
  Comment.associate = function (models) {};
  return Comment;
};
