import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { playerService } from "../services/playerService";
import "./Home.css";

function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
  const savedPlayers =
    playerService.getPlayers();

  setPlayers(savedPlayers);
}, []);

  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingPlayer, setEditingPlayer] =
  useState(null);

 const addPlayer = () => {
  if (!playerName.trim()) return;

  const newPlayer = {
    id: crypto.randomUUID(),
    name: playerName.trim(),

    avatar: null,

    matches: 0,
    runs: 0,
    wickets: 0,
    highestScore: 0,
  };

  playerService.createPlayer(
  newPlayer
);

setPlayers(
  playerService.getPlayers()
);

  setPlayerName("");
  setShowModal(false);
};

const deletePlayer = (playerId) => {
  const confirmDelete = window.confirm(
    "Delete this player?"
  );

  if (!confirmDelete) return;

  playerService.deletePlayer(playerId);

  setPlayers(
    playerService.getPlayers()
  );
};

const startEditPlayer = (player) => {
  setEditingPlayer(player);

  setPlayerName(player.name);

  setShowModal(true);
};

const saveEditedPlayer = () => {
  if (!playerName.trim()) return;

  playerService.updatePlayer(
    editingPlayer.id,
    {
      name: playerName.trim(),
    }
  );

  setPlayers(
    playerService.getPlayers()
  );

  setEditingPlayer(null);

  setPlayerName("");

  setShowModal(false);
};

const filteredPlayers = players.filter(
  (player) =>
    player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);

  return (
    <>
      <Navbar />

      <div className="home-page">
        <div className="stats-card">
          <h3>Total Players</h3>
          <span>{players.length}</span>
        </div>
        <div className="game-mode-card">
  <h3>Game Mode</h3>

  <div className="game-mode-buttons">
    <button className="mode-btn active-mode">
      🏏 Team Mode
    </button>

    <button className="mode-btn">
      👤 Singles Mode
    </button>
  </div>
</div>

        <div className="quick-actions-card">
  <h3>Quick Actions</h3>

  <div className="quick-actions">
    <button className="action-btn">
      Create Team
    </button>

    <button className="action-btn">
      Start Match
    </button>
  </div>
</div>

<div className="search-container">
  <input
    type="text"
    placeholder="🔍 Search Players..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />
</div>

        {players.length === 0 ? (
          <div className="empty-state">
            <h2>No Players Yet</h2>

            <p>
              Click the + button to create your
              first player.
            </p>
          </div>
        ) : (
          <div className="players-grid">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="player-card"
              >
                <div className="player-header">
                  <div className="player-avatar">
                    {player.avatar ? (
                      <img
                        src={player.avatar}
                        alt={player.name}
                      />
                    ) : (
                      player.name
                        .charAt(0)
                        .toUpperCase()
                    )}
                  </div>

                  <div className="player-info">
                    <h3>{player.name}</h3>
                    <p>Player</p>
                  </div>
                </div>

                <div className="player-stats">
                  <div>
                    <span>Matches</span>
                    <strong>
                      {player.matches}
                    </strong>
                  </div>

                  <div>
                    <span>Runs</span>
                    <strong>
                      {player.runs}
                    </strong>
                  </div>

                  <div>
                    <span>Wickets</span>
                    <strong>
                      {player.wickets}
                    </strong>
                  </div>
                </div>

                <div className="player-actions">
  <button
    className="edit-btn"
    onClick={() =>
      startEditPlayer(player)
    }
  >
    <Pencil size={16} />
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() =>
      deletePlayer(player.id)
    }
  >
    <Trash2 size={16} />
    Delete
  </button>
</div>

              </div>
            ))}
          </div>
        )}

        <button
          className="fab"
          onClick={() => setShowModal(true)}
        >
          +
        </button>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>
  {editingPlayer
    ? "Edit Player"
    : "Add Player"}
</h2>

              <input
                type="text"
                placeholder="Enter player name"
                value={playerName}
                onChange={(e) =>
                  setPlayerName(e.target.value)
                }
              />

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowModal(false);

setEditingPlayer(null);

setPlayerName("");
                  }}
                >
                  Cancel
                </button>

                <button
                  className="save-btn"
                  onClick={
  editingPlayer
    ? saveEditedPlayer
    : addPlayer
}
                >
                  Save
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

export default Home;