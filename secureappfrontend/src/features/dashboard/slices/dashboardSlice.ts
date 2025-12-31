import { createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  loading: boolean;
}

const initialState: DashboardState = {
  loading: false
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {}
});

export default dashboardSlice.reducer;
