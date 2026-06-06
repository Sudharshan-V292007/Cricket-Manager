import { create } from "zustand";

const useCricketStore = create((set) => ({
  started: false,

  teamA: "",
  teamB: "",

  matchType: "",

  totalOvers: 20,

  runs: 0,
  wickets: 0,
  balls: 0,

  startMatch: (data) =>
    set({
      started: true,

      teamA: data.teamA,
      teamB: data.teamB,

      matchType: data.matchType,
      totalOvers: data.totalOvers,

      runs: 0,
      wickets: 0,
      balls: 0,
    }),

  addRuns: (runs) =>
    set((state) => ({
      runs: state.runs + runs,
      balls: state.balls + 1,
    })),

  addWicket: () =>
    set((state) => ({
      wickets: state.wickets + 1,
      balls: state.balls + 1,
    })),
}));

export default useCricketStore;