import React, { useState } from "react";
import Refresh from "../../svgs/refresh";
import axios from "axios";
import players from "../../assets/players.json";
import "./index.scss";

function Players() {
	const [trendingUp, setTrendingUp] = useState(
		JSON.parse(localStorage.getItem("trendingUp") ?? "")
	);
	const [trendingDown, setTrendingDown] = useState(
		JSON.parse(localStorage.getItem("trendingDown") ?? "")
	);

	const fetchTrendingData = () => {
		axios
			.get("https://api.sleeper.app/v1/players/nfl/trending/add")
			.then(function (response: any) {
				localStorage.setItem("trendingUp", JSON.stringify(response.data));
				setTrendingUp(response.data);
			})
			.catch(function (error: any) {
				console.log(error);
			});
		axios
			.get("https://api.sleeper.app/v1/players/nfl/trending/drop")
			.then(function (response: any) {
				localStorage.setItem("trendingDown", JSON.stringify(response.data));
				setTrendingDown(response.data);
			})
			.catch(function (error: any) {
				console.log(error);
			});
	};

	if (
		localStorage.getItem("trendingUp") === null ||
		localStorage.getItem("trendingDown") === null
	) {
		fetchTrendingData();
	}

	const listPlayers = (list: any, type: string) => {
		const playerList: any = players;
		const html = list.slice(0, 5).map((el: any) => {
			console.log(el);
			const player = playerList[el.player_id];
			return (
				<div className="player">
					<div className="name">
						{player.first_name} {player.last_name}
					</div>
					<div className={`score ${type}`}>{el.count}</div>
				</div>
			);
		});

		return html;
	};

	return (
		<div className="dash-card">
			<div className="dash-section">
				<div className="dash-section-heading w-control">
					Trending Up
					<button onClick={() => fetchTrendingData()}>
						<Refresh />
					</button>
				</div>
				<div className="players-list">{listPlayers(trendingUp, "up")}</div>
			</div>
			<div className="dash-section">
				<div className="dash-section-heading">Trending Down</div>
				<div className="players-list">{listPlayers(trendingDown, "down")}</div>
			</div>
		</div>
	);
}

export default Players;
