'use strict';
module.exports = (sequelize, DataTypes) => {
  var Otoritas = sequelize.define('Otoritas', {
    name: DataTypes.STRING,
    display_name: DataTypes.STRING
  }, {});
  Otoritas.associate = function(models) {
    // associations can be defined here
  };
  return Otoritas;
};