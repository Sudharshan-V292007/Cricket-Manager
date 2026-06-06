import { useState } from "react";

import Footer from "../components/Footer";
import { matchService } from "../services/matchService";
import { scoreboardService }
from "../services/scoreboardService";
import {
  useNavigate
} from "react-router-dom";

import "./Scoreboard.css";

function Scoreboard() {

  const navigate =
  useNavigate();

  const [match, setMatch] =
    useState(
      matchService.getMatch()
    );

const [showBatterModal,
  setShowBatterModal] =
  useState(false);

const [outBatter,
  setOutBatter] =
  useState(null);

  const [showBowlerModal,
  setShowBowlerModal] =
  useState(false);

  if (!match) {
    return (
      <>
        <div className="scoreboard-page">
          <h2>
            No Match Found
          </h2>
        </div>

        <Footer />
      </>
    );
  }

  const players =
    JSON.parse(
      localStorage.getItem(
        "cricket_data"
      )
    )?.players || [];

  const getPlayerName = (
    playerId
  ) => {
    const player =
      players.find(
        (p) =>
          p.id === playerId
      );

    return (
      player?.name ||
      "Unknown Player"
    );
  };

  const saveMatchState = (
    updatedMatch
  ) => {
    matchService.saveMatch(
      updatedMatch
    );

    setMatch(updatedMatch);
  };

  



  const battingTeam =
    match.battingFirst ===
    match.teamA.id
      ? match.teamA
      : match.teamB;

  const availableBatters =
  battingTeam.players.filter(
    (playerId) =>
      !match.dismissedPlayers?.includes(
        playerId
      )
  );

  const inningsComplete =
  match.oversCompleted >=
    match.overs ||
  match.allOut;
  

  const bowlingTeam =
  match.battingFirst ===
  match.teamA.id
    ? match.teamB
    : match.teamA;


const checkBowlerChange =
  () => {
    const latestMatch =
      matchService.getMatch();

    refreshMatch();

    if (
      latestMatch.awaitingBowler &&
      !showBatterModal
    ) {
      setShowBowlerModal(
        true
      );
    }
  };

      const refreshMatch = () => {
  setMatch(
    matchService.getMatch()
  );
};

const handleWicket =
  () => {

    if (
  match.freeHit
) {
  alert(
    "Free Hit - Not Out"
  );

  return;
}

    const dismissed =
      match.strikerSystem
        ? match.striker
        : match.singleBatter;

    const latestMatch =
  matchService.getMatch();

const updatedMatch = {
  ...latestMatch,

  dismissedPlayers: [
    ...(latestMatch.dismissedPlayers || []),
    dismissed,
  ],
};

const wicketMatch =
  scoreboardService.addWicket(
    updatedMatch
  );

setOutBatter(
  dismissed
);

const remainingBatters =
  battingTeam.players.filter(
    (id) =>
      !wicketMatch.dismissedPlayers.includes(
        id
      )
  );

if (
  match.allowSingleBatting &&
  match.strikerSystem &&
  remainingBatters.length === 1
) {
  wicketMatch.strikerSystem =
    false;

  wicketMatch.singleBatter =
    remainingBatters[0];

  wicketMatch.striker =
    null;

  wicketMatch.nonStriker =
    null;

  matchService.saveMatch(
    wicketMatch
  );

  refreshMatch();

  alert(
    "Single Batting Mode Activated"
  );

  return;
}

if (
  remainingBatters.length === 0
) {
  wicketMatch.allOut =
    true;

  matchService.saveMatch(
    wicketMatch
  );

  refreshMatch();

  return;
}

if (
  !match.allowSingleBatting &&
  remainingBatters.length === 1
) {
  wicketMatch.allOut =
    true;

  matchService.saveMatch(
    wicketMatch
  );

  refreshMatch();

  return;
}

matchService.saveMatch(
  wicketMatch
);

refreshMatch();

setShowBatterModal(
  true
);

  };

 
const selectNewBatter =
  (playerId) => {
    scoreboardService.selectNewBatter(
      matchService.getMatch(),
      playerId
    );

    refreshMatch();

    setShowBatterModal(
      false
    );

    const latestMatch =
      matchService.getMatch();

    if (
      latestMatch.awaitingBowler
    ) {
      setShowBowlerModal(
        true
      );
    }
  };
 


  const selectNewBowler =
  (playerId) => {
    const latestMatch =
      matchService.getMatch();

    latestMatch.currentBowler =
      playerId;

    latestMatch.awaitingBowler =
      false;

    matchService.saveMatch(
      latestMatch
    );

    setShowBowlerModal(
      false
    );

    refreshMatch();
  };


  const startSecondInnings =
  () => {
    const updatedMatch = {
      ...match,

      

      innings: 2,

      strikerSystem:
  match.originalStrikerSystem,

singleBatter: null,

striker: null,

nonStriker: null,

allOut: false,

      firstInningsScore:
        match.score,

      target:
        match.score + 1,

      score: 0,

      wickets: 0,

      oversCompleted: 0,

      ballsInOver: 0,

      dismissedPlayers: [],

      awaitingBowler:
        false,

      strikerRuns: 0,
      strikerBalls: 0,

      nonStrikerRuns: 0,
      nonStrikerBalls: 0,

      batterRuns: 0,
      batterBalls: 0,

     bowlingStats: {},

currentBowler: null,

      battingFirst:
        match.battingFirst ===
        match.teamA.id
          ? match.teamB.id
          : match.teamA.id,
    };

    matchService.saveMatch(
      updatedMatch
    );

    navigate(
      "/setup-match"
    );
  };

  const runsNeeded =
  match.innings === 2
    ? Math.max(
        0,
        match.target -
          match.score
      )
    : 0;

const ballsRemaining =
  match.innings === 2
    ? (
        match.overs * 6 -
        (
          match.oversCompleted *
            6 +
          match.ballsInOver
        )
      )
    : 0;

  const matchFinished =
  match.innings === 2 &&
  (
    match.score >=
      match.target ||

    (
      inningsComplete &&
      match.score <
        match.target
    )
  );

 let winnerText = "";

if (matchFinished) {
  const firstBattingTeam =
    match.firstBattingTeam ===
    match.teamA.id
      ? match.teamA
      : match.teamB;

  const secondBattingTeam =
    match.firstBattingTeam ===
    match.teamA.id
      ? match.teamB
      : match.teamA;

  if (
    match.score >=
    match.target
  ) {
    winnerText =
      `${secondBattingTeam.name} Wins`;
  } else if (
    match.score ===
    match.firstInningsScore
  ) {
    winnerText =
      "Match Tied";
  } else {
    winnerText =
      `${firstBattingTeam.name} Wins`;
  }
}

  return (
    <>
      <div className="scoreboard-page">
        <div className="match-banner">
          <h2>
            {
              battingTeam.name
            }
          </h2>
        </div>

{
  match.freeHit && (
    <div className="free-hit-banner">
      🔥 FREE HIT
    </div>
  )
}

{
  match.innings === 2 &&
  !matchFinished && (
    <div className="target-banner">
      <p className="target-text">
        {battingTeam.name}
        {" "}
        need
        {" "}
        {runsNeeded}
        {" "}
        run
        {runsNeeded !== 1
          ? "s"
          : ""}
        {" "}
        in
        {" "}
        {ballsRemaining}
        {" "}
        ball
        {ballsRemaining !== 1
          ? "s"
          : ""}
      </p>
    </div>
  )
}

        <div className="unified-card">
          <div className="unified-score-section">
            <div className="score-display">
              <h1>
                {match.score}/
                {match.wickets}
              </h1>
              <p>
                Overs {match.oversCompleted}.{match.ballsInOver} / {match.overs}
              </p>
            </div>
          </div>

          <div className="unified-players-section">
            {match.strikerSystem ? (
              <>
                <div className="unified-player">
                  <div className="player-badge">S</div>
                  <div className="player-info">
                    <span>Striker</span>
                    <strong>
                      {getPlayerName(
                        match.striker
                      )}
                    </strong>
                    <p>
                      {match.strikerRuns}
                      ({match.strikerBalls})
                    </p>
                  </div>
                </div>

                <div className="unified-player">
                  <div className="player-badge">NS</div>
                  <div className="player-info">
                    <span>Non-Striker</span>
                    <strong>
                      {getPlayerName(
                        match.nonStriker
                      )}
                    </strong>
                    <p>
                      {match.nonStrikerRuns}
                      ({match.nonStrikerBalls})
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="unified-player">
                <div className="player-badge">B</div>
                <div className="player-info">
                  <span>Batter</span>
                  <strong>
                    {getPlayerName(
                      match.singleBatter
                    )}
                  </strong>
                  <p>
                    {match.batterRuns}
                    ({match.batterBalls})
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="unified-bowler-section">
            <div className="unified-player">
              <div className="player-badge">B</div>
              <div className="player-info">
                <span>Bowler</span>
                <strong>
                  {getPlayerName(
                    match.currentBowler
                  )}
                </strong>
                {(() => {
                  const stats =
                    match.bowlingStats?.[
                      match.currentBowler
                    ] || {
                      runs: 0,
                      wickets: 0,
                      balls: 0,
                    };

                   console.log({
                  innings: match.innings,
                  score: match.score,
                  target: match.target,

                  inningsComplete,

                  matchFinished,

                  allOut: match.allOut,

                  awaitingBowler:
                    match.awaitingBowler,

                  showBowlerModal,

                  showBatterModal,
                });

                  return (
                    <p>
                      {stats.runs}R | {stats.wickets}W | {stats.balls}B
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {inningsComplete ||
matchFinished ? (
  <div className="innings-complete-card">
    <h2>
      🏁 Innings Complete
    </h2>

    <h3>
      {match.score}/
      {match.wickets}
    </h3>

    {match.innings === 1 ? (
      <button
        className="next-innings-btn"
        onClick={
          startSecondInnings
        }
      >
        Start 2nd Innings
      </button>
    ) : (
      <div className="winner-card">
  <h2>
    🏆
  </h2>

  <h3>
    {winnerText}
  </h3>
</div>
    )}
  </div>
) : (
          <>
            <div className="action-grid">
              <button
                onClick={() => {
  scoreboardService.addRuns(
    match,
    0
  );

 

  checkBowlerChange();
}}
              >
                0
              </button>

              <button
                onClick={() => {
  scoreboardService.addRuns(
    match,
    1
  );

 

  checkBowlerChange();
}}
              >
                1
              </button>

              <button
                onClick={() => {
  scoreboardService.addRuns(
    match,
    2
  );

  

  checkBowlerChange();
}}
              >
                2
              </button>

              <button
                onClick={() => {
  scoreboardService.addRuns(
    match,
    3
  );

  

  checkBowlerChange();
}}
              >
                3
              </button>

              <button
                onClick={() => {
  scoreboardService.addRuns(
    match,
    4
  );


  checkBowlerChange();
}}
              >
                4
              </button>

              <button
                onClick={() => {
  scoreboardService.addRuns(
    match,
    6
  );

  

  checkBowlerChange();
}}
              >
                6
              </button>
            </div>

            <div className="extra-grid">
              <button
                onClick={handleWicket}
              >
                W
              </button>

              <button
                onClick={() => {
  scoreboardService.addWide(
    match
  );

 checkBowlerChange();
}}
              >
                WD
              </button>

              <button
                onClick={() => {
  scoreboardService.addNoBall(
    match
  );

  checkBowlerChange();
}}
              >
                NB
              </button>

              <button
  onClick={() => {
    scoreboardService.undo(
      match
    );

    refreshMatch();
  }}
>
  ↩ Undo
</button>

            </div>
          </>
        )}
      </div>

      {showBatterModal && (
  <div className="modal-overlay">
    <div className="batter-modal">
      <h2>
        Select New Batter
      </h2>

      {battingTeam.players
        .filter(
          (playerId) =>
            !match.dismissedPlayers.includes(
              playerId
            ) &&
            playerId !==
              match.nonStriker
        )
        .map(
          (playerId) => (
            <button
              key={playerId}
              className="new-batter-btn"
              onClick={() =>
                selectNewBatter(
                  playerId
                )
              }
            >
              {getPlayerName(
                playerId
              )}
            </button>
          )
        )}
    </div>
  </div>
)}


{showBowlerModal && (
  <div className="modal-overlay">
    <div className="batter-modal">
      <h2>
        Select New Bowler
      </h2>

      {bowlingTeam.players
        .filter(
          (playerId) =>
            playerId !==
            match.currentBowler
        )
        .map(
          (playerId) => (
            <button
              key={playerId}
              className="new-batter-btn"
              onClick={() =>
                selectNewBowler(
                  playerId
                )
              }
            >
              {getPlayerName(
                playerId
              )}
            </button>
          )
        )}
    </div>
  </div>
)}


      <Footer />
    </>
  );
}

export default Scoreboard;