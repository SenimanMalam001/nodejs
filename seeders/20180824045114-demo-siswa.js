'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let siswas = []
    for(var i = 0; i < 2000; i++){
      siswas.push({
        npm   : `S00-${i + 1}`,
        nama  : faker.name.findName(),
        jk    : 'laki-laki',
        alamat: 'Bandar Lampung',
        no_telp: '0823775909',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  return queryInterface.bulkInsert('Siswas', siswas, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Siswas', null, {});
  }
};
