import React from "react";

function Memory({ memory, updateMemory }) {
  return (
    <div className="memory-panel">
      <h3>Memory</h3>
      <button onClick={() => updateMemory("MC")}>Clear Memory</button>
      <ul>
        {memory.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default Memory;
