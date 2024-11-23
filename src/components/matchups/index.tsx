import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserByRosterId } from "../../utilities";
import "./index.scss";
import { leagueId } from "../..";

const counter = [1, 2, 3, 4, 5, 6];

function Matchups() {
	const state = JSON.parse(localStorage.getItem("nfl") ?? "");
	const [week, setWeek] = useState(state !== "" ? state.week : 1);
	const [matchups, setMatchups] = useState([]);

	useEffect(() => {
		axios
			.get(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`)
			.then(function (response: any) {
				setMatchups(response.data);
			})
			.catch(function (error: any) {
				console.log(error);
			});
	}, [week]);

	const teamBlock = (team: any) => {
		const u = getUserByRosterId(team.roster_id);

		return (
			<div className="team-block">
				<div className="team-name">
					{u.metadata.team_name ?? u.display_name}
				</div>
				<div className="points">{team.points}</div>
			</div>
		);
	};

	const matchList = () => {
		const out = counter.map((el: number, index: number) => {
			const teams = matchups.filter((team: any) => team.matchup_id === el);

			return (
				<div className="dash-card">
					{teamBlock(teams[0])}
					<hr />
					{teamBlock(teams[1])}
				</div>
			);
		});
		return out;
	};

	const weeks = () => {
		const list = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
		];
		const menu = list.map((el: number, index: number) => {
			return (
				<button
					className={el === week ? "active" : "default"}
					onClick={() => setWeek(el)}
				>
					{el}
				</button>
			);
		});
		return menu;
	};

	return (
		<>
			<h2 className="week">Week {week}</h2>
			<div className="week-menu">Week: {weeks()}</div>
			<div id="dashboard" className="matchup-list">
				{matchups.length > 0 ? matchList() : ""}
			</div>
		</>
	);
}

export default Matchups;
