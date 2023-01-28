import React, { useContext, useState, useEffect } from "react"; //
// import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App"; //
import logo from "../images/logo3.png";

const Navbar = () => {
	const { state, dispatch } = useContext(UserContext); //

	//for get name of user
	const [userName, setUserName] = useState("");

	const userHomePage = async () => {
		try {
			const res = await fetch("/getdata", {
				method: "GET",
				headers: {
					"Content-type": "application/json",
				},
			});

			const data = await res.json();
			// console.log(data);
			console.log("inside of navbar");

			setUserName(data.name);
			// setshow(true)
		} catch (error) {
			console.log("give me big error");
			console.log(error);
		}
	};

	useEffect(() => {
		userHomePage();
	}, [state]);

	//close
	// console.table({ a: state, b: localStorage.getItem("state") });
	const RenderMenu = () => {
		if (state || localStorage.getItem("state")) {
			return (
				<>
					<li className="nav-item">
						<NavLink className="nav-link active" aria-current="page" to="/">
							Home
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/about">
							About
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/contact">
							Contact
						</NavLink>
					</li>

					<li className="nav-item">
						<NavLink className="nav-link" to="/logout">
							Logout
						</NavLink>
					</li>
				</>
			);
		} else {
			return (
				<>
					<li className="nav-item">
						<NavLink className="nav-link active" aria-current="page" to="/">
							Home
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/about">
							About
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/contact">
							Contact
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/login">
							Login
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/signup">
							Registration
						</NavLink>
					</li>
				</>
			);
		}
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<NavLink className="navbar-brand navbar_name" to="#">
						<img src={logo} alt="logo" width="40px" />

						<a>
							|{" "}
							{(userName && state) || localStorage.getItem("state")
								? userName
								: "Developer"}{" "}
							|
						</a>
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<RenderMenu />
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
