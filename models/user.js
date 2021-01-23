module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profileImage: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Ticket, { as: 'tickets' });
    User.belongsToMany(models.Project, {
      through: models.Team,
      as: 'team',
      foreignKey: 'userId',
    });
  };
  return User;
};
