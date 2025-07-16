import { createSlice } from "@reduxjs/toolkit";
let lastId = 0;

const projectSlice = createSlice({
    name: "projectSlice",
    initialState: [],
    reducers: {
        projectAdded: (state, action) => {
            state.push({
                id: ++lastId,
                name: action.payload.name
            });
        }
    }
});

export const { projectAdded } = projectSlice.actions;
export default projectSlice.reducer;