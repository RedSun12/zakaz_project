"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Words",
      [
        {
          user_id: "1",
          goodWord: "Солнце",
          badWord: "Грязь",
        },
        {
          user_id: "1",
          goodWord: "Кот",
          badWord: "Драка",
        },
        {
          user_id: "1",
          goodWord: "Счастье",
          badWord: "Убийство",
        },
        {
          user_id: "1",
          goodWord: "Лекции",
          badWord: "Политика",
        },
        {
          user_id: "1",
          goodWord: "Дети",
          badWord: "Криминал",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
  },
};
