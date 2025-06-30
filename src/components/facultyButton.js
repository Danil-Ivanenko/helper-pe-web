import React from 'react';
import styles from '../csses/admin.module.css'
import { useDispatch } from 'react-redux';
import {deleteCuratorThunkCreator} from  '../reducers/teachers-reducer'
function FacultyButton({faculty , userId}) {
    
    const dispatch = useDispatch();

        return (
            <button onClick={() => dispatch(deleteCuratorThunkCreator(userId, faculty?.id))} className={styles.facultyBtn}> {faculty?.name}</button>
        );
    }

export default FacultyButton;