'use strict';

const bcrypt = require("bcrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    await queryInterface.bulkInsert("Users", [
			{
				firstName: "John",
				lastName: "Doe",
				email: "john.doe@gmail.com",
				password: bcrypt.hashSync("secret", 10),
				gender: "male",
				dateBirth: new Date("1994-09-22"),
				infoSelf: "Закончил актерские курсы где то там",
			},
			{
				firstName: "Sam",
				lastName: "Smith",
				email: "sam.smith@gmail.com",
				password: bcrypt.hashSync("secret", 10),
				gender: "male",
				dateBirth: new Date("1994-09-22"),
				infoSelf: "Закончил актерские курсы где то там",
			},
			{
				firstName: "Jane",
				lastName: "Doe",
				email: "jane.doe@gmail.com",
				password: bcrypt.hashSync("secret", 10),
				gender: "female",
				dateBirth: new Date("2004-05-16"),
				infoSelf: "Закончил актерские курсы где то там",
			},
		])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Users", null, {})
  }
};
