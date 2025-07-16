import configStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved } from './store/bugs';
import { projectAdded } from './store/projects';

const store = configStore();

const unsubscribe = store.subscribe(() => {
    console.log('Store changed!', store.getState());
});

store.dispatch(projectAdded({name: "Project 1"}));
store.dispatch(projectAdded({name: "Project 2"}));
store.dispatch(projectAdded({name: "Project 3"}));
console.log('1: ', store.getState());

store.dispatch(bugAdded({description: "Bug 1"}));
store.dispatch(bugAdded({description: "Bug 2"}));
store.dispatch(bugAdded({description: "Bug 3"}));
console.log('1: ', store.getState());

unsubscribe();

store.dispatch(bugResolved(1));
console.log('2: ', store.getState());

store.dispatch(bugRemoved(1));
console.log('3: ', store.getState());

// CUSTOM STORE
// import store from './customStore';
// import * as actions from './actions';


// store.subscribe(() => {
//     console.log("store changed!", store.getState());
// })

// store.dispatch(actions.bugAdded("Bug 1"));
// console.log(store.getState());
