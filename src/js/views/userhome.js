import React, { useContext, useEffect } from "react";
import Logo from "../../img/logo.png";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useHistory, Redirect } from "react-router-dom";
import { UserCard } from "../component/usercard.js";
import { Sidebar } from "../component/sidebar";

export const UserHome = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<>
			{store.token != "" ? (
				<div className="h-100 d-flex flex-column  justify-content-center">
					{store.cards.map((newBet, index) => {
						return (
							<UserCard
								key={index}
								index={index}
								sender={newBet.sender}
								receiver={newBet.receiver}
								betTitle={newBet.betTitle}
								betDesc={newBet.betDesc}
								ammount={newBet.ammount}
								emissionDate={newBet.emissionDate}
								dueDate={newBet.dueDate}
							/>
						);
					})}
				</div>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
};
