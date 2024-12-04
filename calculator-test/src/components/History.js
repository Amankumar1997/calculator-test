import React from "react";

function History({ history, clearHistory }) {
  return (
    <div className="history-panel">
      <h3>History</h3>
      <button onClick={clearHistory}>Clear History</button>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default History;
