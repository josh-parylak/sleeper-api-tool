import React, { useState } from "react";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import Matchups from "./components/matchups";
import Performance from "./components/performance";

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
