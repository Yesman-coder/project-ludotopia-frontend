import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../img/logo.png";
import { Context } from "../store/appContext";
import { Plus, HouseFill, Search, BellFill, Cash, Bullseye, House } from "react-bootstrap-icons";
import "../../styles/navbar.scss";

export const Sidebar = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();
	return (
		<>
			{location.pathname == "/register" || location.pathname == "/login" || location.pathname == "/" ? (
				""
			) : (
				<div className="sidebar col-3 col-md-2 col-lg-1 p-0 ">
					<nav className="nav flex-column w-100 text-center pl-3">
						<Link className="icon nav-link" to="/userhome">
							<Bullseye />
						</Link>
						<Link className="icon nav-link" to="/search">
							<Search />
						</Link>
						<a className="icon nav-link" href="#">
							<BellFill />
						</a>
						<a className="icon nav-link" href="#">
							<Cash />
						</a>
					</nav>
				</div>
			)}
		</>
	);
};
