'use strict';
/*faker adalah data bohongan*/
const faker = require('faker');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    let users = [];
    for (var i = 1; i < 10; i++) {
      let name = faker.name.findName();
      let username = faker.name.findName();
      let password = bcrypt.hashSync('rahasia',saltRounds);
      let role = 'member';
      users.push({
        username: username,
        password: password,
        name: name,
        role: role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    let password = bcrypt.hashSync('rahasia',saltRounds);
    users.push({
      username: 'admin',
      password: password,
      name: 'admin',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};