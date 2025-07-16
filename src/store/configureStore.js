import {configureStore} from '@reduxjs/toolkit';
import bugsReducer from './bugs';
import projectsReducer from './projects';

export default function(){
    return configureStore({
    reducer: {
        bugs: bugsReducer,
        projects: projectsReducer
    }
    });
}