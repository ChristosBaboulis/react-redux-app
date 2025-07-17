import configStore from './store/configureStore';
import {  getUnresolvedBugs, getBugsByUser, addBug, assignBugToUser, resolveBug, removeBug } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';
import { loadBugs } from './store/bugs';

const store = configStore();

// Subscribe to store changes
// const unsubscribe = store.subscribe(() => {
//     console.log('Store changed!', store.getState());
// });

// -------------------------------- DISPATCH ACTIONS - API CALLOUTS --------------------------------
// Add Projects
store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectAdded({ name: "Project 2" }));
store.dispatch(projectAdded({ name: "Project 3" }));

// Add Bugs
store.dispatch(addBug("Bug 1"));
store.dispatch(addBug("Bug 2"));
store.dispatch(addBug("Bug 3"));

// Add Users
store.dispatch(userAdded({ name: "User 1" }));
store.dispatch(userAdded({ name: "User 2" }));
store.dispatch(userAdded({ name: "User 3" }));

// Assign Bug to User
store.dispatch(assignBugToUser(1, 1));

// Resolve a Bug
store.dispatch(resolveBug(1));

// Dispatch GET request to fetch bugs
store.dispatch(loadBugs());

// Remove a Bug
//store.dispatch(removeBug(2));

// Log State
// console.log('1: ', store.getState());

// -------------------------------- SELECTORS --------------------------------
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

// -------------------------------- TEST TOAST MIDDLEWARE --------------------------------
// Dispatch an error action
store.dispatch({
    type: "error",
    payload: { message: "An error occurred!" }
});

// -------------------------------- CUSTOM STORE -------------------------------- 
// import store from './customStore';
// import * as actions from './actions';


// store.subscribe(() => {
//     console.log("store changed!", store.getState());
// })

// store.dispatch(actions.bugAdded("Bug 1"));
// console.log(store.getState());
