import React, { useContext, useState } from "react"; //
// import loginpic from "../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App"; //

var loginpic =
	"https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg?t=st=1654430348~exp=1654430948~hmac=4cfe082acf7909940078e9a09da33678c4085be006295c8bc4368f3e299c4776&w=1380";

const Login = () => {
	const { state, dispatch } = useContext(UserContext); //

	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginUser = async (e) => {
		e.preventDefault();
		const res = await fetch("/signin", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		console.log(res);
		const data = await res.json();
		console.log(data, ".................................");
		if (res.status === 400 || !data) {
			window.alert("Invalid Credentials");
		} else {
			dispatch({ type: "USER", payload: true }); //z
			window.alert("Login is Successful");
			localStorage.setItem("state", 1);
			navigate("/");
		}
	};

	// console.log(state);

	return (
		<>
			<section className="signin">
				<div className="signin-t">
					<div className="signin-image">
						<figure>
							<img src={loginpic} alt="pic" width="400px" />
						</figure>
						<NavLink to="/signup" className="signin-image-link">
							Create an Account
						</NavLink>
					</div>

					<div className="signin-form">
						<h2 className="form-title">Sign in</h2>
						<form className="register-form" id="register-form" method="POST">
							<div className="form-group">
								<label htmlFor="email">
									<i class="zmdi zmdi-email"></i>
								</label>
								<input
									value={email}
									type="text"
									name="email"
									id="email"
									autoComplete="off"
									placeholder="Your Email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">
									<i class="zmdi zmdi-lock"></i>
								</label>
								<input
									value={password}
									type="password"
									name="password"
									id="password"
									autoComplete="off"
									placeholder="Your Password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<div className="form-button">
								<input
									type="submit"
									name="signin"
									id="signin"
									className="sign-form-submit"
									value="Login"
									onClick={loginUser}
								/>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
