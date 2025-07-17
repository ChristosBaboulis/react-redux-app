import configStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved, bugAssignedToUser, getUnresolvedBugs, getBugsByUser, addBug } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';
import { loadBugs } from './store/bugs';

const store = configStore();

// Subscribe to store changes
// const unsubscribe = store.subscribe(() => {
//     console.log('Store changed!', store.getState());
// });

// Add Projects
store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectAdded({ name: "Project 2" }));
store.dispatch(projectAdded({ name: "Project 3" }));

// Add Bugs
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));

// Add Users
store.dispatch(userAdded({ name: "User 1" }));
store.dispatch(userAdded({ name: "User 2" }));
store.dispatch(userAdded({ name: "User 3" }));

// Log State
console.log('1: ', store.getState());

// Assign Bug to User
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

// Resolve a Bug
store.dispatch(bugResolved({ id: 1 }));

// Log State
console.log('2: ', store.getState());

// Remove a Bug
store.dispatch(bugRemoved({ id: 2 }));

// Log State
console.log('3: ', store.getState());

// Get Unresolved Bugs through Selector
const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log('Unresolved Bugs: ', unresolvedBugs);

// Get Bugs by User through Selector
const bugsAssigned = getBugsByUser(1)(store.getState());
console.log('Bugs assigned to User 1: ', bugsAssigned);

// Check Memoization
const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());
console.log('x === y: ', x === y); // true, because of memoization

// store.dispatch((dispatch, getState) => {
//     dispatch({ type: 'bugsReceived', bugs: [4,5,6]})
// });

store.dispatch({
    type: "error",
    payload: { message: "An error occurred!" }
});

// Dispatch GET request to fetch bugs
store.dispatch(loadBugs());

// Dispatch POST request to add a new bug
store.dispatch(addBug({ description: "New Bug" }));

// -------------------------------- CUSTOM STORE -------------------------------- 
// import store from './customStore';
// import * as actions from './actions';


// store.subscribe(() => {
//     console.log("store changed!", store.getState());
// })

// store.dispatch(actions.bugAdded("Bug 1"));
// console.log(store.getState());
