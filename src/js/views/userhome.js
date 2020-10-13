import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useHistory, Redirect } from "react-router-dom";
import { ReceivedCard } from "../component/received_card.js";
import { SenderBetInProgress } from "../component/SenderBetInProgress.js";
import { ReceiverBetInProgress } from "../component/ReceiverBetInProgress.js";
import { CanceledBet } from "../component/CanceledBet.js";
import { SentCard } from "../component/sent_card.js";
import { FinishCard } from "../component/finish_card.js";
import { Tabs, Tab } from "react-bootstrap";

export const UserHome = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		actions.fetchGetUser(store.token);
	}, []);

	return (
		<>
			{store.token != "" ? (
				<Tabs defaultActiveKey="received" transition={false} id="noanim-tab-example">
					<Tab eventKey="received" title="Apuestas Recibidas">
						<div className="d-flex flex-column mt-4 align-items-center">
							<h1 className="m-3">Apuestas Recibidas</h1>
							<div className="d-flex row w-100 justify-content-center">
								{store.user.bets_received.map((newBet, index) => {
									console.log(newBet.state);
									if (newBet.state == "enviado") {
										return (
											<ReceivedCard
												key={index}
												id={newBet.id}
												sender={newBet.sender}
												receiver={newBet.receiver}
												betTitle={newBet.name}
												betDesc={newBet.description}
												ammount={newBet.ludos}
												emissionDate={newBet.create_date}
												dueDate={newBet.due_date}
											/>
										);
									}
								})}
							</div>
						</div>
					</Tab>
					<Tab eventKey="sent" title="Apuestas Enviadas">
						<div className="d-flex flex-column mt-4 align-items-center">
							<h1 className="m-3">Apuestas Enviadas</h1>
							<div className="d-flex row w-100 justify-content-center">
								{store.user.bets_sent.map((newBet, index) => {
									if (newBet.state == "enviado") {
										return (
											<SentCard
												key={index}
												id={newBet.id}
												sender={newBet.sender}
												receiver={newBet.receiver}
												betTitle={newBet.name}
												betDesc={newBet.description}
												ammount={newBet.ludos}
												emissionDate={newBet.create_date}
												dueDate={newBet.due_date}
											/>
										);
									}
								})}
							</div>
						</div>
					</Tab>
					<Tab eventKey="active" title="Apuestas Activas">
						<div className="d-flex flex-column mt-4 align-items-center">
							<h1 className="m-3">Apuestas Activas</h1>
							<div className="d-flex row w-100 justify-content-center">
								{store.user.bets_received.map((newBet, index) => {
									if (newBet.state == "aceptado" || newBet.state == "deciding") {
										return (
											<>
												<ReceiverBetInProgress
													key={index}
													id={newBet.id}
													sender={newBet.sender}
													receiver={newBet.receiver}
													betTitle={newBet.name}
													betDesc={newBet.description}
													ammount={newBet.ludos}
													emissionDate={newBet.create_date}
													dueDate={newBet.due_date}
													winner_sender={newBet.winner_sender}
													winner_receiver={newBet.winner_receiver}
												/>
											</>
										);
									}
								})}
								{store.user.bets_sent.map((newBet, index) => {
									if (newBet.state == "aceptado" || newBet.state == "deciding") {
										return (
											<>
												<SenderBetInProgress
													key={index}
													id={newBet.id}
													sender={newBet.sender}
													receiver={newBet.receiver}
													betTitle={newBet.name}
													betDesc={newBet.description}
													ammount={newBet.ludos}
													emissionDate={newBet.create_date}
													dueDate={newBet.due_date}
													winner_sender={newBet.winner_sender}
													winner_receiver={newBet.winner_receiver}
												/>
											</>
										);
									}
								})}
							</div>
						</div>
					</Tab>
					<Tab eventKey="finished" title="Apuestas Concluidas">
						<div className="d-flex flex-column mt-4">
							<h1 className="m-3">Apuestas Concluidas</h1>
							<div className="d-flex row w-100 justify-content-center">
								{store.user.bets_sent.map((newBet, index) => {
									if (
										newBet.state == "empate" ||
										newBet.state == "ganador" ||
										newBet.state == "desacuerdo"
									) {
										return (
											<FinishCard
												key={index}
												index={index}
												sender={newBet.sender}
												receiver={newBet.receiver}
												betTitle={newBet.name}
												betDesc={newBet.description}
												ammount={newBet.ludos}
												emissionDate={newBet.create_date}
												dueDate={newBet.due_date}
												state={newBet.state}
												winner_sender={newBet.winner_sender}
												winner_receiver={newBet.winner_receiver}
											/>
										);
									}
								})}
								{store.user.bets_received.map((newBet, index) => {
									if (
										newBet.state == "empate" ||
										newBet.state == "ganador" ||
										newBet.state == "desacuerdo"
									) {
										return (
											<FinishCard
												key={index}
												index={index}
												sender={newBet.sender}
												receiver={newBet.receiver}
												betTitle={newBet.name}
												betDesc={newBet.description}
												ammount={newBet.ludos}
												emissionDate={newBet.create_date}
												dueDate={newBet.due_date}
												state={newBet.state}
												winner_sender={newBet.winner_sender}
												winner_receiver={newBet.winner_receiver}
											/>
										);
									}
								})}
							</div>
						</div>
					</Tab>
					<Tab eventKey="canceled" title="Apuestas Canceladas">
						<div className="d-flex flex-column mt-4">
							<h1 className="m-3">Apuestas Canceladas</h1>
							<div className="d-flex row w-100 justify-content-center">
								{store.user.bets_sent.map((newBet, index) => {
									if (newBet.state == "rechazado" || newBet.state == "cancelado") {
										return (
											<CanceledBet
												key={index}
												id={newBet.id}
												sender={newBet.sender}
												receiver={newBet.receiver}
												betTitle={newBet.name}
												betDesc={newBet.description}
												ammount={newBet.ludos}
												emissionDate={newBet.create_date}
												dueDate={newBet.due_date}
											/>
										);
									}
								})}
							</div>
						</div>
					</Tab>
				</Tabs>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
};
