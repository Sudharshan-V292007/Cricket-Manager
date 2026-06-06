import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Footer from "../components/Footer";

import { matchService }
from "../services/matchService";

import "./Rules.css";

function Rules() {
  const navigate = useNavigate();

  const { state } =
    useLocation();

  const teamA = state?.teamA;
  const teamB = state?.teamB;

  const [overs, setOvers] =
    useState("");

  const [wideAddsRun,
    setWideAddsRun] =
    useState(true);

  const [noBallAddsRun,
    setNoBallAddsRun] =
    useState(true);

  const [strikerSystem,
    setStrikerSystem] =
    useState(true);

  const [
  allowSingleBatting,
  setAllowSingleBatting
] = useState(false);

  const [battingFirst,
    setBattingFirst] =
    useState(
      teamA?.id || ""
    );

 


  const startMatch = () => {
    if (!overs) {
      alert(
        "Enter number of overs"
      );

      return;
    }

    const matchConfig = {
      id: crypto.randomUUID(),

      teamA,
      teamB,

      overs:
        Number(overs),

      wideAddsRun,

      noBallAddsRun,

     strikerSystem,

originalStrikerSystem:
  strikerSystem,

      
  allowSingleBatting,

      battingFirst,

      createdAt:
        Date.now(),

      status: "live",

      score: 0,

wickets: 0,

oversCompleted: 0,

ballsInOver: 0,

strikerRuns: 0,
strikerBalls: 0,

nonStrikerRuns: 0,
nonStrikerBalls: 0,

batterRuns: 0,
batterBalls: 0,

bowlingStats: {},

dismissedPlayers: [],

completedOvers: [],
awaitingBowler: false,

innings: 1,

firstInningsScore: null,

target: null,

allOut: false,

history: [],

freeHit: false,

firstBattingTeam:
  battingFirst,

    };

    matchService.saveMatch(
      matchConfig
    );

    navigate("/setup-match");

    // scoreboard later
    // navigate("/scoreboard");
  };

  return (
    <>
      <div className="rules-page">
        <div className="rules-header">
          <h2>
            Match Rules
          </h2>

          <p>
            {teamA?.name}
            {" vs "}
            {teamB?.name}
          </p>
        </div>

        <div className="rule-card">
          <h3>
            Number Of Overs
          </h3>

          <input
            type="number"
            min="1"
            placeholder="Enter overs"
            value={overs}
            onChange={(e) =>
              setOvers(
                e.target.value
              )
            }
          />
        </div>

        <div className="rule-card">
          <h3>Extras</h3>

          <label>
            <input
              type="checkbox"
              checked={
                wideAddsRun
              }
              onChange={() =>
                setWideAddsRun(
                  !wideAddsRun
                )
              }
            />

            Wide Adds Run
          </label>

          <label>
            <input
              type="checkbox"
              checked={
                noBallAddsRun
              }
              onChange={() =>
                setNoBallAddsRun(
                  !noBallAddsRun
                )
              }
            />

            No Ball Adds Run
          </label>
        </div>

        <div className="rule-card">
          <h3>
            Batting System
          </h3>

          <label>
            <input
              type="checkbox"
              checked={
                strikerSystem
              }
              onChange={() =>
                setStrikerSystem(
                  !strikerSystem
                )
              }
            />

            Striker /
            Non-Striker
            System
          </label>
        </div>

        <div className="rule-card">
  <h3>
    Last Player Rule
  </h3>

  <label>
    <input
      type="checkbox"
      checked={
        allowSingleBatting
      }
      onChange={() =>
        setAllowSingleBatting(
          !allowSingleBatting
        )
      }
    />

    Allow Single Batting
    When Only One Batter
    Is Left
  </label>
</div>

        <div className="rule-card">
          <h3>
            Who Bats First?
          </h3>

          <div className="team-choice">
            <button
              className={
                battingFirst ===
                teamA?.id
                  ? "team-option active"
                  : "team-option"
              }
              onClick={() =>
                setBattingFirst(
                  teamA.id
                )
              }
            >
              {teamA?.name}
            </button>

            <button
              className={
                battingFirst ===
                teamB?.id
                  ? "team-option active"
                  : "team-option"
              }
              onClick={() =>
                setBattingFirst(
                  teamB.id
                )
              }
            >
              {teamB?.name}
            </button>
          </div>
        </div>

        <button
          className="start-rules-btn"
          onClick={
            startMatch
          }
        >
          🚀 Start Match
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Rules;