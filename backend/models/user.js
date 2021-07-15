'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			this.belongsToMany(models.Chat, {
				through: "ChatUser",
				foreignKey: "userId",
			})
			this.hasMany(models.ChatUser, { foreignKey: "userId" })
    }
  };
  User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			password: DataTypes.STRING,
			gender: DataTypes.STRING,
			dateBirth: DataTypes.DATE,
			infoSelf: DataTypes.TEXT,
			avatar: {
				type: DataTypes.STRING,
				get() {
					const avatar = this.getDataValue("avatar")
					const url = `${config.appUrl}:${config.appPort}`

					if (!avatar) {
						return `${url}/${this.getDataValue("gender")}.svg`
					}

					const id = this.getDataValue("id")
					return `${url}/user/${id}/${avatar}`
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	)
  return User;
};