import configStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved, getUnresolvedBugs } from './store/bugs';
import { projectAdded } from './store/projects';

const store = configStore();

const unsubscribe = store.subscribe(() => {
    console.log('Store changed!', store.getState());
});

store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectAdded({ name: "Project 2" }));
store.dispatch(projectAdded({ name: "Project 3" }));

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
console.log('1: ', store.getState());

store.dispatch(bugResolved({ id: 1 }));
console.log('2: ', store.getState());

store.dispatch(bugRemoved({ id: 2 }));
console.log('3: ', store.getState());

const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log('Unresolved Bugs: ', unresolvedBugs);

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
