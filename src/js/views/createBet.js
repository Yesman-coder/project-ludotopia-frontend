import React, { useContext, useState, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../img/logo.png";
import "../../styles/register.scss";
import { Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

//npm install @material-ui/core

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 250
	}
}));

const schema = yup.object().shape({
	ludos: yup
		.number()
		.required()
		.positive()
		.integer(),
	name: yup.string().required(),
	description: yup.string().required(),
	due_date: yup.string().required(),
	receiver_name: yup.string().required()
});

export const CreateBet = () => {
	const { store, actions } = useContext(Context);
	const [confirmed, setConfirmed] = useState(true);
	const history = useHistory();
	const { register, errors, handleSubmit, control } = useForm({
		resolver: yupResolver(schema)
	});
	const classes = useStyles();

	const onSubmit = useCallback(async data => {
		let success = await actions.fetchCreateBet(
			data.ludos,
			data.name,
			data.description,
			data.due_date,
			data.receiver_name
		);
		if (success) {
			history.push("/userhome");
		} else {
			setConfirmed(false);
		}
	}, []);
	return (
		<div className="register container-fluid d-flex flex-column align-items-center">
			<>
				<a href="/register">
					<img
						style={{ width: "120px", height: "135px" }}
						className="img-fluid rounded mx-auto d-block mt-4"
						src={Logo}
						alt="ludotopy-logo"
					/>
				</a>
				<h1 className="mt-5">Crear Apuesta</h1>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group container-fluid d-flex flex-column">
						<label className="label" htmlFor="exampleInputEmail1">
							Nombre de la apuesta
						</label>
						<input
							name="name"
							ref={register()}
							className="input form-control"
							type="text"
							id="exampleFormControlInput1"
						/>
						{errors.name && <p className="text-danger">Por favor introduzca un nombre de apuesta!</p>}

						<label className="label" htmlFor="exampleInputEmail1">
							Descripcion
						</label>
						<input
							name="description"
							ref={register()}
							className="input form-control"
							type="text"
							id="exampleFormControlInput1"
						/>
						{errors.description && <p className="text-danger">Por favor introduzca una descripcion</p>}

						<label className="label" htmlFor="exampleInputEmail1">
							Enviar a:
						</label>
						<input
							name="receiver_name"
							ref={register()}
							className="input form-control"
							type="text"
							id="exampleFormControlInput1"
						/>

						{errors.receiver_name && <p className="text-danger">Por favor introduzca un receptor!</p>}

						<label className="label" htmlFor="exampleInputEmail1">
							Ludos a apostar:
						</label>
						<input
							name="ludos"
							ref={register()}
							className="input form-control"
							type="text"
							id="exampleFormControlInput1"
						/>
						{errors.ludos && <p className="text-danger">Por favor introduzca un monto!</p>}

						<Form.Group controlId="formGroupPassword">
							<Form.Label className="label">Fecha de expiracion </Form.Label>
							{/* <form className={classes.container} noValidate> */}
							<Controller
								as={TextField}
								control={control}
								className={classes.textField}
								name="due_date"
								id="datetime-local"
								type="datetime-local"
								defaultValue="2017-05-24T10:30"
								InputLabelProps={{ shrink: true }}
							/>
							{/* <TextField
								id="datetime-local"
								type="datetime-local"
								name="due_date"
								defaultValue="2017-05-24T10:30"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								inputRef={register()}
							/> */}
							{errors.due_date && (
								<p className="text-danger">Por favor introduzca una fecha de expiracion!</p>
							)}
							{/* </form> */}
						</Form.Group>

						<Button className="button mt-2" variant="success" type="submit">
							Enviar
						</Button>
						<div className="container-fluid d-flex justify-content-center">
							<p className="">
								<span onClick={e => history.push(`/userhome`)}>Cancelar</span>
							</p>
						</div>
					</div>
				</form>
			</>
		</div>
	);

	// 	const { store, actions } = useContext(Context);
	// 	const [betName, setBetName] = useState("");
	// 	const [description, setDescription] = useState("");
	// 	const [targetUser, setTargetUser] = useState("");
	// 	const [ludos, setLudos] = useState("");
	// 	const [dueDate, setDueDate] = useState("");
	// 	const history = useHistory();
	// 	const classes = useStyles();

	// 	return (
	// 		<>
	// 			<div className="register container-fluid d-flex flex-column align-items-center">
	// 				<a href="/">
	// 					<img
	// 						style={{ width: "120px", height: "135px" }}
	// 						className="img-fluid rounded mx-auto d-block mt-4"
	// 						src={Logo}
	// 						alt="ludotopy-logo"
	// 					/>
	// 				</a>
	// 				<h1 className="mt-5">Create Bet</h1>
	// 				<Form>
	// 					<Form.Group controlId="formGroupPassword">
	// 						<Form.Label className="label">Título de la apuesta: </Form.Label>
	// 						<Form.Control onChange={e => setBetName(e.target.value)} className="input" type="text" />
	// 					</Form.Group>
	// 					<Form.Group controlId="formGroupPassword">
	// 						<Form.Label className="label">Descripción: </Form.Label>
	// 						<Form.Control onChange={e => setDescription(e.target.value)} className="input" type="text" />
	// 					</Form.Group>
	// 					<Form.Group controlId="formGroupPassword">
	// 						<Form.Label className="label">Enviar a: </Form.Label>
	// 						<Form.Control onChange={e => setTargetUser(e.target.value)} className="input" type="text" />
	// 					</Form.Group>
	// 					<Form.Group controlId="formGroupPassword">
	// 						<Form.Label className="label">Ludos: </Form.Label>
	// 						<Form.Control onChange={e => setLudos(e.target.value)} className="input" type="text" />
	// 					</Form.Group>
	// 					<Form.Group controlId="formGroupPassword">
	// 						<Form.Label className="label">Fecha de expiracion </Form.Label>
	// 						<TextField
	// 							id="datetime-local"
	// 							type="datetime-local"
	// 							defaultValue="2017-05-24T10:30"
	// 							className={classes.textField}
	// 							InputLabelProps={{
	// 								shrink: true
	// 							}}
	// 							onChange={e => setDueDate(e.target.value)}
	// 						/>
	// 					</Form.Group>
	// 				</Form>
	// 				{/* <Button
	// 					onClick={e => {
	// 						actions.fetchCreateUser(email, name, lastname, phone, username, pw);
	// 						history.push(`/login`);
	// 					}}
	// 					className="button"
	// 					variant="success"
	// 					type="submit">
	// 					Registrarse
	// 				</Button>
	// 				<p>
	// 					Ya tienes una cuenta <span onClick={e => history.push(`/login`)}>Inicia Sesion</span>
	// 				</p> */}
	// 			</div>
	// 		</>
	// 	);
};
