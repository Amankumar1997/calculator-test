import React, { useState } from "react";
import Calculator from "./components/Calculator";
import History from "./components/History";
import Memory from "./components/Memory";
import "./App.css";

function App() {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [memory, setMemory] = useState(
    JSON.parse(localStorage.getItem("memory")) || []
  );

  const addToHistory = (entry) => {
    const updatedHistory = [entry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  const updateMemory = (action, value) => {
    let updatedMemory = [...memory];
    switch (action) {
      case "MS":
        updatedMemory = [value, ...updatedMemory];
        break;
      case "MC":
        updatedMemory = [];
        break;
      case "M+":
        if (memory.length > 0) updatedMemory[0] += value;
        break;
      case "M-":
        if (memory.length > 0) updatedMemory[0] -= value;
        break;
      default:
        break;
    }
    setMemory(updatedMemory);
    localStorage.setItem("memory", JSON.stringify(updatedMemory));
  };

  return (
    <div className="app">
      <Calculator
        addToHistory={addToHistory}
        updateMemory={updateMemory}
        memory={memory}
      />
      {/* <History history={history} clearHistory={clearHistory} />
      <Memory memory={memory} updateMemory={updateMemory} /> */}
    </div>
  );
}

export default App;
