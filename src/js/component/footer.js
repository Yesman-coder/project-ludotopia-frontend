import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/footer.scss";

export const Footer = () => {
	const location = useLocation();
	console.log(location.pathname);
	return (
		<>
			{location.pathname == "/register" || location.pathname == "/login" ? (
				<div className="footerimg container-fluid" />
			) : (
				""
			)}
		</>
	);
};
