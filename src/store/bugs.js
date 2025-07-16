import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const bugSlice = createSlice({
    name: "bugSlice",
    initialState: [],
    reducers: {
        bugAdded: (state, action) => {
            state.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            });
        },
        bugResolved: (state, action) => {
            const index = state.findIndex(bug => bug.id === action.payload.id);
            if (index !== -1) {
                state[index].resolved = true;
            }
        },
        bugRemoved: (state, action) => {
            return state.filter(bug => bug.id !== action.payload.id);
        }
    }
});

export const {bugAdded, bugResolved, bugRemoved} = bugSlice.actions;
export default bugSlice.reducer;

// Memoization
// get data from cache if available
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

//import { createAction, createReducer } from '@reduxjs/toolkit';

// Action creators
// export const bugAdded = createAction("bugAdded");
// export const bugUpdated = createAction("bugUpdated");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");

// // Reducer
// const bugsReducer = createReducer([], (builder) => {
//     builder
//         .addCase(bugAdded, (bugs, action) => {
//             bugs.push({
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false
//             });
//         })
//         .addCase(bugResolved, (bugs, action) => {
//             const index = bugs.findIndex(bug => bug.id === action.payload.id);
//             if (index !== -1) {
//                 bugs[index].resolved = true;
//             }
//         })
//         .addCase(bugRemoved, (bugs, action) => {
//             return bugs.filter(bug => bug.id !== action.payload.id);
//         });
// });

// export default bugsReducer;

// Build manually Reducer

// export default function reducer(state = [], action){
//     if (action.type === bugAdded.type){
//         return [
//             ...state,
//             {
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false
//             }
//         ];
//     }
//     else if (action.type === bugRemoved.type){
//         return state.filter(bug => bug.id !== action.payload.id)
//     }
//     else if(action.type === bugResolved.type){
//         return state.map(bug => 
//             bug.id === action.payload.id 
//             ? {...bug, resolved: true}
//             : bug
//         );
//     }
    
//     return state;
// }