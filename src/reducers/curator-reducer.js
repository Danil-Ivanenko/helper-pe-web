import { peApi } from "../Api/peApi";

const LOAD_CURATOR_FACULTIES = "LOAD_CURATOR_FACULTIES";

let initialState = {
    faculties : []
  };

const curatorFacultiesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case LOAD_CURATOR_FACULTIES:
            newState.faculties = action.faculties;
            return newState

        default:
            return newState;
    }
}

export function loadCuratorFacultiesActionCreator(faculties ){
    return {
        type: LOAD_CURATOR_FACULTIES,
        faculties : faculties      
    };
}





export function loadCuratorFacultiesThunkCreator() {
    return async (dispatch) => {
        
            const data = await peApi.getCuratorFaculties(); 
            
            dispatch(loadCuratorFacultiesActionCreator(data?.faculties)); 
            

    };  
}




export default curatorFacultiesReducer;