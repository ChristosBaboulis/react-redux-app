import {configureStore} from '@reduxjs/toolkit';
import bugsReducer from './bugs';

export default function(){
    return configureStore({
    reducer: {
        bugs: bugsReducer
    }
    });
}