'use strict';

const models = require("../../models")
const User = models.User
const Chat = models.Chat
const ChatUser = models.ChatUser
const Message = models.Message

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

    const users_one = await User.findAll({
			where: {
				id: 1,
			},
		})

    const users_two = await User.findAll({
			where: {
				id: 2,
			},
		})

		const chat = await Chat.findAll({ limit: 1 })

		// await ChatUser.bulkCreate([
		//   {
		//     chatId: chat.id,
		//     userId: users[0].id,
		//   },
		//   {
		//     chatId: chat.id,
		//     userId: users[1].id,
		//   },
		// ])

		// await Message.bulkCreate([
		//   {
		//     message: "Hello friend",
		//     chatId: chat.id,
		//     fromUserId: users[0].id,
		//   },
		//   {
		//     message: "Hi buddy",
		//     chatId: chat.id,
		//     fromUserId: users[1].id,
		//   },
		//   {
		//     message: "Long time no speak",
		//     chatId: chat.id,
		//     fromUserId: users[1].id,
		//   },
		// ])

		await Message.bulkCreate([
			{
				message: "Woyyyy you cool",
				chatId: chat[0].id,
				fromUserId: users_one[0].id,
				parentId: 2,
			},
			{
				message: "AHHHH men",
				chatId: chat[0].id,
				fromUserId: users_one[0].id,
				parentId: 3,
			},
			{
				message: "cat so cat oh bad",
				chatId: chat[0].id,
				fromUserId: users_two[0].id,
				parentId: 1,
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
  }
};
