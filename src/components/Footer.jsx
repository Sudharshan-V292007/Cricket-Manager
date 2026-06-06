import "./Footer.css";

import {
  House,
  Trophy,
  UserRound,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <House size={22} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/match" className="nav-item">
        <Trophy size={22} />
        <span>Match</span>
      </NavLink>

      <NavLink to="/teams" className="nav-item">
        <UserRound size={22} />
        <span>Teams</span>
      </NavLink>

      <NavLink to="/stats" className="nav-item">
        <BarChart3 size={22} />
        <span>Stats</span>
      </NavLink>

      <NavLink to="/settings" className="nav-item">
        <Settings size={22} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}

export default Footer;