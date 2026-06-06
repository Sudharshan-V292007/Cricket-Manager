import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { teamService } from "../services/teamService";
import { playerService } from "../services/playerService";
import "./Teams.css";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [teamName, setTeamName] =
    useState("");

  const [selectedPlayers, setSelectedPlayers] =
    useState([]);

  useEffect(() => {
    setTeams(teamService.getTeams());

    setPlayers(
      playerService.getPlayers()
    );
  }, []);

  const togglePlayer = (playerId) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter(
            (id) => id !== playerId
          )
        : [...prev, playerId]
    );
  };

  const createTeam = () => {
    if (!teamName.trim()) return;

    if (selectedPlayers.length === 0)
      return;

    const newTeam = {
      id: crypto.randomUUID(),

      name: teamName.trim(),

      players: selectedPlayers,

      createdAt: Date.now(),
    };

    teamService.createTeam(newTeam);

    setTeams(teamService.getTeams());

    setTeamName("");

    setSelectedPlayers([]);

    setShowModal(false);
  };

  const deleteTeam = (teamId) => {
    const confirmDelete =
      window.confirm(
        "Delete this team?"
      );

    if (!confirmDelete) return;

    teamService.deleteTeam(teamId);

    setTeams(teamService.getTeams());
  };

  return (
    <>
      <div className="teams-page">
        <div className="teams-overview">
          <h3>Total Teams</h3>

          <span>{teams.length}</span>
        </div>

        {teams.length === 0 ? (
          <div className="empty-teams">
            <h2>No Teams Yet</h2>

            <p>
              Create your first team using
              the + button.
            </p>
          </div>
        ) : (
          <div className="teams-grid">
            {teams.map((team) => (
              <div
                key={team.id}
                className="team-card"
              >
                <div className="team-card-top">
                  <h2>{team.name}</h2>

                  <button
                    className="team-delete"
                    onClick={() =>
                      deleteTeam(team.id)
                    }
                  >
                    ✕
                  </button>
                </div>

                <p className="team-count">
                  {team.players.length} Players
                </p>

                <div className="team-avatars">
                  {team.players.map(
                    (playerId, index) => {
                      const player =
                        players.find(
                          (p) =>
                            p.id === playerId
                        );

                      return (
                        <div
                          key={index}
                          className="team-avatar"
                        >
                          {player
                            ?.name?.charAt(0)
                            ?.toUpperCase() ||
                            "?"}
                        </div>
                      );
                    }
                  )}
                </div>

                <p className="avatar-note">
                  Player avatars coming
                  soon
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          className="team-fab"
          onClick={() =>
            setShowModal(true)
          }
        >
          +
        </button>

        {showModal && (
          <div className="modal-overlay">
            <div className="team-modal">
              <h2>Create Team</h2>

              <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) =>
                  setTeamName(
                    e.target.value
                  )
                }
              />

              <div className="player-selection">
                <h3>Select Players</h3>

                {players.length === 0 ? (
                  <p>
                    No players found.
                    Create players first.
                  </p>
                ) : (
                  players.map((player) => (
                    <label
                      key={player.id}
                      className="player-checkbox"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPlayers.includes(
                          player.id
                        )}
                        onChange={() =>
                          togglePlayer(
                            player.id
                          )
                        }
                      />

                      {player.name}
                    </label>
                  ))
                )}
              </div>

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowModal(false);

                    setTeamName("");

                    setSelectedPlayers(
                      []
                    );
                  }}
                >
                  Cancel
                </button>

                <button
                  className="save-btn"
                  onClick={createTeam}
                >
                  Save Team
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Teams;