import React, { useContext, useEffect } from "react";
import Logo from "../../img/logo.png";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useHistory, Redirect } from "react-router-dom";
import { UserCard } from "../component/usercard.js";

export const UserHome = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<>
			{store.token != "" ? (
				<div className="h-100 container-fluid d-flex flex-column">
					<div className="cel content justify-content-end">
						{store.user.bets_sent.map((newBet, id) => {
							return (
								<UserCard
									key={id}
									index={id}
									sender={newBet.sender}
									receiver={newBet.receiver}
									betTitle={newBet.betTitle}
									betDesc={newBet.betDesc}
									ludos={newBet.ludos}
									createDate={newBet.emissionDate}
									dueDate={newBet.dueDate}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
};
