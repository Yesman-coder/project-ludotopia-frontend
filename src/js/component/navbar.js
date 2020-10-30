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
			{location.pathname == "/register" || location.pathname == "/login" || location.pathname == "/" ? (
				""
			) : (
				<>
					<nav className="navbar d-md-flex  fixed-top bg-dark justify-content-between    p-0">
						<Link className="px-4 " to="/userhome">
							<img
								style={{ width: "2rem", height: "2.2rem" }}
								className="logo img-fluid rounded d-block "
								src={Logo}
								alt="ludotopy-logo"
							/>
						</Link>
						{`${store.user.username}` != "undefined" && (
							<h3 className="username text-center text-light">{`${store.user.username}`}</h3>
						)}

						<Button className="correct-size nav-item mr-2" variant="success">{`${
							store.user.ludos
						} Lds`}</Button>
					</nav>
				</>
			)}
		</>
	);
};
