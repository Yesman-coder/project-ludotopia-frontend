import React, { useContext, useState } from "react";
import Logo from "../../img/logo.png";
import "../../styles/register.scss";
import { Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";

function CreateBet() {
	const { store, actions } = useContext(Context);
	const [betName, setBetName] = useState("");
	const [description, setDescription] = useState("");
	const [targetUser, setTargetUser] = useState("");
	const [ludos, setLudos] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [dueTime, setDueTime] = useState("");
	const [emissionDate, setEmissionDate] = useState("");
	const history = useHistory();

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
						<Form.Label className="label">Fecha de expiración: </Form.Label>
						<Form.Control onChange={e => setDueDate(e.target.value)} className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Hora de expiracion: </Form.Label>
						<Form.Control onChange={e => setDueTime(e.target.value)} className="input" type="text" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label className="label">Fecha de emisión: </Form.Label>
						<Form.Control onChange={e => setEmissionDate(e.target.value)} className="input" type="text" />
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
