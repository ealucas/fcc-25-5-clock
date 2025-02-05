import { React, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeSessionTime, changeBreakTime, play, reset, updateTime } from "../features/ClockSlice.js";
import "./css/Clock.css";

const Clock = () => {
  const dispatch = useDispatch();

  const handleBreakTime = (value) => {
    dispatch(changeBreakTime(value));
  }
  
  const handleSessionTime = (value) => {
    dispatch(changeSessionTime(value));
  }
  
  const handlePlay = () => {
    dispatch(play());

  }

  const handleReset = () => {
    dispatch(reset());
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0; 
  }

  const { sessionTime, breakTime, isRunning, isSession, currentTime } = useSelector((state) => state.clock);
  
  const playBeep = () => {
    const beep = new Audio("https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav");
    beep.play();
    setTimeout(() => {
      beep.pause();
      beep.currentTime = 0; // Reset audio to the beginning
    }, 1000);
  };
  
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        dispatch(updateTime());
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, dispatch]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };


  return (
    <div>
      <div className="timer">
        <div id="timer-label"> {isSession ? 'Session' : 'Break'} </div>
        <div id="time-left"> {formatTime(currentTime)} </div>
        <div className="start-reset-buttons">
          <button id="start_stop" onClick ={() => handlePlay()}> play </button>
          <button id="reset" onClick={() => handleReset()}> reset </button>
        </div>
      </div>
      <div className="session">
        <p id="session-label"> Session Length </p>
        <p id="session-length"> {sessionTime/60} </p>
        <button id="session-decrement" onClick={() => handleSessionTime(-60)}> - </button>
        <button id="session-increment" onClick={() => handleSessionTime(60)}> + </button>
      </div>
      <div className="break">
        <p id="break-label"> Break Length </p>
        <p id="break-length"> {breakTime/60} </p>
        <button id="break-decrement" onClick={() => handleBreakTime(-60)}> - </button>
        <button id="break-increment" onClick={() => handleBreakTime(60)}>+</button>
      </div>
      <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default Clock
