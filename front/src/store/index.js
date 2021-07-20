import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import { persistStore } from "redux-persist"


import rootReducer from "./reducers"


const composeEnhancers =
	(process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose

const enhancer = composeEnhancers(
	applyMiddleware(thunk),
	// other store enhancers if any
)


const store = createStore(rootReducer, enhancer)

const persistor = persistStore(store)

export  { store, persistor }