import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  showIdleWarning: boolean;
}

const initialState: SessionState = {
  showIdleWarning: false
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setIdleWarning: (state, action: PayloadAction<boolean>) => {
      state.showIdleWarning = action.payload;
    },
    clearIdleWarning: (state) => {
      state.showIdleWarning = false;
    }
  }
});

export const { setIdleWarning, clearIdleWarning } = sessionSlice.actions;
export default sessionSlice.reducer;
