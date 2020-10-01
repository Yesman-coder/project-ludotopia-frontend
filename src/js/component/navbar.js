import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Button, Nav, Navbar, NavDropdown, FormControl } from "react-bootstrap";
import Logo from "../../img/logo.png";
import Chip from "../../img/chip.png";
import { Context } from "../store/appContext";
import { Plus, HouseFill, Search, BellFill, Cash } from "react-bootstrap-icons";
import "../../styles/navbar.scss";

export const Navigation = () => {
	const { store } = useContext(Context);
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
									className="logo img-fluid rounded d-block"
									src={Logo}
									alt="ludotopy-logo"
								/>
							</a>
						</Navbar.Brand>
						{`${store.user.username}` != "undefined" && <h3>{`${store.user.username}`}</h3>}
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="m-auto">
								<Button className="btn-ludos" variant="success" size="lg" block>
									700 Lds
								</Button>
							</Nav>
							<Form inline>
								<Plus style={{ cursor: "pointer" }} className="plus" />
							</Form>
						</Navbar.Collapse>
					</Navbar>
					<div className="container-fluid d-flex flex-column p-0">
						<div
							style={{
								position: "fixed",
								height: "100vh"
							}}
							className="vertical nav nav-tabs nav-stacked justify-content-center align-items-center bg-light"
							id="v-pills-tab"
							role="tablist"
							aria-orientation="vertical">
							<a
								className="nav-link tablet"
								id="v-pills-home-tab"
								data-toggle="pill"
								href="/userhome"
								role="tab"
								aria-controls="v-pills-home"
								aria-selected="true">
								<HouseFill className="icon" />
							</a>
							<a
								className="nav-link tablet"
								id="v-pills-profile-tab"
								data-toggle="pill"
								href="/search"
								role="tab"
								aria-controls="v-pills-profile"
								aria-selected="false">
								<Search className="icon" />
							</a>
							<a
								className="nav-link tablet"
								id="v-pills-messages-tab"
								data-toggle="pill"
								href="#v-pills-messages"
								role="tab"
								aria-controls="v-pills-messages"
								aria-selected="false">
								<BellFill className="icon" />
							</a>
							<a
								className="nav-link button-chip"
								id="v-pills-settings-tab"
								data-toggle="pill"
								href="#v-pills-settings"
								role="tab"
								aria-controls="v-pills-settings"
								aria-selected="false">
								<img style={{ width: "2rem", height: "2rem" }} src={Chip} alt="poker-chip" />
							</a>
							<a
								className="nav-link tablet"
								id="v-pills-messages-tab"
								data-toggle="pill"
								href="#v-pills-messages"
								role="tab"
								aria-controls="v-pills-messages"
								aria-selected="false">
								<Cash className="icon" />
							</a>
						</div>
					</div>
				</>
			)}
		</>
	);
};
