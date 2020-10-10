import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Button, Nav, Navbar } from "react-bootstrap";
import Logo from "../../img/logo.png";
import { Context } from "../store/appContext";
import { Plus } from "react-bootstrap-icons";
import "../../styles/navbar.scss";

export const Navigation = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();
	return (
		<>
			{location.pathname == "/register" || location.pathname == "/login" || location.pathname == "/home" ? (
				""
			) : (
				<>
					<nav
						className="navbar navbar-expand-lg navbar-light bg-dark justify-content-between p-0"
						sticky="top">
						<Link to="/userhome">
							<img
								style={{ width: "2rem", height: "2.2rem" }}
								className="logo img-fluid rounded d-block ml-5"
								src={Logo}
								alt="ludotopy-logo"
							/>
						</Link>
						{`${store.user.username}` != "undefined" && (
							<h3 className="text-light">{`${store.user.username}`}</h3>
						)}

						<div className="navbar">
							<ul className="navbar-nav">
								<li className="nav-item p-2">
									<Button variant="success">{`${store.user.ludos} Lds`}</Button>
								</li>
								<li className="nav-item p-2">
									<Button variant="outline-success" onClick={actions.logUserOut}>
										Log out
									</Button>
								</li>
								<li className="nav-item">
									<Link to="/createBet">
										<Plus style={{ cursor: "pointer" }} className="plus" />
									</Link>
								</li>
							</ul>
						</div>
					</nav>
				</>
			)}
		</>
	);
};
