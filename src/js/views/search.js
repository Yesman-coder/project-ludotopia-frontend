import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

function Search() {
	const [search, setSearch] = useState("");
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		actions.fetchAllUsers();
	}, []);

	const filteredUser = store.allUsers.filter(user => {
		return user.username.toLowerCase().includes(search.toLocaleLowerCase());
	});

	return (
		<>
			<input
				className="m-5"
				placeholder="Buscar"
				onChange={e => {
					setSearch(e.target.value);
				}}
			/>
			{filteredUser.map(user => {
				return (
					<div className="p-2 m-2 border" key={user.id}>
						<Link className="text-decoration-none text-dark" to={`/user/${user.id}`}>
							<p className="ml-5 mt-1">{`${user.username}`}</p>
						</Link>
					</div>
				);
			})}
		</>
	);
}

export default Search;
