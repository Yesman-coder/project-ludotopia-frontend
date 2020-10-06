import React, { useContext, useEffect } from "react";
import Logo from "../../img/logo.png";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useHistory, Redirect } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<div className="h-100 container-fluid d-flex flex-column p-5">
			<div className="content justify-content-center ml-5 p-5">
				<h3>Hola! Bienvenido a Ludotopy</h3>
				<img style={{ width: "12rem", height: "12.5rem" }} src={Logo} />
			</div>
		</div>
	);
};
