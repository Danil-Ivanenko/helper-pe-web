import { peApi } from "../Api/peApi";

const LOAD_TEACHERS = "LOAD_TEACHERS";
const LOAD_LOGO = "LOAD_LOGO"; 
const LOAD_CURATORS = "LOAD_CURATORS"
const LOAD_FACULTIES = "LOAD_FACULTIES"
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
        case LOAD_FACULTIES:
            newState.faculties = action.faculties;
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

export function loadFacultiesActionCreator(faculties ){
    return {
        type: LOAD_FACULTIES,
        faculties : faculties      
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
export function loadFacultiesThunkCreator() {
    return async (dispatch) => {
        const faculties = await peApi.getFaculties(); 
        dispatch(loadFacultiesActionCreator(faculties)); 

    };
}


export function postCuratorThunkCreator(userId, facultyId) {
    return async (dispatch) => {
        const res = await peApi.postCurator(userId, facultyId); 
        if(res === true)
        {
            dispatch(loadTeachersThunkCreator()); 
            dispatch(loadCuratorsThunkCreator()); 
        }
    };
}

export function deleteCuratorThunkCreator(userId, facultyId) {
    return async (dispatch) => {
        const res = await peApi.deleteCurator(userId, facultyId); 
        if(res === true)
        {
            dispatch(loadTeachersThunkCreator()); 
            dispatch(loadCuratorsThunkCreator()); 
        }
    };
}
export default teachersReducer;