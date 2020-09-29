import React, { useContext, useEffect } from "react";
import Logo from "../../img/logo.png";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { UserCard } from "../component/usercard.js";
import { useHistory, Redirect } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<div className="h-100 container-fluid d-flex flex-column">
			{store.token != "" ? (
				<div className="content justify-content-center">
					{/* CONDITIONAL RENDERING OF THE GREET */}
					{`${store.user.username}` != "undefined" && <h1>Hello {`${store.user.username}`}</h1>}
					<img style={{ marginTop: "3rem", width: "12rem", height: "12.5rem" }} src={Logo} />
					<a href="#" className="btn btn-success mt-5">
						If you see this green button, bootstrap is working
					</a>
				</div>
			) : (
				<Redirect to="/login" />
			)}
		</div>
	);
};
