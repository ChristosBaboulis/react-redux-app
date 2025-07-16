import configStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved } from './store/bugs';

const store = configStore();

const unsubscribe = store.subscribe(() => {
    console.log('Store changed!', store.getState());
});

store.dispatch(bugAdded({description: "Bug 1"}));
store.dispatch(bugAdded({description: "Bug 2"}));
store.dispatch(bugAdded({description: "Bug 3"}));
console.log('1: ', store.getState());


// CUSTOM STORE
// import store from './customStore';
// import * as actions from './actions';


// store.subscribe(() => {
//     console.log("store changed!", store.getState());
// })

// store.dispatch(actions.bugAdded("Bug 1"));
// console.log(store.getState());
