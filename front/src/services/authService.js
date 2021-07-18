import API from './api'

const AuthService = {
    login: (data) => {
        console.log(data);
        return API.post('/login', data)
            .then(({ data }) => {
                // setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },

    register: (data) => {
        return API.post('/register', data)
            .then(({ data }) => {
                // setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    }
}


const setHeadersAndStorage = ({ user, token }) => {
	API.defaults.headers["Authorization"] = `Bearer ${token}`
	localStorage.setItem("user", JSON.stringify({ user, token }))
}

export default AuthService