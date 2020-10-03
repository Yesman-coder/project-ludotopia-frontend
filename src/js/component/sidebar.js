import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Button, Nav, Navbar, NavDropdown, FormControl } from "react-bootstrap";
import Logo from "../../img/logo.png";
import { Context } from "../store/appContext";
import { Plus, HouseFill, Search, BellFill, Cash, Bullseye, House } from "react-bootstrap-icons";
import "../../styles/navbar.scss";

export const Sidebar = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();
	return (
		<>
			{location.pathname == "/register" || location.pathname == "/login" || location.pathname == "/home" ? (
				""
			) : (
				<div className="sidebar col-3 col-md-2 col-lg-1 p-0 ">
					<nav className="nav flex-column w-100 text-center pl-3">
						<a className="icon nav-link active" href="#">
							<HouseFill />
						</a>
						<a className="icon nav-link" href="#">
							<Search />
						</a>
						<a className="icon nav-link" href="#">
							<BellFill />
						</a>
						<a className="icon nav-link" href="#">
							<Bullseye />
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
