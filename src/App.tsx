import React from "react";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import axios from "axios";

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
	return (
		<div className="App">
			<Header />
			<Dashboard />
		</div>
	);
}

export default App;
