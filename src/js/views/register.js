import React from "react";
import Logo from "../../img/logo.png";
import "../../styles/register.scss";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Register() {
	const history = useHistory();
	return (
		<>
			<div className="register container-fluid d-flex flex-column align-items-center">
				<a href="/register">
					<img
						style={{ width: "120px", height: "135px" }}
						className="img-fluid rounded mx-auto d-block mt-4"
						src={Logo}
						alt="ludotopy-logo"
					/>
				</a>
				<h1 className="mt-5">Registrarse</h1>
				<Form>
					<Form.Group controlId="formGroupEmail">
						<Form.Label className="label">Email</Form.Label>
						<Form.Control className="input" type="email" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Nombre de usuario</Form.Label>
						<Form.Control className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Nombre</Form.Label>
						<Form.Control className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Apellido</Form.Label>
						<Form.Control className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Telefono</Form.Label>
						<Form.Control className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Contraseña</Form.Label>
						<Form.Control className="input" type="password" />
					</Form.Group>
				</Form>
				<Button className="button" variant="success" type="submit">
					Registrarse
				</Button>
				<p>
					Ya tienes una cuenta <span onClick={e => history.push(`/login`)}>Inicia Sesion</span>
				</p>
			</div>
		</>
	);
}

export default Register;
