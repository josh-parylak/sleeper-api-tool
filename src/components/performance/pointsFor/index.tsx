import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { getPerformanceData } from "../../../utilities";
import { Line } from "react-chartjs-2";
import autocolors from "chartjs-plugin-autocolors";

function PointsFor() {
	const nfl = JSON.parse(localStorage.getItem("nfl") ?? "");

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend,
		autocolors
	);

	ChartJS.defaults.color = "#FFFFFF";
	ChartJS.defaults.borderColor = "#545f66";

	const options = {
		responsive: true,
		scales: {
			x: {
				display: false,
			},
		},
		plugins: {
			legend: {
				position: "left" as const,
				labels: {
					// This more specific font property overrides the global property
					font: {
						size: 12,
						family: "Titillium Web",
						color: "#FFFFFF",
					},
				},
			},
			title: {
				display: false,
			},
		},
	};

	const teamData = getPerformanceData();

	const labels = Array.from({ length: nfl.week }, (_, i) => i + 1);

	const data = {
		labels,
		datasets: teamData.map((team: any) => {
			return {
				label: team.team,
				data: team.total_points.map((w: any) => w.points),
			};
		}),
	};
	return (
		<div className="chart">
			<h2>Points For by Week</h2>
			<Line options={options} data={data} />
		</div>
	);
}

export default PointsFor;
