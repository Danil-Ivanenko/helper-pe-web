import { peApi } from '../Api/peApi';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

let initialState = {
    user: {
        email : '',
        password : ''
    }     ,
    error: {
        emailError : '',
        passwordError : '',
        loginFailure  : ''
    }
  };

  const authReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case LOGIN_REQUEST:
            newState.user = {email : action.email , password : action.password}
            return newState
        case LOGIN_FAILURE:
            newState.error = {emailError: action.emailError, passwordError: action.passwordError,loginFailure: action.loginFailure }
            return newState
        default:
            return newState;
    }
};


export function authUserThunkCreator(email, password) {
    return async (dispatch) => { 
      
        const data = await peApi.login(email, password); 
        if (data.status === 200) {
            console.log(data)
            if(data.role === "Admin")
            {
                window.location.href = "/admin"
            }
            else if (data.role === "Curator")
            {
                window.location.href = "/curator"
            }
            else
            {
                dispatch(loginFailureActionCreator("","","Только для преподавателей"));
            }
        } 
        else 
        {
             dispatch(loginFailureActionCreator("","","Login failure"));

        } 

    };
  }


export function loginActionCreator(email, password){
    return {type: LOGIN_REQUEST, email : email , password : password};
}

export function loginFailureActionCreator(emailError ,passwordError ,loginFailure){
    return {type: LOGIN_FAILURE, emailError:emailError, passwordError:passwordError, loginFailure:loginFailure};
}

export default authReducer;