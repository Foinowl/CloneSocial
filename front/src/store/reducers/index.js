import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./auth"


const persistConfig = {
	key: "user",
	storage,
	whitelist: ["auth"],
}

const rootReducer = combineReducers({
	auth: authReducer,
})

export default persistReducer(persistConfig, rootReducer)