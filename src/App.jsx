import { useState, useEffect } from "react";
import "./App.css";

const App = ({ initialSeconds = 10, initialMinutes = 1, initialHours = 1 }) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          clearInterval(timer);
          setIsRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, hours, minutes, seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <div className="container">
      <h1>CountDown Timer</h1>
      <h2>
        {String(hours).padStart(2, "0")} : {String(minutes).padStart(2, "0")} :
        {String(seconds).padStart(2, "0")}
      </h2>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
