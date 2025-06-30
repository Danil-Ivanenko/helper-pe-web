import React, { useState, useEffect } from 'react';
import styles from '../csses/login.module.css';
import userLogo from '../icons/User.svg';
import FacultyButton from './facultyButton';
import { useDispatch } from 'react-redux';
import {postSporOrgThunkCreator, deleteSporOrgThunkCreator} from '../reducers/students-reducer'
function StudentSportOrgCard({userState }) {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        if (userState?.role === "SportsOrganizer") {
            setIsChecked(true);
        }
    }, [userState?.role]);
    const handleToggleChange = (event) => {
        setIsChecked(event.target.checked);
        if(event.target.checked === true)
        {
            dispatch(postSporOrgThunkCreator(userState?.id))
        }
        else
        {
            dispatch(deleteSporOrgThunkCreator(userState?.id))
        }
    };

    return (
                <div className='simpleForm' style={{alignItems : "center", gap : "10px"}}>
                    <img src={ userLogo}  style={{ width: '50px', height: '50px', borderRadius: '40%', marginRight : "5px" }}></img>
                        <div style={{display :"flex"}}>
                            <p className='gray'>	&nbsp; Имя: &nbsp;  </p>
                            <p  > {userState?.name} 	&nbsp; </p>
                        </div>
                        <div style={{display :"flex"}}>
                            <p className='gray'> 	&nbsp;Группа:  &nbsp; </p>
                            <p  > {userState?.group} 	&nbsp; </p>
                        </div>
                        <div style={{display :"flex"}}>
                            <p className='gray'> 	&nbsp;Курс:  &nbsp; </p>
                            <p  > {userState?.course} 	&nbsp; </p>
                        </div>

                    <label className={styles.toggle}>
                        <input className={styles['toggle-checkbox']} type="checkbox" onChange={handleToggleChange}  checked={isChecked}/>
                        <div className={styles['toggle-switch']}></div>
                    </label>
                </div>
    );
}

export default StudentSportOrgCard;