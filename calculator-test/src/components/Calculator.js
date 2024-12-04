import React, { useEffect, useState } from "react";
import "../assets/css/Calculator.css";
import Trash from "../assets/images/trash.png";
const Tabs = ["History", "Memory"];
function Calculator() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(0);
  const [memory, setMemory] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentTab, setCurrentTab] = useState("History");
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("calculatorHistory"));
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);
  useEffect(() => {
    if (history.length) {
      localStorage.setItem("calculatorHistory", JSON.stringify(history));
    }
  }, [history]);

  const clearHistory = (val) => {
    if (val === "History") {
      setHistory([]);
      localStorage.removeItem("calculatorHistory");
    } else if (val === "Memory") {
    }
  };
  const evaluateExpression = (expression) => {
    const operators = ["+", "-", "*", "/"];
    const stack = [];
    let currentNumber = "";
    let currentOperator = "+";

    expression = expression.replace(/\s+/g, "");

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (/\d/.test(char)) {
        currentNumber += char;
      }

      if (operators.includes(char) || i === expression.length - 1) {
        if (currentNumber) {
          const num = parseFloat(currentNumber);
          if (currentOperator === "+") {
            stack.push(num);
          } else if (currentOperator === "-") {
            stack.push(-num);
          } else if (currentOperator === "*") {
            stack.push(stack.pop() * num);
          } else if (currentOperator === "/") {
            stack.push(stack.pop() / num);
          }
        }
        currentOperator = char;
        currentNumber = "";
      }
    }

    return stack.reduce((acc, num) => acc + num, 0);
  };

  const handleButtonClick = (value) => {
    if (value === "=") {
      if (query && query.trim()) {
        // If there's a valid query, evaluate the expression
        try {
          const evalResult = evaluateExpression(query);
          setResult(evalResult);

          // After calculating, keep the result in query so we can continue calculations
          setQuery(evalResult.toString());

          // Add the calculation result to history
          const newHistory = [...history, `${query} = ${evalResult}`];
          setHistory(newHistory);
        } catch {
          setResult("Error");
        }
      }
    } else if (value === "C") {
      setQuery(""); // Clear the input
      setResult(0); // Reset result
    } else if (value === "CE") {
      setQuery(query.slice(0, -1)); // Remove last character from input
    } else if (value === "MC") {
      setMemory(0);
    } else if (value === "MR") {
      setQuery(memory.toString()); // Recall memory
    } else if (value === "M+") {
      setMemory(memory + result); // Add result to memory
    } else if (value === "M-") {
      setMemory(memory - result); // Subtract result from memory
    } else if (value === "MS") {
      setMemory(result); // Store result in memory
    } else {
      // Append the clicked value (operator/number) to the query
      setQuery(query + value);
    }
  };

  return (
    <div className="calculator-container">
      {/* Hamburger Menu Button */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Sidebar Menu (appears when menu is open) */}
      {menuOpen && (
        <div className="sidebar">
          <div className="tabbar">
            <ul>
              {Tabs?.map((tab) => {
                return <li onClick={() => setCurrentTab(tab)}>{tab}</li>;
              })}
            </ul>

            <button
              className="close-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              X
            </button>
          </div>
          {/* History Panel  */}
          <div className="history-panel">
            <ul>
              <>
                {currentTab === "History" ? (
                  history.map((entry, index) => <li key={index}>{entry}</li>)
                ) : (
                  <li>{memory}</li>
                )}
              </>
            </ul>
            <div className="bottom-bar">
              <img
                src={Trash}
                alt="delete"
                onClick={() => clearHistory(currentTab)}
              />
            </div>
          </div>
        </div>
      )}
      {/* query and result  */}
      <div className="display">
        <div className="query">{query || "0"}</div>
        <div className="result">{result}</div>
      </div>

      <div className="button-grid">
        {/* Memory Buttons */}
        <div
          className="memory-buttons"
          style={{
            display: "block",
            width: "100%",
          }}
        >
          <div className="mc-btn d-block w-100">
            <button
              onClick={() => handleButtonClick("MC")}
              className="btn memory"
            >
              MC
            </button>
          </div>
          <div className="btn-group">
            <button
              onClick={() => handleButtonClick("MR")}
              className="btn memory"
            >
              MR
            </button>
            <button
              onClick={() => handleButtonClick("M+")}
              className="btn memory"
            >
              M+
            </button>
            <button
              onClick={() => handleButtonClick("M-")}
              className="btn memory"
            >
              M-
            </button>
            <button
              onClick={() => handleButtonClick("MS")}
              className="btn memory"
            >
              MS
            </button>
          </div>
        </div>

        {/* Clear and Operators */}
        <button
          onClick={() => handleButtonClick("CE")}
          className="btn operator"
        >
          CE
        </button>
        <button onClick={() => handleButtonClick("C")} className="btn operator">
          C
        </button>
        <button
          onClick={() => handleButtonClick("<-")}
          className="btn operator"
        >
          &larr;
        </button>
        <button onClick={() => handleButtonClick("/")} className="btn operator">
          ÷
        </button>

        {/* Numbers and Operators */}
        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(String(num))}
            className="btn number"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleButtonClick("*")} className="btn operator">
          ×
        </button>

        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(String(num))}
            className="btn number"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleButtonClick("-")} className="btn operator">
          −
        </button>

        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(String(num))}
            className="btn number"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleButtonClick("+")} className="btn operator">
          +
        </button>
        <button
          //   onClick={() => handleButtonClick("0")}
          className="btn number"
        ></button>
        {/* Zero, Decimal, Equals */}
        <button onClick={() => handleButtonClick("0")} className="btn number">
          0
        </button>
        <button onClick={() => handleButtonClick(".")} className="btn number">
          .
        </button>
        <button onClick={() => handleButtonClick("=")} className="btn number">
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
