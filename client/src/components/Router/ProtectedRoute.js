import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = ({ component: Component, ...props }) => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

	return (
		<Route
			{...props}
			render={(props) =>
				isLoggedIn ? <Component {...props} /> : <Redirect to="/auth" />
			}
		/>
	)
}

export default ProtectedRoute
