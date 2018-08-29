'use strict';
module.exports = (sequelize, DataTypes) => {
  var OtoritasUser = sequelize.define('OtoritasUser', {
    user: DataTypes.INTEGER,
    otoritas: DataTypes.INTEGER
  }, {});
  OtoritasUser.associate = function(models) {
    // associations can be defined here
  };
  return OtoritasUser;
};
