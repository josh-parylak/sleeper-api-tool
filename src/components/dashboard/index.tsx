import React from "react";
import OwnerTable from "../ownerTable";
import Trophy from "../../svgs/trophy";
import "./index.scss";
import { getUserRosterById } from "../../utilities";
import Players from "../players";

const league = JSON.parse(localStorage.getItem("league") ?? "");
const rosters = JSON.parse(localStorage.getItem("rosters") ?? "");
const users = JSON.parse(localStorage.getItem("users") ?? "");

const getWinner = () => {
	const winningRosterID = league.metadata.latest_league_winner_roster_id;

	const winningRoster = rosters.find(
		(roster: { roster_id: number }) =>
			roster.roster_id === parseInt(winningRosterID)
	);

	const winner = users.find(
		(user: { user_id: string }) => user.user_id === winningRoster.owner_id
	);

	return winner;
};

const winPercentage = (data: any) => {
	const gp = parseInt(data.wins) + parseInt(data.losses) + parseInt(data.ties);
	const wp = ((2 * parseInt(data.wins) + parseInt(data.ties)) / (2 * gp)) * 100;
	//console.log(wp);
	return wp;
};

const rankings = structuredClone(rosters).sort((a: any, b: any) => {
	return (
		winPercentage(b.settings) - winPercentage(a.settings) ||
		b.settings.fpts - a.settings.fpts
	);
});
const pfRankings = structuredClone(rosters).sort((a: any, b: any) => {
	return b.settings.fpts - a.settings.fpts;
});
const bestStreak = structuredClone(rosters).sort((a: any, b: any) => {
	return (
		b.metadata.streak - a.metadata.streak || b.settings.wins - a.settings.wins
	);
});

const leader = getUserRosterById(rankings[0].owner_id);
const pfLeader = getUserRosterById(pfRankings[0].owner_id);
const streakLeader = getUserRosterById(bestStreak[0].owner_id);
const winner = getWinner();

const dashLine = (
	needsKey: boolean,
	index: number,
	label: string,
	value: string
) => {
	return (
		<div className="dash-line" key={needsKey ? index : label}>
			<div className="dash-line-label">{label}</div>
			<div className="dash-line-value">{value}</div>
		</div>
	);
};

function Dashboard() {
	return (
		<div id="dashboard">
			<div className="dash-col">
				<div className="dash-card">
					<div className="dash-section">
						<div className="dash-section-heading">
							<Trophy /> Reigning Champion
						</div>
						{dashLine(false, 0, "Team Name", winner.metadata.team_name)}
						{dashLine(false, 0, "Owner", winner.display_name)}
					</div>
				</div>
				<div className="dash-card">
					<div className="dash-section">
						<div className="dash-section-heading">Current League Leaders</div>
						{dashLine(false, 0, "First Place", leader.metadata.team_name)}
						{dashLine(false, 0, "Most Poinst", pfLeader.metadata.team_name)}
						{dashLine(
							false,
							0,
							"Best Streak",
							`${streakLeader.metadata.team_name} (${bestStreak[0].metadata.streak})`
						)}
					</div>
					<div className="dash-section">
						<div className="dash-section-heading">Overall Standings</div>
						{rankings.map((team: any, index: number) => {
							const u = getUserRosterById(team.owner_id);
							return dashLine(
								true,
								index,
								`${index + 1}. ${u.metadata.team_name ?? u.display_name}`,
								`${team.settings.wins}-${team.settings.losses}-${team.settings.ties}`
							);
						})}
					</div>
				</div>
				<Players />
			</div>
			<div className="standings dash-card">
				<OwnerTable />
			</div>
		</div>
	);
}

export default Dashboard;
