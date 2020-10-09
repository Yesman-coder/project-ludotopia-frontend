import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { TrashFill } from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";
import "../../styles/received_card.scss";

export function ReceivedCard({ id, sender, receiver, betTitle, betDesc, ammount, emissionDate, dueDate, status }) {
	const history = useHistory();
	const { store, actions } = useContext(Context);

	const [confirmed, setConfirmed] = useState(false);

	let esperandoShow = "";
	if (confirmed == true) {
		esperandoShow = "esperandoShow";
	}

	return (
		<div className="card text-center column p-3 d-flex">
			<div className="card-header row m-0 d-flex justify-content-around">
				<h3>{sender}</h3>
				<h4 className="text-muted">VS</h4>
				<h3>{receiver}</h3>
			</div>
			<div className="card-body">
				<h5 className="card-title text-break">{betTitle}</h5>
				<p className="card-text text-muted font-weight-light text-break">{betDesc}</p>
				<a href="#" className="btn-ludos btn btn-success">
					{`${ammount} Lds`}
				</a>

				<p className="mt-3">Emission Date {emissionDate}</p>
				<p className="mt-3">Due Date {dueDate}</p>
			</div>
			<div className="card-footer justifiy-content-space-around">
				<Button
					onClick={e => {
						if (ammount < store.user.ludos) {
							actions.fetchUpdateBet(id, "aceptado", true, "", "");
						} else {
							setConfirmed(true);
						}
					}}
					className="m-3"
					variant="outline-success">
					Aceptar
				</Button>
				<Button
					onClick={e => {
						actions.fetchUpdateBet(id, "rechazado", false, "", "");
					}}
					className="m-3"
					variant="outline-danger">
					Rechazar
				</Button>
			</div>
			<div className="d-flex justify-content-center">
				<p className={"esperando " + esperandoShow}>
					{" "}
					esta apuesta no puede ser aceptada, no tiene suficientes ludos
				</p>
			</div>
		</div>
	);
}

ReceivedCard.propTypes = {
	id: PropTypes.number,
	sender: PropTypes.string,
	receiver: PropTypes.string,
	betTitle: PropTypes.string,
	betDesc: PropTypes.string,
	ammount: PropTypes.number,
	emissionDate: PropTypes.string,
	dueDate: PropTypes.string,
	status: PropTypes.bool
};
