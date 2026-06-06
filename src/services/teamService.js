const STORAGE_KEY = "cricket_teams";

export const teamService = {
  getTeams() {
    return (
      JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || []
    );
  },

  createTeam(team) {
    const teams =
      this.getTeams();

    teams.push(team);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(teams)
    );
  },

  deleteTeam(teamId) {
    const teams =
      this.getTeams().filter(
        (team) =>
          team.id !== teamId
      );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(teams)
    );
  },
};