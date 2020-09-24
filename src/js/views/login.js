import React from "react";
import Logo from "../../img/logo.png";
import "../../styles/login.scss";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Login() {
	const history = useHistory();
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
							<Form.Label className="label">Email</Form.Label>
							<Form.Control className="input" type="email" />
						</Form.Group>
						<Form.Group controlId="formGroupPassword">
							<Form.Label className="label">Password</Form.Label>
							<Form.Control className="input" type="password" />
						</Form.Group>
					</Form>
					<Button className="button" variant="success" type="submit">
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
