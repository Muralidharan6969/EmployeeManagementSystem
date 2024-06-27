'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config({ path: `${process.cwd()}/ems_app.env`});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let password = process.env.ADMIN_1_PASSWORD;
    const hashPassword = bcrypt.hashSync(password, 12);
    return queryInterface.bulkInsert('Employees', [
      {
        employeeType: '0',
        firstName: "EMS_Admin_1",
        email: process.env.ADMIN_1_EMAIL,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Employees', {employeeType: '0'}, {});
  }
};
