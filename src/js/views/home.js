import React, { useContext, useEffect } from "react";
import Logo from "../../img/logo.png";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useHistory, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<>
			{store.token == "" ? (
				<div className="h-100 container-fluid d-flex flex-column p-5">
					<div className="content justify-content-center">
						<h3>Hola! Bienvenido a Ludotopy</h3>
						<img style={{ width: "12rem", height: "12.5rem" }} src={Logo} />
					</div>
					<div className="content justify-content-start">
						<Button
							onClick={async e => {
								history.push("/login");
							}}
							className="button"
							variant="success"
							type="submit">
							Inicia Sesión
						</Button>
						<Button
							onClick={async e => {
								history.push("/register");
							}}
							className="button"
							variant="success"
							type="submit">
							Registrate
						</Button>
					</div>
				</div>
			) : (
				<Redirect to="/userhome" />
			)}
		</>
	);
};
