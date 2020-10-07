import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { UserHome } from "./views/userhome";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navigation } from "./component/navbar";
import { Footer } from "./component/footer";
import { Register } from "./views/register";
import Login from "./views/login";
import { Sidebar } from "./component/sidebar";
import { CreateBet } from "./views/createBet";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	let localData = localStorage.getItem("token");
	return (
		<div className="d-flex flex-column h-100 w-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navigation />
					<div className="row w-100 h-100">
						<Sidebar />
						<div className="col">
							<Switch>
								{/* <Route exact path="/register">
							<Register />
						</Route> */}
								<Route exact path="/login">
									<Login />
								</Route>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/createBet">
									<CreateBet />
								</Route>
								<Route exact path="/register">
									<Register />
								</Route>
								<Route exact path="/single">
									<Single />
								</Route>
								<Route exact path="/userhome">
									<UserHome />
								</Route>
								<Route>
									<h1 style={{ marginLeft: "4rem" }}>Not found!</h1>
								</Route>
							</Switch>
						</div>
					</div>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
