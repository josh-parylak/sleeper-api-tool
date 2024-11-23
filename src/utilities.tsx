import axios from "axios";

const rosters = localStorage.getItem("rosters")
	? JSON.parse(localStorage.getItem("rosters") ?? "")
	: null;
const users = localStorage.getItem("users")
	? JSON.parse(localStorage.getItem("users") ?? "")
	: null;

export const getUserRosterById = (id: string) => {
	const userRoster = users.find(
		(user: { user_id: string }) => user.user_id === id
	);
	return userRoster;
};

export const getUserByRosterId = (id: number) => {
	const r = rosters.find(
		(roster: { roster_id: number }) => id === roster.roster_id
	);
	const u = getUserRosterById(r.owner_id);
	return u;
};

export const getPerformanceData = () => {
	let matchupData: any = localStorage.getItem("fullMatchup");

	if (matchupData) {
		matchupData = JSON.parse(matchupData);
	} else {
		matchupData = [];
		refreshMatchupData();
		matchupData = localStorage.getItem("fullMatchup");
		matchupData = JSON.parse(matchupData);
	}

	const rosterIDs = rosters.map((el: any) => {
		return { rID: el.roster_id, oID: el.owner_id };
	});

	const teamData = rosterIDs.map((id: any) => {
		const totalPoints = structuredClone(matchupData)
			.filter((m: any) => m.roster_id === id.rID)
			.map((c: any, index: number) => {
				return { week: index + 1, points: c.points };
			});

		const user = getUserByRosterId(id.rID);

		return {
			roster_id: id.rID,
			owner_id: id.oID,
			owner: user.display_name,
			team: user.metadata.team_name ?? user.display_name,
			total_points: totalPoints,
		};
	});

	return teamData;
};

export const refreshMatchupData = () => {
	const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
	let matchupData: any = [];
	weeks.forEach((el: number) => {
		axios
			.get(
				`https://api.sleeper.app/v1/league/1002655054991659008/matchups/${el}`
			)
			.then(function (response: any) {
				matchupData.push(...response.data);
				if (el === 18) {
					localStorage.setItem("fullMatchup", JSON.stringify(matchupData));
				}
			})
			.catch(function (error: any) {
				console.log(error);
			});
	});
};
