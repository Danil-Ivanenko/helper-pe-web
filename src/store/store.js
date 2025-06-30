import {createStore, combineReducers, applyMiddleware} from 'redux'
//import newsReducer from '../reducers/example/news-reducer'
import {thunk} from 'redux-thunk'
import authReducer from '../reducers/auth-reducer';
import teachersReducer from '../reducers/teachers-reducer';
import studentsReducer from '../reducers/students-reducer'
import curatorFacultiesReducer from '../reducers/curator-reducer'
let reducers = combineReducers({
    
    authPage: authReducer,
    teachersReducer: teachersReducer,
    studentsReducer: studentsReducer,
    curatorFacultiesReducer: curatorFacultiesReducer
    // profileReducer: profileReducer,
    // sidebarReducer: sidebarReducer,
    // servicesReducer: servicesReducer,
    // certificatesReducer: certificatesReducer,
    // eventsReducer: eventsReducer,
    // detailEventReducer: detailEventReducer,
    // adminProfilesReducer: adminProfilesReducer,
    // adminConcreateProfileReducer : adminConcreateProfileReducer
    
})

let store = createStore(reducers, applyMiddleware(thunk));
export default store;