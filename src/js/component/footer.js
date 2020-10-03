import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/footer.scss";

export const Footer = () => {
	const location = useLocation();
	return (
		<>
			{location.pathname == "/register" || location.pathname == "/login" || location.pathname == "/home" ? (
				<div className="footerimg container-fluid" />
			) : (
				""
			)}
		</>
	);
};
