import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Button, Nav, Navbar, NavDropdown, FormControl } from "react-bootstrap";
import Logo from "../../img/logo.png";
import { Context } from "../store/appContext";
import { Plus, HouseFill, Search, BellFill, Cash, Bullseye, House } from "react-bootstrap-icons";
import "../../styles/navbar.scss";

export const Navigation = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();
	return (
		<>
			{location.pathname == "/register" || location.pathname == "/login" ? (
				""
			) : (
				<>
					<Navbar bg="light" sticky="top">
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
						{`${store.user.username}` != "undefined" && <h3>{`${store.user.username}`}</h3>}
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="m-auto">
								<Button className="btn-ludos" variant="success" size="md" block>
									700 Lds
								</Button>
							</Nav>
							<Form inline>
								<Plus style={{ cursor: "pointer" }} className="plus" />
							</Form>
						</Navbar.Collapse>
					</Navbar>
					<div className="sidebar container-fluid d-flex flex-row p-0 ">
						<nav className="nav flex-column">
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
				</>
			)}
		</>
	);
};
