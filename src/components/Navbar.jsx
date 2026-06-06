import "./Navbar.css";
import { Users, Shield, Trophy } from "lucide-react";

function Navbar() {
  return (
    <>
      <header className="hero-navbar">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-greeting">
              ✨ Welcome Back
            </span>

            <h1>Cricket Manager</h1>
          </div>

          <div className="hero-icon">
            🏏
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-card">
            <Users size={20} />
            <strong>0</strong>
            <span>Players</span>
          </div>

          <div className="hero-stat-card">
            <Shield size={20} />
            <strong>0</strong>
            <span>Teams</span>
          </div>

          <div className="hero-stat-card">
            <Trophy size={20} />
            <strong>0</strong>
            <span>Matches</span>
          </div>
        </div>
      </header>

      <div className="banner-tape">
        <div className="banner-track">
          <span>🏏 CricketSim</span>
          <span>🏆 Build Teams</span>
          <span>🔥 Start Matches</span>
          <span>📊 Track Stats</span>
          <span>🏏 CricketSim</span>
          <span>🏆 Build Teams</span>
          <span>🔥 Start Matches</span>
          <span>📊 Track Stats</span>
        </div>
      </div>
    </>
  );
}

export default Navbar;