import React from 'react';
import styles from '../csses/admin.module.css'
function FacultyButton({faculty }) {
        return (
            <button className={styles.facultyBtn}> {faculty?.name}</button>
        );
    }

export default FacultyButton;