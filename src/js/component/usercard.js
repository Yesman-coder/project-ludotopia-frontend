import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/usercard.scss";

export function UserCard({ index, sender, receiver, betTitle, betDesc, ammount, emissionDate, dueDate }) {
	const history = useHistory();
	const { store, actions } = useContext(Context);
	return (
		<div className="card text-center column p-3 ml-5 mt-3">
			<div className="card-header row" id={index}>
				<h5 className="ml-0">{sender}</h5>
				<h4 className="m-auto text-muted">VS</h4>
				<h5 className="mr-0">{receiver}</h5>
			</div>
			<div className="card-body">
				<h5 className="card-title text-break">{betTitle}</h5>
				<p className="card-text text-muted font-weight-light text-break">{betDesc}</p>
				<a href="#" className="btn btn-success">
					{ammount}
				</a>
			</div>
			<div className="card-footer text-muted">
				<p className="ml-0">Emission Date {emissionDate}</p>
				<p className="mr-0">Due Date {dueDate}</p>
			</div>
		</div>
	);
}

UserCard.propTypes = {
	index: PropTypes.number,
	sender: PropTypes.string,
	receiver: PropTypes.string,
	betTitle: PropTypes.string,
	betDesc: PropTypes.string,
	ammount: PropTypes.number,
	emissionDate: PropTypes.string,
	dueDate: PropTypes.string
};
