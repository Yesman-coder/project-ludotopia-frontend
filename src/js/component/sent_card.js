import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { TrashFill } from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";
// import "../../styles/ucard.scss";

export function SentCard({ id, sender, receiver, betTitle, betDesc, ammount, emissionDate, dueDate }) {
	const history = useHistory();
	const { store, actions } = useContext(Context);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="card text-center column p-3 d-flex m-4">
			<div className="card-header row m-0 d-flex justify-content-around">
				<h3>{sender}</h3>
				<h4 className="text-muted">VS</h4>
				<h3>{receiver}</h3>
			</div>
			<div className="card-body">
				<h5 className="card-title text-break">{betTitle}</h5>
				<p className="card-text text-muted font-weight-light text-break">{betDesc}</p>
				<a href="#" className="btn btn-success">
					{`${ammount} Lds`}
				</a>

				<p className="mt-3">Emission Date {emissionDate}</p>
				<p className="mt-3">Due Date {dueDate}</p>

				{`${store.user.bets_received.status}` && <div className="circle bg-secondary ml-auto" />}

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>¿Estás seguro?</Modal.Title>
					</Modal.Header>
					<Modal.Body>Seguro quieres cancelar esta apuesta</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							No
						</Button>
						{/* EN ESTE BOTON DE ABAJO HAY QUE AGREGAR EL CAMBIO DE ESTADO PARA EL SOFT DELETE DE LA APUESTA EN
						LUGAR DEL HANDLECLOSE */}
						<Button
							variant="success"
							onClick={e => {
								actions.fetchUpdateBet(id, "cancelado", false, "", "");
								handleClose;
							}}>
							Si
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div className="card-footer justifiy-content-space-around">
				<Button className="m-3" variant="success" onClick={handleShow}>
					Cancelar Envio
				</Button>
			</div>
		</div>
	);
}

SentCard.propTypes = {
	id: PropTypes.number,
	sender: PropTypes.string,
	receiver: PropTypes.string,
	betTitle: PropTypes.string,
	betDesc: PropTypes.string,
	ammount: PropTypes.number,
	emissionDate: PropTypes.string,
	dueDate: PropTypes.string
};
