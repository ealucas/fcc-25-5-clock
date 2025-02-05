import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionTime: 25*60,
  breakTime: 5*60,
  isRunning: false,
  isSession: true,
  currentTime: 25*60 
};

const playBeep = () => {
  const beep = document.getElementById("beep");
    beep.currentTime = 0;
    beep.play();
    
    setTimeout(() => {
      beep.pause();
      beep.currentTime = 0;
    }, 1000);
};
  

const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    changeBreakTime: (state, action) => {
      if (state.isRunning){
        return;
      }
      const newTime = state.breakTime + action.payload;
      if (newTime > 60*60 || newTime < 1*60){
        return;
      }
      state.breakTime = newTime;
      if (!state.isSession){
        state.currentTime = state.breakTime;
      }
    },
    changeSessionTime: (state, action) => {
      if (state.isRunning){
        return;
      }
      
      const newTime = state.sessionTime + action.payload;
      
        if (newTime > 60*60 || newTime < 1*60){
        return;
      }
      state.sessionTime = newTime;
      if (state.isSession){
        state.currentTime = state.sessionTime;
      }
    },
    play: (state) => {
      state.isRunning = !state.isRunning;
    },
    reset: (state) => {
      state.sessionTime = initialState.sessionTime;
      state.breakTime = initialState.breakTime;
      state.isRunning = initialState.isRunning;
      state.isSession = initialState.isSession;
      state.currentTime = initialState.currentTime;
    },
    updateTime: (state) => {
      if (state.isRunning){
        if (state.isSession) {
          if (state.currentTime > 0){
            state.currentTime -= 1;
            } else {
              playBeep();
              state.isSession = false;
              state.currentTime = state.breakTime;
            }
          }  else {
          if (state.currentTime > 0){
            state.currentTime -=1;
            } else {
            playBeep();
            state.isSession = true;
            state.currentTime = state.sessionTime;
            }
          }
      }  
    }
  }
});

export const { changeBreakTime, changeSessionTime, play, reset, updateTime } = clockSlice.actions;

export default clockSlice.reducer;
