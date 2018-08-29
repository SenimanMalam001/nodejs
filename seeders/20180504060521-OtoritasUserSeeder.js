'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const otoritas = []
    for (var i = 0; i < 110 ; i++) {
      otoritas.push({
      user: 1,
      otoritas: i + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    }
    return queryInterface.bulkInsert('OtoritasUsers', otoritas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OtoritasUsers', null, {});
  }
};
