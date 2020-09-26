import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../img/logo.png";
import "../../styles/register.scss";
// import { Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.scss";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [phone, setPhone] = useState("");
	const [pw, setPw] = useState("");
	const history = useHistory();

	const { register, handleSubmit, errors } = useForm();
	const onSubmit = data => console.log(data);

	return (
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

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label className="label" htmlFor="exampleInputEmail1">
						Email address
					</label>
					<input
						name="email"
						ref={register({ required: true })}
						onChange={e => setEmail(e.target.value)}
						className="input form-control"
						type="email"
						id="exampleFormControlInput1"
					/>
					{errors.email && <p className="text-danger form-text text-muted">Por favor introduzca un email!</p>}

					<label className="label" htmlFor="exampleInputEmail1">
						Nombre de Usuario
					</label>
					<input
						name="userName"
						ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
						onChange={e => setUsername(e.target.value)}
						className="input form-control"
						type="text"
						id="exampleFormControlInput1"
					/>
					{errors.userName && (
						<p className="text-danger form-text text-muted">Por favor introduzca un nombre de usuario!</p>
					)}

					<label className="label" htmlFor="exampleInputEmail1">
						Nombre
					</label>
					<input
						name="name"
						ref={register({ max: 20, required: true, pattern: /^[A-Za-z]+$/i })}
						onChange={e => setName(e.target.value)}
						className="input form-control"
						type="text"
						id="exampleFormControlInput1"
					/>
					{errors.name && <p className="form-text text-muted">Por favor introduzca un nombre!</p>}

					<label className="label" htmlFor="exampleInputEmail1">
						Apellido
					</label>
					<input
						name="lastname"
						ref={register({ max: 20, required: true, pattern: /^[A-Za-z]+$/i })}
						onChange={e => setLastname(e.target.value)}
						className="input form-control"
						type="text"
						id="exampleFormControlInput1"
					/>
					{errors.lastname && <p className="form-text text-muted">Por favor introduzca un apellido!</p>}

					<label className="label" htmlFor="exampleInputEmail1">
						Teléfono
					</label>
					<input
						name="phone"
						ref={register({ max: 20, required: true, pattern: /^[A-Za-z]+$/i })}
						onChange={e => setLastname(e.target.value)}
						className="input form-control"
						type="text"
						id="exampleFormControlInput1"
					/>
					{errors.phone && <p className="form-text text-muted">Por favor introduzca un telefono!</p>}

					<label className="label" htmlFor="exampleInputEmail1">
						Contraseña
					</label>
					<input
						name="password"
						ref={register({ max: 20, required: true, pattern: /^[A-Za-z]+$/i })}
						onChange={e => setLastname(e.target.value)}
						className="input form-control"
						type="text"
						id="exampleFormControlInput1"
					/>
					{errors.contraseña && <p className="form-text text-muted">Por favor introduzca una contraseña!</p>}

					<input type="submit" />
				</div>
			</form>
		</div>
	);
};
