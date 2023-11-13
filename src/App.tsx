import React, { useState } from "react";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import Matchups from "./components/matchups";
import Performance from "./components/performance";
import axios from "axios";

axios
	.get("https://api.sleeper.app/v1/state/nfl")
	.then(function (response: any) {
		localStorage.setItem("nfl", JSON.stringify(response.data));
	})
	.catch(function (error: any) {
		console.log(error);
	});

axios
	.get("https://api.sleeper.app/v1/league/1002655054991659008")
	.then(function (response: any) {
		localStorage.setItem("league", JSON.stringify(response.data));
	})
	.catch(function (error: any) {
		console.log(error);
	});

axios
	.get("https://api.sleeper.app/v1/league/1002655054991659008/rosters")
	.then(function (response: any) {
		localStorage.setItem("rosters", JSON.stringify(response.data));
	})
	.catch(function (error: any) {
		console.log(error);
	});

axios
	.get("https://api.sleeper.app/v1/league/1002655054991659008/users")
	.then(function (response: any) {
		localStorage.setItem("users", JSON.stringify(response.data));
	})
	.catch(function (error: any) {
		console.log(error);
	});

function App() {
	const [active, setActive] = useState("dashboard");

	return (
		<div className="App">
			<Header />

			<div className="main-content">
				<div className="tab-menu">
					<button
						className={`tab ${active === "dashboard" ? "active" : "default"}`}
						onClick={() => setActive("dashboard")}
					>
						Dashboard
					</button>
					<button
						className={`tab ${active === "matchups" ? "active" : "default"}`}
						onClick={() => setActive("matchups")}
					>
						Matchups
					</button>
					<button
						className={`tab ${active === "performance" ? "active" : "default"}`}
						onClick={() => setActive("performance")}
					>
						Performance
					</button>
				</div>

				{active === "dashboard" ? <Dashboard /> : ""}
				{active === "matchups" ? <Matchups /> : ""}
				{active === "performance" ? <Performance /> : ""}
			</div>
		</div>
	);
}

export default App;
