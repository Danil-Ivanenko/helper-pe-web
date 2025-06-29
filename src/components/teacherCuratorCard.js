import React from 'react';
import styles from '../csses/admin.module.css';
import userLogo from '../icons/User.svg';
import FacultyButton from './facultyButton';

function TeacherCuratorCard({userState, allFaculties }) {

    return (
                <div className='simpleForm' style={{alignItems : "center", gap : "10px"}}>
                    <img src={userState.avatarId !== null ? userState?.logoFile : userLogo}  style={{ width: '50px', height: '50px', borderRadius: '40%', marginRight : "5px" }}></img>
                    <div style={{display : "flex", flexDirection : "column"}} >

                            <p style={{margin : "5px"}} className='gray'> Имя:  </p>
                            <p style={{margin : "5px"}} > {userState.fullName}  </p>
                            <p  style={{margin : "5px"}} className='gray'> Email:  </p>
                            <p style={{margin : "5px"}} >  {userState.email} </p>

 
                        <select>
                            <option> Факультет журналистики </option>
                            <option>Факультет журналистики ghjhgjhgjhgj </option>
                        </select>
                        <button className={styles.filterBtn}> Добавить </button>
                    </div>
                    <div style={{display : "grid" , gap : "5px",  gridTemplateColumns : "repeat(3, auto)" }}> 
                        
                        { Array.isArray(userState?.faculties) ? (
                                    userState?.faculties?.map((faculty, index) => (
                                        <FacultyButton key={index} faculty={faculty}/>
                                    ))
                        ) : ("")}

                    </div>
                </div>
    );
}

export default TeacherCuratorCard;