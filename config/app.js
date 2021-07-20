require("dotenv").config()

module.exports = {
	appKey: process.env.NODE_ENV ? process.env.appKey : process.env.APP_KEY,
	appUrl: process.env.NODE_ENV ? process.env.URL : process.env.APP_URL,
	appPort: process.env.NODE_ENV ? process.env.PORT : process.env.APP_PORT,
}

