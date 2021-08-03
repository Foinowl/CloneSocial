import './App.css';
import { Auth } from './pages/Authentication/Auth'
import {Chat} from './pages/Chat/Chat'
import ProtectedRoute from "./components/Router/ProtectedRoute"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


import { library } from "@fortawesome/fontawesome-svg-core"
import { faSmile, faImage } from "@fortawesome/free-regular-svg-icons"
import {
	faSpinner,
	faEllipsisV,
	faUserPlus,
	faSignOutAlt,
	faTrash,
	faCaretDown,
	faUpload,
	faTimes,
	faBell,
	faRetweet,
	faPlusSquare,
	faWindowClose,
} from "@fortawesome/free-solid-svg-icons"
library.add(
	faSmile,
	faImage,
	faSpinner,
	faEllipsisV,
	faUserPlus,
	faSignOutAlt,
	faTrash,
	faCaretDown,
	faUpload,
	faTimes,
	faBell,
	faRetweet,
	faPlusSquare,
	faWindowClose,
)

function App() {
  return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/auth" component={Auth} />
					<ProtectedRoute exact path="/" component={Chat} />

					<Route render={() => <h1>404 page not found</h1>} />
				</Switch>
			</div>
		</Router>
	)
}

export default App;
