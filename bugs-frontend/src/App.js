import React from 'react';
import './App.css';
//import Bugs from './components/Bugs.jsx';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import BugsList from './components/BugsList.jsx';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Bugs />
    </Provider>
  );
}

export default App;
