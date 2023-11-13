import React from "react";
import DataTable, {
	TableColumn,
	createTheme,
} from "react-data-table-component";

interface DataRow {
	owner: string;
	team: string;
	streak: string;
	w: number;
	l: number;
	t: number;
	ptsF: number;
	ptsA: number;
}

const rosters = JSON.parse(localStorage.getItem("rosters") ?? "");
const users = JSON.parse(localStorage.getItem("users") ?? "");

createTheme(
	"streamer",
	{
		text: {
			primary: "#f5fe49",
			secondary: "#a5af58",
		},
		background: {
			default: "transparent",
		},
		context: {
			background: "#cb4b16",
			text: "#FFFFFF",
		},
		divider: {
			default: "#545f66",
		},
		action: {
			button: "rgba(0,0,0,.54)",
			hover: "rgba(0,0,0,.08)",
			disabled: "rgba(0,0,0,.12)",
		},
	},
	"dark"
);

const ExpandedComponent = (data: any) => {
	const owner = data.data;
	return (
		<div className="team-info">
			<span>Owner:</span> {owner.owner} <br />
			<span>Team:</span> {owner.team} <br />
			<span>Record:</span> {owner.record} <br />
			<span>Win Percentage:</span> {owner.win_percentage} <br />
			<span>Streak:</span> {owner.streak} <br />
			<span>Points For</span>: {owner.ptsF} <br />
			<span>Points Against:</span> {owner.ptsA} <br />
		</div>
	);
};

function OwnerTable() {
	const columns: TableColumn<DataRow>[] = [
		{
			name: "Team",
			selector: (row: { team: any }) => row.team,
			sortable: true,
		},
		{ name: "Wins", selector: (row: { w: any }) => row.w, sortable: true },
		{
			name: "PF",
			selector: (row: { ptsF: any }) => row.ptsF,
			sortable: true,
		},
		{
			name: "PA",
			selector: (row: { ptsA: any }) => row.ptsA,
			sortable: true,
		},
	];

	const list = rosters.map(
		(roster: { settings: any; metadata: any; owner_id: string }) => {
			// console.log(rosters);
			// console.log(u.user_id);
			const u = users.find(
				(u: { user_id: string }) => roster.owner_id === u.user_id
			);
			const winPercentage = (data: any) => {
				const gp =
					parseInt(data.wins) + parseInt(data.losses) + parseInt(data.ties);
				const wp = (2 * parseInt(data.wins) + parseInt(data.ties)) / (2 * gp);
				// console.log(wp);
				return wp;
			};
			// console.log(roster);
			return {
				owner: u.display_name,
				team: u.metadata.team_name ?? u.display_name,
				streak: roster ? roster.metadata.streak : null,
				w: roster ? roster.settings.wins : null,
				l: roster ? roster.settings.losses : null,
				t: roster ? roster.settings.ties : null,
				ptsF: roster ? roster.settings.fpts : null,
				ptsA: roster ? roster.settings.fpts_against : null,
				record: roster
					? `${roster.settings.wins}-${roster.settings.losses}-${roster.settings.ties}`
					: null,
				win_percentage: roster
					? `${
							Math.round(
								(winPercentage(roster.settings) + Number.EPSILON) * 100
							) / 100
					  }`
					: null,
			};
		}
	);

	return (
		<div className="dash-section table">
			<div className="dash-section-heading">Team Stats</div>
			<DataTable
				columns={columns}
				data={list}
				theme={"streamer"}
				defaultSortFieldId={2}
				defaultSortAsc={false}
				expandableRows
				expandableRowsComponent={ExpandedComponent}
			/>
		</div>
	);
}

export default OwnerTable;
