'use strict';

module.exports = (sequelize, DataTypes) => {
  var Siswa = sequelize.define('Siswa', {
    npm 	: DataTypes.STRING,
    nama 	: DataTypes.STRING,
    jk 		: DataTypes.STRING,
    alamat 	: DataTypes.STRING,
    no_telp	: DataTypes.STRING
  }, {});
  Siswa.associate = function(models) {
    // associations can be defined here
  };
  return Siswa;
};