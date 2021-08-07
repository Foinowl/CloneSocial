import axios from "axios"
import {store} from "../store/index"
import { logout } from "../store/actions/auth"

const data = JSON.parse(localStorage.getItem("persist:user"))
const newData = data
	? JSON.parse(data.auth) : ''

console.log(store);

const API = axios.create({
	// baseURL: "http://127.0.0.1:3005",
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${newData.token || ""}`,
	},
})


API.interceptors.response.use(
	(res) => {
		return res
	},
	(err) => {
		if (err.response.status !== 401) {
			throw err
		}

		if (typeof err.response.data.error.name !== "undefined") {
			if (err.response.data.error.name === "TokenExpiredError") {
				store.dispatch(logout())
				throw err
			}
		}
	}
)

export default API
