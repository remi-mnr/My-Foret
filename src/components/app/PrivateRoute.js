import React from "react"
import ScrollToTop from './ScrollToTop'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
	// useEffect(() => {
	// 	if (!isLoggedIn() && location.pathname !== `/login`) {
	// 		navigate(`/login`, { replace: true })
	// 	}
	// }, [])
	return [<ScrollToTop key="scrollTop"/>,<Component {...rest} key="comp"/>]
}

export default PrivateRoute
