import { useState } from "react";
import useStore from "./store";
import "./App.css";

function App() {
  const { display, result, setDisplay, setResult, clear } = useStore();

  const handleNumberClick = (number) => {
    if (result !== null) {
      setDisplay(number.toString());
      setResult(null);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperationClick = (operation) => {
    if (display === "") return;
    if (result !== null) {
      setDisplay(result + " " + operation + " ");
      setResult(null);
    } else {
      setDisplay(display + " " + operation + " ");
    }
  };

  const handleClear = () => {
    clear();
  };

  const handleEquals = () => {
    try {
      const evaluatedResult = eval(display);
      setResult(evaluatedResult);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleSpecialOperationClick = (operation) => {
    if (display === "") return;
    let newDisplay = display;
    switch (operation) {
      case "sqrt":
        newDisplay = `Math.sqrt(${display})`;
        break;
      case "%":
        newDisplay = `(${display}) / 100`;
        break;
      case "x^2":
        newDisplay = `Math.pow(${display}, 2)`;
        break;
      default:
        return;
    }
    try {
      const evaluatedResult = eval(newDisplay);
      setResult(evaluatedResult);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Calculator App</h1>
        <div className="flex justify-center items-center">
          <div className="calculator bg-white p-8 rounded-lg shadow-lg">
            <div className="display mb-4">
              <input
                type="text"
                value={result !== null ? result : display}
                readOnly
                className="w-full text-right p-4 text-2xl border rounded"
              />
            </div>
            <div className="flex justify-center w-full">
              <div className="number-buttons grid grid-cols-3 gap-4 flex-grow">
                <button
                  onClick={() => handleSpecialOperationClick("sqrt")}
                  className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600"
                >
                  √
                </button>
                <button
                  onClick={() => handleSpecialOperationClick("%")}
                  className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600"
                >
                  %
                </button>
                <button
                  onClick={() => handleSpecialOperationClick("x^2")}
                  className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600"
                >
                  x²
                </button>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "00"].map((number) => (
                  <button
                    key={number}
                    onClick={() => handleNumberClick(number)}
                    className="bg-gray-200 p-4 rounded hover:bg-gray-300"
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={handleEquals}
                  className="bg-green-500 text-white p-4 rounded hover:bg-gray-300"
                >
                  =
                </button>
              </div>
              <div className="operation-buttons flex flex-col gap-4 ml-4 flex-grow">
                <button
                  onClick={handleClear}
                  className="bg-red-500 text-white p-4 rounded hover:bg-red-600"
                >
                  C
                </button>
                <button
                  onClick={() => handleOperationClick("+")}
                  className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
                >
                  +
                </button>
                <button
                  onClick={() => handleOperationClick("-")}
                  className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
                >
                  -
                </button>
                <button
                  onClick={() => handleOperationClick("*")}
                  className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
                >
                  *
                </button>
                <button
                  onClick={() => handleOperationClick("/")}
                  className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
                >
                  /
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
