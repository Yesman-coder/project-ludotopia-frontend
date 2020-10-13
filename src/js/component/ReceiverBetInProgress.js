import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { TrashFill } from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";
import "../../styles/received_card.scss";

export function ReceiverBetInProgress({
	id,
	sender,
	receiver,
	betTitle,
	betDesc,
	ammount,
	emissionDate,
	dueDate,
	winner_sender,
	winner_receiver
}) {
	const history = useHistory();
	const { store, actions } = useContext(Context);

	let esperando = "";
	let responde = "";
	let decidido = "";

	if (winner_receiver != "") {
		esperando = "esperandoShow";
		decidido = "decidido";
	}
	if (winner_sender != "") {
		responde = "respondeShow";
	}

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
				<a href="#" className="btn-ludos btn btn-success">
					{`${ammount} Lds`}
				</a>

				<p className="mt-3">Emission Date {emissionDate}</p>
				<p className="mt-3">Due Date {dueDate}</p>
				{`${store.user.bets_received.status}` && <div className="circle bg-warning ml-auto" />}
			</div>
			<div className={"card-footer " + decidido}>
				<Button
					onClick={e => {
						actions.fetchUpdateBetReceiver(id, "deciding", true, `${sender}`);
					}}
					className="m-3"
					variant="outline-success">
					{`${sender} es el ganador`}
				</Button>
				<Button
					onClick={e => {
						actions.fetchUpdateBetReceiver(id, "deciding", true, "empate");
					}}
					className="m-3"
					variant="outline-primary">
					Empate
				</Button>
				<Button
					onClick={e => {
						actions.fetchUpdateBetReceiver(id, "deciding", true, `${receiver}`);
					}}
					className="m-3"
					variant="outline-success">
					{`${receiver} es el ganador`}
				</Button>
			</div>
			<div className="d-flex justify-content-center">
				<p className={"esperando " + esperando}>esperando respuesta ...</p>
				<p className={"responde " + responde}>ya respondieron apurate ...</p>
			</div>
		</div>
	);
}

ReceiverBetInProgress.propTypes = {
	id: PropTypes.number,
	sender: PropTypes.string,
	receiver: PropTypes.string,
	betTitle: PropTypes.string,
	betDesc: PropTypes.string,
	ammount: PropTypes.number,
	emissionDate: PropTypes.string,
	dueDate: PropTypes.string,
	status: PropTypes.bool,
	winner_sender: PropTypes.string,
	winner_receiver: PropTypes.string
};
