import React from 'react';
import styles from '../csses/admin.module.css';
import userLogo from '../icons/User.svg';
import FacultyButton from './facultyButton';
import { useDispatch } from 'react-redux';
import  { useState  } from 'react';
import {postCuratorThunkCreator} from '../reducers/teachers-reducer'
function TeacherCuratorCard({userState, allFaculties }) {
    const hasFaculty = (facultyId, faculties) => {
        if (!faculties) return false; 
        return faculties.some(f => f.id === facultyId);
    };
    const dispatch = useDispatch();
    const missingFaculties = allFaculties.filter(faculty => !hasFaculty(faculty.id, userState?.faculties));
    
    const [selectedFacultyId, setSelectedFacultyId] = useState(null);
        const handleSelectChange = (event) => {
        setSelectedFacultyId(event.target.value); 
    };

    const handleAddButtonClick = () => {
        if (selectedFacultyId) 
        {
            dispatch(postCuratorThunkCreator(userState?.id , selectedFacultyId))
        }

    };


    return (
                <div className='simpleForm' style={{alignItems : "center", gap : "10px"}}>
                    <img src={userState.avatarId !== null ? userState?.logoFile : userLogo}  style={{ width: '50px', height: '50px', borderRadius: '40%', marginRight : "5px" }}></img>
                    <div style={{display : "flex", flexDirection : "column"}} >

                            <p style={{margin : "5px"}} className='gray'> Имя:  </p>
                            <p style={{margin : "5px"}} > {userState.fullName}  </p>
                            <p  style={{margin : "5px"}} className='gray'> Email:  </p>
                            <p style={{margin : "5px"}} >  {userState.email} </p>

 
                            <select onChange={handleSelectChange}>
                                <option value='' selected ></option>
                                {missingFaculties.map(faculty => (
                                    <option key={faculty.id} value={faculty.id}>
                                        {faculty.name}
                                    </option>
                                ))}
                            </select>
                        <button onClick={handleAddButtonClick}  className={styles.filterBtn}> Добавить </button>
                    </div>
                    <div style={{display : "grid" , gap : "5px",  gridTemplateColumns : "repeat(3, auto)" }}> 
                        
                        { Array.isArray(userState?.faculties) ? (
                                    userState?.faculties?.map((faculty, index) => (
                                        <FacultyButton key={index} userId={userState?.id} faculty={faculty}/>
                                    ))
                        ) : ("")}

                    </div>
                </div>
    );
}

export default TeacherCuratorCard;