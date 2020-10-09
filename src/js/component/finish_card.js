import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { TrashFill } from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";
import "../../styles/received_card.scss";

export function FinishCard({
	id,
	sender,
	receiver,
	betTitle,
	betDesc,
	ammount,
	emissionDate,
	dueDate,
	state,
	winner_sender,
	winner_receiver
}) {
	const history = useHistory();
	const { store, actions } = useContext(Context);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
				{state == "ganador" &&
					(winner_sender == store.user.username && <div className="circle bg-success ml-auto" />)}
				{state == "ganador" &&
					(winner_sender != store.user.username && <div className="circle bg-danger ml-auto" />)}
				{state == "empate" && <div className="circle bg-primary ml-auto" />}
				{state == "desacuerdo" && <div className="circle bg-dark ml-auto" />}
			</div>
		</div>
	);
}

FinishCard.propTypes = {
	id: PropTypes.number,
	sender: PropTypes.string,
	receiver: PropTypes.string,
	betTitle: PropTypes.string,
	betDesc: PropTypes.string,
	ammount: PropTypes.number,
	emissionDate: PropTypes.string,
	dueDate: PropTypes.string,
	status: PropTypes.bool,
	state: PropTypes.string,
	winner_sender: PropTypes.string,
	winner_receiver: PropTypes.string
};
