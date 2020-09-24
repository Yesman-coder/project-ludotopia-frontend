const baseUrl = "https://3000-f7805165-a2e1-4fa2-915c-b5cfcef126c7.ws-us02.gitpod.io";
const getState = ({ getStore, getActions, setStore }) => {
	const baseUrl = "https://3000-e138cd05-a862-42ad-8343-3b3ea10be3af.ws-us02.gitpod.io/";
	return {
		store: {
			user: []
		},
		actions: {
			fetchCreateUser: async (email, name, last_name, phone, username, password) => {
				let user = [];
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
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({
					user: user
				});
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
						localStorage.setItem("token", JSON.stringify(user.jwt));
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({
					user: user
				});
			}
		}
	};
};

export default getState;
