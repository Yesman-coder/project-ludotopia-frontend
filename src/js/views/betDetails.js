import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, Redirect } from "react-router-dom";

function BetDetails() {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	useEffect(() => {
		actions.fetchBetId(id);
	}, []);

	return (
		<>
			{store.token != "" ? (
				<div className="card text-center column p-3 d-flex">
					<div className="card-header row m-0 d-flex justify-content-around">
						<h3>{store.betId.sender}</h3>
						<h4 className="text-muted">VS</h4>
						<h3>{store.betId.receiver}</h3>
					</div>
					<div className="card-body">
						<h5 className="card-title text-break">{store.betId.name}</h5>
						<p className="card-text text-muted font-weight-light text-break">{store.betId.description}</p>
						<a href="#" className="btn btn-success">
							{`${store.betId.ludos} Lds`}
						</a>

						<p className="mt-3">Emission Date {store.betId.create_date}</p>
						<p className="mt-3">Due Date {store.betId.due_date}</p>

						{store.betId.state == "ganador" && <p>{`Ganó: ${store.betId.winner_sender}`}</p>}
						{store.betId.state == "ganador" &&
							store.betId.winner_sender != store.betId.sender && <p>{`Perdió: ${store.betId.sender}`}</p>}
						{store.betId.state == "ganador" && store.betId.winner_sender == store.betId.sender ? (
							<p>{`Perdió: ${store.betId.receiver}`}</p>
						) : (
							""
						)}
						{store.betId.state == "ganador" && <div className="circle bg-success ml-auto" />}
						{store.betId.state == "deciding" && <div className="circle bg-warning ml-auto" />}
						{store.betId.state == "aceptado" && <div className="circle bg-warning ml-auto" />}
						{store.betId.state == "enviado" && <div className="circle bg-secondary ml-auto" />}
						{store.betId.state == "empate" && <div className="circle bg-primary ml-auto" />}
						{store.betId.state == "desacuerdo" && <div className="circle bg-dark ml-auto" />}
					</div>
				</div>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
}

export default BetDetails;
