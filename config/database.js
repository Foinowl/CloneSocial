require("dotenv").config()

module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "postgres",
		logging: false,
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "postgres",
		logging: false,
	},
	// production: {
	// 	dialectOptions: {
	// 		connectionString: process.env.DATABASE_URL,
	// 	},
	// },
	production: {
		"use_env_variable": "DATABASE_URL",
		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: true
		},
	
	},
}
