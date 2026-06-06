import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { teamService } from "../services/teamService";
import "./Match.css";

function Match() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);

 
  

  useEffect(() => {
    setTeams(teamService.getTeams());
  }, []);

  const selectTeam = (team) => {
    if (teamA?.id === team.id) {
      setTeamA(null);
      return;
    }

    if (teamB?.id === team.id) {
      setTeamB(null);
      return;
    }

    if (!teamA) {
      setTeamA(team);
      return;
    }

    if (!teamB) {
      setTeamB(team);
      return;
    }
  };

  

  return (
    <>
      <div className="match-page">
        <div className="match-header">
          <h2>Create Match</h2>

          <p>
            Select two teams to begin
          </p>
        </div>

        <div className="selected-teams">
          <div className="selected-slot">
            <span>Team A</span>

            <strong>
              {teamA
                ? teamA.name
                : "Select Team"}
            </strong>
          </div>

          <div className="vs-badge">
            VS
          </div>

          <div className="selected-slot">
            <span>Team B</span>

            <strong>
              {teamB
                ? teamB.name
                : "Select Team"}
            </strong>
          </div>
        </div>

        {teams.length === 0 ? (
          <div className="empty-match">
            <h2>No Teams Found</h2>

            <p>
              Create teams first.
            </p>
          </div>
        ) : (
          <div className="teams-grid">
            {teams.map((team) => (
              <div
                key={team.id}
                className={`match-team-card ${
                  teamA?.id === team.id ||
                  teamB?.id === team.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  selectTeam(team)
                }
              >
                <div className="team-avatar">
                  {team.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h3>{team.name}</h3>

                <p>
                  {
                    team.players.length
                  }{" "}
                  Players
                </p>
              </div>
            ))}
          </div>
        )}

        {teamA && teamB && (
          <div className="match-bottom-sheet">
            <div className="sheet-content">
              <div className="sheet-teams">
                <strong>
                  {teamA.name}
                </strong>

                <span>VS</span>

                <strong>
                  {teamB.name}
                </strong>
              </div>

              <button
  className="start-match-btn"
  onClick={() =>
    navigate("/rules", {
      state: {
        teamA,
        teamB,
      },
    })
  }
>
   Start Match
</button>
            </div>
          </div>
        )}

      
      </div>

      <Footer />
    </>
  );
}

export default Match;