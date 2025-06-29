import { peApi } from "../Api/peApi";

const LOAD_TEACHERS = "LOAD_TEACHERS";
const LOAD_LOGO = "LOAD_LOGO"; 
const LOAD_CURATORS = "LOAD_CURATORS"
let initialState = {
    teachers:[],
    curators: [],
    faculties : []
  };

const teachersReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case LOAD_TEACHERS:
            newState.teachers = action.teachers;
            return newState
        case LOAD_CURATORS:
            newState.curators = action.curators;
            return newState
        case LOAD_LOGO:
            newState.teachers = newState.teachers.map(teacher => {
                if (teacher.id === action.teacherId) 
                { 
                    return { ...teacher, logoFile: action.logoFile }; 
                }
                return teacher;
            });
            return newState;
        default:
            return newState;
    }
}

export function loadTeachersActionCreator(teachers ){
    return {
        type: LOAD_TEACHERS,
        teachers : teachers      
    };
}

export function loadCuratorsActionCreator(curators ){
    return {
        type: LOAD_CURATORS,
        curators : curators      
    };
}


export function loadLogoActionCreator(teacherId, logoFile) {
    return { type: LOAD_LOGO, teacherId: teacherId, logoFile: logoFile };
}


export function loadTeachersThunkCreator() {
    return async (dispatch) => {
        
            const data = await peApi.getTeachers(); 
            
            dispatch(loadTeachersActionCreator(data)); 
            
            data?.forEach(teacher => { 
                if (teacher?.avatarId != null) 
                {
                    dispatch(loadLogoThunkCreator(teacher.id, teacher?.avatarId));
                }
            });
    };  
}

export function loadCuratorsThunkCreator() {
    return async (dispatch) => {
        
            const data = await peApi.getCurators(); 
            
            dispatch(loadCuratorsActionCreator(data)); 
            
            data?.forEach(curator => { 
                if (curator?.avatarId != null) 
                {
                    dispatch(loadLogoThunkCreator(curator.id, curator?.avatarId));
                }
            });
    };  
}


export function loadLogoThunkCreator(teacherId, logoId) {
    return async (dispatch) => {
        const logoFile = await peApi.getFile(logoId); 
        dispatch(loadLogoActionCreator(teacherId, logoFile)); 

    };
}

export default teachersReducer;