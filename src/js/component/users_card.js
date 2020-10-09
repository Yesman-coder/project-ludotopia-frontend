import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { TrashFill } from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";
// import "../../styles/ucard.scss";

export function UserCard({
	index,
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
	const { store, actions } = useContext(Context);

	return (
		<div className="card text-center column p-3 d-flex">
			<div className="card-header row m-0 d-flex justify-content-around" id={index}>
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

				{state == "aceptado" && <div className="circle bg-warning ml-auto" />}
				{state == "deciding" && <div className="circle bg-warning ml-auto" />}
				{state == "enviado" && <div className="circle bg-secondary ml-auto" />}
				{state == "ganador" &&
					(winner_sender == store.userId.username && <div className="circle bg-success ml-auto" />)}
				{state == "ganador" &&
					(winner_sender != store.userId.username && <div className="circle bg-danger ml-auto" />)}
				{state == "empate" && <div className="circle bg-primary ml-auto" />}
				{state == "desacuerdo" && <div className="circle bg-dark ml-auto" />}
			</div>
		</div>
	);
}

UserCard.propTypes = {
	index: PropTypes.number,
	id: PropTypes.number,
	sender: PropTypes.string,
	receiver: PropTypes.string,
	betTitle: PropTypes.string,
	betDesc: PropTypes.string,
	ammount: PropTypes.number,
	emissionDate: PropTypes.string,
	dueDate: PropTypes.string,
	state: PropTypes.string,
	winner_sender: PropTypes.string,
	winner_receiver: PropTypes.string
};
