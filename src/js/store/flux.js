const getState = ({ getStore, getActions, setStore }) => {
	//const baseUrl = "http://127.0.0.1:4000";
	const baseUrl = "https://4000-ab61ad10-fa5d-4065-beed-ee5d4dea65fe.ws-us02.gitpod.io";
	//Recordar verificar URL
	return {
		store: {
			token: null,
			user: [],
			allUsers: [],
			userId: []
		},
		actions: {
			logUserOut: () => {
				localStorage.removeItem("token");
				// aquí podrían hacer fetch a un endpoint logout que anule el token... la vaina es que
				// eso requiere cierto trabajo medio denso en el back end. No lo hagan para el mvp.
				// si quieren guiatura, pueden usar el repositorio de tintrack-backend de ernesto.
				setStore({ token: "" });
			},
			fetchCreateUser: async (email, name, last_name, phone, username, password) => {
				try {
					let response = await fetch(`${baseUrl}/register`, {
						method: "POST",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							email,
							name,
							last_name,
							phone,
							username,
							password
						})
					});
					if (response.ok) {
						return true;
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				return false;
			},

			fetchLogin: async (email, password) => {
				let user = [];
				try {
					let response = await fetch(`${baseUrl}/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							email,
							password
						})
					});
					if (response.ok) {
						user = await response.json();
						localStorage.setItem("token", user.jwt);
						setStore({ user, token: user.jwt });
						return true;
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({ user: null, token: "" });
				return false;
			},
			fetchGetUser: async token => {
				if (token) {
					try {
						console.log(`this is token before get ${token}`);
						let response = await fetch(`${baseUrl}/user`, {
							method: "GET",
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json"
							}
						});
						if (response.ok) {
							let user = await response.json();
							setStore({ token, user });
							return true;
						} else {
							console.log(`error: ${response.status} ${response.statusText}`);
						}
					} catch (error) {
						console.log("something failed");
						console.log(error);
					}
				}
				setStore({ token: "" });
				localStorage.removeItem("token");
				return false;
			},

			fetchCreateBet: async (ludos, name, description, due_date, receiver_name) => {
				let store = getStore();
				let actions = getActions();
				let sender_id = store.user.id;
				try {
					let response = await fetch(`${baseUrl}/bet`, {
						method: "POST",
						headers: {
							Authorization: `Bearer ${store.token}`,
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							ludos,
							name,
							description,
							due_date,
							sender_id,
							receiver_name
						})
					});
					if (response.ok) {
						let bets = await response.json();
						return true;
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed in bet creation");
					console.log(error);
				}
				return false;
			},
			// fetchUpdateBet: async (bet_id, state, status, winner_sender, winner_receiver) => {
			// 	try {
			// 		const actions = getActions();
			// 		const store = getStore();
			// 		let response = await fetch(`${baseUrl}/bet/${bet_id}`, {
			// 			method: "PATCH",
			// 			headers: {
			// 				"Content-Type": "application/JSON"
			// 			},
			// 			body: JSON.stringify({
			// 				state,
			// 				status,
			// 				winner_sender,
			// 				winner_receiver
			// 			})
			// 		});
			// 		if (response.ok) {
			// 			actions.fetchGetUser(store.token);
			// 			return true;
			// 		} else {
			// 			console.log(`error: ${response.status} ${response.statusText}`);
			// 		}
			// 	} catch (error) {
			// 		console.log("something failed in bet creation");
			// 		console.log(error);
			// 	}
			// 	return false;
			// },
			fetchUpdateBetSender: async (bet_id, state, status, winner_sender) => {
				try {
					const actions = getActions();
					const store = getStore();
					let response = await fetch(`${baseUrl}/bet/${bet_id}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							state,
							status,
							winner_sender
						})
					});
					if (response.ok) {
						actions.fetchGetUser(store.token);
						return true;
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed in bet creation");
					console.log(error);
				}
				return false;
			},
			fetchUpdateBetReceiver: async (bet_id, state, status, winner_receiver) => {
				try {
					const actions = getActions();
					const store = getStore();
					let response = await fetch(`${baseUrl}/bet/${bet_id}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							state,
							status,
							winner_receiver
						})
					});
					if (response.ok) {
						actions.fetchGetUser(store.token);
						return true;
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed in bet creation");
					console.log(error);
				}
				return false;
			},
			fetchAllUsers: async () => {
				let allUsers = [];
				try {
					let response = await fetch(`${baseUrl}/users`, {
						method: "GET",
						headers: {
							"Content-Type": "application/JSON"
						}
					});
					if (response.ok) {
						allUsers = await response.json();
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed in bet creation");
					console.log(error);
				}
				setStore({
					allUsers: allUsers,
					userId: []
				});
			},
			fetchUserId: async id => {
				let userId = [];
				try {
					let response = await fetch(`${baseUrl}/user/${id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/JSON"
						}
					});
					if (response.ok) {
						userId = await response.json();
						setStore({ userId: userId });
						console.log(`dentro del fetch userId ${id}`);
						return true;
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed in bet creation");
					console.log(error);
				}
				return false;
			}
		}
	};
};

export default getState;
