import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Settings.css";

function Settings() {
  return (
    <>
      <Navbar />

      <div className="settings-page">
        <h1>Settings</h1>

        <div className="settings-card">
          <h3>Theme</h3>
          <p>Light Mode</p>
        </div>

        <div className="settings-card">
          <h3>Match Data</h3>
          <button
            onClick={() => {
              const confirmDelete = window.confirm(
                "Delete all saved matches?"
              );

              if (confirmDelete) {
                localStorage.clear();
                alert("All data deleted.");
              }
            }}
          >
            Clear Data
          </button>
        </div>

        <div className="settings-card">
          <h3>App Version</h3>
          <p>v1.0.0</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Settings;