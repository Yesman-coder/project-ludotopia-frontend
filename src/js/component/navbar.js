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
					<nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between" sticky="top">
						<a href="/userhome">
							<img
								style={{ width: "2rem", height: "2.2rem" }}
								className="logo img-fluid rounded d-block ml-4"
								src={Logo}
								alt="ludotopy-logo"
							/>
						</a>
						{`${store.user.username}` != "undefined" && <h3>{`${store.user.username}`}</h3>}

						<div className="navbar">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Button className="btn-ludos p-2" variant="success" size="sm" block>
										{`${store.user.ludos} Lds`}
									</Button>
								</li>
								<li className="nav-item">
									<Button
										className="btn-ludos btn-sm nav-link"
										variant="outline-success"
										onClick={actions.logUserOut}>
										Log out
									</Button>
								</li>
								<li className="nav-item">
									<a href="/create-bet">
										<Plus style={{ cursor: "pointer" }} className="plus" />
									</a>
								</li>
							</ul>
						</div>
					</nav>
					{/* <Navbar bg="light" sticky="top">
						<Navbar.Brand>
							<a href="/userhome">
								<img
									style={{ width: "2rem", height: "2.2rem" }}
									className="logo img-fluid rounded d-block ml-4"
									src={Logo}
									alt="ludotopy-logo"
								/>
							</a>
						</Navbar.Brand>
						{`${store.user.username}` != "undefined" && <h4>{`${store.user.username}`}</h4>}
						<Navbar.Toggle aria-controls="basic-navbar-nav" />

						<Nav className="m-auto">
							<Button className="btn-ludos" variant="success" size="sm" block>
								{`${store.user.ludos} Lds`}
							</Button>
							<Button className="btn-ludos btn-sm" variant="outline-success" onClick={actions.logUserOut}>
								Log out
							</Button>
						</Nav>
						<Form inline>
							<a href="/create-bet">
								<Plus style={{ cursor: "pointer" }} className="plus" />
							</a>
						</Form>
					</Navbar> */}
				</>
			)}
		</>
	);
};
