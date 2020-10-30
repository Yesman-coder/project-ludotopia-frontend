import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/search.scss";
import { useHistory, Link, Redirect } from "react-router-dom";

function Search() {
	const [search, setSearch] = useState("");
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		actions.fetchAllUsers();
		actions.fetchAllBets();
	}, []);

	const filteredUser = store.allUsers.filter(user => {
		return user.username.toLowerCase().includes(search.toLocaleLowerCase());
	});
	const filteredBets = store.allBets.filter(bet => {
		return bet.name.toLowerCase().includes(search.toLocaleLowerCase());
	});

	return (
		<div className="d-flex flex-row justify-content-center ">
			{store.token != "" ? (
				<div className="h-100">
					<h1 className="p-5">Encuentra usuarios y apuestas!</h1>
					<input
						className="search__input"
						placeholder="Buscar"
						onChange={e => {
							setSearch(e.target.value);
						}}
					/>
					{filteredUser.map(user => {
						return (
							<div className="p-2 m-5 border d-flex justify-content-center" key={user.id}>
								<Link className="text-decoration-none text-dark" to={`/user/${user.id}`}>
									<h4>{`${user.username}`}</h4>
								</Link>
							</div>
						);
					})}
					{filteredBets.map(bet => {
						return (
							<div className="p-2 m-5 border d-flex justify-content-center" key={bet.id}>
								<Link className="text-decoration-none text-dark" to={`/bet/${bet.id}`}>
									<h4>{`${bet.name}`}</h4>
								</Link>
							</div>
						);
					})}
				</div>
			) : (
				<Redirect to="/login" />
			)}
		</div>
	);
}

export default Search;
