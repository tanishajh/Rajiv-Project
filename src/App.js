import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [bpm, setBpm] = useState("--");
  const [mood, setMood] = useState("--");

  useEffect(() => {
    const fetchBPM = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/heartbeat/latest"
        );
        setBpm(res.data?.bpm || "--");
        setMood(res.data?.mood || "--");
      } catch (err) {
        setBpm("Error");
        setMood("Error");
      }
    };

    fetchBPM(); // Call immediately on load
    const interval = setInterval(fetchBPM, 5000); // Refresh every 5s

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="app">
      <div className="card">
        <h1>💖 Heart Rate Monitor</h1>

        {/* Heart rate */}
        <div className="bpm">{bpm}</div>
        <p>BPM</p>

        {/* Mood label */}
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>{mood}</p>
      </div>
    </div>
  );
}

export default App;
