import axios from "axios"

const data = JSON.parse(localStorage.getItem("persist:user"))
const newData = data ? JSON.parse(data.auth) : ""

const API = axios.create({
	baseURL: "http://127.0.0.1:3005",
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
	}
)

export default API
