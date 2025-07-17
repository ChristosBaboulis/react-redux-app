import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

let lastId = 0;

const bugSlice = createSlice({
    name: "bugSlice",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugAdded: (state, action) => {
            state.list.push(action.payload);
        },
        bugResolved: (state, action) => {
            const index = state.list.findIndex(bug => bug.id === action.payload.id);
            if (index !== -1) {
                state.list[index].resolved = true;
            }
        },
        bugRemoved: (state, action) => {
            state.list = state.list.filter(bug => bug.id !== action.payload.id);
        },
        bugAssignedToUser: (state, action) => {
            const { id: bugId, userId } = action.payload;
            const index = state.list.findIndex(bug => bug.id === bugId);
            if (index !== -1) {
                state.list[index].userId = userId;
            }
        },
        bugsReceived: (state, action) => {
            state.list = action.payload;
            state.lastFetch = Date.now();
            state.loading = false;
        },
        bugsRequested: (state) => {
            state.loading = true;
        },
        bugsRequestFailed: (state, action) => {
            state.loading = false;
            console.error("Failed to fetch bugs:", action.payload.message);
        }
    }
});

export const { 
    bugAdded, 
    bugResolved, 
    bugRemoved, 
    bugAssignedToUser, 
    bugsReceived,
    bugsRequested,
    bugsRequestFailed
} = bugSlice.actions;
export default bugSlice.reducer;

// Action creators
const url = '/bugs';

// command  - event
// loadBugs - bugsReceived
export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;
    const diffInMinutes = (Date.now() - lastFetch) / (1000 * 60);

    if (diffInMinutes < 10) return;

    dispatch(apiCallBegan({
        url,
        method: 'get',
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type
    }));
}

// command - event
// addBug  - bugAdded
export const addBug = (bug) => apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type,
    onError: bugsRequestFailed.type
});

// command          - event
// assignBugToUser  - bugAssignedToUser
export const assignBugToUser = (bugId, userId) => apiCallBegan({
    url: url + '/' + bugId, 
    method: 'patch',
    data: { userId },
    onSuccess: bugAssignedToUser.type,
    onError: bugsRequestFailed.type
});

// command      - event
// resolveBug   - bugResolved
export const resolveBug = (bugId) => apiCallBegan({
    url: url + '/' + bugId,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type,
    onError: bugsRequestFailed.type
});

// Memoization
// get data from cache if available
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs.list,
    state => state.entities.projects,
    (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs.list,
    bugs => bugs.filter(bug => bug.userId === userId)
);


// -------------------------------- Alternative implementation using createAction and createReducer -------------------------------- 
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