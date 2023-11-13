import React from "react";
import Logo from "../../svgs/logo";
import "./index.scss";
import { LanguageServiceMode } from "typescript";

const league = JSON.parse(localStorage.getItem("league") ?? "");

function Header() {
	return (
		<header className="App-header">
			<div className="heading">
				<Logo />
				<div className="logo-text-wrap">
					<div className="logo-text">Streamer</div>
					<div className="logo-sub-text">A Sleeper API Dashboard</div>
				</div>
				<div className="league-data">
					<div className="main">{league.name}</div>
					<div className="sub">
						<div className="sub-data">
							<span>Year:</span> {league.season}
						</div>
						|
						<div className="sub-data">
							<span>League ID:</span> {league.league_id}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
