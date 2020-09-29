import React, { useContext, useEffect } from "react";
import Logo from "../../img/logo.png";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
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
					<img style={{ width: "220px", height: "235px" }} src={Logo} />
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
