const getState = ({ getStore, getActions, setStore }) => {
	const baseUrl = "https://4000-ab61ad10-fa5d-4065-beed-ee5d4dea65fe.ws-us02.gitpod.io";
	//Recordar verificar URL
	return {
		store: {
			token: null,
			user: [],
			editBet: {}
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
			fetchEditState: async (state, senderWiner, receiverWiner) => {
				let store = getStore();
				try {
					let response = await fetch(`${baseUrl}/bet/${store.editBet.id}`, {
						method: "PATCH",
						headers: {
							Authorization: `Bearer ${store.token}`,
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							state,
							senderWiner,
							receiverWiner
						})
					});
					if (response.ok) {
						let bets = await response.json();
						return true;
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed in bet patch");
					console.log(error);
				}
				return false;
			},
			setEditBet: bet => {
				setStore({
					editBet: bet
				});
			}
		}
	};
};

export default getState;
