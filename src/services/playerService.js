const STORAGE_KEY = "cricket_data";

function getData() {
  try {
    return (
      JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || {
        version: 1,
        players: [],
      }
    );
  } catch {
    return {
      version: 1,
      players: [],
    };
  }
}

function saveData(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export const playerService = {
  getPlayers() {
    const data = getData();
    return data.players;
  },

  createPlayer(player) {
    const data = getData();

    data.players.push(player);

    saveData(data);

    return player;
  },

  updatePlayer(playerId, updates) {
    const data = getData();

    data.players = data.players.map(
      (player) =>
        player.id === playerId
          ? {
              ...player,
              ...updates,
            }
          : player
    );

    saveData(data);
  },

  deletePlayer(playerId) {
    const data = getData();

    data.players = data.players.filter(
      (player) =>
        player.id !== playerId
    );

    saveData(data);
  },

  getPlayer(playerId) {
    const data = getData();

    return data.players.find(
      (player) =>
        player.id === playerId
    );
  },

  clearPlayers() {
    const data = getData();

    data.players = [];

    saveData(data);
  },
};