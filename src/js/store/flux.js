const getState = ({ getStore, getActions, setStore }) => {
	const baseUrl = "http://127.0.0.1:4000";
	return {
		store: {
			// cards: [
			// 	{
			// 		index: 1,
			// 		sender: "Yesman",
			// 		receiver: "Boris",
			// 		betTitle: "Apuesto a que maduro no se va",
			// 		betDesc: "El que no quiera a su mama pierde",
			// 		ammount: 300,
			// 		emissionDate: "13/12/2020",
			// 		dueDate: "13/12/2021"
			// 	},
			// 	{
			// 		index: 2,
			// 		sender: "Ivan",
			// 		receiver: "Omar",
			// 		betTitle: "Apuesto a que soy el mejor",
			// 		betDesc: "El que no quiera a su apa pierde",
			// 		ammount: 500,
			// 		emissionDate: "14/02/2021",
			// 		dueDate: "13/12/2021"
			// 	},
			// 	{
			// 		index: 3,
			// 		sender: "Perro",
			// 		receiver: "Gato",
			// 		betTitle: "Apuesto a que soy el mejor",
			// 		betDesc: "El que no quiera a su apa pierde",
			// 		ammount: 500,
			// 		emissionDate: "14/02/2021",
			// 		dueDate: "13/12/2021"
			// 	}
			// ],
			token: null,
			user: []
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
						console.log(`this is token befor get ${token}`);
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
			}
		}
	};
};

export default getState;
