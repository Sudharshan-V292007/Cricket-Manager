const saveMatch = (match) => {
  localStorage.setItem(
    "cricket_match",
    JSON.stringify(match)
  );

  return match;
};

const swapBatters = (match) => {
  [
    match.striker,
    match.nonStriker,
  ] = [
    match.nonStriker,
    match.striker,
  ];

  [
    match.strikerRuns,
    match.nonStrikerRuns,
  ] = [
    match.nonStrikerRuns,
    match.strikerRuns,
  ];

  [
    match.strikerBalls,
    match.nonStrikerBalls,
  ] = [
    match.nonStrikerBalls,
    match.strikerBalls,
  ];
};

const ensureBowlerStats = (
  match
) => {
  if (!match.bowlingStats) {
    match.bowlingStats = {};
  }

  if (
    !match.bowlingStats[
      match.currentBowler
    ]
  ) {
    match.bowlingStats[
      match.currentBowler
    ] = {
      runs: 0,
      wickets: 0,
      balls: 0,
    };
  }
};

const createHistorySnapshot =
  (match) => {
    const snapshot =
      JSON.parse(
        JSON.stringify(match)
      );

    delete snapshot.history;

    return snapshot;
  };

export const scoreboardService = {
  addRuns(match, runs) {
   
    const updatedMatch = {
  ...match,

  history: [
  ...(
    match.history || []
  ).slice(-29),

  createHistorySnapshot(
    match
  ),
],

  score:
    match.score + runs,
};

    ensureBowlerStats(
      updatedMatch
    );

    updatedMatch.bowlingStats[
      updatedMatch.currentBowler
    ].runs += runs;

    updatedMatch.bowlingStats[
      updatedMatch.currentBowler
    ].balls += 1;

    if (
      match.strikerSystem
    ) {
      updatedMatch.strikerRuns =
        match.strikerRuns +
        runs;

      updatedMatch.strikerBalls =
        match.strikerBalls +
        1;
    } else {
      updatedMatch.batterRuns =
        match.batterRuns +
        runs;

      updatedMatch.batterBalls =
        match.batterBalls +
        1;
    }

    updatedMatch.ballsInOver +=
      1;

      updatedMatch.freeHit =
  false;

    if (
      updatedMatch.ballsInOver ===
      6
    ) {
      updatedMatch.ballsInOver =
        0;

      updatedMatch.oversCompleted +=
        1;

      updatedMatch.awaitingBowler =
        true;

      if (
        updatedMatch.strikerSystem
      ) {
        swapBatters(
          updatedMatch
        );
      }
    }

    if (
      runs % 2 === 1 &&
      updatedMatch.strikerSystem
    ) {
      swapBatters(
        updatedMatch
      );
    }

    return saveMatch(
      updatedMatch
    );
  },

  addWicket(match) {
    
    const updatedMatch = {
  ...match,

  history: [
  ...(
    match.history || []
  ).slice(-29),

  createHistorySnapshot(
    match
  ),
],

  wickets:
    match.wickets + 1,
};

    ensureBowlerStats(
      updatedMatch
    );

    updatedMatch.bowlingStats[
      updatedMatch.currentBowler
    ].wickets += 1;

    updatedMatch.bowlingStats[
      updatedMatch.currentBowler
    ].balls += 1;

    updatedMatch.ballsInOver +=
      1;

    if (
      updatedMatch.ballsInOver ===
      6
    ) {
      updatedMatch.ballsInOver =
        0;

      updatedMatch.oversCompleted +=
        1;

      updatedMatch.awaitingBowler =
        true;

      if (
        updatedMatch.strikerSystem
      ) {
        swapBatters(
          updatedMatch
        );
      }
    }

    updatedMatch.freeHit =
  false;
  
    return saveMatch(
      updatedMatch
    );
  },

  addWide(match) {
    
    const updatedMatch = {
  ...match,

  history: [
  ...(
    match.history || []
  ).slice(-29),

  createHistorySnapshot(
    match
  ),
],
};

    ensureBowlerStats(
      updatedMatch
    );

    if (
      match.wideAddsRun
    ) {
      updatedMatch.score +=
        1;

      updatedMatch.bowlingStats[
        updatedMatch.currentBowler
      ].runs += 1;
    }

    return saveMatch(
      updatedMatch
    );
  },

  addNoBall(match) {
    
    const updatedMatch = {
  ...match,

  history: [
  ...(
    match.history || []
  ).slice(-29),

  createHistorySnapshot(
    match
  ),
],
};

    ensureBowlerStats(
      updatedMatch
    );

    if (
  match.noBallAddsRun
) {
  updatedMatch.score +=
    1;

  updatedMatch.bowlingStats[
    updatedMatch.currentBowler
  ].runs += 1;
}

updatedMatch.freeHit =
  true;

    return saveMatch(
      updatedMatch
    );
  },

  selectNewBatter(
    match,
    playerId
  ) {
    const updatedMatch = {
      ...match,
    };

    if (
      match.strikerSystem
    ) {
      updatedMatch.striker =
        playerId;

      updatedMatch.strikerRuns =
        0;

      updatedMatch.strikerBalls =
        0;
    } else {
      updatedMatch.singleBatter =
        playerId;

      updatedMatch.batterRuns =
        0;

      updatedMatch.batterBalls =
        0;
    }

    return saveMatch(
      updatedMatch
    );
  },

  selectNewBowler(
    match,
    playerId
  ) {
    const updatedMatch = {
      ...match,

      currentBowler:
        playerId,

      awaitingBowler:
        false,
    };

    ensureBowlerStats(
      updatedMatch
    );

    return saveMatch(
      updatedMatch
    );
  },

  undo(match) {
  const history =
    match.history || [];

  if (
    history.length === 0
  ) {
    return match;
  }

  const previous =
    history[
      history.length - 1
    ];

  previous.history =
    history.slice(
      0,
      history.length - 1
    );

  return saveMatch(
    previous
  );
},

  isInningsComplete(
    match
  ) {
    return (
      match.oversCompleted >=
      match.overs
    );
  },
};