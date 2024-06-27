'use strict';

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
    return queryInterface.bulkInsert('Shifts', [
      {
          shiftName: 'A',
          shiftStartHour: 6,
          shiftStartMinutes: 0,
          shiftEndHour: 14,
          shiftEndMinutes: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        shiftName: 'B',
        shiftStartHour: 14,
        shiftStartMinutes: 0,
        shiftEndHour: 22,
        shiftEndMinutes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shiftName: 'C',
        shiftStartHour: 22,
        shiftStartMinutes: 0,
        shiftEndHour: 6,
        shiftEndMinutes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Shifts', null, {});
  }
};