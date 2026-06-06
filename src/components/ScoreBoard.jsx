import useCricketStore from "../cricketStore";

function ScoreBoard() {
  const runs = useCricketStore(
    (state) => state.runs
  );

  const wickets = useCricketStore(
    (state) => state.wickets
  );

  const balls = useCricketStore(
    (state) => state.balls
  );

  const overs =
    Math.floor(balls / 6) +
    "." +
    (balls % 6);

  return (
    <div>
      <h1>
        {runs}/{wickets}
      </h1>

      <h3>{overs} Overs</h3>
    </div>
  );
}

export default ScoreBoard;