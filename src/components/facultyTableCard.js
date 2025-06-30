import React from 'react';
import styles from '../csses/admin.module.css';
import userLogo from '../icons/User.svg';
import { peApi } from '../Api/peApi';

function FacultyTableCard({ faculty }) {




    return (
                <div className='simpleForm' style={{alignItems : "center", gap : "10px", justifyContent : "space-between"}}>
                   
                    <div style={{display : "flex", flexDirection : "column"}} >

                            <p style={{margin : "5px"}} className='gray'> Название:  </p>
                            <p style={{margin : "5px"}} > {faculty?.name}  </p>
                    </div>

                        <button  className={styles.filterBtn} style={{maxWidth : "150px"}} onClick={async() => await peApi.getTable(faculty.id)}> Скачать </button>
                </div>
    );
}

export default FacultyTableCard;