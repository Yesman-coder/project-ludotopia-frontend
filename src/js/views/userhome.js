import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useHistory, Redirect } from "react-router-dom";
import { ReceivedCard } from "../component/received_card.js";
import { SenderBetInProgress } from "../component/SenderBetInProgress.js";
import { ReceiverBetInProgress } from "../component/ReceiverBetInProgress.js";
import { SentCard } from "../component/sent_card.js";

export const UserHome = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		actions.fetchGetUser(store.token);
	}, []);

	return (
		<>
			{store.token != "" ? (
				<div className="h-100">
					<div className="d-flex flex-column mt-4">
						<h1 className="m-3">Apuestas Recibidas</h1>
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
							} else if (newBet.state == "aceptado" || newBet.state == "deciding") {
								return (
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
									/>
								);
							}
						})}
					</div>
					<div className="d-flex flex-column mt-4">
						<h1 className="m-3">Apuestas Enviadas</h1>
						{store.user.bets_sent.map((newBet, index) => {
							if (newBet.state == "enviado") {
								return (
									<SentCard
										key={index}
										index={index}
										sender={newBet.sender}
										receiver={newBet.receiver}
										betTitle={newBet.name}
										betDesc={newBet.description}
										ammount={newBet.ludos}
										emissionDate={newBet.create_date}
										dueDate={newBet.due_date}
									/>
								);
							} else if (newBet.state == "aceptado" || newBet.state == "deciding") {
								return (
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
									/>
								);
							}
						})}
					</div>
				</div>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
};
