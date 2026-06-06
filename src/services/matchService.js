const STORAGE_KEY = "cricket_match";



export const matchService = {
  getMatch() {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );
  },

  saveMatch(match) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(match)
    );
  },

  clearMatch() {
    localStorage.removeItem(
      STORAGE_KEY
    );
  },
};