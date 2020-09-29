import React, { useContext, useState } from "react";
import Logo from "../../img/logo.png";
import "../../styles/register.scss";
import { Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

function CreateBet() {
	const { store, actions } = useContext(Context);
	const [betName, setBetName] = useState("");
	const [description, setDescription] = useState("");
	const [targetUser, setTargetUser] = useState("");
	const [ludos, setLudos] = useState("");
	const [dueDate, setDueDate] = useState("");
	const history = useHistory();
	const classes = useStyles();

	return (
		<>
			<div className="register container-fluid d-flex flex-column align-items-center">
				<a href="/">
					<img
						style={{ width: "120px", height: "135px" }}
						className="img-fluid rounded mx-auto d-block mt-4"
						src={Logo}
						alt="ludotopy-logo"
					/>
				</a>
				<h1 className="mt-5">Create Bet</h1>
				<Form>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Título de la apuesta: </Form.Label>
						<Form.Control onChange={e => setBetName(e.target.value)} className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Descripción: </Form.Label>
						<Form.Control onChange={e => setDescription(e.target.value)} className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Enviar a: </Form.Label>
						<Form.Control onChange={e => setTargetUser(e.target.value)} className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Ludos: </Form.Label>
						<Form.Control onChange={e => setLudos(e.target.value)} className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Fecha de expiracion </Form.Label>
						<TextField
							id="datetime-local"
							type="datetime-local"
							defaultValue="2017-05-24T10:30"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							onChange={e => setDueDate(e.target.value)}
						/>
					</Form.Group>
				</Form>
				{/* <Button
					onClick={e => {
						actions.fetchCreateUser(email, name, lastname, phone, username, pw);
						history.push(`/login`);
					}}
					className="button"
					variant="success"
					type="submit">
					Registrarse
				</Button>
				<p>
					Ya tienes una cuenta <span onClick={e => history.push(`/login`)}>Inicia Sesion</span>
				</p> */}
			</div>
		</>
	);
}

export default CreateBet;
