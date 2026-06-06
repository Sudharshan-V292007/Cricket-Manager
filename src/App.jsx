import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Match from "./pages/Match";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Teams from "./pages/Teams";
import Rules from "./pages/Rules"
import Scoreboard from "./pages/Scoreboard";
import SetupMatch from "./pages/SetupMatch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/match" element={<Match />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
      <Route path="/setup-match" element={<SetupMatch />} />
    </Routes>
    
  );
}

export default App;