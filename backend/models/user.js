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
			avatar: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	)
  return User;
};