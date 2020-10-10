import React, { useContext, useState, useCallback, useEffect } from "react";
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

	// useEffect(() => {
	// 	actions.fetchGetUser(store.token);
	// }, []);

	const onSubmit = useCallback(async data => {
		if (data.ludos < store.user.ludos) {
			let success = await actions.fetchCreateBet(
				data.ludos,
				data.name,
				data.description,
				data.due_date,
				data.receiver_name
			);
			if (success) {
				console.log("history");
				history.push("/userhome");
			} else {
				setConfirmed(false);
			}
		} else {
			setConfirmed(false);
		}
	}, []);

	let show = "";
	if (confirmed == false) {
		show = "show";
	}

	return (
		<>
			{store.token != "" ? (
				<div className="register container-fluid d-flex flex-column align-items-center">
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
								{errors.due_date && (
									<p className="text-danger">Por favor introduzca una fecha de expiracion!</p>
								)}
							</Form.Group>

							<Button className="button mt-2" variant="success" type="submit">
								Enviar
							</Button>
							<div className="container-fluid d-flex justify-content-center">
								<p className="">
									<span onClick={e => history.push(`/userhome`)}>Cancelar</span>
								</p>
							</div>
							<div className="d-flex justify-content-center">
								<p className={"error " + show}>* Apuesta no valida</p>
							</div>
						</div>
					</form>
				</div>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
};
