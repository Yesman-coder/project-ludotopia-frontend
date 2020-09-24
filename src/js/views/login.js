import React, { useContext, useState } from "react";
import Logo from "../../img/logo.png";
import "../../styles/login.scss";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

function Login() {
	let localData = localStorage.getItem("token");
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<>
			<div className="login h-100 container-fluid d-flex flex-column">
				<div className="content justify-content-center">
					<a href="/login">
						<img
							style={{ width: "120px", height: "135px" }}
							className="img-fluid rounded mx-auto d-block mt-4"
							src={Logo}
							alt="ludotopy-logo"
						/>
					</a>
					<h1 className="mt-5">Inicia Sesión</h1>
					<Form>
						<Form.Group controlId="formGroupEmail">
							<Form.Label className="label">Email </Form.Label>
							<Form.Control onChange={e => setEmail(e.target.value)} className="input" type="email" />
						</Form.Group>
						<Form.Group controlId="formGroupPassword">
							<Form.Label className="label">Password</Form.Label>
							<Form.Control
								onChange={e => setPassword(e.target.value)}
								className="input"
								type="password"
							/>
						</Form.Group>
					</Form>
					<Button
						// onClick={async e => {
						// 	await actions.fetchLogin(email, password);
						// 	if (localData == undefined) {
						// 		history.push(`/login`);
						// 	} else {
						// 		history.push("/");
						// 	}
						// }}
						className="button"
						variant="success"
						type="submit">
						Inicia Sesión
					</Button>
					<p>
						No tienes una cuenta <span onClick={e => history.push(`/register`)}>Regístrate</span>
					</p>
				</div>
			</div>
		</>
	);
}

export default Login;
