import styles from  '../csses/login.module.css';
import loginPhoto from '../loginPhoto.svg';
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {loginActionCreator, loginFailureActionCreator} from '../reducers/auth-reducer';
import {authUserThunkCreator} from '../reducers/auth-reducer';
function LoginPage() {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    var state = useSelector((state) => state.authPage);
    
    const dispatch = useDispatch();
    const onChange = () => {
        dispatch(loginActionCreator(emailRef.current.value, passwordRef.current.value));
        dispatch(loginFailureActionCreator("","",""));
    }

  return (

    <div className={styles.App}>


        
        
        <div className={styles.container}>

          <div className={styles.col}>
            <img src={loginPhoto} alt="Login" />
          </div>
                
                <div className={styles.col}>
                    <form className={styles['login-form']}> 
                    <p>Вход </p>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={state.user.email} onChange={onChange} ref={emailRef} />
                        <b  className={styles['error']}> {state.error.emailError}</b>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id="password" required value={state.user.password} onChange={onChange} ref={passwordRef}  />
                        <b className={styles['error']}> {state.error.passwordError}</b>
                    </div>

            
                    <button  className={styles.button} type="button" id="loginButton" onClick={() => dispatch(authUserThunkCreator(state.user.email,state.user.password, state.user.rememberMe))}>Войти</button>
                    <b className={styles['error']}> {state.error.loginFailure}</b>
                    </form>
                </div>

        </div>
      </div>

  );
}


export default LoginPage;