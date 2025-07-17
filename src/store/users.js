import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const userSlice = createSlice({
  name: 'userSlice',
  initialState: [],
  reducers: {
    userAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { userAdded, bugAssigned } = userSlice.actions;
export default userSlice.reducer;
