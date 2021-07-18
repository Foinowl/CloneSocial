import axios from "axios"


const API = axios.create({
	baseURL: "http://127.0.0.1:3005",
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
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
