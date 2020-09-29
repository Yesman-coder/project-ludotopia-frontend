import React, { useContext, useEffect } from "react";
import Logo from "../../img/logo.png";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { UserCard } from "../component/usercard.js";

export const Home = () => {
	const { store, actions } = useContext(Context);
	let local_jwt = localStorage.getItem("tokenlogin");
	//let local_done = localStorage.getItem("done");
	const history = useHistory();

	function historyPush(data) {
		console.log("dontro del history");
		console.log(data);
		if (data === false) {
			history.push("/login");
		}
	}

	useEffect(() => {
		// if (local_done == true || local_done == null) {
		actions.fetchGetUser(JSON.parse(local_jwt));
		historyPush(store.done);
		// } else {
		// 	history.push("/login");
		// }
	}, []);

	return (
		<div className="h-100 container-fluid d-flex flex-column ml-4">
			<div className="content justify-content-center p-5">
				{`${store.user.username}` != "undefined" && <h3>Hello {`${store.user.username}`}</h3>}
				<img style={{ marginTop: "3rem", width: "12rem", height: "12.5rem" }} src={Logo} />
				<a href="#" className="btn btn-success mt-5">
					If you see this green button, bootstrap is working
				</a>
			</div>
		</div>
	);
};
