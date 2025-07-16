import configStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved, bugAssignedToUser, getUnresolvedBugs, getBugsByUser } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

const store = configStore();

const unsubscribe = store.subscribe(() => {
    console.log('Store changed!', store.getState());
});

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
console.log('1: ', store.getState());

// Assign Bugs to Users
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

// Resolve a Bug
store.dispatch(bugResolved({ id: 1 }));
console.log('2: ', store.getState());

// Remove a Bug
store.dispatch(bugRemoved({ id: 2 }));
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

// CUSTOM STORE
// import store from './customStore';
// import * as actions from './actions';


// store.subscribe(() => {
//     console.log("store changed!", store.getState());
// })

// store.dispatch(actions.bugAdded("Bug 1"));
// console.log(store.getState());
