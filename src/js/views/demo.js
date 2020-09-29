import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../img/logo.png";
import "../../styles/register.scss";
import { Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.scss";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

// IMPORT @hookform/resolvers
// IMPORT react-bootstrap

const schema = yup.object().shape({
	name: yup.string().required(),
	email: yup
		.string()
		.required()
		.email(),
	lastname: yup.string().required(),
	userName: yup.string().required(),
	phone: yup.number().required(),
	password: yup.string().required()
});

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [confirmed, setConfirmed] = useState(true);
	const history = useHistory();
	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = useCallback(async data => {
		let success = await actions.fetchCreateUser(
			data.email,
			data.name,
			data.lastname,
			data.phone,
			data.userName,
			data.password
		);
		if (success) {
			history.push("/login");
		} else {
			setConfirmed(false);
		}
	}, []);
	return (
		<div className="register container-fluid d-flex flex-column align-items-center">
			{store.token == "" ? (
				<>
					<a href="/register">
						<img
							style={{ width: "120px", height: "135px" }}
							className="img-fluid rounded mx-auto d-block mt-4"
							src={Logo}
							alt="ludotopy-logo"
						/>
					</a>
					<h1 className="mt-5">Registrarse</h1>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group container-fluid d-flex flex-column">
							<label className="label" htmlFor="exampleInputEmail1">
								Email address
							</label>
							<input
								name="email"
								ref={register()}
								className="input form-control"
								type="email"
								id="exampleFormControlInput1"
							/>
							{errors.email && <p className="text-danger">Por favor introduzca un email!</p>}

							<label className="label" htmlFor="exampleInputEmail1">
								Nombre de Usuario
							</label>
							<input
								name="userName"
								ref={register({ pattern: /^[A-Za-z]+$/i })}
								className="input form-control"
								type="text"
								id="exampleFormControlInput1"
							/>
							{errors.userName && (
								<p className="text-danger">Por favor introduzca un nombre de usuario!</p>
							)}

							<label className="label" htmlFor="exampleInputEmail1">
								Nombre
							</label>
							<input
								name="name"
								ref={register()}
								className="input form-control"
								type="text"
								id="exampleFormControlInput1"
							/>

							{errors.name && <p className="text-danger">Por favor introduzca un nombre!</p>}

							<label className="label" htmlFor="exampleInputEmail1">
								Apellido
							</label>
							<input
								name="lastname"
								ref={register()}
								className="input form-control"
								type="text"
								id="exampleFormControlInput1"
							/>
							{errors.lastname && <p className="text-danger">Por favor introduzca un apellido!</p>}

							<label className="label" htmlFor="exampleInputEmail1">
								Teléfono
							</label>
							<input
								name="phone"
								ref={register({ max: 20, required: true })}
								className="input form-control"
								type="text"
								id="exampleFormControlInput1"
							/>
							{errors.phone && <p className="text-danger">Por favor introduzca un telefono!</p>}

							<Form.Group controlId="formGroupPassword">
								<Form.Label className="label">Contraseña</Form.Label>
								<Form.Control
									className="input"
									type="password"
									name="password"
									ref={register({ max: 20, required: true })}
								/>
								{errors.password && <p className="text-danger">Por favor introduzca una contraseña!</p>}
							</Form.Group>
							<p className={"error m-1 "}>* Usuario no valido</p>
							{/* <input type="submit" className="button mt-5" /> */}
							<Button
								// onClick={e => {
								// 	// 	actions.fetchCreateUser(email, name, lastname, phone, username, pw);
								// 	// 	// history.push(`/login`);
								// 	historyPush(store.done);
								// }}
								className="button"
								variant="success"
								type="submit">
								Registrarse
							</Button>
							<div className="container-fluid d-flex justify-content-center">
								<p className="">
									Ya tienes una cuenta{" "}
									<span onClick={e => history.push(`/login`)}>Inicia Sesion</span>
								</p>
							</div>
						</div>
					</form>
				</>
			) : (
				<Redirect to="/" />
			)}
		</div>
	);
};
