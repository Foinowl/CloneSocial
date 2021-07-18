import AuthService from "../../services/authService"
import { LOGIN, REGISTER } from "../types/index"


export const login = (params, history) => (dispatch) => {
	console.log(params);
	return AuthService.login(params)
		.then((data) => {
			dispatch({ type: LOGIN, payload: data })
			history.push("/")
		})
		.catch((err) => {})
}

export const register = (params, history) => (dispatch) => {
	console.log(params);
	return AuthService.register(params)
		.then((data) => {
			dispatch({ type: REGISTER, payload: data })
			history.push("/")
		})
		.catch((err) => {})
}
