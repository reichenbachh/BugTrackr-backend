module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profileImage: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.belongsToMany(models.Project, {
      through: models.Team,
      as: "team",
      foreignKey: "userId",
    });
    User.hasMany(models.Ticket, {
      as: "tickets",
      foreignKey: "userId",
    });
  };
  return User;
};
