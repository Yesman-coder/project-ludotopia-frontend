import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();
	return (
		<>
			{location.pathname == "/register" || location.pathname == "/login" ? (
				""
			) : (
				<nav className="navbar navbar-light bg-light mb-3">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">React Boilerplate</span>
					</Link>
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-primary">Check the Context in action</button>
						</Link>
						<Link to="/register">
							<button className="btn btn-primary">Register</button>
						</Link>
						<button className="btn btn-primary" onClick={e => actions.logUserOut()}>
							Log out
						</button>
					</div>
				</nav>
			)}
		</>
	);
};
