import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { UserCard } from "../component/users_card";
import { useParams, Redirect } from "react-router-dom";

function UserDetails() {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	useEffect(() => {
		actions.fetchUserId(id);
	}, []);

	function totalBets() {
		let bets = 0;
		if (store.userId.bets_received != undefined) {
			bets += store.userId.bets_received.length;
		}
		if (store.userId.bets_sent != undefined) {
			bets += store.userId.bets_sent.length;
		}
		return bets;
	}
	function totalBetsWins() {
		let bets = 0;
		if (store.userId.bets_received != undefined) {
			store.userId.bets_received.map(newBet => {
				if (newBet.state == "ganador" && newBet.winner_sender == store.userId.username) {
					bets += 1;
				}
			});
		}
		if (store.userId.bets_sent != undefined) {
			store.userId.bets_sent.map(newBet => {
				if (newBet.state == "ganador" && newBet.winner_sender == store.userId.username) {
					bets += 1;
				}
			});
		}
		return bets;
	}
	function totalBetsLost() {
		let bets = 0;
		if (store.userId.bets_received != undefined) {
			store.userId.bets_received.map(newBet => {
				if (newBet.state == "ganador" && newBet.winner_sender != store.userId.username) {
					bets += 1;
				}
			});
		}
		if (store.userId.bets_sent != undefined) {
			store.userId.bets_sent.map(newBet => {
				if (newBet.state == "ganador" && newBet.winner_sender != store.userId.username) {
					bets += 1;
				}
			});
		}
		return bets;
	}
	function totalBetsDisagree() {
		let bets = 0;
		if (store.userId.bets_received != undefined) {
			store.userId.bets_received.map(newBet => {
				if (newBet.state == "desacuerdo") {
					bets += 1;
				}
			});
		}
		if (store.userId.bets_sent != undefined) {
			store.userId.bets_sent.map(newBet => {
				if (newBet.state == "desacuerdo") {
					bets += 1;
				}
			});
		}
		return bets;
	}
	function reputacion() {
		let bets = 0;
		let totalbets = 0;
		if (store.userId.bets_received != undefined) {
			totalbets += store.userId.bets_received.length;
			store.userId.bets_received.map(newBet => {
				if (newBet.state == "desacuerdo") {
					bets += 1;
				}
			});
		}
		if (store.userId.bets_sent != undefined) {
			totalbets += store.userId.bets_sent.length;
			store.userId.bets_sent.map(newBet => {
				if (newBet.state == "desacuerdo") {
					bets += 1;
				}
			});
		}
		let numero = bets / totalbets;
		numero = numero * 100;
		return Math.floor(numero);
	}
	function totalBetsSent() {
		let bets = 0;
		if (store.userId.bets_sent != undefined) {
			bets += store.userId.bets_sent.length;
		}
		return bets;
	}
	function totalBetsReceived() {
		let bets = 0;
		if (store.userId.bets_received != undefined) {
			bets += store.userId.bets_received.length;
		}
		return bets;
	}

	return (
		<>
			{store.token != "" ? (
				<div className="h-100">
					<h1 className="m-5">{store.userId.username}</h1>
					<h1 className="m-1 ml-4">{`${store.userId.ludos} lds`}</h1>
					<p>{`apuestas en total: ${totalBets()}`}</p>
					<p>{`apuestas enviadas: ${totalBetsSent()}`}</p>
					<p>{`apuestas recibidas: ${totalBetsReceived()}`}</p>
					<p>{`apuestas ganadas: ${totalBetsWins()}`}</p>
					<p>{`apuestas perdidas: ${totalBetsLost()}`}</p>
					<p>{`apuestas en desacuerdo: ${totalBetsDisagree()}`}</p>
					<p>{`reputacion: ${reputacion()}%`}</p>
					{store.userId.bets_received != undefined
						? store.userId.bets_received.map(newBet => {
								return (
									<UserCard
										key={newBet.id}
										id={newBet.id}
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
						  })
						: ""}
					{store.userId.bets_sent != undefined
						? store.userId.bets_sent.map(newBet => {
								return (
									<UserCard
										key={newBet.id}
										id={newBet.id}
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
						  })
						: ""}
				</div>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
}

export default UserDetails;
