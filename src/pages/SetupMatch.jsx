import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import { matchService } from "../services/matchService";

import "./SetupMatch.css";

function SetupMatch() {
  const navigate = useNavigate();

  const match =
    matchService.getMatch();

  const battingTeam =
    match.battingFirst ===
    match.teamA.id
      ? match.teamA
      : match.teamB;

  const bowlingTeam =
    match.battingFirst ===
    match.teamA.id
      ? match.teamB
      : match.teamA;

  const [striker, setStriker] =
    useState("");

  const [nonStriker,
    setNonStriker] =
    useState("");

  const [singleBatter,
    setSingleBatter] =
    useState("");

  const [bowler, setBowler] =
    useState("");

  const startInnings = () => {
    if (
      match.strikerSystem
    ) {
      if (
        !striker ||
        !nonStriker ||
        !bowler
      ) {
        alert(
          "Select all players"
        );
        return;
      }

      if (
        striker ===
        nonStriker
      ) {
        alert(
          "Striker and Non-Striker cannot be same"
        );
        return;
      }
    } else {
      if (
        !singleBatter ||
        !bowler
      ) {
        alert(
          "Select all players"
        );
        return;
      }
    }

    const updatedMatch = {
      ...match,

      striker,

      nonStriker,

      singleBatter,

      currentBowler:
        bowler,

       bowlingStats: {
  ...(match.bowlingStats || {}),

  [bowler]: {
    runs: 0,
    wickets: 0,
    balls: 0,
  },
},
       
        dismissedPlayers:
  match.dismissedPlayers || [],

  
    };

    matchService.saveMatch(
      updatedMatch
    );

    

    navigate(
      "/scoreboard"
    );
  };

  return (
    <>
      <div className="setup-page">
        <div className="setup-header">
          <h2>
            Match Setup
          </h2>

          <p>
            Select Opening Players
          </p>
        </div>

        <div className="setup-card">
          <h3>
            Batting Team
          </h3>

          <strong>
            {battingTeam.name}
          </strong>
        </div>

        {match.strikerSystem ? (
          <>
            <div className="setup-card">
              <h3>
                Select Striker
              </h3>

              {battingTeam.players.map(
                (
                  playerId
                ) => (
                  <button
                    key={
                      playerId
                    }
                    className={
                      striker ===
                      playerId
                        ? "player-card active"
                        : "player-card"
                    }
                    onClick={() =>
                      setStriker(
                        playerId
                      )
                    }
                  >
                    <div className="player-avatar">
                      {getPlayerName(
                        playerId
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="player-details">
                      <strong>
                        {getPlayerName(
                          playerId
                        )}
                      </strong>

                      <span>
                        Opening Batter
                      </span>
                    </div>
                  </button>
                )
              )}
            </div>

            <div className="setup-card">
              <h3>
                Select Non-Striker
              </h3>

              {battingTeam.players.map(
                (
                  playerId
                ) => (
                  <button
                    key={
                      playerId
                    }
                    className={
                      nonStriker ===
                      playerId
                        ? "player-card active"
                        : "player-card"
                    }
                    onClick={() =>
                      setNonStriker(
                        playerId
                      )
                    }
                  >
                    <div className="player-avatar">
                      {getPlayerName(
                        playerId
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="player-details">
                      <strong>
                        {getPlayerName(
                          playerId
                        )}
                      </strong>

                      <span>
                        Non Striker
                      </span>
                    </div>
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <div className="setup-card">
            <h3>
              Select Batter
            </h3>

            {battingTeam.players.map(
              (
                playerId
              ) => (
                <button
                  key={
                    playerId
                  }
                  className={
                    singleBatter ===
                    playerId
                      ? "player-card active"
                      : "player-card"
                  }
                  onClick={() =>
                    setSingleBatter(
                      playerId
                    )
                  }
                >
                  <div className="player-avatar">
                    {getPlayerName(
                      playerId
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="player-details">
                    <strong>
                      {getPlayerName(
                        playerId
                      )}
                    </strong>

                    <span>
                      Single Batter
                      Mode
                    </span>
                  </div>
                </button>
              )
            )}
          </div>
        )}

        <div className="setup-card">
          <h3>
            Select Bowler
          </h3>

          {bowlingTeam.players.map(
            (
              playerId
            ) => (
              <button
                key={
                  playerId
                }
                className={
                  bowler ===
                  playerId
                    ? "player-card active"
                    : "player-card"
                }
                onClick={() =>
                  setBowler(
                    playerId
                  )
                }
              >
                <div className="player-avatar">
                  {getPlayerName(
                    playerId
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="player-details">
                  <strong>
                    {getPlayerName(
                      playerId
                    )}
                  </strong>

                  <span>
                    Opening Bowler
                  </span>
                </div>
              </button>
            )
          )}
        </div>

        <button
          className="start-innings-btn"
          onClick={
            startInnings
          }
        >
          🏏 Start Innings
        </button>
      </div>

      <Footer />
    </>
  );

  function getPlayerName(
    playerId
  ) {
    const players =
      JSON.parse(
        localStorage.getItem(
          "cricket_data"
        )
      )?.players || [];

    const player =
      players.find(
        (p) =>
          p.id === playerId
      );

    return (
      player?.name ||
      "Unknown Player"
    );
  }
}

export default SetupMatch;