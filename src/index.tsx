import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

const leagueId = "1124833456052793344";

axios
  .get("https://api.sleeper.app/v1/state/nfl")
  .then(function (response: any) {
    localStorage.setItem("nfl", JSON.stringify(response.data));
  })
  .catch(function (error: any) {
    console.log(error);
  });

axios
  .get(`https://api.sleeper.app/v1/league/${leagueId}`)
  .then(function (response: any) {
    localStorage.setItem("league", JSON.stringify(response.data));
  })
  .catch(function (error: any) {
    console.log(error);
  });

axios
  .get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`)
  .then(function (response: any) {
    localStorage.setItem("rosters", JSON.stringify(response.data));
  })
  .catch(function (error: any) {
    console.log(error);
  });

axios
  .get(`https://api.sleeper.app/v1/league/${leagueId}/users`)
  .then(function (response: any) {
    localStorage.setItem("users", JSON.stringify(response.data));
  })
  .catch(function (error: any) {
    console.log(error);
  });

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
