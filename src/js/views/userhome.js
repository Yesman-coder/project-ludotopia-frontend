import React, { useContext, useEffect } from "react";
import Logo from "../../img/logo.png";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { UserCard } from "../component/usercard.js";

export const UserHome = () => {
	const { store, actions } = useContext(Context);
	let local_jwt = localStorage.getItem("tokenlogin");
	const history = useHistory();

	useEffect(() => {
		actions.fetchGetUser(JSON.parse(local_jwt));
	}, []);

	return (
		<div className="h-100 container-fluid d-flex flex-column ml-4">
			<div className="content justify-content-center p-5">
				{/* CONDITIONAL RENDERING OF THE GREET */}
				<UserCard
					index={1}
					sender="Yesman"
					receiver="Boris"
					betTitle="Apostar tus nalgas"
					betDesc="El que se caiga de nalgas pierde"
					ammount="700 Lds"
					emissionDate="13-12-2020"
					dueDate="13-12-2020"
				/>
			</div>
		</div>
	);
};
