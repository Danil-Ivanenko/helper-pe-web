import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import adminstyles from '../csses/admin.module.css'
import Sidebar from '../components/Sidebar';
import styles from '../csses/sidebar.css'
import StudentSportOrgCard from "../components/studentSportOrgCard"
import {loadStudentsThunkCreator } from '../reducers/students-reducer'

function CuratorPage() {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const dispatch = useDispatch();
    const studentsState = useSelector(state => state.studentsReducer);
    
    useEffect(() => {
      dispatch(loadStudentsThunkCreator());
    }, [dispatch]);
    


    console.log(studentsState)
    return (

    <div className="app-container">

        <div className="header" > 
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <p className={`headerName ${isSidebarOpen ? 'shifted' : ''}`}>Спорторги</p>
            
        </div>
         <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`} style={{gap : "15px"}}>
            <p className='mainName'>Спорторги</p>

                { Array.isArray(studentsState?.students) ? (
                        studentsState?.students.map((student, index) => (
                            
                            <StudentSportOrgCard userState={student} key={index}/>
                        ))
                    ) : ("")}
                            
                    
        </div>
        
    </div>
    );
}
  
  export default CuratorPage;