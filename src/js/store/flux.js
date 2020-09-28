const getState = ({ getStore, getActions, setStore }) => {
	const baseUrl = "http://127.0.0.1:4000";
	return {
		store: {
			user: [],
			done: null
		},
		actions: {
			fetchCreateUser: async (email, name, last_name, phone, username, password) => {
				let user = [];
				let done = true;
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
						user = await response.json();
					} else {
						done = false;
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({
					user: user,
					done: done
				});
			},

			fetchLogin: async (email, password) => {
				let user = [];
				let done = true;
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
						localStorage.setItem("tokenlogin", JSON.stringify(user.jwt));
					} else {
						done = false;
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({
					done: done
				});
			},
			fetchGetUser: async token => {
				let user = [];
				let done = true;
				try {
					let response = await fetch(`${baseUrl}/user`, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`
						}
					});
					if (response.ok) {
						user = await response.json();
						localStorage.setItem("username", JSON.stringify(user.username));
					} else {
						done = false;

						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({
					user: user,
					done: done
				});
			}
		}
	};
};

export default getState;
