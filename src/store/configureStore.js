import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middleware/logger';
import toast from './middleware/toast';

export default function(){
    return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(), 
        logger({ destination: 'console' }),
        toast
    ]
    });
}