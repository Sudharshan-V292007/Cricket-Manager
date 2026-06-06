import { useEffect, useState } from "react";

import Footer from "../components/Footer";

import "./Stats.css";

function Stats() {
  const [players, setPlayers] =
    useState([]);

  const [teams, setTeams] =
    useState([]);

  const [match, setMatch] =
    useState(null);

  useEffect(() => {
    const storedPlayers =
      JSON.parse(
        localStorage.getItem(
          "cricket_players"
        )
      ) || [];

    const storedTeams =
      JSON.parse(
        localStorage.getItem(
          "cricket_teams"
        )
      ) || [];

    const storedMatch =
      JSON.parse(
        localStorage.getItem(
          "cricket_match"
        )
      );

    setPlayers(
      storedPlayers
    );

    setTeams(
      storedTeams
    );

    setMatch(
      storedMatch
    );
  }, []);

  return (
    <>
      <div className="stats-page">
        <div className="stats-header">
          <h1>
            📊 Statistics
          </h1>

          <p>
            Cricket Dashboard
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>
              Players
            </span>

            <strong>
              {
                players.length
              }
            </strong>
          </div>

          <div className="stat-card">
            <span>
              Teams
            </span>

            <strong>
              {
                teams.length
              }
            </strong>
          </div>

          <div className="stat-card">
            <span>
              Live Match
            </span>

            <strong>
              {match
                ? "LIVE"
                : "NONE"}
            </strong>
          </div>

          <div className="stat-card">
            <span>
              Innings
            </span>

            <strong>
              {
                match?.innings ||
                0
              }
            </strong>
          </div>
        </div>

        <div className="section-card">
          <h2>
            Live Match
          </h2>

          {match ? (
            <>
              <div className="info-row">
                <span>
                  Score
                </span>

                <strong>
                  {
                    match.score
                  }
                  /
                  {
                    match.wickets
                  }
                </strong>
              </div>

              <div className="info-row">
                <span>
                  Overs
                </span>

                <strong>
                  {
                    match.oversCompleted
                  }
                  .
                  {
                    match.ballsInOver
                  }
                </strong>
              </div>

              <div className="info-row">
                <span>
                  Innings
                </span>

                <strong>
                  {
                    match.innings
                  }
                </strong>
              </div>

              {match.innings ===
                2 && (
                <div className="info-row">
                  <span>
                    Target
                  </span>

                  <strong>
                    {
                      match.target
                    }
                  </strong>
                </div>
              )}
            </>
          ) : (
            <p className="empty-text">
              No active match
            </p>
          )}
        </div>

        <div className="section-card">
          <h2>
            App Summary
          </h2>

          <div className="info-row">
            <span>
              Registered Players
            </span>

            <strong>
              {
                players.length
              }
            </strong>
          </div>

          <div className="info-row">
            <span>
              Created Teams
            </span>

            <strong>
              {
                teams.length
              }
            </strong>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Stats;