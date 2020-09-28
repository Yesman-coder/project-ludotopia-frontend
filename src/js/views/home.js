import React, { useContext, useEffect } from "react";
import Logo from "../../img/logo.png";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

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
		<div className="h-100 container-fluid d-flex flex-column">
			<div className="content justify-content-center">
				{/* CONDITIONAL RENDERING OF THE GREET */}
				{`${store.user.username}` != "undefined" && <h1>Hello {`${store.user.username}`}</h1>}
				<img style={{ width: "220px", height: "235px" }} src={Logo} />
				<a href="#" className="btn btn-success mt-5">
					If you see this green button, bootstrap is working
				</a>
			</div>
		</div>
	);
};
