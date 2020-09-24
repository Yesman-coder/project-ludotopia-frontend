const getState = ({ getStore, getActions, setStore }) => {
    const baseUrl= "https://3000-e138cd05-a862-42ad-8343-3b3ea10be3af.ws-us02.gitpod.io/"
	return {
		store: {
			users: []
		},
		actions: {
            login: async (username, password) => {
				let actions = getActions();
				if (username && password != "") {
					const response = await fetch(`${baseUrl}/todos`, {
						method: "POST",
						body: JSON.stringify({ label: `${task}`, done: false }),
						headers: {
							"Content-Type": "application/json"
						}
					});
					await actions.getList();
				} else alert("Please type a new task");
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
