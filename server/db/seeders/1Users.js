"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@admin",
          password: await bcrypt.hash("123123", 10),
          profilePhoto:
            "https://klike.net/uploads/posts/2019-11/1573725793_9.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
