import { peApi } from "../Api/peApi";

const LOAD_STUDENTS = "LOAD_STUDENTS";
const LOAD_LOGO = "LOAD_LOGO"; 

let initialState = {
    students : []
  };

const studentsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case LOAD_STUDENTS:
            newState.students = action.students;
            return newState
        case LOAD_LOGO:
            newState.students = newState.students.map(student => {
                if (student.id === action.studentId) 
                { 
                    return { ...student, logoFile: action.logoFile }; 
                }
                return student;
            });
            return newState;
        default:
            return newState;
    }
}

export function loadStudentsActionCreator(students ){
    return {
        type: LOAD_STUDENTS,
        students : students      
    };
}



export function loadLogoActionCreator(studentId, logoFile) {
    return { type: LOAD_LOGO, studentId: studentId, logoFile: logoFile };
}

export function loadLogoThunkCreator(studentId, logoId) {
    return async (dispatch) => {
        const logoFile = await peApi.getFile(logoId); 
        dispatch(loadLogoActionCreator(studentId, logoFile)); 

    };
}


export function loadStudentsThunkCreator() {
    return async (dispatch) => {
        
            const data = await peApi.getStudents(); 
            
            dispatch(loadStudentsActionCreator(data)); 
            
            data?.forEach(student => { 
                if (student?.student != null) 
                {
                    dispatch(loadLogoThunkCreator(student.id, student?.avatarId));
                }
            });
    };  
}




export function postSporOrgThunkCreator(studentId) {
    return async (dispatch) => {
        const res = await peApi.postSportOrg(studentId); 
        if(res === true)
        {
            dispatch(loadStudentsThunkCreator())
        }
    };
}

export function deleteSporOrgThunkCreator(studentId) {
    return async (dispatch) => {
        const res = await peApi.deleteSportOrg(studentId); 
        if(res === true)
        {
             dispatch(loadStudentsThunkCreator())
        }
    };
}
export default studentsReducer;